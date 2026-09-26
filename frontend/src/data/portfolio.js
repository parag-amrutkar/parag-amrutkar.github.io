export const profile = {
  name: "Parag Amrutkar",
  title: "Technical Product Manager",
  positioning: "I build technology products and analyze complex growth, operations, and market problems.",
  introduction: "My work combines product concepts with structured analysis. I focus on framing the problem, making assumptions visible, and showing the reasoning behind each recommendation.",
  email: "paragamrutkar1103@gmail.com",
  linkedin: "https://linkedin.com/in/parag-amrutkar",
  github: "https://github.com/parag-amrutkar",
  location: "New York, NY"
};

export const productStatuses = {
  live: "Live",
  built: "Built",
  prototype: "Prototype",
  concept: "Concept",
  archived: "Archived",
  professional: "Professional work"
};

export const products = [
  {
    slug: "beacon-box",
    type: "product",
    plate: "plate-beacon-box",
    plateAlt: "Beacon Box kiosk mockup: a shopper asks where an item is, and the screen answers with an aisle location.",
    name: "Beacon Box",
    summary: "An AI-powered, voice-enabled in-store shopping assistant for grocery and retail. It runs on a 9:16 portrait kiosk: a shopper asks where something is and gets aisle, rack, and shelf guidance. Ask. Find. Pick.",
    status: "prototype",
    featured: true,
    year: "2026",
    affiliationNote: "Independent prototype. No retailer affiliation or endorsement is implied.",
    problem: [
      "Finding a specific item in a grocery or retail store often means walking the aisles or interrupting an employee. Beacon Box is a walk-up portrait kiosk: the shopper asks, and the panel answers with a location."
    ],
    solution: [
      "The public repository is a portrait kiosk app. After sign-in, a shopper can speak or type. Voice input transcribes the question; a shopping-assistant chat path can query the bundled demo inventory for location and stock."
    ],
    role: [
      "Product owner and builder on the public repository: kiosk experience, voice input, shopping-assistant chat, and the inventory schema used with a simulated demo catalog.",
      "Project context in AGENTS.md lists the team as Parag, Joaquin, and Andrew. This page does not assign individual file ownership."
    ],
    decisions: [
      {
        decision: "Route spoken and typed questions through a shopping-assistant chat that can search inventory, instead of treating transcription as the whole loop.",
        rationale: "The repository includes a chat panel, wayfinding and product screens, and a plan for read-only search, SKU, and aisle tools against the store catalog.",
        tradeoff: "The chat path depends on a configured model and database; it is not a hosted public kiosk."
      }
    ],
    evidence: [
      {
        type: "note",
        label: "Public repository",
        description: "Portrait kiosk prototype with voice input and a shopping-assistant chat path. Inventory in the bundled catalog is labeled demo_simulated. The repository does not link a public live kiosk. The README voice section may still describe transcription as not submitting to inventory."
      },
      {
        type: "link",
        label: "Shopping chat",
        description: "components/kiosk/shopping-chat.tsx — shoppers can ask for products, stock, and shelf locations; the CVS tenant discloses demo inventory.",
        url: "https://github.com/parag-amrutkar/supermarket-info-display/blob/main/components/kiosk/shopping-chat.tsx"
      },
      {
        type: "link",
        label: "Shopping assistant plan",
        description: "docs/shopping-agent-plan.md — tool-using assistant with read-only inventory search, SKU detail, and aisle tools against the demo catalog.",
        url: "https://github.com/parag-amrutkar/supermarket-info-display/blob/main/docs/shopping-agent-plan.md"
      },
      {
        type: "link",
        label: "Inventory migrations",
        description: "supabase/migrations — inventory schema used with the simulated demo catalog.",
        url: "https://github.com/parag-amrutkar/supermarket-info-display/tree/main/supabase/migrations"
      }
    ],
    outcomes: [
      "Current public status: Prototype. Voice input and a shopping-assistant chat path that can query demo inventory are in the repository."
    ],
    links: [
      { label: "GitHub repository", url: "https://github.com/parag-amrutkar/supermarket-info-display" },
      { label: "Shopping assistant plan", url: "https://github.com/parag-amrutkar/supermarket-info-display/blob/main/docs/shopping-agent-plan.md" }
    ],
    tags: ["Product", "AI", "Voice", "Retail kiosk"]
  },
  {
    slug: "ai-shopping-assistant",
    type: "product",
    plate: "plate-ai-shopping-assistant",
    plateAlt: "AI Shopping Assistant mockup: a product page with review text summarized into pros, cons, and a recommendation.",
    name: "AI Shopping Assistant",
    summary: "A Chrome extension with an Express/TypeScript backend that summarizes e-commerce product reviews into pros and cons on Amazon, Etsy, eBay, and Shopify stores.",
    status: "built",
    featured: true,
    year: "2025",
    affiliationNote: "Independent project. No Amazon, Etsy, eBay, or Shopify affiliation or endorsement is implied.",
    problem: [
      "Product pages accumulate long, uneven review threads. Shoppers still have to read through them to extract what is working and what is not."
    ],
    solution: [
      "The repository contains a Manifest V3 Chrome extension that extracts product data on supported storefronts and a Node.js Express API that returns pros and cons summaries. The README documents loading the extension unpacked in Chrome against a locally configured backend."
    ],
    role: [
      "Built the public repository: the Manifest V3 extension and the Express/TypeScript API, including the review-summarization endpoint described in the README."
    ],
    decisions: [
      {
        decision: "Keep the API key and summarization logic on a separate Node API instead of inside the extension.",
        rationale: "The README places secrets, CORS, rate limiting, and validation on the backend; the extension talks to a configured backend URL.",
        tradeoff: "The extension is not useful on its own without a running backend."
      }
    ],
    evidence: [
      {
        type: "note",
        label: "Public repository",
        description: "Manifest V3 Chrome extension plus Express/TypeScript API. The README documents local setup (load unpacked; backend on localhost)."
      },
      {
        type: "link",
        label: "Extension (Manifest V3)",
        description: "extension/ — content script, popup, and manifest for Amazon, Etsy, eBay, and Shopify storefronts.",
        url: "https://github.com/parag-amrutkar/ai-shopping-assistant/tree/main/extension"
      },
      {
        type: "link",
        label: "Summarize API",
        description: "server/src/routes/api.js — POST /summarize for review pros and cons, plus a health check.",
        url: "https://github.com/parag-amrutkar/ai-shopping-assistant/blob/main/server/src/routes/api.js"
      }
    ],
    outcomes: [
      "Current public status: Built. The extension and API code are in the repository. This is not presented as a Chrome Web Store listing or a publicly hosted service."
    ],
    links: [
      { label: "GitHub repository", url: "https://github.com/parag-amrutkar/ai-shopping-assistant" }
    ],
    tags: ["Browser extension", "AI", "E-commerce"]
  },
  {
    slug: "docnotes-rag",
    type: "product",
    plate: "plate-docnotes-rag",
    plateAlt: "DocNotes RAG mockup: a documentation page, a notebook of captured notes, and a grounded answer with a citation.",
    name: "DocNotes RAG",
    summary: "A Chrome extension and FastAPI backend that captures documentation pages into a local notebook, indexes them with embeddings (FAISS), and answers grounded questions from those notes.",
    status: "built",
    featured: true,
    year: "2025",
    problem: [
      "Technical documentation is spread across pages. A reader who wants to ask a question still has to search, scroll, and reassemble an answer by hand."
    ],
    solution: [
      "The repository is a locally runnable Manifest V3 extension plus FastAPI service. The extension captures headings, paragraphs, lists, and code from the current page; the backend chunks, embeds, and indexes with FAISS, then answers questions using only retrieved chunks."
    ],
    role: [
      "Built the public repository: the Chrome extension (no API keys in the client) and the FastAPI backend that stores embeddings, notes, and answers."
    ],
    decisions: [
      {
        decision: "Keep secrets and the vector index on a local FastAPI backend, not in the extension.",
        rationale: "The README states that the extension stores no API keys and that LLM and embedding calls happen on the server.",
        tradeoff: "The flow depends on a locally running backend."
      }
    ],
    evidence: [
      {
        type: "note",
        label: "Public repository",
        description: "Manifest V3 extension plus FastAPI backend. The README describes it as a working starter for local use."
      },
      {
        type: "link",
        label: "Extension (Manifest V3)",
        description: "extension/ — unpacked Chrome extension that captures the current documentation page.",
        url: "https://github.com/parag-amrutkar/documentation-rag-extension/tree/main/extension"
      },
      {
        type: "link",
        label: "FastAPI ingest and query",
        description: "server/app.py — POST /ingest indexes captured blocks with FAISS; POST /query answers from retrieved chunks only.",
        url: "https://github.com/parag-amrutkar/documentation-rag-extension/blob/main/server/app.py"
      }
    ],
    outcomes: [
      "Current public status: Built as a locally runnable starter. Capture, index, and grounded question-answering are implemented in the repository. Production authentication and a CORS allowlist are noted as required, not as shipped features."
    ],
    links: [
      { label: "GitHub repository", url: "https://github.com/parag-amrutkar/documentation-rag-extension" }
    ],
    tags: ["RAG", "Browser extension", "AI"]
  },
  {
    slug: "etsy-smartlist",
    type: "product",
    // Basename of the specimen plate in public/illustrations/. Falls back to
    // plate-product / plate-analysis when absent or when the file is missing.
    plate: "plate-etsy-smartlist",
    name: "Etsy SmartList",
    summary: "A product concept for helping marketplace sellers draft listing copy and metadata with an AI-assisted workflow.",
    status: "concept",
    featured: false,
    year: "2025",
    affiliationNote: "Independent product concept. No Etsy affiliation or endorsement is implied.",
    problem: [
      "The original case study frames repetitive listing creation and product discoverability as problems for marketplace sellers. The repository does not contain primary research or a retained source list, so these are presented as problem hypotheses rather than verified seller findings."
    ],
    solution: [
      "The concept proposes assistance for product names, descriptions, metadata, and category selection. It also outlines the possible use of language models, search-trend inputs, and marketplace guidelines; these are proposed components, not a description of an implemented system."
    ],
    role: [
      "Defined the product concept, mapped the proposed listing workflow, and outlined a staged validation approach using fake-door, pretotyping, and MVP tests."
    ],
    decisions: [
      {
        decision: "Validate demand in stages before treating the idea as a product.",
        rationale: "The original concept calls for fake-door, pretotyping, and MVP tests before broader implementation.",
        tradeoff: "The repository does not show that these tests were run, so no demand or performance result is claimed."
      }
    ],
    evidence: [
      {
        type: "note",
        label: "Evidence status",
        description: "The public repository currently contains the written concept only. It does not contain a prototype, demo, research appendix, or measured study results."
      }
    ],
    outcomes: [
      "Current public status: Concept. Previously stated performance figures are not shown because the repository does not establish that they were measured."
    ],
    links: [],
    tags: ["Product concept", "AI-assisted workflow", "Validation"]
  }
];

