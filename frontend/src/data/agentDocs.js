import { analyses, productStatuses, products, profile } from "./portfolio.js";

export const SITE_URL = "https://parag-amrutkar.github.io";

export const JSON_LD_START = "<!-- agent:json-ld:start -->";
export const JSON_LD_END = "<!-- agent:json-ld:end -->";

const siteRoot = (siteUrl) => siteUrl.replace(/\/+$/, "");

export const absoluteUrl = (siteUrl, path) => {
  const root = siteRoot(siteUrl);
  if (!path || path === "/") return `${root}/`;
  return `${root}${path.startsWith("/") ? path : `/${path}`}`;
};

const productHtmlPath = (slug) => `/work/products/${slug}`;
const analysisHtmlPath = (slug) => `/work/analysis/${slug}`;

const markdownPath = (htmlPath) => (htmlPath === "/" ? "/index.md" : `${htmlPath}.md`);

const oneLine = (text) => String(text).replace(/\s+/g, " ").trim();

const formatDate = (value, precision) => {
  if (!value) return null;
  if (precision === "year" || /^\d{4}$/.test(value)) return `${value} (year only)`;
  return value;
};

const sectionHasContent = (section) => {
  switch (section?.type) {
    case "paragraphs":
      return Boolean(section.items?.length || section.sources?.length);
    case "steps":
      return Boolean(section.steps?.length || section.body);
    case "quote":
      return Boolean(section.text);
    case "list":
      return Boolean(section.items?.length);
    case "sources":
      return Boolean(section.sources?.length);
    default:
      return false;
  }
};

const renderSourceList = (sources) => {
  if (!sources?.length) return "";
  return sources.map((source) => {
    const detail = [source.publisher, source.accessedAt ? `accessed ${source.accessedAt}` : ""]
      .filter(Boolean)
      .join(", ");
    const link = `[${source.title}](${source.url})`;
    return detail ? `- ${link} — ${detail}` : `- ${link}`;
  }).join("\n");
};

const renderListItem = (item) => (
  typeof item === "string" ? `- ${item}` : `- **${item.label}:** ${item.text}`
);

const renderSection = (section) => {
  if (!sectionHasContent(section)) return "";

  const parts = [];
  if (section.title) parts.push(`## ${section.title}`);

  if (section.type === "paragraphs") {
    if (section.items?.length) parts.push(section.items.join("\n\n"));
    const sources = renderSourceList(section.sources);
    if (sources) parts.push(sources);
  }

  if (section.type === "steps") {
    if (section.steps?.length) {
      parts.push(section.steps.map((step, index) => `${index + 1}. ${step}`).join("\n"));
    }
    if (section.body) parts.push(section.body);
  }

  if (section.type === "quote") {
    parts.push(`> ${section.text}`);
    if (section.body) parts.push(section.body);
  }

  if (section.type === "list") {
    if (section.label) parts.push(section.label);
    parts.push(section.items.map(renderListItem).join("\n"));
  }

  if (section.type === "sources") {
    const sources = renderSourceList(section.sources);
    if (sources) parts.push(sources);
  }

  return parts.join("\n\n");
};

const renderSections = (sections) => (sections || [])
  .map(renderSection)
  .filter(Boolean)
  .join("\n\n");

const renderEvidence = (evidence) => {
  if (!evidence?.length) return "";
  const items = evidence.map((item) => {
    if (item.type === "image" && item.url) {
      const image = `![${item.alt || item.label}](${item.url})`;
      return item.description ? `- ${image}: ${item.description}` : `- ${image}`;
    }
    if (item.url) return `- [${item.label}](${item.url}): ${item.description}`;
    return `- **${item.label}:** ${item.description}`;
  });
  return ["## Evidence", items.join("\n")].join("\n\n");
};

const renderLinks = (links) => {
  if (!links?.length) return "";
  const items = links.map((link) => `- [${link.label}](${link.url})`);
  return ["## Links", items.join("\n")].join("\n\n");
};

const document = (htmlUrl, body) => `${htmlUrl}\n\n${body.trim()}\n`;

