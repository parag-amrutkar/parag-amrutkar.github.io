import {
  analyses,
  getLegacyWorkPath,
  products,
  productStatuses
} from "./portfolio";

describe("portfolio content contracts", () => {
  test("products use controlled statuses and required public fields", () => {
    products.forEach((product) => {
      expect(product.type).toBe("product");
      expect(product.name).toBeTruthy();
      expect(product.summary).toBeTruthy();
      expect(productStatuses[product.status]).toBeTruthy();
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
