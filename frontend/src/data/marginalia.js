/**
 * Margin annotations.
 *
 * DRAFT COPY -- NEEDS OWNER APPROVAL.
 *
 * These lines are voice, not fact. The implementation brief (§17) reserves
 * final wording for Parag, so they are isolated here rather than inlined in
 * components: reviewing and rewriting them should not require touching JSX.
 *
 * They exist to do one job. The portfolio's content is unusually candid about
 * what it cannot prove ("Limitation: ...", "no evidence that ... was
 * measured"). Unannotated, that candor reads as apology. Annotated in the
 * margin, it reads as a standard the author holds on purpose.
 *
 * Rules for anything added here:
 *   - never state a fact about the work; the entry itself does that
 *   - never claim a result, user, or relationship (brief §10)
 *   - keep to roughly 40 characters so the line sits in a true margin
 *
 * Set `approved: true` once Parag has signed off on a line. Unapproved lines
 * still render -- this flag is a review aid, not a feature gate.
 */
export const marginalia = {
  heroPractice: {
    text: "two modes of the same job",
    approved: false
  },
  conceptStatus: {
    text: "no users yet — and I'd rather say so",
    approved: false
  },
  limitationsKept: {
    text: "kept, not hidden",
    approved: false
  },
  capabilitiesEvidence: {
    text: "evidence for each of these is one click away",
    approved: false
  }
};

export default marginalia;
