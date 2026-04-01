require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const Datastore = require('@seald-io/nedb');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'newtech-kenya-secret-2024';

app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Ensure data dir exists ─────────────────────────────
require('fs').mkdirSync('./data', { recursive: true });

// ── NeDB datastores ────────────────────────────────────
const users    = new Datastore({ filename: './data/users.db',    autoload: true });
const requests = new Datastore({ filename: './data/requests.db', autoload: true });
const emails   = new Datastore({ filename: './data/emails.db',   autoload: true });
users.ensureIndex({ fieldName: 'email', unique: true });

// ── Promisify helpers ──────────────────────────────────
const find    = (db, q)          => new Promise((res, rej) => db.find(q, (e, d) => e ? rej(e) : res(d)));
const findOne = (db, q)          => new Promise((res, rej) => db.findOne(q, (e, d) => e ? rej(e) : res(d)));
const insert  = (db, doc)        => new Promise((res, rej) => db.insert(doc, (e, d) => e ? rej(e) : res(d)));
const update  = (db, q, u, o={}) => new Promise((res, rej) => db.update(q, u, o, (e, n) => e ? rej(e) : res(n)));

// ── Nodemailer transporter ─────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Auth middleware ────────────────────────────────────
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

// ── Auth routes ────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Name, email and password required' });

  if (await findOne(users, { email }))
    return res.status(409).json({ error: 'Email already registered' });

  const id = uuidv4();
  await insert(users, {
    id, name, email,
    phone: phone || null,
    password: await bcrypt.hash(password, 10),
    created_at: new Date().toISOString(),
  });
  const token = jwt.sign({ id, name, email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id, name, email, phone: phone || null } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findOne(users, { email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
});

app.get('/api/auth/me', auth, async (req, res) => {
  const user = await findOne(users, { id: req.user.id });
  if (!user) return res.status(404).json({ error: 'Not found' });
  const { password: _, ...safe } = user;
  res.json(safe);
});

// ── Service requests ───────────────────────────────────
app.post('/api/requests', auth, async (req, res) => {
  const { service, description } = req.body;
  if (!service) return res.status(400).json({ error: 'Service is required' });
  const doc = { id: uuidv4(), user_id: req.user.id, service, description: description || null, status: 'pending', created_at: new Date().toISOString() };
  await insert(requests, doc);
  res.json(doc);
});

app.get('/api/requests', auth, async (req, res) => {
  const list = await find(requests, { user_id: req.user.id });
  res.json(list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

// ── Admin routes ───────────────────────────────────────
app.get('/api/admin/requests', auth, async (req, res) => {
  const [list, allUsers] = await Promise.all([find(requests, {}), find(users, {})]);
  const userMap = Object.fromEntries(allUsers.map(u => [u.id, u]));
  const enriched = list.map(r => ({
    ...r,
    user_name:  userMap[r.user_id]?.name  || 'Unknown',
    user_email: userMap[r.user_id]?.email || '',
    user_phone: userMap[r.user_id]?.phone || '',
  }));
  res.json(enriched.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

app.get('/api/admin/users', auth, async (req, res) => {
  const list = await find(users, {});
  const safe = list.map(({ password: _, ...u }) => u);
  res.json(safe.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

app.patch('/api/admin/requests/:id', auth, async (req, res) => {
  await update(requests, { id: req.params.id }, { $set: { status: req.body.status } });
  res.json({ success: true });
});

// ── Admin: send email to customer ──────────────────────
app.post('/api/admin/email', auth, async (req, res) => {
  const { to, to_name, subject, message, request_id } = req.body;
  if (!to || !subject || !message)
    return res.status(400).json({ error: 'to, subject and message are required' });

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS)
    return res.status(503).json({ error: 'Email not configured. Add SMTP_USER and SMTP_PASS to .env' });

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 0;">
      <div style="background: linear-gradient(135deg, #1e3a8a, #065f46); padding: 32px 40px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">NewTech Kenya</h1>
        <p style="color: #a7f3d0; margin: 4px 0 0; font-size: 13px;">Technology Solutions · Kilimani, Nairobi</p>
      </div>
      <div style="background: white; padding: 36px 40px; border-radius: 0 0 12px 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <p style="color: #1e293b; font-size: 16px; margin-top: 0;">Hi ${to_name || 'there'},</p>
        <div style="color: #334155; font-size: 15px; line-height: 1.7;">${message.replace(/\n/g, '<br/>')}</div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: top; padding-right: 20px; border-right: 3px solid #059669; width: 4px;">&nbsp;</td>
            <td style="padding-left: 16px;">
              <p style="margin: 0 0 2px; font-weight: 700; color: #1e293b; font-size: 14px;">Mike Murango</p>
              <p style="margin: 0 0 2px; color: #059669; font-size: 13px; font-weight: 600;">NewTech Kenya</p>
              <p style="margin: 0 0 6px; color: #64748b; font-size: 12px;">Technology Solutions · Kilimani, Nairobi</p>
              <p style="margin: 0; font-size: 12px;">
                <a href="tel:+254791303899" style="color: #2563eb; text-decoration: none;">📞 0791 303 899</a>
                &nbsp;·&nbsp;
                <a href="mailto:m.murango@newtechkenya.com" style="color: #2563eb; text-decoration: none;">✉ m.murango@newtechkenya.com</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from:    process.env.SMTP_FROM || `NewTech Kenya <${process.env.SMTP_USER}>`,
      to:      `${to_name ? to_name + ' <' + to + '>' : to}`,
      subject,
      html,
      text: message,
    });

    // Log to DB
    await insert(emails, {
      id: uuidv4(),
      sent_by: req.user.id,
      to, to_name: to_name || null,
      subject, message,
      request_id: request_id || null,
      sent_at: new Date().toISOString(),
    });

    res.json({ success: true, message: `Email sent to ${to}` });
  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ error: 'Failed to send email: ' + err.message });
  }
});

// Admin: get email history
app.get('/api/admin/emails', auth, async (req, res) => {
  const list = await find(emails, {});
  res.json(list.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at)));
});

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'NewTech Kenya API' }));

app.listen(PORT, () => console.log(`NewTech Kenya API running on port ${PORT}`));
