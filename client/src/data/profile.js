export const profile = { name:'Sandeep Tiwari', title:'Node.js / Nest.js Developer', location:'India',
  email:'sandeeptiwari.jim.mca.2021@gmail.com', phone:'***********',
  linkedin:'https://linkedin.com/in/sandeep-tiwari-3b7868261', github:'https://github.com/cipher80' };

// export const posts = [{ slug:'securing-node-apis', title:'Securing Node APIs in Production', date:'2025-08-01', html:'<p>…</p>' }];

// client/src/data/posts.js
export const posts = [
  {
    slug: "securing-node-apis",
    title: "Securing Node APIs in Production",
    date: "2025-08-01",
    tags: ["Node.js", "Security", "Auth", "DevOps"],
    cover: "/blog/node-security.jpg", // put an image here (client/public/blog/node-security.jpg)
    readingMins: 7, // optional; auto-computed if omitted
    tldr:
      "A practical, 5-step checklist to harden your Node.js APIs—covering TLS, auth, rate limits, secrets, and observability.",
    html: `
      <p>Shipping a feature is great—shipping it safely is better. This checklist is what I apply before calling a Node API “production-ready”.</p>

      <h2 id="tls">1) Enforce TLS everywhere</h2>
      <ul>
        <li>Terminate TLS at the edge (ALB/CloudFront/API Gateway).</li>
        <li>Redirect HTTP → HTTPS and use <code>Strict-Transport-Security</code>.</li>
      </ul>

      <div class="callout">
        <strong>Tip:</strong> set <code>helmet()</code> with HSTS and sane defaults.
      </div>

      <h2 id="auth">2) Strong auth & authorization</h2>
      <ul>
        <li>JWT or Cognito access tokens with short TTL + refresh flow.</li>
        <li>Implement RBAC (roles) or ABAC (scopes/claims) per route.</li>
      </ul>

      <h2 id="limits">3) Rate limits & abuse controls</h2>
      <ul>
        <li>Token bucket on sensitive endpoints (login, signup, webhooks).</li>
        <li>IP throttling + user-key limits. Consider <code>Redis</code> for counters.</li>
      </ul>

      <h2 id="secrets">4) Secrets & config</h2>
      <ul>
        <li>Never hardcode; load from a secret manager or env.</li>
        <li>Rotate keys and sign webhooks; verify signatures server-side.</li>
      </ul>

      <h2 id="obs">5) Observability</h2>
      <ul>
        <li>Structured logs (request id, user id, route, status, latency).</li>
        <li>Dashboards for p95 latency, error rate, 4xx/5xx, and throughput.</li>
      </ul>

      <pre><code>app.use(helmet());
app.use(rateLimiter);
app.use(authn);
app.use(authorize("orders:read"));
app.use(requestId());
app.use(requestLogger());</code></pre>

      <h3 id="finish">Wrap-up</h3>
      <p>Security is a process: automate checks in CI, monitor in prod, and iterate.</p>
    `,
  },
];



export const experiences = [
  { company:'Opticodes pvt lmtd', role:'Node js Developer', period:'jan 2023 — April 2024', summary:'My key responsibility was Backend Developement , Databse Mangement ,API Integration , Performance Optimization ,Testing , Debugging , Version Control , Ci/Cd ' },
  { company:'Delta India ', role:'Node/nNest  js Developer', period:'April 2024 — June 2025', summary:'My key responsibility was API Developement , Payment Gateways , Aws Lambda ,Dynamo Db ,Aws IotCore ,Aws APi Gateway ,Aws Cognito ,HTML ,CSS ' }
];
export const skills = [
  { name:'Javascript' }, { name:'Typescript' },{ name:'Node js' },{ name:'Express js' },
  { name:'Nest js' },{ name:'HTML' },{ name:'Css' },{ name:'Docker' },
  { name:'Iot Core' },{ name:'Iot bridge' },{ name:'Lambda Functions' },{ name:'Dynamo Db' }
  ,{ name:'Mqtt' },{ name:'Api Gateways' },{ name:'AWS Cognito' },{ name:'Aws Layer' }
  ,{ name:'AWS S3' },{ name:'Jwt' },{ name:'O Auth' },{ name:'Sequelize' },{ name:'Mongoose' },{ name:'Git' },{ name:'Postman' },
  { name:'Twlio' },{ name:'Bitbucket' },{ name:'JIRA' },{ name:'Slack' },{ name:'Stripe' },{ name:'SMTP' },{ name:'Bull mq' },{ name:'Sockets' },
  { name:'MongoDb' },{ name:'PgAdmin' },{ name:'Trello Integration' }];



