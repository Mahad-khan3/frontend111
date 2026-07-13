import app, { ensureDbConnected } from '../../backend/src/app';

app.use(async (_req, _res, next) => {
  try {
    await ensureDbConnected();
    next();
  } catch (err) {
    next(err);
  }
});

export default app;