export const analyses = [
  {
    slug: "disney-plus-ml",
    legacySlug: "disney-ml",
    type: "analysis",
    plate: "plate-disney-plus-ml",
    title: "Machine Learning Opportunities for Disney+",
    summary: "An independent case study asking where machine learning could improve discovery, content decisions, and streaming experience.",
    featured: false,
    publishedAt: "2025",
    publishedPrecision: "year",
    updatedAt: null,
    topic: "Machine learning strategy",
    affiliationNote: "Independent analysis. No Disney affiliation, commission, or endorsement is implied.",
    whyItMatters: [
      "Streaming products must help viewers find relevant content while maintaining a reliable playback experience. This case study explores where machine learning might support those product goals."
    ],
    method: [
      "The analysis groups opportunities across discovery, content planning, and streaming delivery, then considers the data capabilities each would require.",
      "Limitation: the original portfolio record does not retain a source list, calculations, or primary research. The proposals below are Parag's interpretation and should not be read as verified Disney plans or results.",
      "This entry is not featured on the home page until a source list can be restored."
    ],
    analysis: [
      "Candidate use cases include personalized recommendations, thumbnail selection, viewership-informed content planning, and adaptive streaming optimization. A supporting data strategy would need to define what data can be combined, how it is governed, and how each use case is evaluated."
    ],
    findings: [
      "The case study identifies multiple candidate applications for machine learning, but it does not establish that any were implemented or that they produced measurable outcomes.",
      "Data readiness and evaluation criteria are dependencies, not secondary implementation details."
    ],
    recommendations: [
      "Prioritize a small number of use cases with explicit user value, available data, and measurable evaluation criteria before expanding the program.",
      "Treat the data-governance and experimentation plan as part of the product strategy."
    ],
    sources: [],
    tags: ["Machine learning", "Product strategy", "Personalization"]
  },
  {
    slug: "basecamp-pricing-strategy",
    legacySlug: "basecamp-pricing",
    type: "analysis",
    plate: "plate-basecamp-pricing-strategy",
    title: "Basecamp Pricing Strategy",
    summary: "An independent analysis of pricing structures and the tradeoff between revenue options, product simplicity, and customer value.",
    featured: false,
    publishedAt: "2025",
    publishedPrecision: "year",
    updatedAt: null,
    topic: "Pricing strategy",
    affiliationNote: "Independent analysis. No Basecamp affiliation, commission, or endorsement is implied.",
    whyItMatters: [
      "Pricing changes affect who a product serves, how customers compare plans, and how the product communicates value. Those effects can conflict with a product's preference for simplicity."
    ],
    method: [
      "The case study compares tiered pricing, feature gating, add-ons, and client-facing features, and considers price-sensitivity and experimentation methods.",
      "Limitation: the original portfolio record does not include its underlying calculations, customer research, experiment results, or source list. Recommendations are presented as analysis, not as changes implemented by Basecamp.",
      "This entry is not featured on the home page until a source list can be restored."
    ],
    analysis: [
      "The central tradeoff is between capturing different willingness to pay and preserving a simple buying experience. More tiers can create clearer segmentation, but they also add comparison work and may weaken a deliberately simple pricing message."
    ],
    findings: [
      "Tiering, feature packaging, and add-ons create different revenue and customer-experience tradeoffs; the repository does not provide evidence that one option was tested or adopted.",
      "Any pricing recommendation depends on customer research and behavioral validation that are not part of the retained public record."
    ],
    recommendations: [
      "Test pricing and packaging hypotheses with explicit success and guardrail metrics before treating them as a revenue plan.",
      "Evaluate added choice against the cost it creates for product comprehension and brand consistency."
    ],
    sources: [],
    tags: ["Pricing", "Strategy", "Experimentation"]
  }
];

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);

export const getAnalysisBySlug = (slug) => analyses.find((analysis) => analysis.slug === slug);

export const getLegacyWorkPath = (slug) => {
  const product = products.find((item) => item.slug === slug);
  if (product) return `/work/products/${product.slug}`;

  const analysis = analyses.find((item) => item.slug === slug || item.legacySlug === slug);
  if (analysis) return `/work/analysis/${analysis.slug}`;

  return "/work";
};

export const terminalCommands = {
  help: {
    output: `Available commands:\n\n  help          Show this help message\n  about         Display a short bio\n  work          List products and analysis\n  contact       Show contact information\n  gui           Switch to the website\n  clear         Clear the terminal\n  theme <name>  Change theme (dark, light, matrix)`
  }
};
