export const Cors = {
  origin: (origin, callback) => {
    if (
      !origin ||
      ['http://localhost:3000', 'https://your-production-domain.com'].includes(
        origin,
      )
    ) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  exposedHeaders: ['Content-Disposition'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
