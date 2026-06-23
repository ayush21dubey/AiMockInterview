export const INTERVIEW_QUESTIONS = {
  frontend: [
    {
      id: "fe_1",
      question: "Can you explain the differences between client-side rendering (CSR) and server-side rendering (SSR), and when you would choose one over the other?",
      keyPoints: ["SEO impact", "First Contentful Paint (FCP)", "Server load", "Initial bundle size", "TTI (Time to Interactive)"]
    },
    {
      id: "fe_2",
      question: "How does React's reconciliation algorithm work, and what role do 'keys' play when rendering lists of elements?",
      keyPoints: ["Virtual DOM", "Diffing algorithm", "Fiber architecture", "Component re-renders", "Stable element identity"]
    },
    {
      id: "fe_3",
      question: "What is Event Delegation in JavaScript, and why is it beneficial for application performance?",
      keyPoints: ["Event bubbling", "Event capture", "Memory optimization", "Dynamic child elements", "Single event listener"]
    },
    {
      id: "fe_4",
      question: "How would you optimize the loading performance of a media-heavy web page? What techniques would you apply?",
      keyPoints: ["Lazy loading", "Next-gen image formats (WebP/AVIF)", "CDN deployment", "Critical CSS", "Code splitting", "Caching headers"]
    },
    {
      id: "fe_5",
      question: "What are cross-site scripting (XSS) attacks, and how can frontend developers prevent them in modern web applications?",
      keyPoints: ["Content Security Policy (CSP)", "Input sanitization", "Text encoding", "React dangerouslySetInnerHTML warnings", "HttpOnly cookies"]
    }
  ],
  backend: [
    {
      id: "be_1",
      question: "What is database indexing, how does it speed up queries, and what are the trade-offs or performance penalties associated with it?",
      keyPoints: ["B-Tree & Hash indexes", "Read vs write latency", "Memory overhead", "Execution plan", "Primary vs secondary indexes"]
    },
    {
      id: "be_2",
      question: "Compare RESTful APIs and GraphQL. In what scenarios would you recommend GraphQL over REST, or vice versa?",
      keyPoints: ["Over-fetching / Under-fetching", "Schema definition", "Caching strategies", "Network roundtrips", "Versioning APIs"]
    },
    {
      id: "be_3",
      question: "How would you design a distributed rate-limiting system for a high-traffic API endpoint?",
      keyPoints: ["Token Bucket / Leaky Bucket algorithm", "Redis storage", "Sliding window log", "Race conditions", "Client identifiers"]
    },
    {
      id: "be_4",
      question: "Can you describe the role of message brokers like RabbitMQ or Kafka in a microservices architecture?",
      keyPoints: ["Asynchronous processing", "Eventual consistency", "Decoupling services", "Consumer groups", "Dead Letter Queues (DLQ)"]
    },
    {
      id: "be_5",
      question: "How do you secure user passwords before storing them in a database, and how does salt protect against rainbow table attacks?",
      keyPoints: ["Hashing algorithms (bcrypt, Argon2)", "Salting mechanism", "Work factors / CPU rounds", "Brute-force protection"]
    }
  ],
  fullstack: [
    {
      id: "fs_1",
      question: "How would you handle state synchronization and real-time updates between a Node.js backend and a React frontend in a collaborative editor application?",
      keyPoints: ["WebSockets / Socket.io", "Conflict resolution (OT / CRDT)", "Heartbeat checks", "Client-side optimism"]
    },
    {
      id: "fs_2",
      question: "Can you walk us through the security flow of OAuth 2.0 Authorization Code Grant with PKCE, and why PKCE is necessary?",
      keyPoints: ["Code challenge & verifier", "Redirect URIs", "Access & Refresh tokens", "Client secret interception prevention"]
    },
    {
      id: "fs_3",
      question: "How do you implement cache-busting and caching strategies across a full-stack stack (CDN, Nginx, App server, Browser)?",
      keyPoints: ["Cache-Control directives", "E-tags", "File content hashing", "Redis query cache", "Stale-while-revalidate"]
    }
  ],
  pm: [
    {
      id: "pm_1",
      question: "Imagine you are the PM for a popular streaming platform, and search engagement has dropped by 15%. How would you investigate and resolve this?",
      keyPoints: ["Data analytics breakdown", "User interview insights", "Funnel friction identification", "A/B testing patches"]
    },
    {
      id: "pm_2",
      question: "How do you define and prioritize features for a Minimum Viable Product (MVP) when dealing with conflicting stakeholder requirements?",
      keyPoints: ["RICE framework", "MoSCoW method", "User journey mapping", "Stakeholder management", "Core metrics definition"]
    }
  ],
  datascience: [
    {
      id: "ds_1",
      question: "What is overfitting in machine learning models, how do you detect it, and what techniques would you use to prevent it?",
      keyPoints: ["Train/Test split bias", "Regularization (L1/L2)", "Cross-validation", "Dropout layers", "Feature selection", "Ensemble methods"]
    },
    {
      id: "ds_2",
      question: "How would you design a statistically sound A/B test to evaluate a new recommendation algorithm for an e-commerce platform?",
      keyPoints: ["Null hypothesis", "Sample size calculation", "Statistical power (80%)", "p-value threshold", "Minimum Detectable Effect (MDE)"]
    }
  ]
};

export const MOCK_USER = {
  name: "Sarah Jenkins",
  email: "sarah.j@googlemail.com",
  role: "Frontend Engineer",
  experience: "Mid-level (3-5 years)",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  targetScore: 85,
  joinedDate: "May 2026"
};

