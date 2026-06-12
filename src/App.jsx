import { useState, useRef, useEffect } from "react";

const RESOURCES = `
DIRECT CLICKS RESOURCE HUB
===========================

PPC - GENERAL INFO & SOPs
- PPC Standard Operating Procedure | Doc | https://docs.google.com/document/d/1NQXUve4MJlvnQbxvIx4jnpFb1UZyCyOfkEQJazlgdtU/edit
- PPC Passwords | Sheet | https://docs.google.com/spreadsheets/d/1J1FmF36Dg6XJrNCo13uxmY1iVjSON70QUM83mRBLIBU/edit
- Full Time Employee Training Schedule | Doc | https://docs.google.com/document/d/1-bWzFaExNyG316ytBU3Dyj_9QL7k6tQ5nRcNfo44k68/edit
- Part Time Employee Training Schedule | Doc | https://docs.google.com/document/d/1FnCvk9Y8OxTUHLlMAubBEs1P7ND85qZ1ByXrmoRB77o/edit
- State Farm Acronyms | Doc | https://docs.google.com/document/d/1WqaBLrxz0rMWfh0P2OM8nrBPlfGSeJ7No5Sa-jUhIXc/edit
- Expected Turnaround Times | Doc | https://docs.google.com/document/d/1nYzLC14AzrjFySCbdtBEZWCNAvChpCLVjLSPbYlU8w0/edit
- State Restrictions for State Farm | Sheet | https://docs.google.com/spreadsheets/d/10qm_DoWxRx00t3VlS62VqSvrRXS9nZRd-IKT--WT_4w/edit
- Tracking Codes Cheat Sheet | Doc | https://docs.google.com/document/d/1T5pZ6nJtIqRbvel951LETKmSFae3jmOg3v4wIYNUtyo/edit

PPC - FOR AMs
- Changes AMs Should & Should NOT Do | Doc | https://docs.google.com/document/d/1-qxNBEFfe01-6aZNyUT88ZYbueQWTqR6LA7XA4J42-U/edit
- What Form to Use & When | Doc | https://docs.google.com/document/d/1SI38Frg61oPPr4aSicYVe13hRUzSUh61lh4Xqj3ayxg/edit
- New Client Onboarding Form | Hubspot Form | https://share.hsforms.com/1bxh8x9CUQ5CplFsrLfVfnA50lfs
- Current Account Changes Form | Hubspot Form | https://share.hsforms.com/13MKIhgAnSMGMmuNsa7cX2w50lfs
- Red Alert Form | Hubspot Form | https://share.hsforms.com/1c41FBWAbSJ-E34LqvdTglA50lfs
- PPC New Payment Form | Hubspot Form | https://share.hsforms.com/1AyaDbjePTmS11uwhxWQsaw50lfs
- Advertiser Verification Collection Form | Hubspot Form | https://share.hsforms.com/1ssMKC45YQGag1NRdVRwbHg50lfs
- LSA Verification & Profile Setup SOP | Doc | https://docs.google.com/document/d/14lmZWab-2g4fcACjSirZukx6tbP2BI-jnuyAhYO3uPA/edit

PPC - NEW ACCOUNT SETUP
- How to Add Account Label | Vidyard | https://share.vidyard.com/watch/DY9fsgXcYkyBJ6GwJaYm79
- New Account Setup | Vidyard | https://share.vidyard.com/watch/pg4YPj6LZ2CwAYwoaWA7xG
- Adding Payment Profile | Vidyard | https://share.vidyard.com/watch/3ANHdGhe8XVC5zTvoZwsUr
- Adding Payment and ClickCease | Zoom | https://us02web.zoom.us/clips/share/Kp4QeNawTqWPjUSiRz6MpQ
- Reactivating a Boomerang | Vidyard | https://share.vidyard.com/watch/mbiFdwoydA9JXrJnnQn3f3

PPC - CAMPAIGN BUILDOUTS
- Buildout Checklists (all campaign types) | Doc | https://docs.google.com/document/d/1mq5t9IyJCJqjGz53aB5koXk6v7ZldG9zyc8HnZn_6Js/edit
- AI Calls Walkthrough | Zoom Video | https://us02web.zoom.us/clips/share/Yu6X7w-iRCa0MJH4bw5tMw
- AI Calls Editor Template | Sheet | https://docs.google.com/spreadsheets/d/1Zj8xMlafYu1bwNocci7XbkXMSfuz553EJHV5UfiBNSM/edit
- RSA Walkthrough | Zoom Video | https://us02web.zoom.us/clips/share/gePavE0fRDe4TH31oDr02g
- RSA Editor Template | Sheet | https://docs.google.com/spreadsheets/d/1sI1hXx5QR_jWCIij0WC25HLTQKNOQ6UF6w_V3a6izwI/edit
- All .coms Walkthrough (SF.com, Homeowners, Renters, Condo) | Zoom Video | https://us02web.zoom.us/clips/share/lCqjnnhARKSrz8pivRf7IA
- SF.com Editor Template | Sheet | https://docs.google.com/spreadsheets/d/1I6v0h0g3Qk2ewFVeqpaSMYG3TGDBHCty5fqfJrHQjw4/edit
- SF.com AUTO Editor Template | Sheet | https://docs.google.com/spreadsheets/d/1QlP8wgmWS9PnhTaL_5M5rQKmQ36mWibtlZ2QEVxnEjg/edit
- Homeowners Editor Template | Sheet | https://docs.google.com/spreadsheets/d/102HjZFTp_uXzQj9M8Aned0ROnhyw1M8FfDlbjZ8pK5U/edit
- Renters Editor Template | Sheet | https://docs.google.com/spreadsheets/d/17jR0OYnI5UHwwo0j52N1gRfRjidFbszKlrWdpXK8p14/edit
- Condo Editor Template | Sheet | https://docs.google.com/spreadsheets/d/1Cl6Vh2lE19WHERUDAzTz8FfTPwIg_e2R5fFtrfDHG5M/edit

PPC - EDITOR BASICS
- How to Download Accounts in Editor | Vidyard | https://share.vidyard.com/watch/SJxmR3VzirVZkYEPw3oYgw
- How to Update Phone Number | Vidyard | https://share.vidyard.com/watch/zH6Dx5UP4sqiH88T7w1WTh
- How to Update Phone Number in a Call Only Campaign | Vidyard | https://share.vidyard.com/watch/9otHHd961GCwoeDJyfRZfd

PPC - ACCOUNT MAINTENANCE
- Account Scrubbing SOP | Doc | https://docs.google.com/document/d/1WomhyfalZZiU3fdtBxAVbiwnu2cXLATZF8CeuHLnCag/edit
- Account Scrub Walkthrough | Zoom Video | https://us02web.zoom.us/clips/share/rqVuv73cSAuIpuC8kfWtyw
- How to Track a Scrub & Take Notes | Zoom Video | https://us02web.zoom.us/clips/share/bySYBAsKSIyLgS4lUEdISg
- Negatives & Metrics | Doc | https://docs.google.com/document/d/1g8ADqqyi_UjsOfwoQ-7j7u1NVksQR8IzpulhlY2loS8/edit

PPC - BILLING & PAYMENTS
- How to Add a Bank Account | Vidyard | https://share.vidyard.com/watch/N4E7yBDY6EJxNZhLSt5v6k
- How to Update Credit Card | Vidyard | https://share.vidyard.com/watch/3cPoh3Hzk71ynqZLfYogoy
- PPC New Payment Form | Hubspot Form | https://share.hsforms.com/1AyaDbjePTmS11uwhxWQsaw50lfs

PPC - AUTOMATIONS & MASTER ACCOUNT SHEET
- New Client Texting Automation | Doc | https://docs.google.com/document/d/1KXNIS3uBaTkE4aCWyQ4KQm5GY9gvhSuag_l_BT04D3U/edit
- Emergency Pause How To | Doc | https://docs.google.com/document/d/136fCw1olmInkmyqLSB_RNpykutjcGpAReFLyY_gMCoY/edit
- Master Account Sheet | Sheet | https://docs.google.com/spreadsheets/d/1dxONcrsm9RparL_s3UD1sEc4xpoy44n2YLco6_6RZXc/edit
- How to Navigate Master Account Sheet | Vidyard | https://share.vidyard.com/watch/Gro5Akou8pu7X9SPPCfEjD
- Creating New Account in Master Sheet | Vidyard | https://share.vidyard.com/watch/4m3MkCtMABR9W394yrRvc4
- Moving Churned Accounts in Master Account Sheet | Vidyard | https://share.vidyard.com/watch/M5pABN4hQSfu91uHdXW4mD

PPC - NON STATE FARM CLIENTS
- LSA Verification & Profile Setup SOP | Doc | https://docs.google.com/document/d/14lmZWab-2g4fcACjSirZukx6tbP2BI-jnuyAhYO3uPA/edit

PPC - QUICK LINKS
- Red Alert Form | Hubspot Form | https://share.hsforms.com/1c41FBWAbSJ-E34LqvdTglA50lfs
- Current Account Change Form | Hubspot Form | https://share.hsforms.com/13MKIhgAnSMGMmuNsa7cX2w50lfs
- New Client Onboarding Form | Hubspot Form | https://share.hsforms.com/1bxh8x9CUQ5CplFsrLfVfnA50lfs
- Master Account Sheet | Sheet | https://docs.google.com/spreadsheets/d/1dxONcrsm9RparL_s3UD1sEc4xpoy44n2YLco6_6RZXc/edit
- Holiday Schedulers | Folder | https://drive.google.com/drive/folders/17ss39TWdXUBDE2D5o-EFyC1ozXITk3jK
- PPC Regions Doc | Sheet | https://docs.google.com/spreadsheets/d/1PNn9pswVU1b4sPta2HXuI1yrKREsfsGrJuz3mYjFwlk/edit
- Negatives & Metrics | Doc | https://docs.google.com/document/d/1g8ADqqyi_UjsOfwoQ-7j7u1NVksQR8IzpulhlY2loS8/edit

NOTE: SEO, AMs, Social, Sales, and Internal Forms sections are coming soon.
`;

