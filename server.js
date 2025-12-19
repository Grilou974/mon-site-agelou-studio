const express = require('express');
const fs = require('fs');
const path = require('path');
const basicAuth = require('basic-auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const CONTENT_FILE = path.join(__dirname, 'content.json');
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

function readJson(file, fallback){
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}

function writeJson(file, data){
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// Basic auth middleware for admin endpoints
function requireAuth(req, res, next){
  const user = basicAuth(req);
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'password';
  if(!user || user.name !== adminUser || user.pass !== adminPass){
    res.set('WWW-Authenticate','Basic realm="Admin"');
    return res.status(401).send('Authentication required');
  }
  next();
}

// Content API
app.get('/api/content', (req, res) => {
  const content = readJson(CONTENT_FILE, {});
  res.json(content);
});

app.post('/api/content', requireAuth, (req, res) => {
  const body = req.body;
  writeJson(CONTENT_FILE, body);
  res.json({ ok: true });
});

// Contact API
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if(!name || !email || !message) return res.status(400).json({ error: 'Champs manquants' });
  const messages = readJson(MESSAGES_FILE, []);
  messages.push({ name, email, message, date: new Date().toISOString() });
  writeJson(MESSAGES_FILE, messages);
  res.json({ ok: true });
});

// Messages listing (admin)
app.get('/api/messages', requireAuth, (req, res) => {
  const messages = readJson(MESSAGES_FILE, []);
  res.json(messages);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
