import { analyses, products, profile } from "./portfolio.js";

export const SITE_NAME = profile.name;

const productPath = (slug) => `/work/products/${slug}`;
const analysisPath = (slug) => `/work/analysis/${slug}`;

const route = (path, title, description, extra = {}) => ({
  path,
  title,
  description,
  ...extra
});

/**
 * Every BrowserRouter path that should exist as a file on GitHub Pages.
 * Unknown addresses stay on 404.html and keep a 404 status.
 */
export const listStaticRoutes = () => {
  const routes = [
    route("/", `${profile.name}, ${profile.title}`, profile.positioning, {
      markdown: "/index.md"
    }),
    route("/work", `Work — ${SITE_NAME}`, "Products and independent analysis.", {
      markdown: "/work.md"
    }),
    route("/contact", `Contact — ${SITE_NAME}`, "Email, LinkedIn, and GitHub.", {
      markdown: "/contact.md"
    }),
    route("/about", `${profile.name}, ${profile.title}`, profile.positioning, {
      canonicalPath: "/"
    }),
    route("/projects", `Work — ${SITE_NAME}`, "Products and independent analysis.", {
      canonicalPath: "/work"
    }),
    route("/terminal", `Terminal — ${SITE_NAME}`, "A secondary terminal view of the same portfolio.")
  ];

  products.forEach((product) => {
    const canonical = productPath(product.slug);
    const description = product.summary;
    const title = `${product.name} — ${SITE_NAME}`;
    routes.push(route(canonical, title, description, {
      markdown: `${canonical}.md`
    }));
    routes.push(route(`/work/project/${product.slug}`, title, description, {
      canonicalPath: canonical,
      markdown: `${canonical}.md`
    }));
    routes.push(route(`/projects/${product.slug}`, title, description, {
      canonicalPath: canonical
    }));
  });

  analyses.forEach((analysis) => {
    const canonical = analysisPath(analysis.slug);
    const description = analysis.summary;
    const title = `${analysis.title} — ${SITE_NAME}`;
    routes.push(route(canonical, title, description, {
      markdown: `${canonical}.md`
    }));
    routes.push(route(`/work/project/${analysis.slug}`, title, description, {
      canonicalPath: canonical,
      markdown: `${canonical}.md`
    }));
    const legacyIds = [...new Set([analysis.slug, analysis.legacySlug].filter(Boolean))];
    legacyIds.forEach((id) => {
      routes.push(route(`/projects/${id}`, title, description, {
        canonicalPath: canonical
      }));
    });
  });

  return routes;
};

export const notFoundRoute = route(
  "/404",
  `Page not found — ${SITE_NAME}`,
  "This address is not a page on the site."
);

export const routeIndexPath = (routePath) => {
  if (!routePath || routePath === "/") return "index.html";
  return `${routePath.replace(/^\/+/, "").replace(/\/+$/, "")}/index.html`;
};

const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const absoluteUrl = (siteUrl, path) => {
  const root = siteUrl.replace(/\/+$/, "");
  if (!path || path === "/") return `${root}/`;
  return `${root}${path.startsWith("/") ? path : `/${path}`}`;
};

const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    throw new Error(`index.html is missing a tag: ${pattern}`);
  }
  return html.replace(pattern, replacement);
};

/**
 * Rewrites the built shell's title and social tags for one route.
 * Asset URLs stay absolute, so the same shell works in a nested directory.
 */
export const applyRouteMeta = (html, entry, siteUrl) => {
  const title = escapeHtml(entry.title);
  const description = escapeHtml(entry.description);
  const pageUrl = escapeHtml(absoluteUrl(siteUrl, entry.canonicalPath || entry.path));
  let next = html;

  next = replaceTag(next, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  next = replaceTag(
    next,
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`
  );
  next = replaceTag(
    next,
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${pageUrl}" />`
  );
  next = replaceTag(
    next,
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${title}" />`
  );
  next = replaceTag(
    next,
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${description}" />`
  );
  next = replaceTag(
    next,
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  next = replaceTag(
    next,
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`
  );

  const canonicalTag = `<link rel="canonical" href="${pageUrl}" />`;
  if (next.includes('rel="canonical"')) {
    next = replaceTag(next, /<link rel="canonical" href="[^"]*"\s*\/>/, canonicalTag);
  } else {
    next = replaceTag(
      next,
      /<link rel="alternate" type="text\/plain"/,
      `${canonicalTag}\n        <link rel="alternate" type="text/plain"`
    );
  }

  const markdownPattern = /<link rel="alternate" type="text\/markdown" href="[^"]*"\s*\/>/;
  if (entry.markdown) {
    const markdownUrl = escapeHtml(absoluteUrl(siteUrl, entry.markdown));
    next = replaceTag(
      next,
      markdownPattern,
      `<link rel="alternate" type="text/markdown" href="${markdownUrl}" />`
    );
  } else if (markdownPattern.test(next)) {
    next = next.replace(/\n\s*<link rel="alternate" type="text\/markdown" href="[^"]*"\s*\/>/, "");
  }

  return next;
};
