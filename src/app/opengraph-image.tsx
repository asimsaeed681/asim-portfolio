import { ImageResponse } from "next/og";

export const alt = "Asim Saeed — AI-orchestration systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #14151d 0%, #101117 60%)",
          padding: "72px",
          color: "#edece7",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#9698a6" }}>
          AI-ORCHESTRATION SYSTEMS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 116, fontWeight: 700, letterSpacing: -4, fontFamily: "sans-serif" }}>
            Asim Saeed
          </div>
          <div style={{ fontSize: 30, color: "#c3c4cd", maxWidth: 900, lineHeight: 1.4 }}>
            The orchestration, automation, and tooling that turn a prompt into
            shipped output.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: "#9698a6" }}>
          <span style={{ width: 12, height: 12, borderRadius: 12, border: "2px solid #9698a6" }} />
          IN
          <span style={{ color: "#3b5bff" }}>────────▶</span>
          <span style={{ width: 12, height: 12, borderRadius: 12, background: "#5fe3c7" }} />
          <span style={{ color: "#5fe3c7" }}>OUT</span>
          <span style={{ marginLeft: "auto", color: "#64656f" }}>github.com/asimsaeed681</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