const SYSTEM_PROMPT = `You are a helpful resource assistant for Direct Clicks, a digital marketing agency specializing in PPC (Google Ads) for State Farm insurance agents. Your job is to help team members quickly find the right training doc, video, form, or tool from the company's internal resource hub.

Here is the complete resource directory with real URLs:

${RESOURCES}

When someone asks a question:
1. Identify which resource(s) best answer their need
2. Give a SHORT, direct response — 2-4 sentences max
3. Name the specific resource clearly and ALWAYS include the URL as a markdown link like [Resource Name](url)
4. Mention which section of the hub it lives in
5. If multiple resources are relevant, list them all with links
6. If something isn't in the directory yet (SEO, AMs, Social, Sales, Internal Forms), let them know those sections are coming soon
7. Never make up resource names or URLs that aren't in the directory
8. If someone asks for a form, always give them the direct HubSpot or Google link

Keep your tone friendly and concise — people are busy. Always return clickable markdown links.`;

const SUGGESTIONS = [
  "How do I build an AI Calls campaign?",
  "Where's the red alert form?",
  "How do I scrub an account?",
  "Where's the master account sheet?",
  "How do I set up a new account?",
  "How do I update a credit card?",
  "What form do I use for a current account change?",
  "Where are the editor templates?",
];

