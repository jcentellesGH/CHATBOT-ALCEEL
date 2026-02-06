"use client";
import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola! Sóc l’assistent d’ALCEEL. En què et puc ajudar?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply || "Sense resposta." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Error de connexió." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "system-ui" }}>
      <div style={{ padding: 12, borderBottom: "1px solid #eee", fontWeight: 700 }}>
        ALCEEL · Assistent
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: 12, background: "#fafafa" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: 520,
              padding: "10px 12px",
              borderRadius: 12,
              background: m.role === "user" ? "#183241" : "#fff",
              color: m.role === "user" ? "#fff" : "#111",
              border: m.role === "user" ? "none" : "1px solid #eee"
            }}>
             <span
  dangerouslySetInnerHTML={{
    __html: m.content.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#1a73e8;text-decoration:underline">$1</a>'
    ),
  }}
/>

            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: 12, borderTop: "1px solid #eee", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Escriu aquí..."
          style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
        />
        <button onClick={send} disabled={loading} style={{ padding: "10px 14px", borderRadius: 10, border: 0, background: "#183241", color: "#fff" }}>
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
