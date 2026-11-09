import Frame from "./Frame.jsx";
import { HotspotMap, HotspotList } from "./Hotspot.jsx";
import { useLightbox } from "./lightbox-context.js";

// ─── Annotated mockup (hotspot system) ──────────────────────────────────────
// The annotation layer (.annotated-layer) is locked: the
// HotspotMap stays a direct child so the dots keep their legacy percentage
// geometry. The parity HotspotList lives outside the relative container (in
// flow inside the Frame) so it never shifts the dots' containing block.
// Hotspot y values are percentages of the FULL image, also when cropped.
export default function AnnotatedMockup({
  src,
  alt,
  width,
  height,
  bullets,
  mapId,
  crop,
  scrollable = false,
  observe,
}) {
  const { open } = useLightbox();
  const start = crop?.start ?? 0;
  const span = crop?.span ?? 1;
  const isCropped = Boolean(crop) && span < 0.99;
  const windowRatio = `${width} / ${Number(height) * span}`;
  const caption = observe || "Full page as designed in this project";

  return (
    <div className="annotated-stage">
      {/* A lista de anotacoes fica FORA do browser frame: dentro dele lia como
    parte da pagina mockada. Fora, vira legenda editorial do artefato. */}
      <div className="ms-annotated">
        <Frame variant="browser">
          <div
            className={`annotated-window${scrollable ? " annotated-scroll" : ""}${isCropped ? " annotated-crop-window" : ""}`}
            style={isCropped ? { aspectRatio: windowRatio } : undefined}
            {...(scrollable
              ? { tabIndex: 0, role: "region", "aria-label": "Scrollable page preview" }
              : {})}
          >
            <div
              className={`annotated-layer${isCropped ? " annotated-crop-inner" : ""}`}
              style={isCropped ? { transform: `translateY(-${start * 100}%)` } : undefined}
            >
              <img
                src={src}
                alt={alt}
                className="annotated-img"
                loading="lazy"
                decoding="async"
                width={width}
                height={height}
              />
              <HotspotMap bullets={bullets} mapId={mapId} />
            </div>
          </div>
        </Frame>
        <p className="annotated-full-access">
          {observe ? <span className="annotated-observe">{observe} </span> : null}
          <button
            type="button"
            className="annotated-full-btn"
            onClick={() => open({ src, alt, caption })}
          >
            View full page
          </button>
          {scrollable
            ? " Scroll the capture, or open the full page."
            : isCropped
              ? " Cropped to the decision. Full page remains available."
              : ""}
        </p>
        <HotspotList bullets={bullets} mapId={mapId} />
      </div>
    </div>
  );
}
