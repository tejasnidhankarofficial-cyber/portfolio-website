export const profile = {
  name: 'Tejas Kishor Nidhankar',
  greeting: "Hi, I'm",
  title: 'AI Engineer',
  tagline:
    'MS Applied AI @ Stevens. I build evaluated RAG systems, guarded LLM apps and deep learning pipelines.',
  location: 'Jersey City, NJ',
  email: 'tejasnidhankar.official@gmail.com',
  links: {
    github: 'https://github.com/tejasnidhankarofficial-cyber',
    linkedin: 'https://www.linkedin.com/in/tejas-nidhankar',
    medium: 'https://medium.com/@tejasnidhankar',
  },
  resume: '/Tejas_Resume.pdf',
  about: [
    'I hold a B.E. in Artificial Intelligence and Machine Learning from the University of Mumbai and am now pursuing an MS in Applied AI at Stevens Institute of Technology. My interest in AI began during COVID, when I saw how thoughtfully designed automation could make a real difference across everyday work and entire industries. Since then, I’ve been drawn to building systems that are genuinely useful—not just impressive in a demo.',
    'I care about AI that people can trust: systems with clear evidence, careful evaluation, sensible guardrails, and honest limitations. Outside of building projects, I write beginner-friendly GenAI articles on Medium because I believe complex ideas should feel approachable, not intimidating. I’m not interested in creating FOMO or selling shortcuts; I want readers to come away thinking, “This is challenging, but I can understand it—and I can build with it too.”',
  ],
}

// icon names map to react-icons in src/icons.jsx
export const skills = {
  Languages: [['Python', 'python'], ['SQL', 'sql'], ['R', 'r'], ['C++', 'cpp']],
  'GenAI & LLMs': [['OpenAI API', 'openai'], ['RAG', 'rag'], ['Embeddings', 'embeddings'], ['Chroma', 'chroma'], ['Hybrid Search', 'hybrid'], ['Reranking', 'rerank'], ['Prompt Engineering', 'prompt'], ['Guardrails', 'guardrails']],
  'ML / DL': [['PyTorch', 'pytorch'], ['TensorFlow', 'tensorflow'], ['Scikit-Learn', 'sklearn'], ['OpenCV', 'opencv'], ['NumPy', 'numpy'], ['Pandas', 'pandas'], ['PySpark', 'spark']],
  'Backend & Data': [['FastAPI', 'fastapi'], ['PostgreSQL', 'postgres'], ['SQLAlchemy', 'sqlalchemy'], ['Elasticsearch', 'elastic'], ['REST APIs', 'rest']],
  'Cloud & Tools': [['AWS', 'aws'], ['Docker', 'docker'], ['Git', 'git'], ['Streamlit', 'streamlit'], ['Gradio', 'gradio']],
}

export const experience = [
  {
    role: 'Technical Writer',
    org: 'Medium',
    logo: 'medium',
    type: 'Part-time',
    when: 'Feb 2026 - Present',
    description:
      'Beginner series on LangChain, HuggingFace and OpenAI APIs; four articles published in the Towards AI publication so far.',
    tags: ['LangChain', 'HuggingFace', 'OpenAI'],
  },
  {
    role: 'Software Development Intern',
    org: 'IDBI INTECH (subsidiary of IDBI Bank)',
    logo: '/idbi-intech.png',
    type: 'Internship',
    when: 'Dec 2023 - Jan 2024',
    description:
      'Worked on a Hyperledger Fabric private blockchain for insurance claims across hospitals, insurers and government entities. Built Logstash pipelines into Elasticsearch and Kibana dashboards for claim trends, throughput and system health.',
    tags: ['Hyperledger Fabric', 'Logstash', 'Elasticsearch', 'Kibana'],
  },
]

export const education = [
  { school: 'Stevens Institute of Technology', degree: 'M.S. Applied Artificial Intelligence', when: '2025 - 05/2027 (expected)', grade: 'GPA 3.5/4.0', image: '/stevens.jpg', imageAlt: 'Edwin A. Stevens Hall at Stevens Institute of Technology', courses: 'Deep Learning, Machine Learning, Big Data Analytics, Probability & Stochastic Processes' },
  { school: 'University of Mumbai (SIES GST)', degree: 'B.E. Artificial Intelligence and Machine Learning', when: 'Graduated 05/2025', grade: 'GPA 8.38/10.0', image: '/mumbai.jpg', imageAlt: 'Rajabai Clock Tower at the University of Mumbai', imagePos: '50% 30%', courses: 'DSA, Computer Vision, NLP, Statistics' },
  { school: "Jawahar Education Society's North Point School", degree: 'Higher Secondary, Grade 11 to Grade 12 (Science)', when: '2019 - 2021', grade: 'Science stream', badge: 'ISC Board', image: '/northpoint.jpg', imageAlt: 'North Point School signboard', imagePos: '50% 40%', courses: 'Completed grades 11 and 12 in the Science stream under the ISC curriculum.' },
  { school: 'Christ Academy', degree: 'Schooling, Grade 3 to Grade 10', when: '2011 - 2018', grade: 'Koparkhairane, Navi Mumbai', badge: 'ICSE Board', image: '/school.jpg', imageAlt: 'Christ Academy school building in Koparkhairane, Navi Mumbai', imagePos: '50% 50%', courses: 'Studied under the ICSE curriculum from grade 3 through grade 10.' },
]

