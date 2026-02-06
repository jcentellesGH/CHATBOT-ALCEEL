export const metadata = {
  title: "ALCEEL Chatbot",
  description: "Chatbot ALCEEL amb OpenAI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body>
        {children}
      </body>
    </html>
  );
}
