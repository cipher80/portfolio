// import { Router } from "express";
// import rateLimit from "express-rate-limit";
// import { submitContact } from "../controllers/contact.controller.js";
// import { contactValidator } from "../validators/contact.validator.js";
// import { validate } from "../middlewares/validate.js";

// const router = Router();

// const contactLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 5,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// router.post("/", contactLimiter, contactValidator, validate, submitContact);

// export default router;



// server/routes/contact.js
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { submitContact } from "../controllers/contact.controller.js";
import { contactValidator } from "../validators/contact.validator.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", contactLimiter, contactValidator, validate, submitContact);

export default router;
