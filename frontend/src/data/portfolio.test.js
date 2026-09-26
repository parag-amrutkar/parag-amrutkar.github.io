import fs from "fs";
import path from "path";
import {
  analyses,
  getLegacyWorkPath,
  products,
  productStatuses,
  profile
} from "./portfolio";

describe("portfolio content contracts", () => {
  test("profile GitHub URL points at the public account", () => {
    expect(profile.github).toBe("https://github.com/parag-amrutkar");
    expect(profile.title).toBe("Technical Product Manager");
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

  test("Beacon Box describes voice input and demo-inventory chat without claiming a live kiosk", () => {
    const beacon = products.find((product) => product.slug === "beacon-box");
    const publicText = [
      beacon.summary,
      ...beacon.solution,
      ...beacon.outcomes,
      ...beacon.evidence.map((item) => item.description)
    ].join(" ");

    expect(beacon.summary.toLowerCase()).not.toMatch(/is meant to get/);
    expect(beacon.summary).toMatch(/Ask\. Find\. Pick\./);
    expect(publicText).toMatch(/shopping-assistant chat/i);
    expect(publicText).toMatch(/demo_simulated/);
    expect(publicText.toLowerCase()).toMatch(/does not link a public live kiosk/);
    expect(beacon.status).toBe("prototype");
  });

  test("featured analyses stay off the home page until sources are restored", () => {
    expect(analyses.every((analysis) => analysis.featured === false)).toBe(true);
    expect(analyses.every((analysis) => analysis.sources.length === 0)).toBe(true);
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
      expect(product.evidence.every((item) => item.type !== "image")).toBe(true);
      expectedEvidence[slug].forEach((evidenceUrl) => {
        expect(product.evidence.map((item) => item.url)).toContain(evidenceUrl);
      });
    });
  });

  test("product plates resolve to committed illustration files", () => {
    const expectedPlates = {
      "beacon-box": "plate-beacon-box",
      "ai-shopping-assistant": "plate-ai-shopping-assistant",
      "docnotes-rag": "plate-docnotes-rag",
      "etsy-smartlist": "plate-etsy-smartlist"
    };
    const dir = path.join(__dirname, "../../public/illustrations");
    const webpOnly = new Set([
      "plate-beacon-box",
      "plate-ai-shopping-assistant",
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

  test("legacy project slugs resolve intentionally", () => {
    expect(getLegacyWorkPath("etsy-smartlist")).toBe("/work/products/etsy-smartlist");
    expect(getLegacyWorkPath("disney-ml")).toBe("/work/analysis/disney-plus-ml");
    expect(getLegacyWorkPath("basecamp-pricing")).toBe("/work/analysis/basecamp-pricing-strategy");
    expect(getLegacyWorkPath("missing")).toBe("/work");
  });
});