export const MOCK_STATS = {
  interviewsCompleted: 14,
  avgScore: 78,
  streakDays: 5,
  hoursSpent: 12.5,
  trendPercentage: 8 // +8% compared to last week
};

export const MOCK_HISTORY = [
  {
    id: "hist_1",
    role: "Frontend Engineer",
    date: "2026-06-18",
    difficulty: "Medium",
    score: 84,
    durationSeconds: 1240,
    questionsCount: 5,
    status: "Completed",
    feedback: {
      overall: "Excellent structured answers with deep knowledge of React rendering patterns. Your explanation of reconciliation and virtual DOM keys was exceptionally clear. Focus on elaborating more on Web Performance metrics (TTI, FCP) in the future.",
      breakdown: {
        relevance: 90,
        clarity: 85,
        technicalDepth: 82,
        communication: 80
      },
      qaList: [
        {
          question: "How does React's reconciliation algorithm work, and what role do 'keys' play when rendering lists of elements?",
          answer: "React uses a virtual DOM representation. During reconciliation, it diffs the virtual DOM nodes. Keys are critical because they give React stable identities for elements across renders. Without keys, if a list changes size or order, React might reconstruct the entire tree instead of shifting DOM nodes, leading to performance lags and state bugs.",
          score: 88,
          strength: "Clear technical description of diffing and list updates. Correctly identified risk of losing state.",
          improvement: "Could explain how React 16+ Fiber changes schedules from synchronous recursive diffs to incremental units.",
          modelAnswer: "Reconciliation is React's diffing process to update the DOM. React compares the old virtual DOM tree with the new one using a O(n) heuristic. Keys act as stable identifiers, allowing React to quickly identify if elements were added, removed, or re-ordered, minimizing expensive DOM mutations."
        },
        {
          question: "Can you explain the differences between client-side rendering (CSR) and server-side rendering (SSR), and when you would choose one over the other?",
          answer: "CSR sends a basic HTML file and bundles all JS to run in the client browser, which is fast once loaded but slow initially. SSR builds the HTML on the server on every request. I'd choose SSR for public content like blogs for SEO and speed, and CSR for heavy interactive dashboards behind logins.",
          score: 80,
          strength: "Understands core differences and correctly maps them to public vs private application scopes.",
          improvement: "Mention Hydration process and First Input Delay penalties.",
          modelAnswer: "CSR renders pages in the browser using JavaScript, while SSR outputs fully rendered HTML on the server. SSR is optimal for SEO-sensitive websites needing quick First Contentful Paint. CSR is perfect for dynamic, SPA applications with frequent user actions."
        }
      ]
    }
  },
  {
    id: "hist_2",
    role: "Frontend Engineer",
    date: "2026-06-12",
    difficulty: "Hard",
    score: 72,
    durationSeconds: 1510,
    questionsCount: 4,
    status: "Completed",
    feedback: {
      overall: "Good attempt at complex security questions, but fell short in details on PKCE and Token security mechanisms. Communication style was clear, but technical depth could be improved.",
      breakdown: {
        relevance: 75,
        clarity: 78,
        technicalDepth: 65,
        communication: 74
      },
      qaList: [
        {
          question: "What are cross-site scripting (XSS) attacks, and how can frontend developers prevent them in modern web applications?",
          answer: "XSS is when an attacker injects a script into your website. It runs in the user's browser. To stop it, you should filter inputs and not use dangerouslySetInnerHTML. Also check packages.",
          score: 72,
          strength: "Understands script execution risk and standard React precautions.",
          improvement: "Detail Content Security Policies (CSP) and sanitization tools like DOMPurify.",
          modelAnswer: "XSS attacks occur when malicious scripts are injected into trusted sites. Prevention requires input encoding, output sanitization (using DOMPurify), applying Strict Content Security Policy (CSP) headers, and setting HttpOnly, Secure flags on session cookies."
        }
      ]
    }
  },
  {
    id: "hist_3",
    role: "Backend Engineer",
    date: "2026-06-05",
    difficulty: "Medium",
    score: 79,
    durationSeconds: 980,
    questionsCount: 3,
    status: "Completed",
    feedback: {
      overall: "Strong grasp of database indexing, though details on sliding window rate limiting were incomplete. Nice structural flow of thoughts.",
      breakdown: {
        relevance: 82,
        clarity: 80,
        technicalDepth: 74,
        communication: 80
      },
      qaList: [
        {
          question: "What is database indexing, how does it speed up queries, and what are the trade-offs or performance penalties associated with it?",
          answer: "Indexes create lookup tables (often B-Trees) so SQL doesn't scan every row. It makes SELECTs very fast. However, it slows down INSERTs, UPDATEs, and DELETEs because the database has to update the indexes too. Also, indexes take up memory/disk space.",
          score: 83,
          strength: "Solid understanding of B-Tree structure and the select vs write speed trade-offs.",
          improvement: "Could explain composite index order of columns (left-most prefix rule).",
          modelAnswer: "An index is a data structure (commonly a B-Tree) that speeds up data retrieval on a table at the cost of additional write speed and disk space. Each write query requires updating the index, which adds overhead."
        }
      ]
    }
  }
];

export const MOCK_ROLES = [
  { id: "frontend", name: "Frontend Engineer" },
  { id: "backend", name: "Backend Engineer" },
  { id: "fullstack", name: "Full Stack Developer" },
  { id: "pm", name: "Product Manager" },
  { id: "datascience", name: "Data Scientist" }
];
