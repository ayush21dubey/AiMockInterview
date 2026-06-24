File Strecture

server/
│
├── src/
│   ├── app.js
│   ├── server.js
│
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   ├── groq.js
│   │   └── cloudinary.js   (optional for resume upload)
│
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── upload.middleware.js
│
│   ├── utils/
│   │   ├── response.js
│   │   ├── logger.js
│   │   ├── constants.js
│   │   └── helpers.js
│
│   ├── services/
│   │   ├── groq.service.js
│   │   ├── jwt.service.js
│   │   ├── password.service.js
│   │   ├── speechToText.service.js
│   │   └── textToSpeech.service.js
│
│   ├── modules/
│   │
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.model.js
│   │   │   └── auth.validation.js
│   │
│   │   ├── user/
│   │   │   ├── user.routes.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   └── user.model.js
│   │
│   │   ├── resume/
│   │   │   ├── resume.routes.js
│   │   │   ├── resume.controller.js
│   │   │   ├── resume.service.js
│   │   │   ├── resume.parser.js
│   │   │   └── resume.model.js
│   │
│   │   ├── interview/
│   │   │   ├── interview.routes.js
│   │   │   ├── interview.controller.js
│   │   │   ├── interview.service.js
│   │   │   ├── interview.ai.js
│   │   │   └── interview.model.js
│   │
│   │   ├── evaluation/
│   │   │   ├── evaluation.routes.js
│   │   │   ├── evaluation.controller.js
│   │   │   ├── evaluation.service.js
│   │   │   └── evaluation.ai.js
│   │
│   │   ├── report/
│   │   │   ├── report.routes.js
│   │   │   ├── report.controller.js
│   │   │   ├── report.service.js
│   │   │   └── report.model.js
│   │
│   └── database/
│       ├── user.schema.js
│       ├── interview.schema.js
│       ├── response.schema.js
│       └── report.schema.js
│
├── uploads/ (for resumes)
├── logs/
├── .env
├── package.json
└── README.md