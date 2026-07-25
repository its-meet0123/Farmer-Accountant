export const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    background: `
      radial-gradient(circle at top left, #1e3a8a 0%, transparent 35%),
      radial-gradient(circle at bottom right, #0f766e 0%, transparent 35%),
      linear-gradient(135deg, #08111f 0%, #111827 45%, #0b1220 100%)
    `,
    fontFamily: "'Inter','Segoe UI',sans-serif",
    color: "#fff",
    paddingBottom: "50px",
    overflowX: "hidden",
  },

  header: {
    textAlign: "center",
    padding: "55px 20px 45px",
  },

  headerTitle: {
    fontSize: "clamp(2.3rem,6vw,3.8rem)",
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-1.5px",
    color: "#fff",
    textShadow: "0 8px 25px rgba(0,0,0,.35)",
  },

  headerSubtitle: {
    marginTop: "15px",
    color: "#9CA3AF",
    fontSize: "1.05rem",
    maxWidth: "650px",
    marginInline: "auto",
    lineHeight: 1.6,
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "28px",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 22px",
  },

  card: {
    height: "280px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "24px",
    overflow: "hidden",

    background: "rgba(255,255,255,.05)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    border: "1px solid rgba(255,255,255,.12)",

    boxShadow:
      "0 10px 35px rgba(0,0,0,.35), inset 0 1px 1px rgba(255,255,255,.05)",

    transition: "all .35s ease",

    position: "relative",
    cursor: "pointer",
  },

  cardHeader: {
    padding: "18px",
    textAlign: "center",

    background:
      "linear-gradient(90deg, rgba(59,130,246,.12), rgba(20,184,166,.12))",

    color: "#F9FAFB",

    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: ".8px",

    borderBottom: "1px solid rgba(255,255,255,.08)",
  },

  scrollArea: {
    flex: 1,
    overflow: "hidden",
  },

  descSlide: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    padding: "15px",
    boxSizing: "border-box",
  },

  contentBox: {
    width: "100%",
    textAlign: "center",
    padding: "15px",
  },

  dataName: {
    margin: 0,
    marginBottom: "18px",
    color: "#F8FAFC",
    fontWeight: 600,
    fontSize: "1.35rem",
    lineHeight: 1.4,
  },

  amountBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",

    padding: "10px 22px",

    borderRadius: "50px",

    background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)",

    color: "#fff",

    fontWeight: 700,
    fontSize: "1.15rem",

    boxShadow: "0 8px 25px rgba(37,99,235,.45)",
  },

  currency: {
    opacity: 0.9,
    fontSize: ".95rem",
  },

  noData: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#94A3B8",
    fontStyle: "italic",
    fontSize: "1rem",
  },

  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "18px",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#475569",
    transition: ".35s",
  },

  activeDot: {
    width: "28px",
    height: "10px",
    borderRadius: "20px",
    background: "linear-gradient(90deg,#3B82F6,#06B6D4)",
  },

  footerBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: "linear-gradient(90deg,#2563EB,#06B6D4,#10B981)",
    zIndex: 999,
  },
};
