import * as session from 'express-session';

export function configureSession() {
  return session({
    secret: 'ideascale',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === 'production', // enable secure cookie in production environment
      domain: process.env.FRONT_END_URL
        ? process.env.FRONT_END_URL
        : 'localhost',
    },
  });
}
