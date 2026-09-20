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

  test("new products link only to verified GitHub repositories", () => {
    const expectedLinks = {
      "beacon-box": "https://github.com/parag-amrutkar/supermarket-info-display",
      "ai-shopping-assistant": "https://github.com/parag-amrutkar/ai-shopping-assistant",
      "docnotes-rag": "https://github.com/parag-amrutkar/documentation-rag-extension"
    };

    Object.entries(expectedLinks).forEach(([slug, url]) => {
      const product = products.find((item) => item.slug === slug);
      expect(product).toBeTruthy();
      expect(product.links.map((link) => link.url)).toContain(url);
      expect(product.evidence.length).toBeGreaterThan(0);
    });
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
