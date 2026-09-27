export const profile = {
  name: "Parag Amrutkar",
  title: "Sr. Technical Product Manager",
  positioning: "I lead humans & AI agents to build products for humans & AI agents.",
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
    plateRatio: "4 / 3",
    plateAlt: "Two shoppers at a Beacon Box grocery kiosk whose screen greets them and offers product search, directions, and deals.",
    name: "Beacon Box",
    headline: "Beacon Box helps in-store shoppers find the right product faster",
    subheadline: "An AI-powered shopping kiosk that helps customers discover, compare, and locate products through natural conversation.",
    summary: "A voice-enabled AI shopping kiosk that makes navigating physical stores as easy as shopping online. It answers product questions, recommends alternatives, and guides shoppers to the exact aisle and shelf, helping customers find what they need with less searching and fewer staff interactions.",
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
    tags: ["Product", "AI", "Voice", "Retail kiosk"],
    sections: [
      {
        type: "paragraphs",
        title: "The Problem",
        items: [
          "Finding a product in a physical store can be frustrating. Shoppers often have to search multiple aisles or find an associate just to locate a product or understand their options."
        ]
      },
      {
        type: "paragraphs",
        title: "The Product",
        items: [
          "Beacon Box is a voice-enabled AI shopping assistant for physical stores. Shoppers can ask questions, explore relevant products, compare alternatives, and get directions to the exact aisle and shelf."
        ]
      },
      {
        type: "steps",
        title: "How It Works",
        steps: ["Ask", "Discover", "Compare", "Find"],
        body: "Shoppers describe what they need, Beacon Box recommends relevant products, helps them compare options, and guides them to the product's location in the store."
      },
      {
        type: "quote",
        title: "The Vision",
        text: "What if you could just ask the store?",
        body: "Make discovering products in a physical store as simple as searching for them online."
      },
      {
        type: "list",
        title: "Impact",
        items: [
          {
            label: "Shoppers",
            text: "Spend less time searching and make more informed purchase decisions."
          },
          {
            label: "Store associates",
            text: "Spend less time answering repetitive product-location questions."
          },
          {
            label: "Retailers",
            text: "Deliver better self-service while helping customers discover products more easily."
          }
        ]
      }
    ]
  },
  {
    slug: "ai-shopping-assistant",
    type: "product",
    plate: "shopping_assistant_transparent",
    plateRatio: "4 / 3",
    plateAlt: "AI Shopping Assistant mockup: a store product page beside a shopping-assistant sidebar with reviews, a pros and cons summary, and a comparison.",
    name: "AI Shopping Assistant",
    headline: "AI Shopping Assistant helps online shoppers understand product reviews faster",
    subheadline: "A browser extension that uses AI to turn product reviews into concise pros and cons, helping shoppers make more informed purchase decisions.",
    summary: "A browser extension that uses AI to turn product reviews into concise pros and cons, helping shoppers make more informed purchase decisions.",
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
    tags: ["Browser extension", "AI", "E-commerce"],
    sections: [
      {
        type: "paragraphs",
        title: "The Problem",
        items: [
          "Product reviews contain valuable information, but shoppers often have to read through dozens of repetitive or conflicting reviews to understand whether a product is right for them."
        ]
      },
      {
        type: "paragraphs",
        title: "The Product",
        items: [
          "AI Shopping Assistant analyzes reviews directly on product pages and summarizes recurring feedback into clear pros and cons. It works across Amazon, Etsy, eBay, and Shopify stores without requiring shoppers to leave the product page."
        ]
      },
      {
        type: "steps",
        title: "How It Works",
        steps: ["Browse", "Summarize", "Analyze", "Decide"],
        body: "Open a product page and ask the extension to summarize it. The assistant extracts available reviews, analyzes them with AI, and surfaces the most relevant positive and negative themes."
      },
      {
        type: "quote",
        title: "The Vision",
        text: "Turn hundreds of reviews into the few insights that matter.",
        body: "Make researching products as effortless as browsing them."
      },
      {
        type: "list",
        title: "Impact",
        items: [
          {
            label: "Shoppers",
            text: "Spend less time reading repetitive reviews, understand product tradeoffs faster, and make purchase decisions with greater confidence."
          }
        ]
      }
    ]
  },
  {
    slug: "docnotes-rag",
    type: "product",
    plate: "plate-docnotes-rag",
    plateRatio: "3 / 2",
    plateAlt: "Diagram of documents and a question flowing into a knowledge network that produces a cited answer.",
    name: "DocQuery",
    headline: "DocQuery helps developers get answers from documentation",
    subheadline: "A browser assistant that captures a docs page and answers questions from that page.",
    summary: "An AI-powered browser assistant that turns technical documentation into an interactive knowledge base. It lets users capture documentation pages, ask questions in natural language, and get source-grounded answers, helping developers find the information they need without manually searching through lengthy docs.",
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
    tags: ["RAG", "Browser extension", "AI"],
    sections: [
      {
        type: "paragraphs",
        title: "The Problem",
        items: [
          "Technical documentation is spread across long pages. A reader who has a question still has to search, scroll, and piece an answer together. The information is there, but it is not askable."
        ]
      },
      {
        type: "paragraphs",
        title: "The Product",
        items: [
          "DocQuery is a locally runnable Chrome extension and FastAPI service. The extension captures headings, paragraphs, lists, and code from the current page. The backend chunks, embeds, and indexes that text, then answers using only the retrieved chunks."
        ]
      },
      {
        type: "steps",
        title: "How It Works",
        steps: ["Open a docs page", "Capture the page", "Ask a question", "Read a grounded answer"],
        body: "The reader captures the page they are on. The local backend indexes those blocks, and a later question is answered only from the chunks it retrieves."
      },
      {
        type: "quote",
        title: "The Vision",
        text: "Ask the documentation, and get an answer that stays on the page."
      }
    ]
  },
  {
    slug: "etsy-smartlist",
    type: "product",
    // Basename of the specimen plate in public/illustrations/. Falls back to
    // plate-product / plate-analysis when absent or when the file is missing.
    plate: "plate-etsy-smartlist",
    name: "Etsy SmartList",
    headline: "Etsy SmartList helps marketplace sellers draft a listing",
    subheadline: "A product concept for an AI-assisted workflow that drafts listing copy and metadata.",
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
    tags: ["Product concept", "AI-assisted workflow", "Validation"],
    sections: [
      {
        type: "paragraphs",
        title: "The Problem",
        items: [
          "Marketplace sellers repeat the same listing work: name, description, metadata, and category. The original concept treats that repetition, and the effect on discoverability, as the problem. The public record does not include seller research, so this remains a problem hypothesis."
        ]
      },
      {
        type: "paragraphs",
        title: "The Product",
        items: [
          "Etsy SmartList is a concept for assisting product names, descriptions, metadata, and category selection. It outlines language models, search-trend inputs, and marketplace guidelines as possible inputs. Those are proposed parts of a workflow, not a system that has been built."
        ]
      },
      {
        type: "steps",
        title: "How It Works",
        steps: ["Describe the product", "Draft the listing", "Set metadata and category", "Review before publishing"],
        body: "A seller would describe the product, receive a draft listing, adjust metadata and category, and review the result before it is published. This flow is proposed; the repository does not contain a prototype."
      },
      {
        type: "quote",
        title: "The Vision",
        text: "Start from a draft listing, not a blank form."
      }
    ]
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
    tags: ["Machine learning", "Product strategy", "Personalization"],
    sections: [
      {
        type: "paragraphs",
        title: "Question or thesis",
        items: [
          "An independent case study asking where machine learning could improve discovery, content decisions, and streaming experience."
        ]
      },
      {
        type: "paragraphs",
        title: "Why it matters",
        items: [
          "Streaming products must help viewers find relevant content while maintaining a reliable playback experience. This case study explores where machine learning might support those product goals."
        ]
      },
      {
        type: "paragraphs",
        title: "Method and sources",
        items: [
          "The analysis groups opportunities across discovery, content planning, and streaming delivery, then considers the data capabilities each would require.",
          "Limitation: the original portfolio record does not retain a source list, calculations, or primary research. The proposals below are Parag's interpretation and should not be read as verified Disney plans or results.",
          "This entry is not featured on the home page until a source list can be restored."
        ]
      },
      {
        type: "paragraphs",
        title: "Analysis",
        items: [
          "Candidate use cases include personalized recommendations, thumbnail selection, viewership-informed content planning, and adaptive streaming optimization. A supporting data strategy would need to define what data can be combined, how it is governed, and how each use case is evaluated."
        ]
      },
      {
        type: "list",
        title: "Key findings",
        items: [
          "The case study identifies multiple candidate applications for machine learning, but it does not establish that any were implemented or that they produced measurable outcomes.",
          "Data readiness and evaluation criteria are dependencies, not secondary implementation details."
        ]
      },
      {
        type: "list",
        title: "Recommendation or implications",
        label: "Parag's interpretation",
        className: "interpretation-section",
        items: [
          "Prioritize a small number of use cases with explicit user value, available data, and measurable evaluation criteria before expanding the program.",
          "Treat the data-governance and experimentation plan as part of the product strategy."
        ]
      }
    ]
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
    tags: ["Pricing", "Strategy", "Experimentation"],
    sections: [
      {
        type: "paragraphs",
        title: "Question or thesis",
        items: [
          "An independent analysis of pricing structures and the tradeoff between revenue options, product simplicity, and customer value."
        ]
      },
      {
        type: "paragraphs",
        title: "Why it matters",
        items: [
          "Pricing changes affect who a product serves, how customers compare plans, and how the product communicates value. Those effects can conflict with a product's preference for simplicity."
        ]
      },
      {
        type: "paragraphs",
        title: "Method and sources",
        items: [
          "The case study compares tiered pricing, feature gating, add-ons, and client-facing features, and considers price-sensitivity and experimentation methods.",
          "Limitation: the original portfolio record does not include its underlying calculations, customer research, experiment results, or source list. Recommendations are presented as analysis, not as changes implemented by Basecamp.",
          "This entry is not featured on the home page until a source list can be restored."
        ]
      },
      {
        type: "paragraphs",
        title: "Analysis",
        items: [
          "The central tradeoff is between capturing different willingness to pay and preserving a simple buying experience. More tiers can create clearer segmentation, but they also add comparison work and may weaken a deliberately simple pricing message."
        ]
      },
      {
        type: "list",
        title: "Key findings",
        items: [
          "Tiering, feature packaging, and add-ons create different revenue and customer-experience tradeoffs; the repository does not provide evidence that one option was tested or adopted.",
          "Any pricing recommendation depends on customer research and behavioral validation that are not part of the retained public record."
        ]
      },
      {
        type: "list",
        title: "Recommendation or implications",
        label: "Parag's interpretation",
        className: "interpretation-section",
        items: [
          "Test pricing and packaging hypotheses with explicit success and guardrail metrics before treating them as a revenue plan.",
          "Evaluate added choice against the cost it creates for product comprehension and brand consistency."
        ]
      }
    ]
  }
];

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);

export const getAnalysisBySlug = (slug) => analyses.find((analysis) => analysis.slug === slug);

export const getLegacyWorkPath = (slug) => {
  const product = products.find((item) => item.slug === slug);
  if (product) return `/work/project/${product.slug}`;

  const analysis = analyses.find((item) => item.slug === slug || item.legacySlug === slug);
  if (analysis) return `/work/project/${analysis.slug}`;

  return "/work";
};

export const terminalCommands = {
  help: {
    output: `Available commands:\n\n  help          Show this help message\n  about         Display a short bio\n  work          List products and analysis\n  contact       Show contact information\n  gui           Switch to the website\n  clear         Clear the terminal\n  theme <name>  Change theme (dark, light, matrix)`
  }
};
