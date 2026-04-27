export default function ComingSoon() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: 20,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://cdn.prod.website-files.com/6718a432b4ba9a3e675716c0/671f6f1e6a22505244ef1cee_nymb-compressed.gif"
        alt="Coming soon"
        style={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 16,
        }}
      />
      <h1
        style={{
          color: "#fff",
          fontSize: 48,
          fontWeight: 700,
          letterSpacing: -2,
          fontFamily: "Inter, -apple-system, sans-serif",
          textTransform: "uppercase",
        }}
      >
        Coming Soon
      </h1>
    </div>
  );
}