function parseMarkdownLinks(text) {
  const parts = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "link", label: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }
  return parts;
}

function MessageContent({ content }) {
  const parts = parseMarkdownLinks(content);
  return (
    <span>
      {parts.map((part, i) =>
        part.type === "link" ? (
          <a
            key={i}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#2E5BA8",
              textDecoration: "underline",
              textDecorationColor: "rgba(46,91,168,0.4)",
              fontWeight: 500,
            }}
          >
            {part.label}
          </a>
        ) : (
          <span key={i}>{part.content}</span>
        )
      )}
    </span>
  );
}

export default function ResourceFinder() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  async function sendMessage(text) {
    const question = text || input.trim();
    if (!question) return;
    setStarted(true);
    setInput("");
    setLoading(true);
    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't find that. Try rephrasing your question.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", minHeight: "100vh", background: "#F7F6F3", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1B3A6B", padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#2E5BA8", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <div>
          <div style={{ color: "white", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>DC Resource Finder</div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>Ask anything · Get a direct link</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80" }}></div>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>Live</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "16px", maxWidth: 720, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        {!started && (
          <div style={{ textAlign: "center", padding: "32px 0 16px" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "#1B3A6B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1B3A6B", letterSpacing: "-0.02em", marginBottom: 6 }}>Find any DC resource</div>
            <div style={{ fontSize: 14, color: "#888", marginBottom: 28, lineHeight: 1.5 }}>Ask a question and get a direct link to the right doc, video, or form.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, textAlign: "left" }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} style={{ background: "white", border: "1px solid #E5E2DB", borderRadius: 10, padding: "10px 13px", fontSize: 13, color: "#2C2C2C", cursor: "pointer", textAlign: "left", lineHeight: 1.4, fontFamily: "inherit", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#EEF2FF"; e.currentTarget.style.borderColor = "#93A8E0"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#E5E2DB"; }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "#1B3A6B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
              </div>
            )}
            <div style={{ maxWidth: "78%", background: msg.role === "user" ? "#1B3A6B" : "white", color: msg.role === "user" ? "white" : "#1A1A1A", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", padding: "11px 15px", fontSize: 14, lineHeight: 1.6, border: msg.role === "assistant" ? "1px solid #E5E2DB" : "none", whiteSpace: "pre-wrap" }}>
              {msg.role === "assistant" ? <MessageContent content={msg.content} /> : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "#1B3A6B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
            </div>
            <div style={{ background: "white", border: "1px solid #E5E2DB", borderRadius: "14px 14px 14px 4px", padding: "13px 16px", display: "flex", gap: 5, alignItems: "center" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#B0BEDC", animation: "bounce 1.2s ease-in-out infinite", animationDelay: `${i*0.2}s` }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ borderTop: "1px solid #E5E2DB", background: "white", padding: "14px 20px", flexShrink: 0 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder="Ask anything — e.g. 'where's the red alert form' or 'how do I build an AI Calls campaign'"
            rows={1}
            style={{ flex: 1, border: "1.5px solid #D4D0C8", borderRadius: 12, padding: "10px 14px", fontSize: 14, fontFamily: "inherit", resize: "none", outline: "none", color: "#1A1A1A", background: "#FAFAF8", lineHeight: 1.5, transition: "border-color 0.15s", overflowY: "hidden" }}
            onFocus={e => e.target.style.borderColor = "#2E5BA8"}
            onBlur={e => e.target.style.borderColor = "#D4D0C8"}
            onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
          />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
            style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: input.trim() && !loading ? "#1B3A6B" : "#D4D0C8", color: "white", cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "#B0AAAA", marginTop: 8, maxWidth: 720, margin: "8px auto 0" }}>
          Powered by Claude · Direct Clicks internal use only
        </div>
      </div>
      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}