export const renderProductMarkdown = (product, siteUrl = SITE_URL) => {
  const htmlPath = productHtmlPath(product.slug);
  const parts = [
    `# ${product.headline}`,
    `Product: ${product.name}`,
    `Status: ${productStatuses[product.status]}`
  ];
  if (product.affiliationNote) parts.push(product.affiliationNote);
  if (product.subheadline) parts.push(product.subheadline);
  const sections = renderSections(product.sections);
  if (sections) parts.push(sections);
  const links = renderLinks(product.links);
  if (links) parts.push(links);
  const evidence = renderEvidence(product.evidence);
  if (evidence) parts.push(evidence);
  return document(absoluteUrl(siteUrl, htmlPath), parts.join("\n\n"));
};

export const renderAnalysisMarkdown = (analysis, siteUrl = SITE_URL) => {
  const htmlPath = analysisHtmlPath(analysis.slug);
  const parts = [`# ${analysis.title}`];
  if (analysis.topic) parts.push(`Analysis · ${analysis.topic}`);
  const published = formatDate(analysis.publishedAt, analysis.publishedPrecision);
  if (published) parts.push(`Published: ${published}`);
  const updated = formatDate(analysis.updatedAt, analysis.updatedPrecision);
  if (updated) parts.push(`Last updated: ${updated}`);
  if (analysis.tags?.length) parts.push(`Focus: ${analysis.tags.join(", ")}`);
  if (analysis.affiliationNote) parts.push(analysis.affiliationNote);
  if (analysis.summary) parts.push(analysis.summary);
  const sections = renderSections(analysis.sections);
  if (sections) parts.push(sections);
  const links = renderLinks(analysis.links);
  if (links) parts.push(links);
  const evidence = renderEvidence(analysis.evidence);
  if (evidence) parts.push(evidence);
  return document(absoluteUrl(siteUrl, htmlPath), parts.join("\n\n"));
};

const workLink = (siteUrl, title, htmlPath, description) => {
  const page = absoluteUrl(siteUrl, htmlPath);
  const markdown = absoluteUrl(siteUrl, markdownPath(htmlPath));
  return `- [${title}](${page}): ${oneLine(description)}\n  Markdown: ${markdown}`;
};

export const renderHomeMarkdown = (siteUrl = SITE_URL) => {
  const featured = products.filter((product) => product.featured).slice(0, 3);
  const parts = [
    `# ${profile.name}`,
    profile.title,
    `> ${profile.positioning}`
  ];
  if (profile.location) parts.push(profile.location);
  if (featured.length) {
    parts.push("## Recent work");
    parts.push(featured.map((product) => workLink(
      siteUrl,
      product.name,
      productHtmlPath(product.slug),
      `${productStatuses[product.status]}. ${product.summary}`
    )).join("\n"));
  }
  parts.push(`Every product and analysis is listed at ${absoluteUrl(siteUrl, "/work")}.`);
  return document(absoluteUrl(siteUrl, "/"), parts.join("\n\n"));
};

export const renderWorkMarkdown = (siteUrl = SITE_URL) => {
  const productList = products.map((product) => workLink(
    siteUrl,
    product.name,
    productHtmlPath(product.slug),
    `${productStatuses[product.status]}. ${product.summary}`
  )).join("\n");
  const analysisList = analyses.map((analysis) => workLink(
    siteUrl,
    analysis.title,
    analysisHtmlPath(analysis.slug),
    analysis.summary
  )).join("\n");
  const parts = [
    "# Work Highlights",
    "## Products",
    productList,
    "## Analysis",
    analysisList
  ];
  return document(absoluteUrl(siteUrl, "/work"), parts.join("\n\n"));
};

export const renderContactMarkdown = (siteUrl = SITE_URL) => {
  const parts = [
    "# Send me a note",
    [
      `- Email: ${profile.email}`,
      `- LinkedIn: ${profile.linkedin}`,
      `- GitHub: ${profile.github}`
    ].join("\n"),
    "The page also includes a contact form. Email is the direct way to reach Parag."
  ];
  return document(absoluteUrl(siteUrl, "/contact"), parts.join("\n\n"));
};

const pageDocuments = (siteUrl) => [
  renderHomeMarkdown(siteUrl),
  renderWorkMarkdown(siteUrl),
  renderContactMarkdown(siteUrl),
  ...products.map((product) => renderProductMarkdown(product, siteUrl)),
  ...analyses.map((analysis) => renderAnalysisMarkdown(analysis, siteUrl))
];

