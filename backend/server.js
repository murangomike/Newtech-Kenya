const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Datastore = require('@seald-io/nedb');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'newtech-kenya-secret-2024';

app.use(cors({ origin: '*' }));
app.use(express.json());

// NeDB datastores
const users = new Datastore({ filename: './data/users.db', autoload: true });
const requests = new Datastore({ filename: './data/requests.db', autoload: true });
users.ensureIndex({ fieldName: 'email', unique: true });

// Promisify helpers
const find = (db, query) => new Promise((res, rej) => db.find(query, (e, d) => e ? rej(e) : res(d)));
const findOne = (db, query) => new Promise((res, rej) => db.findOne(query, (e, d) => e ? rej(e) : res(d)));
const insert = (db, doc) => new Promise((res, rej) => db.insert(doc, (e, d) => e ? rej(e) : res(d)));
const update = (db, q, u, o = {}) => new Promise((res, rej) => db.update(q, u, o, (e, n) => e ? rej(e) : res(n)));

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Name, email and password required' });

  const existing = await findOne(users, { email });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const id = uuidv4();
  const doc = { id, name, email, phone: phone || null, password: hashed, created_at: new Date().toISOString() };
  await insert(users, doc);

  const token = jwt.sign({ id, name, email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id, name, email, phone: phone || null } });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findOne(users, { email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
});

// Get current user
app.get('/api/auth/me', auth, async (req, res) => {
  const user = await findOne(users, { id: req.user.id });
  if (!user) return res.status(404).json({ error: 'Not found' });
  const { password: _, ...safe } = user;
  res.json(safe);
});

// Submit service request
app.post('/api/requests', auth, async (req, res) => {
  const { service, description } = req.body;
  if (!service) return res.status(400).json({ error: 'Service is required' });
  const id = uuidv4();
  const doc = { id, user_id: req.user.id, service, description: description || null, status: 'pending', created_at: new Date().toISOString() };
  await insert(requests, doc);
  res.json(doc);
});

// Get user's requests
app.get('/api/requests', auth, async (req, res) => {
  const list = await find(requests, { user_id: req.user.id });
  list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(list);
});

// Admin: get all requests
app.get('/api/admin/requests', auth, async (req, res) => {
  const list = await find(requests, {});
  const allUsers = await find(users, {});
  const userMap = Object.fromEntries(allUsers.map(u => [u.id, u]));
  const enriched = list.map(r => ({
    ...r,
    user_name: userMap[r.user_id]?.name || 'Unknown',
    user_email: userMap[r.user_id]?.email || '',
  }));
  enriched.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(enriched);
});

// Admin: get all users
app.get('/api/admin/users', auth, async (req, res) => {
  const list = await find(users, {});
  const safe = list.map(({ password: _, ...u }) => u);
  safe.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(safe);
});

// Update request status (admin)
app.patch('/api/admin/requests/:id', auth, async (req, res) => {
  const { status } = req.body;
  await update(requests, { id: req.params.id }, { $set: { status } });
  res.json({ success: true });
});

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'NewTech Kenya API' }));

// Ensure data dir exists
require('fs').mkdirSync('./data', { recursive: true });

app.listen(PORT, () => console.log(`NewTech Kenya API running on port ${PORT}`));
