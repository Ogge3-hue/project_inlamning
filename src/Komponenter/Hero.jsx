import React from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Hero = () => {
  return (
    <header style={styles.hero}>
      <div style={styles.navbar}>
        <div style={styles.brand}>Webshop</div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} style={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div style={styles.content}>
        <p style={styles.superscript}>Discover the best products</p>
        <h1 style={styles.title}>Shop smart. Shop fast.</h1>
        <p style={styles.subtitle}>
          Browse our collection and get the latest deals delivered to your door.
        </p>
        <div style={styles.actions}>
          <a href="/shop" style={styles.primaryButton}>
            Start shopping
          </a>
          <a href="/about" style={styles.secondaryButton}>
            Learn more
          </a>
        </div>
      </div>
    </header>
  );
};

const styles = {
  hero: {
    minHeight: "80vh",
    color: "#fff",
    background:
      "linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "700",
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#f8fafc",
    textDecoration: "none",
    fontWeight: "500",
  },
  content: {
    maxWidth: "720px",
  },
  superscript: {
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontSize: "0.85rem",
    marginBottom: "1rem",
    color: "#93c5fd",
  },
  title: {
    fontSize: "3rem",
    lineHeight: "1.05",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "#e2e8f0",
    marginBottom: "2rem",
    maxWidth: "42rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "0.9rem 1.6rem",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#fff",
    padding: "0.9rem 1.6rem",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Hero;