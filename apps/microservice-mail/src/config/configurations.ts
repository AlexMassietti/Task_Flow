export const MailConfig = () => ({
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
  serviceName: process.env.SERVICE_NAME ?? 'microservice-mail',
});
