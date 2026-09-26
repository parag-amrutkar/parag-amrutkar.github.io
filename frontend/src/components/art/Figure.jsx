import React, { useState } from "react";
import "./Figure.css";

/**
 * An illustration slot.
 *
 * The site is designed to look finished whether or not the artwork exists
 * yet, so a missing plate renders a labelled frame rather than a broken
 * image. The frame occupies exactly the same box as the image would, so
 * dropping art in later causes no layout shift.
 *
 * Paths are absolute on purpose. package.json sets `homepage: "."`, which
 * makes PUBLIC_URL relative -- that resolves correctly at `/` but breaks on
 * nested routes like `/work/products/:slug`, where `./illustrations/x.webp`
 * would be requested from `/work/products/`. This repo deploys to a
 * root-domain user site, so a leading slash is both correct and stable.
 */
const plateLabel = (fig) =>
  typeof fig === "number" ? `Fig. ${String(fig).padStart(2, "0")}` : fig;

const Figure = ({
  name,
  fig,
  caption,
  alt = "",
  ratio = "4 / 3",
  width = 1600,
  height = 1200,
  priority = false,
  className = ""
}) => {
  const [failed, setFailed] = useState(false);
  const base = `/illustrations/${name}`;
  const label = plateLabel(fig);

  const frame = (
    <div className="plate-frame" style={{ "--plate-ratio": ratio }}>
      {failed ? (
        <div className="plate-empty">
          {label && <span className="plate-number">{label}</span>}
        </div>
      ) : (
        <img
          src={`${base}.webp`}
          srcSet={`${base}.webp 1x, ${base}@2x.webp 2x`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );

  // Only reach for <figure>/<figcaption> when there is a caption to attach.
  // A decorative plate with an empty alt has nothing to announce, and an
  // empty figure element would just add noise to the accessibility tree.
  if (!caption) {
    return <div className={`plate ${className}`.trim()}>{frame}</div>;
  }

  return (
    <figure className={`plate ${className}`.trim()}>
      {frame}
      <figcaption>
        {label && <span className="plate-number">{label}</span>}
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
};

export default Figure;
