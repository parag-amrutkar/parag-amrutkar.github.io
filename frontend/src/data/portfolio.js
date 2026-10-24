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
    slug: "deals-tracker",
    type: "product",
    plate: "plate-deals-tracker",
    plateRatio: "3 / 2",
    plateAlt: "Hand-drawn explainer: SEC filings, press releases and company data flow into a parser that produces a deal card.",
    name: "Deals Tracker",
    headline: "Deals Tracker makes SEC acquisition disclosures easier to inspect",
    subheadline: "A public research desk for browsing US public-company M&A disclosures, tracing deal values to filings, and reviewing uncertain extractions.",
    summary: "Browse US public-company M&A disclosures from SEC EDGAR, inspect deal values and their basis, and follow sources into company profiles.",
    status: "live",
    featured: true,
    year: "2026",
    problem: [
      "Acquisition announcements and closings are scattered across unstructured SEC filings and press releases. Identifying the parties, transaction value, and status requires reading the underlying disclosures."
    ],
    solution: [
      "A CLI ingestion pipeline and web research desk collect free SEC EDGAR filings, distinguish announced and closed deals, and expose a filterable deals list, filing evidence, value basis, and sourced company profiles. Uncertain filings are flagged for review."
    ],
    role: [
      "Product owner and builder directing AI coding agents (Codex): Parag sets product direction and guides implementation of the ingestion pipeline and research desk."
    ],
    decisions: [
      {
        decision: "Keep deal extraction grounded in SEC disclosures and preserve uncertainty.",
        rationale: "Best-effort extraction uses 8-K Items 1.01/2.01 and Ex-99.1 press releases, with source evidence and value basis available for inspection.",
        tradeoff: "Coverage is partial; missing or unclear values display as —, and uncertain filings require review."
      },
      {
        decision: "Allow cached browsing publicly; require an invited Supabase account for write actions.",
        rationale: "Visitors can inspect saved research without starting polling, refresh, or provider work.",
        tradeoff: "Research, refresh, and polling are restricted to invited accounts; free-tier Render hosting can cold-start."
      }
    ],
    evidence: [
      {
        type: "image",
        label: "Dashboard",
        url: "/evidence/deals-tracker/dashboard.webp",
        alt: "Deals Tracker dashboard with stored deal summaries and filing coverage.",
        description: "Live public site, signed out, captured 2026-10-17. Figures describe a data snapshot, not usage or traction."
      },
      {
        type: "image",
        label: "Deals list with value and basis",
        url: "/evidence/deals-tracker/deals-list.webp",
        alt: "Deals Tracker transaction list showing acquirer, target, status, and deal value with its basis.",
        description: "Live public site, signed out, captured 2026-10-17. Missing values remain —; extraction and filing coverage are partial."
      },
      {
        type: "image",
        label: "Deal detail: Repligen / BioLife Solutions",
        url: "/evidence/deals-tracker/deal-detail.webp",
        alt: "Repligen and BioLife Solutions deal detail with transaction evidence and sourced company profiles.",
        description: "Live public site, signed out, captured 2026-10-17. Saved company profiles expose sources; refresh and research require an invited account."
      }
    ],
    outcomes: [
      "Public deployment verified on 2026-10-17: cached browsing returned HTTP 200 and /health reported ok at deployed commit 99c2ecd. Hosted on Render's free plan; cold starts are possible."
    ],
    links: [{ label: "View live site", url: "https://deals-tracker-ly4j.onrender.com" }],
    tags: ["SEC EDGAR", "M&A research", "Python", "React"],
    sections: [
      { type: "paragraphs", title: "The Problem", items: [
        "Acquisition disclosures are spread across unstructured filings and exhibits. A research desk needs to make parties, status, and value inspectable without hiding the underlying evidence."
      ] },
      { type: "paragraphs", title: "The Product", items: [
        "Deals Tracker combines a CLI ingestion pipeline with a public dashboard, filterable deals list, filing review, and deal details with value basis and sourced company profiles.",
        "Live as verified on 2026-10-17. Cached browsing is public; research, refresh, and polling require an invited Supabase account."
      ] },
      { type: "paragraphs", title: "My role", items: [
        "Product owner and builder directing AI coding agents (Codex). Parag sets product direction and guides implementation of the ingestion pipeline and research desk."
      ] },
      { type: "paragraphs", title: "Stack", items: [
        "Python Flask and gunicorn serve the API and compiled frontend. Storage uses SQLite locally and Postgres on Render. The frontend uses React 19, Vite, TypeScript, and Tailwind CSS; Supabase handles authentication.",
        "Core filings come from free SEC EDGAR APIs. Optional Exa enrichment adds grounded company profiles; optional Polygon/Massive supplies filer end-of-day prices. SEC and Wikipedia provide description fallbacks when Exa is unconfigured."
      ] },
      { type: "paragraphs", title: "Key decisions and tradeoffs", items: [
        "Best-effort extraction focuses on 8-K Items 1.01/2.01 and Ex-99.1 press releases. Missing or unclear values display as — rather than guessed facts. Coverage is partial, and uncertain filings are flagged for review.",
        "Public cached reads make saved research inspectable while invited-account controls restrict write actions and provider work. Free-tier Render hosting keeps the deployment lightweight but can cold-start."
      ] },
      { type: "paragraphs", title: "Current status", items: [
        "Public deployment verified on 2026-10-17: HTTP 200, with /health reporting ok at commit 99c2ecd. This establishes deployment availability, not adoption or extraction completeness."
      ] }
    ]
  },
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
        description: "Portrait kiosk prototype with voice input and a shopping-assistant chat path. Inventory in the bundled catalog is labeled demo_simulated. The repository does not link a public live kiosk. A transcribed question and the tappable answer to “what cold medicine do you have?” were not captured: those screens call a model API, and this build had no API key."
      },
      {
        type: "image",
        label: "Signed-in home screen",
        url: "/evidence/beacon-box/home-ask.webp",
        alt: "CVS-branded Beacon Box home screen with a microphone and the prompt Tap to ask where something is.",
        description: "Local production build, after the demo PIN sign-in. This is the resting screen for a spoken question. No transcription key was configured, so the frame does not show a transcribed question."
      },
      {
        type: "image",
        label: "Ask from a product screen",
        url: "/evidence/beacon-box/product-ask.webp",
        alt: "NyQuil SEVERE product screen with a microphone labeled Tap to ask about this product, a price of $13.49, and an Aisle 7 direction.",
        description: "Local production build of /product/nyquil-severe. Price, stock, and aisle come from the bundled CSV row CVS-9100001, labeled demo_simulated, served through a local inventory stand-in with no cloud credentials. The star rating is authored mock data in the repository, not inventory."
      },
      {
        type: "image",
        label: "Wayfinding for Lumify",
        url: "/evidence/beacon-box/wayfinding-lumify.webp",
        alt: "Wayfinding screen for Lumify with a card reading Demo inventory location, Aisle 18, Rack 1, Shelf 1, over a store-map animation.",
        description: "Local production build of /map/lumify. The card quotes the bundled demo_simulated location for SKU CVS-9100002. The animation is a pre-rendered NyQuil route, which is why the screen says it may not match this product."
      },
      {
        type: "image",
        label: "Wayfinding for NyQuil SEVERE",
        url: "/evidence/beacon-box/wayfinding-nyquil.webp",
        alt: "Wayfinding screen at /map/nyquil-severe showing a pre-rendered aisle map labeled Aisle 7, Bay 3, and a Back button.",
        description: "Local production build of /map/nyquil-severe. The bundled demo location matches the pre-rendered animation (Aisle 7, Rack 3, Shelf 4), so the screen withholds the correction card. Prices drawn inside the animation are part of that render, not a live inventory readout."
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
    name: "Docs Query",
    headline: "Docs Query helps developers find answers in technical documentation faster",
    subheadline: "A browser extension that turns technical documentation into a searchable knowledge base, letting developers ask questions and get grounded answers with source citations.",
    summary: "A browser extension that turns technical documentation into a searchable knowledge base, letting developers ask questions and get grounded answers with source citations.",
    status: "built",
    featured: false,
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
          "Technical documentation can be long and difficult to navigate. Developers often spend time scanning pages, searching keywords, and piecing together information just to answer a specific question."
        ]
      },
      {
        type: "paragraphs",
        title: "The Product",
        items: [
          "Docs Query lets developers capture a documentation page and ask questions about it directly. It indexes the content using embeddings, retrieves the most relevant sections, and generates answers grounded only in the captured documentation with citations back to the source."
        ]
      },
      {
        type: "steps",
        title: "How It Works",
        steps: ["Capture", "Index", "Ask", "Verify"],
        body: "Capture a documentation page, index its content, ask a question in natural language, and receive a grounded answer with the relevant source sections."
      },
      {
        type: "quote",
        title: "The Vision",
        text: "Turn documentation into a conversation you can verify.",
        body: "Make finding answers in technical documentation as simple as asking a question."
      },
      {
        type: "list",
        title: "Impact",
        items: [
          {
            label: "Developers",
            text: "Spend less time searching through documentation, get relevant answers faster, and verify those answers against the original source."
          }
        ]
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
    title: "Disney+ discovery and playback, from public sources",
    summary: "An independent reading of what Disney has published about Disney+ personalization and playback quality. It stops where those pages stop.",
    featured: true,
    publishedAt: "2025",
    publishedPrecision: "year",
    updatedAt: "2026-10-12",
    topic: "Streaming product",
    affiliationNote: "Independent analysis. No Disney affiliation, commission, or endorsement is implied.",
    whyItMatters: [
      "Disney's own pages describe two behaviors a streaming home screen has to get right: helping a subscriber find something to watch, and adjusting the picture to the connection they have."
    ],
    method: [
      "Read two primary pages and kept only what they state: Disney's 11 April 2019 investor-day post, and Disney+'s product article revised 9 January 2026. Accessed 12 October 2026.",
      "Limitation: those pages describe personalized recommendations and bandwidth-based playback. They do not call either one a machine-learning program, and they do not describe thumbnail selection, viewership-based commissioning, or measured results. Earlier claims on those points are removed."
    ],
    analysis: [
      "The 2019 investor-day post says Disney+ subscribers would get custom profiles, each with a personalized experience drawn from past behavior and preferred content, and that playback would adjust toward the best high-definition picture the subscriber's bandwidth could support, including 4K HDR.",
      "Disney+'s January 2026 article describes a For You tab that recommends titles from what that profile has already watched, says the suggestions improve as the person streams more, and tells viewers to use their own profile so the suggestions follow that profile."
    ],
    findings: [
      "Personalized, profile-specific recommendations are described as product behavior in Disney's own January 2026 article, not only as a proposal.",
      "Bandwidth-adaptive high-definition playback is described in the 2019 investor-day post. That post does not publish quality metrics.",
      "Thumbnail selection and viewership-informed content planning are not in the sources reviewed, so they are not claimed here."
    ],
    recommendations: [
      "The open question is how Disney evaluates the behaviors these pages already describe. The pages do not provide that evaluation.",
      "Artwork selection, content greenlights, or a named model stay outside this entry until a primary source describes them."
    ],
    sources: [
      {
        title: "Disney Spotlights Comprehensive Direct-to-Consumer Strategy at 2019 Investor Day",
        publisher: "The Walt Disney Company",
        url: "https://thewaltdisneycompany.com/news/disney-spotlights-comprehensive-direct-to-consumer-strategy-at-2019-investor-day",
        accessedAt: "2026-10-12"
      },
      {
        title: "The Disney+ App Just Got an Update, Here’s What You Need to Know",
        publisher: "Disney+",
        url: "https://www.disneyplus.com/explore/articles/disney-plus-app-redesign-new-features",
        accessedAt: "2026-10-12"
      }
    ],
    tags: ["Personalization", "Playback", "Product strategy"],
    sections: [
      {
        type: "paragraphs",
        title: "Question or thesis",
        items: [
          "An independent reading of what Disney has published about Disney+ personalization and playback quality. It stops where those pages stop."
        ]
      },
      {
        type: "paragraphs",
        title: "Why it matters",
        items: [
          "Disney's own pages describe two behaviors a streaming home screen has to get right: helping a subscriber find something to watch, and adjusting the picture to the connection they have."
        ]
      },
      {
        type: "paragraphs",
        title: "Method and sources",
        items: [
          "Read two primary pages and kept only what they state: Disney's 11 April 2019 investor-day post, and Disney+'s product article revised 9 January 2026. Accessed 12 October 2026.",
          "Limitation: those pages describe personalized recommendations and bandwidth-based playback. They do not call either one a machine-learning program, and they do not describe thumbnail selection, viewership-based commissioning, or measured results. Earlier claims on those points are removed."
        ],
        sources: [
          {
            title: "Disney Spotlights Comprehensive Direct-to-Consumer Strategy at 2019 Investor Day",
            publisher: "The Walt Disney Company",
            url: "https://thewaltdisneycompany.com/news/disney-spotlights-comprehensive-direct-to-consumer-strategy-at-2019-investor-day",
            accessedAt: "2026-10-12"
          },
          {
            title: "The Disney+ App Just Got an Update, Here’s What You Need to Know",
            publisher: "Disney+",
            url: "https://www.disneyplus.com/explore/articles/disney-plus-app-redesign-new-features",
            accessedAt: "2026-10-12"
          }
        ]
      },
      {
        type: "paragraphs",
        title: "Analysis",
        items: [
          "The 2019 investor-day post says Disney+ subscribers would get custom profiles, each with a personalized experience drawn from past behavior and preferred content, and that playback would adjust toward the best high-definition picture the subscriber's bandwidth could support, including 4K HDR.",
          "Disney+'s January 2026 article describes a For You tab that recommends titles from what that profile has already watched, says the suggestions improve as the person streams more, and tells viewers to use their own profile so the suggestions follow that profile."
        ]
      },
      {
        type: "list",
        title: "Key findings",
        items: [
          "Personalized, profile-specific recommendations are described as product behavior in Disney's own January 2026 article, not only as a proposal.",
          "Bandwidth-adaptive high-definition playback is described in the 2019 investor-day post. That post does not publish quality metrics.",
          "Thumbnail selection and viewership-informed content planning are not in the sources reviewed, so they are not claimed here."
        ]
      },
      {
        type: "list",
        title: "Recommendation or implications",
        label: "Parag's interpretation",
        className: "interpretation-section",
        items: [
          "The open question is how Disney evaluates the behaviors these pages already describe. The pages do not provide that evaluation.",
          "Artwork selection, content greenlights, or a named model stay outside this entry until a primary source describes them."
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
    summary: "An independent reading of two public Basecamp pricing pages that were live on the same day and do not describe the same offer.",
    featured: true,
    publishedAt: "2025",
    publishedPrecision: "year",
    updatedAt: "2026-10-12",
    topic: "Pricing strategy",
    affiliationNote: "Independent analysis. No Basecamp affiliation, commission, or endorsement is implied.",
    whyItMatters: [
      "The price a buyer compares is the one on the page in front of them. On 12 October 2026, Basecamp's pricing page and its try page described different offers."
    ],
    method: [
      "Compared the packages, limits, and FAQ on basecamp.com/pricing with the plans on basecamp.com/try-basecamp. Both pages were fetched on 12 October 2026. No customer research and no experiment log are included.",
      "Limitation: the two pages were both public on that date and they disagree. This entry does not know which page a given signup shows, and it does not report a test that chose between them."
    ],
    analysis: [
      "basecamp.com/pricing leads with fixed prices and no per-user fees. The packages listed that day were Free (1 project, 1 GB, 5 users), Freelancer at $25 per month (3 active projects, 5 GB, 20 users), Studio at $59 per month (10 active projects, 25 GB, unlimited users), Pro at $99 per month (25 active projects, 100 GB), and Unlimited at $299 per month billed annually (unlimited projects, 1 TB). Unlimited can add 5 TB of storage for $100 per month. The FAQ says a paid package can move down only when current usage fits the lower one, that every person added counts as a user, and that Studio and above include unlimited users. Basecamp says there that it pioneered the all-inclusive package and has offered it for over a decade.",
      "basecamp.com/try-basecamp, the same day, described Basecamp Plus at $15 per user per month, with optional Timesheet and Admin Pro Pack upgrades, and said guests and clients are not billed. It also described Basecamp Pro Unlimited at $299 per month billed annually, or $349 per month paid monthly, with those upgrades included. The signup links on that page point at 3.basecamp.com."
    ],
    findings: [
      "The pricing page is a fixed-price list. What changes between packages is the project cap, storage, and — on Free and Freelancer — the user cap. A storage add-on is published for Unlimited.",
      "A second Basecamp URL still publishes a per-user price and named add-ons, and it treats guests differently from the pricing-page FAQ.",
      "Both pages are public offers. What they do not provide is which offer a new customer is shown, or any experiment result."
    ],
    recommendations: [
      "Cite the page you actually opened. The two URLs above are not interchangeable.",
      "These pages state prices and limits. They do not state conversion, churn, or willingness to pay."
    ],
    sources: [
      {
        title: "Basecamp pricing",
        publisher: "Basecamp",
        url: "https://basecamp.com/pricing",
        accessedAt: "2026-10-12"
      },
      {
        title: "Try Basecamp",
        publisher: "Basecamp",
        url: "https://basecamp.com/try-basecamp",
        accessedAt: "2026-10-12"
      }
    ],
    tags: ["Pricing", "Strategy", "Packaging"],
    sections: [
      {
        type: "paragraphs",
        title: "Question or thesis",
        items: [
          "An independent reading of two public Basecamp pricing pages that were live on the same day and do not describe the same offer."
        ]
      },
      {
        type: "paragraphs",
        title: "Why it matters",
        items: [
          "The price a buyer compares is the one on the page in front of them. On 12 October 2026, Basecamp's pricing page and its try page described different offers."
        ]
      },
      {
        type: "paragraphs",
        title: "Method and sources",
        items: [
          "Compared the packages, limits, and FAQ on basecamp.com/pricing with the plans on basecamp.com/try-basecamp. Both pages were fetched on 12 October 2026. No customer research and no experiment log are included.",
          "Limitation: the two pages were both public on that date and they disagree. This entry does not know which page a given signup shows, and it does not report a test that chose between them."
        ],
        sources: [
          {
            title: "Basecamp pricing",
            publisher: "Basecamp",
            url: "https://basecamp.com/pricing",
            accessedAt: "2026-10-12"
          },
          {
            title: "Try Basecamp",
            publisher: "Basecamp",
            url: "https://basecamp.com/try-basecamp",
            accessedAt: "2026-10-12"
          }
        ]
      },
      {
        type: "paragraphs",
        title: "Analysis",
        items: [
          "basecamp.com/pricing leads with fixed prices and no per-user fees. The packages listed that day were Free (1 project, 1 GB, 5 users), Freelancer at $25 per month (3 active projects, 5 GB, 20 users), Studio at $59 per month (10 active projects, 25 GB, unlimited users), Pro at $99 per month (25 active projects, 100 GB), and Unlimited at $299 per month billed annually (unlimited projects, 1 TB). Unlimited can add 5 TB of storage for $100 per month. The FAQ says a paid package can move down only when current usage fits the lower one, that every person added counts as a user, and that Studio and above include unlimited users. Basecamp says there that it pioneered the all-inclusive package and has offered it for over a decade.",
          "basecamp.com/try-basecamp, the same day, described Basecamp Plus at $15 per user per month, with optional Timesheet and Admin Pro Pack upgrades, and said guests and clients are not billed. It also described Basecamp Pro Unlimited at $299 per month billed annually, or $349 per month paid monthly, with those upgrades included. The signup links on that page point at 3.basecamp.com."
        ]
      },
      {
        type: "list",
        title: "Key findings",
        items: [
          "The pricing page is a fixed-price list. What changes between packages is the project cap, storage, and — on Free and Freelancer — the user cap. A storage add-on is published for Unlimited.",
          "A second Basecamp URL still publishes a per-user price and named add-ons, and it treats guests differently from the pricing-page FAQ.",
          "Both pages are public offers. What they do not provide is which offer a new customer is shown, or any experiment result."
        ]
      },
      {
        type: "list",
        title: "Recommendation or implications",
        label: "Parag's interpretation",
        className: "interpretation-section",
        items: [
          "Cite the page you actually opened. The two URLs above are not interchangeable.",
          "These pages state prices and limits. They do not state conversion, churn, or willingness to pay."
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
