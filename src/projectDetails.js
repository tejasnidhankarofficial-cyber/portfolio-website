// Long-form write-ups for the project detail pages, keyed by project slug.
// Section shape: { heading, paragraphs?, quote?, list?: [[label, text]], after?: [paragraphs] }
// or, for free ordering: { heading, blocks: [string | { quote } | { list: [[label, text]] }] }
// Strings support **bold** and *italic*.
export const projectDetails = {
  'acme-assistant': {
    title: 'MCP-Enabled Enterprise Knowledge Assistant — Secure AI Access to Enterprise Tools',
    tagline: 'Building an AI assistant that can access company systems without giving the model unchecked authority.',
    sections: [
      {
        heading: 'The idea behind the project',
        blocks: [
          'Enterprise knowledge is rarely stored in one place. Policies may live in document repositories, team updates in notes, and operational issues in ticketing systems. I wanted to explore how an AI assistant could help employees navigate these systems through natural-language questions.',
          'That led me to build an **MCP-Enabled Enterprise Knowledge Assistant** for a fictional company, Acme Corp. Employees can ask questions such as:',
          { quote: 'What is our remote work policy?' },
          { quote: 'Are there any tickets related to VPN issues?' },
          { quote: 'Create a ticket for a flickering monitor.' },
          'The assistant searches the appropriate systems, retrieves information, and can prepare actions such as creating tickets.',
          'But the more important question was not simply whether an LLM could call tools. It was:',
          '**How do you let an AI assistant interact with enterprise systems while keeping access controlled, actions reviewable, and sensitive information protected?**',
        ],
      },
      {
        heading: 'How I approached it',
        blocks: [
          'I built the project around the **Model Context Protocol (MCP)**, which allows external systems to expose their capabilities through a standard interface.',
          'Instead of hard-coding every integration into the assistant, I created separate MCP servers for company documents, HR documents, team notes, and support tickets. Each server owns its own data boundary and exposes tools such as searching documents, reading a policy, finding tickets, or creating a new ticket.',
          'When a user asks a question, the host application first identifies their role. It then starts only the MCP servers that role is permitted to access and discovers the available tools dynamically.',
          'For example, an intern can access general company documents, while an HR user can also access restricted HR policies. The intern never receives an HR tool in their available tool list, which means the model cannot call it.',
        ],
      },
      {
        heading: 'Engineering beyond the LLM',
        blocks: [
          'A key design decision was to keep security decisions outside the language model.',
          'The model can decide which available tool may help answer a question, but it cannot decide who is allowed to access a system or whether it can perform a side-effecting action.',
          'The application includes several independent safeguards:',
          { list: [
            ['Role-based tool discovery', 'Users only see tools from systems their role is allowed to access.'],
            ['Human approval for writes', 'Creating a ticket or saving a note pauses the workflow until the user explicitly approves the action.'],
            ['Fail-closed behavior', 'Tools without clear read-only metadata are treated as potentially side-effecting.'],
            ['Per-server authentication', 'Each MCP server receives its own credential rather than sharing a single system-wide secret.'],
            ['Sandboxed document access', 'File paths are validated to prevent traversal into restricted directories.'],
            ['Prompt-injection handling', 'Tool outputs are treated as untrusted content and scanned for suspicious instructions.'],
            ['Audit logging', 'Every tool call records the user, role, server, tool, arguments, decision, result, timing, and security flags.'],
          ] },
          'This architecture makes the assistant more than a chatbot with tool calling. It becomes a controlled system where access, approval, and accountability are designed into the workflow.',
        ],
      },
      {
        heading: 'Building the experience',
        blocks: [
          'I built the backend with Python, FastAPI, and MCP over local stdio connections. The assistant supports OpenAI and Anthropic tool-calling models, while also including an offline planner so the system can be demonstrated and tested without an API key.',
          'The frontend is built with React, TypeScript, Vite, and Tailwind CSS. It includes an identity switcher, chat interface, live MCP tool trace, approval cards, and an audit log viewer.',
          'The live trace was especially important to me. Rather than hiding the assistant’s actions, the interface shows which MCP server was contacted, which tool was used, whether the action was allowed or denied, and whether any suspicious content was detected.',
        ],
      },
      {
        heading: 'What I learned',
        blocks: [
          'This project helped me understand that building reliable AI assistants is less about connecting an LLM to tools and more about defining the boundaries around that connection.',
          'A capable model can choose useful actions, but it should not be trusted as the final authority for permissions, security, or side effects. Those responsibilities belong to the surrounding system: access policies, approval gates, credential isolation, audit logs, and defensive handling of external content.',
          'It also gave me practical experience with MCP as a way to build reusable, modular AI integrations. Adding a new system becomes less about rewriting agent logic and more about connecting a new server and defining the right access policy.',
        ],
      },
      {
        heading: 'What’s next?',
        blocks: [
          'Future improvements could include real enterprise authentication through OIDC or JWTs, persistent approval workflows, remote MCP servers with OAuth, richer document retrieval, and real-time updates when company knowledge changes.',
          '**The broader goal is to make enterprise knowledge easier to access through AI while ensuring that every action remains controlled, transparent, and accountable.**',
        ],
      },
    ],
  },

  banklens: {
    demo: { src: '/banklens-demo.gif', alt: 'BankLens demo: asking a question in the Streamlit app and searching the filings', caption: 'BankLens in action: ask a question, and answers come back grounded in the filings.' },
    title: 'BankLens — Making Bank Annual Reports Easier to Question, Verify, and Trust',
    tagline: 'Exploring how retrieval-augmented generation can turn thousands of pages of financial filings into grounded, verifiable answers.',
    sections: [
      {
        heading: 'The idea behind the project',
        blocks: [
          'Annual reports contain some of the most important information a company publishes: financial performance, risk exposure, capital levels, and strategic changes. But they are also difficult to explore. A single bank filing can span hundreds of pages, and answering a seemingly simple question often means navigating dense prose, footnotes, and complex financial tables.',
          'I wanted to explore a practical question: **Could an AI system help someone ask questions about bank annual reports while still showing exactly where each answer came from?**',
          'That idea became **BankLens**, a retrieval-augmented generation (RAG) system built around the FY2024 and FY2025 annual reports of JPMorgan Chase, Bank of America, Citigroup, and Wells Fargo.',
          'A user can ask a question such as:',
          { quote: 'What was Citigroup’s net income in 2025?' },
          'BankLens retrieves relevant passages from the reports, generates an answer grounded in those passages, and returns page-level citations. Users can open a citation to see the original PDF page and the supporting text highlighted directly on it.',
          'I also added a claim-verification mode. Instead of asking a question, a user can submit a statement such as:',
          { quote: 'Wells Fargo’s net income declined in 2025.' },
          'The system classifies it as **SUPPORTED**, **REFUTED**, or **NOT ENOUGH INFO**, with the evidence used to reach that conclusion.',
        ],
      },
      {
        heading: 'The problem I wanted to investigate',
        blocks: [
          'I did not want this to be another simple “upload a PDF and chat with it” project.',
          'Financial filings are especially difficult for RAG systems because many important facts live inside tables. PDF text extraction can scramble table layouts, separate a number from its row label, or lose the context needed to interpret a value correctly. Even if the right page is retrieved, the model can still select the wrong column, confuse two years, or make an unsupported inference.',
          'So the project became a broader engineering and evaluation question:',
          '**How do PDF parsing, table-aware chunking, hybrid search, metadata filtering, and reranking affect the quality of answers over long, table-heavy financial filings?**',
          'The interface is the delivery vehicle, but the main contribution of BankLens is the evaluation process behind it: testing retrieval strategies, measuring outcomes, and analyzing where the system still fails.',
        ],
      },
      {
        heading: 'How I approached it',
        blocks: [
          'BankLens follows a RAG pipeline designed for both usefulness and traceability.',
          'The annual reports are first parsed into text and table-based content. That content is split into chunks, converted into embeddings, and stored in a vector database. When a user asks a question, the system searches for the most relevant chunks, optionally narrows the search using bank and fiscal-year metadata, and then uses an LLM to generate an answer based only on the retrieved evidence.',
          'Each response includes:',
          { list: [
            ['A grounded answer or an abstention', 'when the evidence is insufficient'],
            ['Citations', 'with the bank, fiscal year, printed page, and source passage'],
            ['A PDF viewer', 'that highlights the cited source material'],
            ['A retrieval panel', 'showing the passages and relevance scores used by the system'],
          ] },
          'For claim verification, the same evidence pipeline supports a structured verdict: **SUPPORTED**, **REFUTED**, or **NOT ENOUGH INFO**.',
        ],
      },
      {
        heading: 'Engineering beyond the LLM',
        blocks: [
          'One of the most important lessons from the project was that answer quality depends heavily on retrieval quality.',
          'A language model cannot reliably answer a question if the correct evidence was never retrieved. Because of that, I focused on improving and evaluating the stages before generation.',
          'BankLens includes several retrieval approaches:',
          { list: [
            ['PDF parsing experiments', 'Compared standard text extraction with a PyMuPDF-based parser that reconstructs tables from page layout.'],
            ['Table-aware chunking', 'Preserved tables as separate chunks, repeated table headers when large tables were split, and retained section and unit context.'],
            ['Dense retrieval', 'Used vector similarity to find semantically related passages.'],
            ['Hybrid retrieval', 'Combined dense search with BM25 keyword search using Reciprocal Rank Fusion.'],
            ['Metadata filtering', 'Detected banks and fiscal years mentioned in a question, then narrowed retrieval to the relevant filings.'],
            ['Cross-encoder reranking', 'Retrieved a wider set of candidate passages, then used a more precise reranker to select the best evidence.'],
            ['Contextual headers', 'Added bank, year, section, and page context to chunks before indexing them.'],
          ] },
          'I also made an intentional citation trade-off: chunks never cross page boundaries. This makes citations precise and easy to inspect, although a fact split across two pages can become harder to retrieve.',
        ],
      },
      {
        heading: 'Building and evaluating the system',
        blocks: [
          'The corpus includes eight annual reports, representing roughly 1,900 pages of financial disclosures.',
          'Rather than evaluating only whether generated answers sounded convincing, I created an evaluation set with:',
          { list: [
            ['40 questions', 'across factual, numeric, comparison, and unanswerable categories'],
            ['30 verification claims', 'across supported, refuted, and insufficient-evidence cases'],
            ['SEC XBRL data', 'for validating numerical ground truth'],
            ['Retrieval metrics', 'such as Hit@5 and Mean Reciprocal Rank'],
            ['Answer quality tracking', 'covering answer correctness, abstention quality, citation quality, latency, and cost'],
          ] },
          'I evaluated six configurations, beginning with a baseline dense-retrieval pipeline and incrementally adding table-aware parsing, hybrid retrieval, metadata filtering, reranking, and contextual chunk headers.',
          'The results reinforced an important point: improvements that sound sensible in theory do not always improve the full system in practice.',
          'For example, table-aware parsing alone did not improve results because long tables could still be split in ways that separated a useful row from its context. Metadata filtering delivered one of the strongest low-cost improvements by reducing confusion between banks and reporting years. Cross-encoder reranking substantially improved ranking quality, although it increased response time.',
          'The strongest configuration improved answer correctness from **67.5% to 85%**. It also improved abstention behavior, helping the system decline unsupported questions instead of guessing.',
        ],
      },
      {
        heading: 'Being honest about evaluation',
        blocks: [
          'I also validated a sample of the automated evaluation manually.',
          'The correctness judge showed reasonable agreement with human labels, but the faithfulness judge was too lenient: it marked some unsupported answers as grounded. Rather than presenting that metric uncritically, I treated it as an upper bound and documented the limitation.',
          'That was one of the most valuable parts of the project for me. Evaluation is not just about producing a score—it is about checking whether the measurement itself deserves trust.',
        ],
      },
      {
        heading: 'What I learned',
        blocks: [
          'Building BankLens helped me understand that reliable RAG systems require much more than connecting an LLM to a vector database.',
          'The most interesting work was in the details: extracting usable structure from messy PDFs, designing chunks that preserve table context, preventing wrong-document retrieval, measuring abstention, validating evaluators, tracking costs, and investigating real failures.',
          'It also changed how I think about AI applications in high-stakes domains. A fluent answer is not enough. Users need evidence, transparent limitations, and a system that knows when it does not have enough information to answer.',
        ],
      },
      {
        heading: 'What’s next?',
        blocks: [
          'There are several directions I would explore next:',
          { list: [
            ['Row-aware table chunks', 'that retain table titles, headers, and total rows together'],
            ['Per-bank retrieval', 'for multi-company comparison questions'],
            ['Stronger citation-faithfulness checks', 'for every numeric answer'],
            ['A stricter evaluation judge', 'validated against a larger human-labeled set'],
            ['Broader coverage', 'with more banks, filings, and reporting periods'],
          ] },
          '**The broader goal behind BankLens is to make complex financial disclosures easier to explore—without hiding the source material, uncertainty, or engineering trade-offs behind a polished AI response.**',
        ],
      },
    ],
  },
  sqlsentry: {
    title: 'SQLSentry — A Secure Natural Language to SQL Assistant',
    tagline: 'Turning everyday questions into database insights, with security built into the process.',
    sections: [
      {
        heading: 'The idea behind the project',
        paragraphs: [
          'Working with databases often requires knowing SQL, understanding table relationships, and writing queries that retrieve the right information. I wanted to explore whether someone could interact with a database simply by asking questions in plain English, without needing to write SQL themselves.',
          'That idea led me to build **SQLSentry**, an AI-powered natural language to SQL assistant that translates business questions into SQL queries, executes them against a PostgreSQL database, and presents the results in an understandable format.',
          "But I didn't want to build just another text-to-SQL chatbot. I wanted to address a more important engineering challenge: **How do you let an AI model interact with a database while maintaining control over what it can access and execute?**",
        ],
      },
      {
        heading: 'How I approached it',
        paragraphs: [
          'I built SQLSentry around a pipeline that combines language models, schema awareness, SQL validation, and controlled database execution.',
          'A user starts by asking a question such as:',
        ],
        quote: 'What are the top five product categories by revenue?',
        after: [
          'The system uses an LLM along with database schema information and business definitions to generate the corresponding SQL query. Before execution, the generated query passes through a validation layer that checks its structure and enforces restrictions on what can be executed.',
          'Only permitted, read-only queries are then sent to PostgreSQL. The results are returned alongside the generated SQL and a short AI-generated explanation, allowing users to understand both the answer and how it was obtained.',
        ],
      },
      {
        heading: 'Engineering beyond the LLM',
        paragraphs: [
          'One of the most important decisions I made was not to rely on the language model itself for database security.',
          'SQLSentry uses multiple independent safeguards:',
        ],
        list: [
          ['SQL validation', 'Uses SQLGlot to parse and validate generated queries, rejecting write operations and potentially dangerous statements.'],
          ['Read-only database access', 'Restricts the query execution role to permitted tables and operations.'],
          ['Query limits', 'Enforces execution timeouts and result-size restrictions.'],
          ['Error recovery', 'Feeds execution errors back into the generation process for up to two correction attempts.'],
          ['Audit logging', 'Maintains a record of queries and their associated results and summaries.'],
          ['Access controls', 'Includes authentication, request throttling, and daily usage limits.'],
        ],
        after: [
          'I also introduced schema-aware prompting through a centralized schema card. Beyond table and column definitions, it includes business rules and data relationships. For example, calculating unique customers requires using the appropriate customer identifier, while revenue calculations must account for order status and join-related duplication.',
          'This helped me understand that accurate text-to-SQL generation is not just about choosing a capable LLM. It also depends heavily on how well the database and its business context are represented.',
        ],
      },
      {
        heading: 'Building and evaluating the system',
        paragraphs: [
          'I developed SQLSentry using the Olist Brazilian E-Commerce dataset, which contains approximately 100,000 orders across eight tables.',
          'The application brings together FastAPI for the backend, Streamlit for the interface, PostgreSQL for data storage, and the OpenAI API for natural-language understanding and SQL generation. Docker is used to orchestrate the application components.',
          'I also created an evaluation pipeline with reference SQL queries to compare generated query results against expected results. This allowed me to evaluate whether the system produced correct database outputs rather than simply checking whether the generated SQL looked syntactically correct.',
        ],
      },
      {
        heading: 'What I learned',
        paragraphs: [
          'Building SQLSentry helped me explore the intersection of Generative AI, backend engineering, and database security.',
          'More importantly, it changed how I think about building AI-powered applications. A working LLM integration is only one part of the solution. Reliable systems also need validation, access control, error handling, observability, and a clear understanding of the underlying data.',
        ],
      },
      {
        heading: "What's next?",
        paragraphs: [
          'There is still room to extend SQLSentry. Some areas I would like to explore include conversational memory for follow-up questions, schema retrieval for larger databases, more granular role-based access control, and visualizations for query results.',
          '**The broader goal is to make data exploration more accessible while keeping the underlying database interactions controlled, transparent, and verifiable.**',
        ],
      },
    ],
  },
}