export const achievements = []

export const projects = [
  {
    name: 'Acme Enterprise AI Assistant',
    slug: 'acme-assistant',
    category: 'GenAI',
    year: '2026',
    description:
      'Role-aware enterprise assistant built on the Model Context Protocol: four MCP servers, role-scoped tool discovery, human approval for every write, prompt-injection flagging and a full audit log. Authority stays outside the model.',
    stack: ['Python', 'MCP', 'FastAPI', 'OpenAI', 'Claude', 'React', 'TypeScript', 'SQLite'],
    github: 'https://github.com/tejasnidhankarofficial-cyber/AcmeCorp-Enterprise-AI-Assistant',
  },
  {
    name: 'BankLens',
    slug: 'banklens',
    category: 'GenAI',
    year: '2026',
    description:
      'Evidence-grounded RAG over FY2024-25 reports of four major US banks, with cited answers, claim verification and abstention. A 6-configuration ablation lifted Hit@5 from 0.567 to 0.700 and answer correctness from 67.5% to 85%.',
    stack: ['Python', 'OpenAI', 'Chroma', 'BM25', 'FastAPI', 'Streamlit', 'Docker'],
    github: 'https://github.com/tejasnidhankarofficial-cyber/BankLens',
  },
  {
    name: 'sqlsentry',
    slug: 'sqlsentry',
    category: 'GenAI',
    year: '2026',
    description:
      'Guarded text-to-SQL assistant: the LLM writes SQL, PostgreSQL computes every number. AST-based SQL guard, read-only role and audit log. 90-92% execution accuracy and 100% correct refusals.',
    stack: ['Python', 'OpenAI', 'FastAPI', 'PostgreSQL', 'sqlglot', 'Docker'],
    github: 'https://github.com/tejasnidhankarofficial-cyber/sqlsentry',
  },
  {
    name: 'Fair-Fracture',
    category: 'Deep Learning',
    year: '2025',
    description:
      'Dual-model pipeline combining a from-scratch U-Net (99.26% pixel accuracy) with YOLOv8-Nano detecting 17 fracture types, served in a Gradio dashboard.',
    stack: ['PyTorch', 'U-Net', 'YOLOv8', 'OpenCV', 'Gradio'],
  },
  {
    name: 'Skin Cancer Detection',
    category: 'Deep Learning',
    year: '2025',
    description:
      'ResNet50 fine-tuned on HAM10000 with lesion-level splits to prevent leakage and weighted loss for imbalance. 82% malignant recall, 0.8813 AUC.',
    stack: ['PyTorch', 'ResNet50', 'Gradio'],
    github: 'https://github.com/tejasnidhankarofficial-cyber/HAM1000-SkinCancer',
  },
]

export const certifications = [
  {
    title: 'Introduction to Cloud Computing',
    issuer: 'IBM · Coursera',
    date: 'Jun 30, 2026',
    verify: 'https://coursera.org/verify/2WGCXYM7CEHG',
    image: '/certs/ibm-intro-to-cloud-computing.jpg',
  },
  {
    title: 'Introduction to Agile Development and Scrum',
    issuer: 'IBM · Coursera',
    date: 'Jun 27, 2026',
    verify: 'https://coursera.org/verify/4E6575ZLAK6U',
    image: '/certs/ibm-agile-scrum.jpg',
  },
  {
    title: 'Introduction to DevOps',
    issuer: 'IBM · Coursera',
    date: 'May 28, 2026',
    verify: 'https://coursera.org/verify/AG1DTBHH7SKA',
    image: '/certs/ibm-intro-to-devops.jpg',
  },
]

export const articles = [
  {
    series: 'LangChain Series · Part 1',
    publication: 'Towards AI',
    title: 'Mastering LangChain: The Ultimate Guide to LLM Orchestration (Part 1: Fundamentals)',
    description: 'LangChain fundamentals for LLM orchestration, written for beginners.',
    link: 'https://pub.towardsai.net/mastering-langchain-the-ultimate-guide-to-llm-orchestration-part-1-fundamentals-3ee5e20ff8e5',
  },
  {
    series: 'LangChain Series · Part 2',
    publication: 'Towards AI',
    title: 'Mastering LangChain: Open-Source Models & Prompt Engineering (Part 2)',
    description: 'Working with open-source models and prompt engineering in LangChain.',
    link: 'https://medium.com/towards-artificial-intelligence/mastering-langchain-open-source-models-prompt-engineering-part-2-cb4e6e519292',
  },
  {
    series: 'FastAPI Series · Part 1',
    publication: 'Towards AI',
    title: 'FastAPI for Beginners: A Practical Introduction (Part 1)',
    description: 'A practical, beginner-friendly introduction to building APIs with FastAPI.',
    link: 'https://medium.com/towards-artificial-intelligence/fastapi-for-beginners-a-practical-introduction-part-1-4adfc894dccb',
  },
  {
    series: 'FastAPI Series · Part 2',
    publication: 'Towards AI',
    title: 'FastAPI in Practice: Handling Data and Understanding the Backend (Part 2)',
    description: 'Handling data in FastAPI and understanding how the backend works.',
    link: 'https://medium.com/towards-artificial-intelligence/fastapi-in-practice-handling-data-and-understanding-the-backend-part-2-3747e66ba12d',
  },
]
