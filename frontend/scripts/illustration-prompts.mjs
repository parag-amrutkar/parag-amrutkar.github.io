/**
 * Illustration prompts for the Field Notes plate set.
 *
 * Committed to git on purpose: the prompts are the source, the PNGs are the
 * build output. Regenerating the set, or restyling it later, should start
 * here rather than from a folder of images nobody can reproduce.
 *
 * Run with: node scripts/generate-illustrations.mjs
 */

/**
 * Appended to every prompt so the nine plates read as one hand.
 */
/**
 * PALETTE is stated before anything else and in perceptual language.
 *
 * Hex codes alone do not work: image models treat them as decoration and take
 * their actual cue from the adjectives. The first version of this prompt said
 * "near-black desaturated green (#192421)" and the model drew the entire plate
 * in green ink, because "green" was the only word it acted on.
 *
 * The failure mode to push against is the stock "vintage botanical plate"
 * palette -- yellowed parchment, sage, salmon. Every colour drifted that way
 * at once, so each one now carries explicit negatives.
 */
export const PALETTE = `
PALETTE -- follow exactly. This is the most important instruction in this prompt.

- PAPER GROUND: a warm, soft, slightly grey oat-cream (#f7f3ec). It must look
  like fresh modern drawing paper. NOT yellow, NOT golden, NOT aged parchment,
  NOT antique, NOT sepia, NOT ivory, NOT tea-stained. If the paper reads even
  slightly yellow, it is wrong.

- INK: near-black charcoal (#192421) -- essentially black, with only the
  faintest cool undertone. Every structural line, outline, arrow, arrowhead and
  tick mark is drawn in this near-black ink. THE INK IS NOT GREEN. A viewer
  asked to name the line colour must say "black".

- ACCENT ONE, deep teal-green (#325b50): dark, cool and blue-leaning, the
  colour of aged copper patina or deep pine shadow. NOT sage, NOT olive, NOT
  grass green, NOT emerald, NOT mint, NOT pale, NOT yellow-green.

- ACCENT TWO, burnt sienna (#9b5632): a deep, strongly saturated brick
  red-brown, the colour of a terracotta flowerpot. NOT peach, NOT salmon, NOT
  pink, NOT apricot, NOT pastel, NOT tan, NOT beige, NOT washed out.

The two accents appear only as hatching and small fills, never as line work.
Overall the plate must read as near-black ink on cool cream paper, with the two
accents used sparingly for emphasis.
`.trim();

export const STYLE = `
Hand-drawn technical illustration in the manner of a naturalist's field
notebook or a patent plate. Visible paper tooth and a faint fibrous texture.
Visible pencil under-drawing, slight line wobble, occasional overshooting
strokes where lines cross, as if drawn by hand with a technical pen. Fine
cross-hatching for shading rather than tone. Flat and graphic: no gradients,
no glow, no drop shadows, no 3D render, no bevels, no photographic lighting,
no glossy or vector-clipart finish. The paper is new and clean -- this is a
working notebook in use today, not an antique or a museum artifact. No foxing,
no stains, no torn or burnt edges, no distressing. Generous negative space; the
drawing should sit calmly with wide margins and not fill the frame edge to
edge. Composition centred and balanced.
`.trim();

/**
 * Appended to every prompt as a hard exclusion.
 *
 * The implementation brief (§10) forbids imagery that could be mistaken for
 * evidence that a product exists: no manufactured screenshots, and stock or
 * decorative imagery must never stand in for an artifact. Every plate
 * therefore stays abstract and conceptual. This is a content-integrity rule,
 * not an aesthetic preference -- do not relax it when editing prompts.
 */
export const CONSTRAINTS = `
Absolutely do not depict: a user interface, an app window, a browser window, a
phone or laptop screen, a dashboard, a wireframe, a website mockup, a chart or
graph bearing numbers or data labels, a logo, a brand mark, or any real
company's product. Do not render any legible text, numerals, letters, labels,
or captions anywhere in the image. The drawing must be abstract and conceptual
so that it can never be mistaken for a screenshot or for evidence of a working
product. No people, no faces, no hands.
`.trim();

/**
 * Prepended when running with --recolor, which fixes an off-palette plate
 * without losing a composition that already works. Generating again from
 * scratch would produce a different drawing.
 */
export const RECOLOR = `
Recolour this illustration. Keep the composition, linework, hatching, paper
texture, proportions, margins and every drawn element EXACTLY as they are. Do
not redraw, reposition, resize, add, remove or restyle anything. The output must
be recognisably the same drawing. Change ONLY the colours, to the palette below.
`.trim();

/**
 * `ref: true` means the plate is generated with the hero passed back in as a
 * style reference, so the set inherits one hand. The hero itself is generated
 * first and reviewed before anything else runs.
 */