export const renderLlmsTxt = (siteUrl = SITE_URL) => {
  const entries = [
    `- [Home](${absoluteUrl(siteUrl, "/index.md")}): ${profile.title}`,
    `- [Work](${absoluteUrl(siteUrl, "/work.md")}): Products and independent analysis`,
    `- [Contact](${absoluteUrl(siteUrl, "/contact.md")}): Email, LinkedIn, and GitHub`,
    ...products.map((product) => (
      `- [${product.name}](${absoluteUrl(siteUrl, `${productHtmlPath(product.slug)}.md`)}): ${productStatuses[product.status]}. ${oneLine(product.summary)}`
    )),
    ...analyses.map((analysis) => (
      `- [${analysis.title}](${absoluteUrl(siteUrl, `${analysisHtmlPath(analysis.slug)}.md`)}): ${oneLine(analysis.summary)}`
    ))
  ];

  return [
    `# ${profile.name}`,
    "",
    `> ${profile.positioning}`,
    "",
    `${profile.title}. Status labels and limitation text are part of the content.`,
    "",
    "## Portfolio",
    "",
    entries.join("\n"),
    "",
    "## Full content",
    "",
    `- [Full portfolio](${absoluteUrl(siteUrl, "/llms-full.txt")}): Home, work, contact, and every work item in one file.`,
    ""
  ].join("\n");
};

export const renderLlmsFull = (siteUrl = SITE_URL) => {
  const intro = [
    `# ${profile.name}`,
    "",
    `> ${profile.positioning}`,
    "",
    "Status labels and limitation text are part of the content. This file is the full text of the portfolio."
  ].join("\n");
  return `${[intro, ...pageDocuments(siteUrl).map((page) => page.trimEnd())].join("\n\n---\n\n")}\n`;
};

export const renderRobotsTxt = (siteUrl = SITE_URL) => [
  "User-Agent: *",
  "Allow: /",
  "",
  `Sitemap: ${absoluteUrl(siteUrl, "/sitemap.xml")}`,
  ""
].join("\n");

const escapeXml = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

export const renderSitemap = (siteUrl = SITE_URL) => {
  const paths = [
    "/",
    "/work",
    "/contact",
    ...products.map((product) => productHtmlPath(product.slug)),
    ...analyses.map((analysis) => analysisHtmlPath(analysis.slug))
  ];
  const urls = paths.map((path) => `  <url><loc>${escapeXml(absoluteUrl(siteUrl, path))}</loc></url>`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    ""
  ].join("\n");
};

export const renderAgentFiles = (siteUrl = SITE_URL) => {
  const files = {
    "llms.txt": renderLlmsTxt(siteUrl),
    "llms-full.txt": renderLlmsFull(siteUrl),
    "index.md": renderHomeMarkdown(siteUrl),
    "work.md": renderWorkMarkdown(siteUrl),
    "contact.md": renderContactMarkdown(siteUrl),
    "robots.txt": renderRobotsTxt(siteUrl),
    "sitemap.xml": renderSitemap(siteUrl)
  };

  products.forEach((product) => {
    files[`work/products/${product.slug}.md`] = renderProductMarkdown(product, siteUrl);
  });
  analyses.forEach((analysis) => {
    files[`work/analysis/${analysis.slug}.md`] = renderAnalysisMarkdown(analysis, siteUrl);
  });

  return files;
};

export const renderJsonLd = (siteUrl = SITE_URL) => JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      url: absoluteUrl(siteUrl, "/"),
      email: `mailto:${profile.email}`,
      sameAs: [profile.linkedin, profile.github]
    },
    {
      "@type": "WebSite",
      name: profile.name,
      url: absoluteUrl(siteUrl, "/"),
      description: profile.positioning
    }
  ]
}, null, 2);

export const applyJsonLd = (html, siteUrl = SITE_URL) => {
  const start = html.indexOf(JSON_LD_START);
  const end = html.indexOf(JSON_LD_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error("index.html is missing agent JSON-LD markers");
  }
  const lineStart = html.lastIndexOf("\n", start) + 1;
  const endLine = html.indexOf("\n", end + JSON_LD_END.length);
  const after = endLine === -1 ? "" : html.slice(endLine);
  const script = [
    '<script type="application/ld+json">',
    renderJsonLd(siteUrl),
    "</script>"
  ].join("\n");
  const indented = script.split("\n").map((line) => `        ${line}`).join("\n");
  const block = `        ${JSON_LD_START}\n${indented}\n        ${JSON_LD_END}`;
  return `${html.slice(0, lineStart)}${block}${after}`;
};
