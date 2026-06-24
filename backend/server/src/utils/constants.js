export const DEFAULT_QUESTIONS = [
  // Frontend
  {
    question: "Can you explain the differences between client-side rendering (CSR) and server-side rendering (SSR), and when you would choose one over the other?",
    category: "frontend",
    keyPoints: ["SEO impact", "First Contentful Paint (FCP)", "Server load", "Initial bundle size", "TTI (Time to Interactive)"],
    difficulty: "Medium"
  },
  {
    question: "How does React's reconciliation algorithm work, and what role do 'keys' play when rendering lists of elements?",
    category: "frontend",
    keyPoints: ["Virtual DOM", "Diffing algorithm", "Fiber architecture", "Component re-renders", "Stable element identity"],
    difficulty: "Medium"
  },
  {
    question: "What is Event Delegation in JavaScript, and why is it beneficial for application performance?",
    category: "frontend",
    keyPoints: ["Event bubbling", "Event capture", "Memory optimization", "Dynamic child elements", "Single event listener"],
    difficulty: "Easy"
  },
  {
    question: "How would you optimize the loading performance of a media-heavy web page? What techniques would you apply?",
    category: "frontend",
    keyPoints: ["Lazy loading", "Next-gen image formats (WebP/AVIF)", "CDN deployment", "Critical CSS", "Code splitting", "Caching headers"],
    difficulty: "Medium"
  },
  {
    question: "What are cross-site scripting (XSS) attacks, and how can frontend developers prevent them in modern web applications?",
    category: "frontend",
    keyPoints: ["Content Security Policy (CSP)", "Input sanitization", "Text encoding", "React dangerouslySetInnerHTML warnings", "HttpOnly cookies"],
    difficulty: "Hard"
  },
  // Backend
  {
    question: "What is database indexing, how does it speed up queries, and what are the trade-offs or performance penalties associated with it?",
    category: "backend",
    keyPoints: ["B-Tree & Hash indexes", "Read vs write latency", "Memory overhead", "Execution plan", "Primary vs secondary indexes"],
    difficulty: "Medium"
  },
  {
    question: "Compare RESTful APIs and GraphQL. In what scenarios would you recommend GraphQL over REST, or vice versa?",
    category: "backend",
    keyPoints: ["Over-fetching / Under-fetching", "Schema definition", "Caching strategies", "Network roundtrips", "Versioning APIs"],
    difficulty: "Medium"
  },
  {
    question: "How would you design a distributed rate-limiting system for a high-traffic API endpoint?",
    category: "backend",
    keyPoints: ["Token Bucket / Leaky Bucket algorithm", "Redis storage", "Sliding window log", "Race conditions", "Client identifiers"],
    difficulty: "Hard"
  },
  {
    question: "Can you describe the role of message brokers like RabbitMQ or Kafka in a microservices architecture?",
    category: "backend",
    keyPoints: ["Asynchronous processing", "Eventual consistency", "Decoupling services", "Consumer groups", "Dead Letter Queues (DLQ)"],
    difficulty: "Medium"
  },
  {
    question: "How do you secure user passwords before storing them in a database, and how does salt protect against rainbow table attacks?",
    category: "backend",
    keyPoints: ["Hashing algorithms (bcrypt, Argon2)", "Salting mechanism", "Work factors / CPU rounds", "Brute-force protection"],
    difficulty: "Easy"
  },
  // Fullstack
  {
    question: "How would you handle state synchronization and real-time updates between a Node.js backend and a React frontend in a collaborative editor application?",
    category: "fullstack",
    keyPoints: ["WebSockets / Socket.io", "Conflict resolution (OT / CRDT)", "Heartbeat checks", "Client-side optimism"],
    difficulty: "Hard"
  },
  {
    question: "Can you walk us through the security flow of OAuth 2.0 Authorization Code Grant with PKCE, and why PKCE is necessary?",
    category: "fullstack",
    keyPoints: ["Code challenge & verifier", "Redirect URIs", "Access & Refresh tokens", "Client secret interception prevention"],
    difficulty: "Hard"
  },
  {
    question: "How do you implement cache-busting and caching strategies across a full-stack stack (CDN, Nginx, App server, Browser)?",
    category: "fullstack",
    keyPoints: ["Cache-Control directives", "E-tags", "File content hashing", "Redis query cache", "Stale-while-revalidate"],
    difficulty: "Medium"
  },
  // Product Manager
  {
    question: "Imagine you are the PM for a popular streaming platform, and search engagement has dropped by 15%. How would you investigate and resolve this?",
    category: "pm",
    keyPoints: ["Data analytics breakdown", "User interview insights", "Funnel friction identification", "A/B testing patches"],
    difficulty: "Medium"
  },
  {
    question: "How do you define and prioritize features for a Minimum Viable Product (MVP) when dealing with conflicting stakeholder requirements?",
    category: "pm",
    keyPoints: ["RICE framework", "MoSCoW method", "User journey mapping", "Stakeholder management", "Core metrics definition"],
    difficulty: "Medium"
  },
  // Data Science
  {
    question: "What is overfitting in machine learning models, how do you detect it, and what techniques would you use to prevent it?",
    category: "datascience",
    keyPoints: ["Train/Test split bias", "Regularization (L1/L2)", "Cross-validation", "Dropout layers", "Feature selection", "Ensemble methods"],
    difficulty: "Medium"
  },
  {
    question: "How would you design a statistically sound A/B test to evaluate a new recommendation algorithm for an e-commerce platform?",
    category: "datascience",
    keyPoints: ["Null hypothesis", "Sample size calculation", "Statistical power (80%)", "p-value threshold", "Minimum Detectable Effect (MDE)"],
    difficulty: "Hard"
  }
];
