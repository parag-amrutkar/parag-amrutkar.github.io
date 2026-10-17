import fs from "fs";
import path from "path";
import { renderAgentFiles, SITE_URL } from "./agentDocs";
import {
  analyses,
  getLegacyWorkPath,
  products,
  productStatuses,
  profile
} from "./portfolio";
import { applyRouteMeta, listStaticRoutes, routeIndexPath } from "./staticRoutes";

const sectionItemText = (item) => (
  typeof item === "string" ? item : `${item.label}: ${item.text}`
);

const sectionBody = (entry) => (entry.sections || []).flatMap((section) => [
  section.title,
  section.body,
  section.text,
  section.label,
  ...(section.items || []).map(sectionItemText),
  ...(section.steps || [])
].filter(Boolean)).join(" ");

describe("portfolio content contracts", () => {
  test("profile GitHub URL points at the public account", () => {
    expect(profile.github).toBe("https://github.com/parag-amrutkar");
    expect(profile.title).toBe("Sr. Technical Product Manager");
    expect(profile.linkedin).toBe("https://linkedin.com/in/parag-amrutkar");
  });

  test("products use controlled statuses and required public fields", () => {
    products.forEach((product) => {
      expect(product.type).toBe("product");
      expect(product.name).toBeTruthy();
      expect(product.summary).toBeTruthy();
      expect(productStatuses[product.status]).toBeTruthy();
    });
  });

  test("featured products are the three public-repo entries", () => {
    const featured = products.filter((product) => product.featured).map((product) => product.slug);
    expect(featured).toEqual(["beacon-box", "ai-shopping-assistant", "docnotes-rag"]);

    const etsy = products.find((product) => product.slug === "etsy-smartlist");
    expect(etsy).toBeTruthy();
    expect(etsy.featured).toBe(false);
  });

  test("Beacon Box role is not sole-builder and names collaborators from project context", () => {
    const beacon = products.find((product) => product.slug === "beacon-box");
    const roleText = beacon.role.join(" ");

    expect(roleText.toLowerCase()).not.toMatch(/\bsole\b/);
    expect(roleText).toMatch(/product owner/i);
    expect(roleText).toMatch(/Joaquin/);
    expect(roleText).toMatch(/Andrew/);
  });

  test("Beacon Box detail copy describes discovery, comparison, and location", () => {
    const beacon = products.find((product) => product.slug === "beacon-box");
    const sectionText = sectionBody(beacon);
    const publicText = [
      beacon.summary,
      sectionText,
      ...beacon.solution,
      ...beacon.outcomes,
      ...beacon.evidence.map((item) => item.description)
    ].join(" ");

    expect(beacon.headline).toBe("Beacon Box helps in-store shoppers find the right product faster");
    expect(beacon.subheadline).toMatch(/discover, compare, and locate products/i);
    expect(sectionText).toMatch(/Ask/);
    expect(sectionText).toMatch(/Discover/);
    expect(sectionText).toMatch(/Compare/);
    expect(sectionText).toMatch(/Find/);
    expect(sectionText).toMatch(/What if you could just ask the store/);
    expect(sectionText).toMatch(/Make discovering products in a physical store as simple as searching for them online/);
    expect(sectionText).toMatch(/Shoppers: Spend less time searching/);
    expect(sectionText).toMatch(/Store associates:/);
    expect(sectionText).toMatch(/Retailers:/);
    expect(beacon.summary.toLowerCase()).not.toMatch(/is meant to get/);
    expect(publicText).toMatch(/demo_simulated/);
    expect(publicText.toLowerCase()).toMatch(/does not link a public live kiosk/);
    expect(publicText).not.toMatch(/README voice section/);
    expect(beacon.status).toBe("prototype");
  });

  test("detail bodies are ordered sections and differ between products and analyses", () => {
    const productTypes = new Set(products.flatMap((product) => product.sections.map((section) => section.type)));
    const analysisTypes = new Set(analyses.flatMap((analysis) => analysis.sections.map((section) => section.type)));

    const baseSections = ["The Problem", "The Product", "How It Works", "The Vision"];

    products.forEach((product) => {
      expect(product.headline).toBeTruthy();
      expect(product.subheadline).toBeTruthy();
      const titles = product.sections.map((section) => section.title);
      if (product.slug === "beacon-box" || product.slug === "ai-shopping-assistant" || product.slug === "docnotes-rag") {
        expect(titles).toEqual([...baseSections, "Impact"]);
      } else if (product.slug === "deals-tracker") {
        expect(titles).toEqual(["The Problem", "The Product", "My role", "Stack", "Key decisions and tradeoffs", "Current status"]);
      } else {
        expect(titles).toEqual(baseSections);
        expect(titles).not.toContain("Impact");
      }
    });

    analyses.forEach((analysis) => {
      const text = sectionBody(analysis);
      expect(analysis.sections.map((section) => section.title)).toEqual([
        "Question or thesis",
        "Why it matters",
        "Method and sources",
        "Analysis",
        "Key findings",
        "Recommendation or implications"
      ]);
      expect(analysis.sections.some((section) => section.type === "steps" || section.type === "quote")).toBe(false);
      expect(text).toContain(analysis.summary);
      analysis.whyItMatters.forEach((item) => expect(text).toContain(item));
      analysis.method.forEach((item) => expect(text).toContain(item));
      analysis.analysis.forEach((item) => expect(text).toContain(item));
      analysis.findings.forEach((item) => expect(text).toContain(item));
      analysis.recommendations.forEach((item) => expect(text).toContain(item));
    });

    expect(productTypes.has("steps")).toBe(true);
    expect(productTypes.has("quote")).toBe(true);
    expect(analysisTypes.has("list")).toBe(true);
    expect(analysisTypes.has("steps")).toBe(false);
  });

  test("analyses cite the public pages their claims use", () => {
    expect(analyses.map((analysis) => analysis.slug)).toEqual([
      "disney-plus-ml",
      "basecamp-pricing-strategy"
    ]);
    analyses.forEach((analysis) => {
      expect(analysis.featured).toBe(true);
      expect(analysis.sources.length).toBeGreaterThan(0);
      const cited = new Set(analysis.sources.map((source) => source.url));
      analysis.sections
        .flatMap((section) => section.sources || [])
        .forEach((source) => {
          expect(cited.has(source.url)).toBe(true);
          expect(source.title).toBeTruthy();
          expect(source.publisher).toBeTruthy();
          expect(source.accessedAt).toBe("2026-10-12");
          expect(source.url).toMatch(/^https:\/\//);
        });
    });

    const disney = analyses.find((analysis) => analysis.slug === "disney-plus-ml");
    const disneyText = sectionBody(disney);
    expect(disneyText).toMatch(/do not describe thumbnail selection/);
    expect(disneyText).toMatch(/For You/);
    expect(disney.sources.map((source) => source.url)).toEqual([
      "https://thewaltdisneycompany.com/news/disney-spotlights-comprehensive-direct-to-consumer-strategy-at-2019-investor-day",
      "https://www.disneyplus.com/explore/articles/disney-plus-app-redesign-new-features"
    ]);

    const basecamp = analyses.find((analysis) => analysis.slug === "basecamp-pricing-strategy");
    const basecampText = sectionBody(basecamp);
    expect(basecampText).toMatch(/\$299/);
    expect(basecampText).toMatch(/\$15 per user/);
    expect(basecampText).toMatch(/they do not provide is which offer/);
    expect(basecamp.sources.map((source) => source.url)).toEqual([
      "https://basecamp.com/pricing",
      "https://basecamp.com/try-basecamp"
    ]);
  });

  test("new products link only to verified GitHub repositories", () => {
    const expectedLinks = {
      "beacon-box": "https://github.com/parag-amrutkar/supermarket-info-display",
      "ai-shopping-assistant": "https://github.com/parag-amrutkar/ai-shopping-assistant",
      "docnotes-rag": "https://github.com/parag-amrutkar/documentation-rag-extension"
    };

    const expectedEvidence = {
      "beacon-box": [
        "https://github.com/parag-amrutkar/supermarket-info-display/blob/main/components/kiosk/shopping-chat.tsx",
        "https://github.com/parag-amrutkar/supermarket-info-display/blob/main/docs/shopping-agent-plan.md",
        "https://github.com/parag-amrutkar/supermarket-info-display/tree/main/supabase/migrations"
      ],
      "ai-shopping-assistant": [
        "https://github.com/parag-amrutkar/ai-shopping-assistant/tree/main/extension",
        "https://github.com/parag-amrutkar/ai-shopping-assistant/blob/main/server/src/routes/api.js"
      ],
      "docnotes-rag": [
        "https://github.com/parag-amrutkar/documentation-rag-extension/tree/main/extension",
        "https://github.com/parag-amrutkar/documentation-rag-extension/blob/main/server/app.py"
      ]
    };

    Object.entries(expectedLinks).forEach(([slug, url]) => {
      const product = products.find((item) => item.slug === slug);
      expect(product).toBeTruthy();
      expect(product.links.map((link) => link.url)).toContain(url);
      expect(product.evidence.length).toBeGreaterThan(0);
      const images = product.evidence.filter((item) => item.type === "image");
      if (slug === "beacon-box") {
        expect(images.map((item) => item.url)).toEqual([
          "/evidence/beacon-box/home-ask.webp",
          "/evidence/beacon-box/product-ask.webp",
          "/evidence/beacon-box/wayfinding-lumify.webp",
          "/evidence/beacon-box/wayfinding-nyquil.webp"
        ]);
        images.forEach((item) => {
          expect(item.alt).toBeTruthy();
          expect(item.description).toMatch(/Local production build/);
          expect(fs.existsSync(path.join(__dirname, "../../public", item.url.slice(1)))).toBe(true);
        });
        expect(product.evidence[0].description).toMatch(/no API key/);
      } else {
        expect(images).toEqual([]);
      }
      expectedEvidence[slug].forEach((evidenceUrl) => {
        expect(product.evidence.map((item) => item.url)).toContain(evidenceUrl);
      });
    });
  });

  test("Deals Tracker publishes live access and signed-out evidence without a private repository link", () => {
    const product = products.find((item) => item.slug === "deals-tracker");
    expect(product.status).toBe("live");
    expect(product.links).toEqual([{ label: "View live site", url: "https://deals-tracker-ly4j.onrender.com" }]);
    expect(product.role.join(" ")).toMatch(/directing AI coding agents \(Codex\)/);
    expect(product.role.join(" ")).not.toMatch(/sole/i);
    expect(product.evidence.map((item) => item.url)).toEqual([
      "/evidence/deals-tracker/dashboard.webp",
      "/evidence/deals-tracker/deals-list.webp",
      "/evidence/deals-tracker/deal-detail.webp"
    ]);
    product.evidence.forEach((item) => {
      expect(item.alt).toBeTruthy();
      expect(item.description).toMatch(/signed out, captured 2026-10-17/);
      expect(fs.existsSync(path.join(__dirname, "../../public", item.url.slice(1)))).toBe(true);
    });
    const markdown = renderAgentFiles(SITE_URL)["work/products/deals-tracker.md"];
    expect(markdown).toContain("View live site");
    expect(markdown).toContain("invited");
    expect(markdown).not.toContain([profile.github, product.slug].join("/"));
    expect(listStaticRoutes().map((entry) => entry.path)).toContain("/work/products/deals-tracker");
  });

  test("product plates resolve to committed illustration files", () => {
    const expectedPlates = {
      "beacon-box": "plate-beacon-box",
      "ai-shopping-assistant": "shopping_assistant_transparent",
      "docnotes-rag": "plate-docnotes-rag",
      "etsy-smartlist": "plate-etsy-smartlist",
      "deals-tracker": "plate-product"
    };
    const dir = path.join(__dirname, "../../public/illustrations");
    const webpOnly = new Set([
      "plate-beacon-box",
      "shopping_assistant_transparent",
      "plate-docnotes-rag"
    ]);
    Object.entries(expectedPlates).forEach(([slug, plate]) => {
      const product = products.find((item) => item.slug === slug);
      expect(product.plate).toBe(plate);
      expect(fs.existsSync(path.join(dir, `${plate}.webp`))).toBe(true);
      expect(fs.existsSync(path.join(dir, `${plate}@2x.webp`))).toBe(true);
      if (webpOnly.has(plate)) {
        expect(product.plateAlt).toBeTruthy();
        expect(fs.existsSync(path.join(dir, `${plate}.png`))).toBe(false);
        expect(fs.existsSync(path.join(dir, `${plate}@2x.png`))).toBe(false);
      } else {
        expect(fs.existsSync(path.join(dir, `${plate}.png`))).toBe(true);
        expect(fs.existsSync(path.join(dir, `${plate}@2x.png`))).toBe(true);
      }
    });

    expect(fs.existsSync(path.join(dir, "hero-two-modes.webp"))).toBe(true);
    expect(fs.existsSync(path.join(dir, "hero-two-modes.png"))).toBe(false);
    expect(fs.existsSync(path.join(dir, "hero-two-modes@2x.png"))).toBe(false);
  });

  test("analyses have publication dates and analysis-specific fields", () => {
    analyses.forEach((analysis) => {
      expect(analysis.type).toBe("analysis");
      expect(analysis.title).toBeTruthy();
      expect(analysis.publishedAt).toBeTruthy();
      expect(analysis.method.length).toBeGreaterThan(0);
      expect(analysis.findings.length).toBeGreaterThan(0);
    });
  });

  test("llms.txt links every work item and the full text", () => {
    const llms = renderAgentFiles(SITE_URL)["llms.txt"];
    expect(llms).toContain(`${SITE_URL}/llms-full.txt`);
    products.forEach((product) => {
      expect(llms).toContain(`${SITE_URL}/work/products/${product.slug}.md`);
    });
    analyses.forEach((analysis) => {
      expect(llms).toContain(`${SITE_URL}/work/analysis/${analysis.slug}.md`);
    });
  });

  test("Beacon Box markdown keeps status, affiliation, evidence, and repository", () => {
    const markdown = renderAgentFiles(SITE_URL)["work/products/beacon-box.md"];
    const beacon = products.find((product) => product.slug === "beacon-box");

    expect(markdown.startsWith(`${SITE_URL}/work/products/beacon-box\n`)).toBe(true);
    expect(markdown).toContain("Status: Prototype");
    expect(markdown).toContain(beacon.affiliationNote);
    expect(markdown).toContain("https://github.com/parag-amrutkar/supermarket-info-display");
    expect(markdown).toContain(beacon.evidence[0].description);
  });

  test("analysis markdown keeps affiliation and interpretation label", () => {
    const markdown = renderAgentFiles(SITE_URL)["work/analysis/disney-plus-ml.md"];
    const analysis = analyses.find((item) => item.slug === "disney-plus-ml");

    expect(markdown).toContain(analysis.affiliationNote);
    expect(markdown).toContain("Parag's interpretation");
  });

  test("sitemap lists HTML work URLs and omits markdown", () => {
    const sitemap = renderAgentFiles(SITE_URL)["sitemap.xml"];

    expect(sitemap).not.toContain(".md");
    expect(sitemap).not.toContain("/terminal");
    expect(sitemap).toContain(`<loc>${SITE_URL}/</loc>`);
    expect(sitemap).toContain(`<loc>${SITE_URL}/work</loc>`);
    expect(sitemap).toContain(`<loc>${SITE_URL}/contact</loc>`);
    products.forEach((product) => {
      expect(sitemap).toContain(`<loc>${SITE_URL}/work/products/${product.slug}</loc>`);
    });
    analyses.forEach((analysis) => {
      expect(sitemap).toContain(`<loc>${SITE_URL}/work/analysis/${analysis.slug}</loc>`);
    });
  });

  test("static route shells cover real paths and leave unknowns to 404.html", () => {
    const routes = listStaticRoutes();
    const paths = routes.map((entry) => entry.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/work");
    expect(paths).toContain("/contact");
    expect(paths).toContain("/about");
    expect(paths).toContain("/projects");
    expect(paths).toContain("/terminal");
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).not.toContain("/missing");

    products.forEach((product) => {
      expect(paths).toContain(`/work/products/${product.slug}`);
      expect(paths).toContain(`/work/project/${product.slug}`);
      expect(paths).toContain(`/projects/${product.slug}`);
    });
    analyses.forEach((analysis) => {
      expect(paths).toContain(`/work/analysis/${analysis.slug}`);
      expect(paths).toContain(`/projects/${analysis.legacySlug}`);
    });

    expect(routeIndexPath("/")).toBe("index.html");
    expect(routeIndexPath("/work/products/beacon-box")).toBe("work/products/beacon-box/index.html");

    const shell = `<!doctype html><html><head>
        <title>Old title</title>
        <meta name="description" content="Old description" />
        <meta property="og:url" content="https://example.com/" />
        <meta property="og:title" content="Old title" />
        <meta property="og:description" content="Old description" />
        <meta name="twitter:title" content="Old title" />
        <meta name="twitter:description" content="Old description" />
        <link rel="alternate" type="text/markdown" href="https://example.com/index.md" />
        <link rel="alternate" type="text/plain" href="https://example.com/llms.txt" />
      </head><body></body></html>`;
    const beacon = routes.find((entry) => entry.path === "/work/products/beacon-box");
    const html = applyRouteMeta(shell, beacon, "https://parag-amrutkar.github.io");
    expect(html).toContain("<title>Beacon Box — Parag Amrutkar</title>");
    expect(html).toContain('property="og:url" content="https://parag-amrutkar.github.io/work/products/beacon-box"');
    expect(html).toContain('rel="canonical" href="https://parag-amrutkar.github.io/work/products/beacon-box"');
    expect(html).toContain("work/products/beacon-box.md");
    expect(html).not.toContain("Old title");
  });

  test("legacy project slugs resolve intentionally", () => {
    expect(getLegacyWorkPath("etsy-smartlist")).toBe("/work/project/etsy-smartlist");
    expect(getLegacyWorkPath("disney-ml")).toBe("/work/project/disney-plus-ml");
    expect(getLegacyWorkPath("basecamp-pricing")).toBe("/work/project/basecamp-pricing-strategy");
    expect(getLegacyWorkPath("missing")).toBe("/work");
  });
});
