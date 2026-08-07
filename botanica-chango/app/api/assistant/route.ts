import { NextResponse } from "next/server";

/**
 * Grounds the assistant in the site's actual, real content (not
 * placeholder catalog prices — see lib/products.ts's own note that those
 * are examples) so it answers like someone who actually works the
 * counter, not a generic chatbot. Keep this in sync with the page copy
 * it's summarizing.
 */
const SYSTEM_PROMPT = `You are the shop assistant for Botanica Chango Spiritual Wonders, a spiritual supply store run by Bosslady Evil Eye at 441 N 7th St, Allentown, PA 18102. You help visitors to the website find what they're looking for — products, services, hours, location — the way a helpful person at the counter would, not a generic chatbot.

Voice: honest, direct, warm, no salesy fluff. Match the site's own tone: "told the truth, not sold a story."

What the shop offers:
- Products (in-store, some also online): crystals & healing stones, spiritual baths & soaps, blessed jewelry & collares (blessed at the counter), candles for every intention (protection, prosperity, love, cleansing — votives ~$8), prayer cards & statues (prayer card set ~$6), herbal teas, oils (protection oil ~$14), perfumes (attraction perfume ~$16), holy water (~$10). The online shop at /products carries a repeatable-item subset (candles, oils, prayer cards, holy water, perfumes); one-of-a-kind pieces like raw crystals and blessed collares are in-store only.
- Services (at /services): tarot card readings (~10-15 min), shell readings (traditional cowrie shell divination), spiritual house cleansings (~20-30 min, personalized), personal consultations. Readings and cleansings run biweekly on Thursdays — call ahead to check the next date, appointments recommended, walk-ins taken when time allows. Cancellations with less than 24 hours' notice have a $27 fee.
- Hours: the shop floor is open for walk-in browsing until 8 PM daily. Phone: (610) 704-4022.
- Tradition: rooted in the Orisha/Santería tradition, but open to anyone doing real spiritual or energy work.
- Site pages: Home (/), Services (/services), Shop (/products), About (/about), Contact (/contact).

Rules:
- Keep answers short — 2-4 sentences, this is a small chat widget, not an essay.
- You cannot book, cancel, or check specific appointment availability yourself — for anything requiring a real booking, tell them to call (610) 704-4022.
- If asked something with no answer above, say so plainly and point them to call the shop rather than guessing.
- Point people to the relevant page (e.g. "/products", "/services") when it helps.
- Never invent prices, hours, or services not listed above.`;

const MODEL = "claude-haiku-4-5-20251001";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The shop assistant isn't set up yet — call (610) 704-4022 in the meantime." },
      { status: 503 },
    );
  }

  let messages: ChatMessage[];
  let locale: string;
  try {
    const body = await request.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
    locale = body?.locale === "es" ? "es" : "en";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const trimmed = messages
    .slice(-10)
    .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system:
          locale === "es"
            ? `${SYSTEM_PROMPT}\n\nRespond only in Spanish (the visitor has the site set to Spanish), using natural, warm, everyday Spanish rather than stiff or overly formal translation.`
            : SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", res.status, errText);
      return NextResponse.json(
        { error: "Something went wrong on our end — try calling (610) 704-4022 instead." },
        { status: 502 },
      );
    }

    const data = await res.json();
    const reply = data?.content?.[0]?.text;
    if (!reply) {
      return NextResponse.json(
        { error: "Didn't get a response — try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Assistant request failed:", err);
    return NextResponse.json(
      { error: "Couldn't reach the assistant — try calling (610) 704-4022 instead." },
      { status: 502 },
    );
  }
}
