export const profile = {
  name: "Parag Amrutkar",
  title: "Technical Product Manager",
  positioning: "I build technology products and analyze complex growth, operations, and market problems.",
  introduction: "My work combines product concepts with structured analysis. I focus on framing the problem, making assumptions visible, and showing the reasoning behind each recommendation.",
  email: "paragamrutkar1103@gmail.com",
  linkedin: "https://linkedin.com/in/parag-amrutkar",
  github: "https://github.com/pa1245",
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
    slug: "etsy-smartlist",
    type: "product",
    name: "Etsy SmartList",
    summary: "A product concept for helping marketplace sellers draft listing copy and metadata with an AI-assisted workflow.",
    status: "concept",
    featured: true,
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
    title: "Machine Learning Opportunities for Disney+",
    summary: "An independent case study asking where machine learning could improve discovery, content decisions, and streaming experience.",
    featured: true,
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
      "Limitation: the original portfolio record does not retain a source list, calculations, or primary research. The proposals below are Parag's interpretation and should not be read as verified Disney plans or results."
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
    title: "Basecamp Pricing Strategy",
    summary: "An independent analysis of pricing structures and the tradeoff between revenue options, product simplicity, and customer value.",
    featured: true,
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
      "Limitation: the original portfolio record does not include its underlying calculations, customer research, experiment results, or source list. Recommendations are presented as analysis, not as changes implemented by Basecamp."
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
