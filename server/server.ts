import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import type { Data } from './types';

const PORT = process.env.PORT || 3000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRATION_TIME = '1h';

if (!JWT_SECRET_KEY) {
  console.error('JWT_SECRET_KEY is not set. Please define it in your environment.');
  process.exit(1);
}

const server = jsonServer.create();
const router = jsonServer.router<Data>('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = router.db.get('users').find({ login }).value();

  if (!user) {
    res.status(401).json({ status: 401, message: 'Incorrect login' });
    return;
  }
  if (user.password !== password) {
    res.status(401).json({ status: 401, message: 'Incorrect password' });
    return;
  }

  const accessToken = jwt.sign(
    { id: user.id, login: user.login, role: user.role },
    JWT_SECRET_KEY,
    { expiresIn: JWT_EXPIRATION_TIME }
  );
  res.status(200).json({
    accessToken,
    user: { id: user.id, login: user.login, fullName: user.fullName, role: user.role }
  });
});

server.delete('/logout', (_req, res) => {
  res.sendStatus(200);
});

// Checking for the authorization header on all endpoints except /login
server.use(/^(?!\/login).*$/, (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      status: 401,
      message: 'Authorization header missing or incorrect'
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET_KEY, (err) => {
    if (err) {
      res.status(403).json({ status: 403, message: 'Invalid or expired token' });
    }
    next();
  });
});

server.use(router);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
