# node-react-portfolio-mvc

A full-stack portfolio with **Node/Express (MVC)** + **React/Vite**. The Contact form (name, email, mobile) hits `/api/contact` and emails the owner using a templated HTML email.

## Quick start

### 1) Server
```bash
cd server
cp .env.example .env
# edit .env with your SMTP + MAIL_TO
npm i
npm run dev
```

### 2) Client
```bash
cd ../client
npm i
npm run dev
```

Open http://localhost:5173 and try the **Contact** page. API health check: http://localhost:5000/api/health

## Notes
- Use a proper SMTP: Resend, Mailersend, Brevo, Gmail (app password), etc.
- Everything is split by **controllers/services/routes/validators/views** for clear MVC separation.
- Deploy easily: host client on Netlify/Vercel and server on Render/Railway/Fly.io.
# portfolio
Self Portfolio 
