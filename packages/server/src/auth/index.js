import express from 'express';
import { findUserByUsername, verifyPassword } from 'db/actions/user';

export default ({ cookieSettings }) => {
  const router = express.Router();

  router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Email and Password are required.',
      });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({
        error: 'No user found',
      });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid password',
      });
    }

    // Login successfully!
    await new Promise(res => req.session.regenerate(res));
    req.session.userId = user.id;
    res.json({ message: 'Login successfully!' });
  });

  router.post('/auth/logout', async (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({
          error: 'Failed to logout',
        });
      }

      res.clearCookie('connect.sid', {
        httpOnly: cookieSettings.httpOnly,
        secure: cookieSettings.secure,
      });
      res.json({
        message: 'You are now logged out',
      });
    });
  });

  // Temporary route to test the session
  router.get('/auth/check', async (req, res) => {
    const userId = req.session.userId;
    // eslint-disable-next-line no-console
    console.log('== AUTH CHECK USER ID ==', req.session.userId);
    res.json({ check: !!userId });
  });

  return router;
};