// services.data.js
export const services = [
  {
    title: "API & Microservices",
    blurb: "Production-grade REST/GraphQL services with strong auth, docs, and CI-ready Docker images.",
    bullets: [
      "Express/NestJS + TypeScript",
      "Swagger/Postman docs",
      "RBAC, audit logs, rate limits"
    ],
    stack: ["Node.js","Express","NestJS","TypeScript","PostgreSQL","MongoDB"],
  },
  {
    title: "IoT Backends & Bridges",
    blurb: "Device onboarding, MQTT bridges, telemetry pipelines and alerts on AWS.",
    bullets: [
      "AWS IoT Core, MQTT topics/policies",
      "Lambda, API Gateway, DynamoDB",
      "Multi-tenant registry & rules"
    ],
    stack: ["AWS IoT Core","MQTT","Lambda","DynamoDB","API Gateway","AWS Layers"],
  },
  {
    title: "Realtime & Queues",
    blurb: "Live updates and resilient background jobs with retries and dedupe.",
    bullets: [
      "Socket.IO / WebSockets",
      "BullMQ + Redis job orchestration",
      "Webhooks + signature verification"
    ],
    stack: ["Socket.IO","BullMQ","Redis"],
  },
  {
    title: "Auth & Security",
    blurb: "Secure sign-in flows, roles, and token handling with best practices.",
    bullets: ["JWT & OAuth2", "AWS Cognito", "OWASP headers & audits"],
    stack: ["JWT","OAuth2","AWS Cognito"],
  },
  {
    title: "Data & Storage",
    blurb: "Schemas and access patterns that scale and stay affordable.",
    bullets: [
      "DynamoDB single-table design",
      "Postgres via Sequelize",
      "MongoDB via Mongoose"
    ],
    stack: ["DynamoDB","PostgreSQL","MongoDB","Sequelize","Mongoose"],
  },
  {
    title: "Payments",
    blurb: "Stripe integrations for one-time, subscriptions or marketplace payouts.",
    bullets: ["Stripe Checkout/Elements", "Connect & refunds", "Webhook ledgering"],
    stack: ["Stripe","Node.js"],
  },
  {
    title: "Notifications",
    blurb: "Email/SMS/WhatsApp pipelines with templates, retries and preferences.",
    bullets: ["Twilio & SMTP", "Preferencing & rate limits", "Delivery tracking"],
    stack: ["Twilio","SMTP"],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Dockerized services, cost-aware AWS setups and dashboards.",
    bullets: ["Docker images", "CloudWatch logs/metrics", "Alerts & runbooks"],
    stack: ["Docker","S3","CloudWatch","API Gateway"],
  },
];



export const projects = [{ slug:'drify', title:'DRIFY', desc:'Delivery app', tags:['Node','React','AWS'] }];

export const education = [
  { school:'Jagran Institute of Management (MCA 2023)', degree:'MCA', period:'2021 — 2023' },
  { school:'Subah Degree College (B.ed 2021)', degree:'B.ed', period:'2019 — 2021' },
  { school:'Graduation  (B.A 2015)', degree:'B.A', period:'2012 — 2015' },
  { school:'BNSD Inter College (Intermediate 2013)', degree:'Intermediate', period:'2010 — 2013' },
  { school:'I.N.H.S School (Highschool 2010)', degree:'Highschool', period:'2009 — 2010' }
];

export const certifications = [
  { name:'AWS Certified Cloud Practitioner (in-progress)' },
  { name:'MERN Certified from TechVulcun ' }

];
