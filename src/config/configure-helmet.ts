import helmet from 'helmet';

export function configureHelmet() {
  return helmet({
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
        imgSrc: ["'self'", "'data:'", 'https://cdn.jsdelivr.net'],
      },
    },
  });
}