export const PLATES = [
  {
    name: "hero-two-modes",
    aspect: "4:3",
    ref: false,
    subject: `
      Two abstract forms of equal weight sitting side by side, connected by two
      curving arrows that form a loop between them. On the left, a solid
      geometric form suggesting construction: a stack of nested rectangles with
      fine cross-hatching, drawn with confident straight edges. On the right, an
      open form suggesting observation: a circle with a fine crosshair and a
      series of concentric measuring rings, drawn lighter. The upper arrow
      travels from the observation form to the construction form; the lower
      arrow returns. Small tick marks along both arrows like a measuring scale.
      The whole composition reads as a single closed loop between making and
      examining.
    `
  },
  {
    name: "plate-beacon-box",
    aspect: "1:1",
    ref: true,
    subject: `
      An upright kiosk or beacon tower with a listening disc and quiet signal
      arcs. Aisle path ticks at the base. Deep teal accents only; terracotta
      is absent. Compact, centred, plenty of white space.
    `
  },
  {
    name: "plate-ai-shopping-assistant",
    aspect: "1:1",
    ref: true,
    subject: `
      A blank review-card stack distilled through a funnel into a two-pan
      balance (pros vs cons). Teal and sienna on the pans. Compact, centred.
    `
  },
  {
    name: "plate-docnotes-rag",
    aspect: "1:1",
    ref: true,
    subject: `
      Notebook page frames feeding a small node graph that resolves to a
      single answer-dot. Teal nodes, restrained sienna on the answer.
      Compact, centred.
    `
  },
  {
    name: "plate-etsy-smartlist",
    aspect: "1:1",
    ref: true,
    subject: `
      A branching form: a single stem that divides into many fine filaments,
      each ending in a small open square outline of a slightly different size.
      Suggests one input expanding into many drafted variants. Terracotta is
      absent; deep green accents only. Compact, centred, plenty of white space.
    `
  },
  {
    name: "plate-disney-plus-ml",
    aspect: "1:1",
    ref: true,
    subject: `
      A dense field of small dots with a few curving contour lines drawn
      through it, like isolines on a survey map grouping the dots into
      clusters. Two or three clusters are lightly hatched in terracotta.
      Suggests pattern being found in scattered observations. Compact, centred.
    `
  },
  {
    name: "plate-basecamp-pricing-strategy",
    aspect: "1:1",
    ref: true,
    subject: `
      A balance or lever form: a horizontal beam on a triangular fulcrum, with
      stacked flat discs of differing thickness on each arm, drawn as a clean
      side elevation. Fine hatching on the discs. A dotted arc above shows the
      beam's possible travel. Suggests a trade being weighed. Compact, centred.
    `
  },
  {
    name: "plate-product",
    aspect: "1:1",
    ref: true,
    subject: `
      A generic construction mark for product entries: three nested squares
      seen in slight isometric offset, the innermost lightly hatched in deep
      green, with small corner registration ticks outside the outermost square.
      Compact, centred, restrained.
    `
  },
  {
    name: "plate-analysis",
    aspect: "1:1",
    ref: true,
    subject: `
      A generic examination mark for analysis entries: a circle with a fine
      crosshair and two concentric measuring rings, with a short bracket and
      tick marks along the lower edge. Light terracotta hatching in one
      quadrant only. Compact, centred, restrained.
    `
  },
  {
    name: "about-practice",
    aspect: "3:2",
    ref: true,
    subject: `
      A wide horizontal composition of three loosely connected abstract
      apparatus forms drawn as a single continuous workbench arrangement: on
      the left a funnel narrowing a scatter of marks into a single line; in the
      centre a rectangular frame divided by fine rules with two cells hatched;
      on the right an open caliper measuring the gap between two small solids.
      Thin connecting lines run between them at the base. Suggests framing,
      structuring, then measuring. Wide margins, calm spacing.
    `
  },
  {
    name: "contact-signal",
    aspect: "3:2",
    // The one inverted plate: it sits on the dark contact band, so the
    // PALETTE block's ground and ink roles are deliberately swapped below.
    invertPalette: true,
    ref: true,
    subject: `
      INVERTED PLATE -- this one overrides the PAPER GROUND and INK rules in
      the palette block, and only those. The ground is a solid very dark
      near-black charcoal (#192421) covering the whole frame; there is no cream
      paper. All line work is in warm oat-cream (#f7f3ec). The two accent
      colours keep their roles but are lightened just enough to stay legible on
      the dark ground: a pale patina green and a warm clay sienna. Do not use
      pastel or washed-out versions. Everything else -- hand-drawn technical
      pen, visible wobble, cross-hatching, no gradients -- is unchanged.
      Subject: a single open arc radiating three widening concentric bands from
      a small solid square at the lower left, like a signal leaving a source,
      with fine tick marks along the outermost band. Wide margins.
    `
  },
  {
    name: "not-found",
    aspect: "1:1",
    ref: true,
    subject: `
      A dotted-outline square with one corner missing, and a small solid square
      sitting just outside it at an angle, as if a piece has come loose from
      its place. Three short motion ticks trail behind the loose piece.
      Suggests something filed in the wrong drawer. Compact, centred, wry
      rather than alarming.
    `
  },
  {
    name: "og-image",
    aspect: "16:9",
    ref: true,
    subject: `
      A wide, sparse banner composition. The two-mode loop from the hero plate
      -- a hatched construction form and an open crosshair observation form
      joined by two curving arrows -- placed at the right third of the frame,
      drawn small. The left two-thirds is empty cream paper with only a single
      fine horizontal rule running into the drawing, with small tick marks at
      its left end. Very generous empty space on the left.
    `
  }
];

export default PLATES;
