export const metadata = {
  title: "ALCEEL · Assistent",
  description: "Chatbot ALCEEL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
