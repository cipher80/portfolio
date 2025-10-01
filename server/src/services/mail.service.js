import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { transporter, MAIL_DEFAULTS } from '../config/mailer.js';
import { log } from '../config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, '..', 'views', 'email', 'contact-notification.html');
const templateSource = fs.readFileSync(templatePath, 'utf-8');
const compiledTemplate = Handlebars.compile(templateSource);

export async function sendContactNotification({ name, email, mobile }) {
  const html = compiledTemplate({ name, email, mobile, date: new Date().toLocaleString() });
  const info = await transporter.sendMail({
    ...MAIL_DEFAULTS,
    subject: `New contact from ${name}`,
    html,
  });
  log.info('Contact mail sent:', info.messageId || 'ok');
}
