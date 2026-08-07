/**
 * All client-visible copy, in English and Spanish, keyed by the same
 * shape on both sides. Page components read `t.home`, `t.nav`, etc. after
 * calling `useLanguage()` rather than hardcoding strings — see
 * lib/i18n/LanguageContext.tsx for the switch itself. Metadata (SEO
 * <title>/<meta>) stays English-only since it's rendered server-side
 * before a client locale choice exists.
 */

const en = {
  languagePrompt: {
    eyebrow: "Choose your language / Elige tu idioma",
    headline: "Read the site your way.",
    body: "Botanica Chango Spiritual Wonders is available in English and Spanish.",
    english: "English",
    spanish: "Español",
    footnote: "You can switch anytime from the menu.",
  },
  nav: {
    home: "Home",
    services: "Services",
    shop: "Shop",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    facebookAria: "Botanica Chango Spiritual Wonders on Facebook",
    instagramAria: "Botanica Chango Spiritual Wonders on Instagram",
    cartAria: (n: number) => `Cart, ${n} item${n === 1 ? "" : "s"}`,
    languageLabel: "Language",
  },
  footer: {
    pages: "Pages",
    follow: "Follow",
    facebook: "Facebook",
    instagram: "Instagram",
    rights: (year: number) => `© ${year} Botanica Chango Spiritual Wonders. All rights reserved.`,
    openLine: "Open on Seventh Street.",
  },
  cart: {
    title: "Cart",
    close: "Close",
    empty: "Your cart is empty.",
    keepBrowsing: "Keep browsing",
    each: "each",
    subtotal: "Subtotal",
    checkout: "Checkout",
    remove: "Remove",
    decreaseAria: "Decrease quantity",
    increaseAria: "Increase quantity",
  },
  checkoutPage: {
    orderSent: "Order sent",
    thanks: (name: string) => `Thanks, ${name}.`,
    confirmBody: (total: string) =>
      `Your email app should have opened with a $${total} order ready to send to Bosslady. Send it and she'll confirm pickup at 441 N 7th St, Allentown — payment is collected in person for now.`,
    backToShop: "Back to shop",
    checkoutLabel: "Checkout",
    emptyHeadline: "Your cart is empty.",
    browseShop: "Browse the shop",
    reviewHeadline: "Review & reserve.",
    each: "each",
    remove: "Remove",
    subtotal: "Subtotal",
    pickupDetails: "Pickup details",
    name: "Name *",
    email: "Email *",
    phone: "Phone",
    notes: "Notes",
    payment: "Payment",
    paymentNote:
      "Pay in person at pickup — 441 N 7th St, Allentown. Online payment is coming soon.",
    placeOrder: (total: string) => `Place order — $${total}`,
    emailNote:
      "This opens your email app with the order filled in — nothing is charged automatically yet.",
    continueShopping: "← Continue shopping",
    decreaseAria: "Decrease quantity",
    increaseAria: "Increase quantity",
  },
  contactForm: {
    name: "Name *",
    email: "Email *",
    phone: "Phone",
    lookingFor: "What are you looking for?",
    topics: ["Product question", "Schedule a reading or cleansing", "A specific item", "General inquiry"],
    message: "Message",
    send: "Send message",
    sent: "Opening your email app to send this to Bosslady Evil Eye.",
  },
  assistant: {
    welcome:
      "Hey — I can help you find what you're looking for on the site: products, services, hours, or how to book a reading. What do you need?",
    shopAssistant: "Shop assistant",
    dialogAria: "Botanica Chango Spiritual Wonders shop assistant",
    close: "Close",
    closeAria: "Close assistant",
    placeholder: "Ask about products, services, hours…",
    send: "Send",
    genericError: "Something went wrong.",
    unreachable: "Couldn't reach the assistant — try calling (610) 704-4022 instead.",
    openAria: "Open the shop assistant",
  },
  home: {
    hero: {
      kicker: "Seventh Street",
      headline: "Spiritual tools. Honest readings. Open late on Seventh.",
      buttons: [
        { label: "See what's in stock", href: "/products" },
        { label: "Visit the store", href: "/contact", variant: "filled" as const },
      ],
    },
    features: {
      label: "What's on the shelf",
      headline: "you don't find the thing. the thing finds you.",
      items: [
        {
          title: "Crystals & healing stones",
          description:
            "Amethyst, obsidian, raw clusters, and polished stones — held and felt before they hit the shelf.",
        },
        {
          title: "Spiritual baths & soaps",
          description: "Hand-cut soap bars — lavender, rosemary, copal — and herbal bath salts.",
        },
        {
          title: "Blessed jewelry & collares",
          description: "Collares blessed at the counter, Cuban chains, and charms for protection.",
        },
        {
          title: "Candles for every intention",
          description:
            "Glass votive candles in every color — protection, court cases, love, prosperity, cleansing.",
        },
        {
          title: "Prayer cards & statues",
          description: "Gold-foil edged prayer cards and hand-painted Orisha statues.",
        },
        {
          title: "Herbal teas & oils",
          description: "Loose-leaf teas, small-batch hair oils, protection lotions, and perfumes.",
        },
      ],
    },
    gallery: {
      label: "Inside the shop",
      captions: ["Candles", "Collares on the counter", "Cards & crystals", "Soap aisle", "Bath salts", "Intention candles"],
    },
    cta: {
      kicker: "Stop by Seventh Street",
      headline: "Come through. The candles are lit and the door's open.",
      buttons: [
        { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const },
        { label: "Get directions", href: "/contact" },
      ],
    },
    story: {
      label: "About the store",
      headline: "What's inside on Seventh Street?",
      paragraphs: [
        "I'm Bosslady Evil Eye, and this is Botanica Chango Spiritual Wonders — a real supply shop for real practice, not a gift shop dressed up as one. Everything on the shelf, I've held and felt myself.",
        "Whether you're deep in the Orisha tradition or just starting to pay attention to your energy, walk in and I'll tell you straight what you need.",
      ],
      cta: { label: "Meet Bosslady Evil Eye", href: "/about" },
    },
    shopReveal: {
      stepInside: "Step inside",
      kicker: "Seventh Street",
      headline: ["Every shelf has a story.", "Come see it for yourself."],
      inside: "Inside Botanica Chango Spiritual Wonders",
    },
  },
  about: {
    banner: { kicker: "Our Story", headline: "Meet Bosslady Evil Eye. She's at the counter." },
    features: {
      label: "What I stand behind",
      headline: "How I run the shop",
      items: [
        { title: "Real products for real practice", description: "Nothing on the shelf is decoration — every piece is meant to be used." },
        { title: "Shell readings, not small talk", description: "Cowrie shell divination, straight and traditional — no theater." },
        { title: "Thorough, not rushed", description: "A cleansing or a reading gets the time it needs, even if that means waiting for the next slot." },
        { title: "Jewelry that means something", description: "Collares are blessed at the counter before they leave the shop." },
        { title: "Honest, not salesy", description: "If something isn't right for you, I'll tell you — I'm not here to upsell." },
        { title: "Local to Allentown", description: "441 N 7th St — the shop on Seventh Street, walk-ins welcome." },
        { title: "Open to everyone", description: "Deep in the Orisha tradition or just starting out with energy work — you're welcome at the counter." },
        { title: "One person, every visit", description: "It's a one-person shop. When you come in, you're talking to Bosslady, not staff." },
      ],
    },
    story: {
      label: "Botanica Chango Spiritual Wonders",
      headline: "Why Botanica Chango Spiritual Wonders",
      paragraphs: [
        "Botanica Chango Spiritual Wonders is a spiritual supply store built around the Orisha and Santería tradition, and around anyone else doing real energy work — manifestation, protection, cleansing, or just paying closer attention to what they carry.",
        "I'm Bosslady Evil Eye. This shop is mine, and I run it the way I'd want to be treated walking in: told the truth, not sold a story.",
      ],
    },
    cta: {
      kicker: "Come by",
      headline: "Call ahead or just walk in.",
      buttons: [
        { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const },
        { label: "Visit the shop", href: "/contact" },
      ],
    },
  },
  products: {
    banner: { kicker: "On Seventh Street", headline: "Blessed jewelry, crystals, and spiritual baths in Allentown." },
    features: {
      label: "Over 50 products",
      headline: "What's in the shop",
      items: [
        { title: "Blessed jewelry & collares", description: "Collares blessed at the counter, Cuban chains, charms for protection." },
        { title: "Spiritual baths & herbal soaps", description: "Hand-cut soap bars — lavender, rosemary, copal — and herbal bath salts." },
        { title: "Crystals & healing stones", description: "Amethyst, obsidian, raw clusters, and polished stones." },
        { title: "Prayer cards & candles", description: "Gold-foil edged prayer cards and glass votive candles for every intention." },
        { title: "Orisha statues & holy water", description: "Hand-painted Orisha statues and bottled holy water for practice." },
        { title: "Perfumes, oils & lotions", description: "Loose-leaf teas, small-batch hair oils, money-drawing colognes, and attraction perfumes." },
      ],
    },
    shopGrid: {
      label: "Order online",
      headline: "A few things you can reserve online.",
      body: "Everything else — the crystals, the blessed collares, the raw stones — is worth seeing in person. These are the repeatable items I keep in steady stock.",
      addToCart: "Add to cart",
    },
    gallery: {
      label: "Product highlights",
      captions: ["Blessed collares", "Crystal display", "Candle wall", "Bath salts", "Orisha statues", "Prayer cards"],
    },
    cta: {
      kicker: "Shop now",
      headline: "Come see it in person — no catalog does it justice.",
      buttons: [
        { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const },
        { label: "Ask about an item", href: "/contact" },
      ],
    },
    story: {
      label: "Product highlights",
      headline: "Blessed collares and spiritual baths on Seventh Street.",
      paragraphs: [
        "Every collar is blessed at the counter, not shipped in pre-made. The same goes for the herbal baths and soaps — hand-cut, small batch, meant to be used.",
        "All sales are final, so ask me anything before you buy — I'd rather you leave with the right thing.",
      ],
    },
  },
  services: {
    banner: { kicker: "Spiritual Services", headline: "Book a reading or cleansing. Thursdays, biweekly, on Seventh." },
    grid: {
      items: [
        { title: "Tarot card readings", duration: "~10–15 min", description: "Clarity on relationships, finances, and personal growth. I read the cards straight." },
        { title: "Shell readings", description: "Traditional cowrie shell divination to reveal hidden truths and guide decisions." },
        {
          title: "Spiritual house cleansings",
          duration: "~20–30 min",
          description: "Traditional prayers, herbs, and blessed waters to remove negative energy and spiritual blockages. Personalized to your home.",
        },
        { title: "Personal consultations", description: "Sit-down guidance on work, family, finances, or anything else on your mind." },
      ],
    },
    story: {
      label: "What we do",
      headline: "Booking a service",
      paragraphs: [
        "All readings and cleansings run biweekly on Thursdays. Call ahead to check availability — appointments are recommended, but I'll take walk-ins when time allows.",
        "Cancellations with less than 24 hours' notice are subject to a $27 cancellation fee.",
      ],
    },
    cta: { kicker: "Ready when you are", headline: "Book a reading.", buttons: [{ label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const }] },
    faq: [
      { question: "What does a reading involve?", answer: "A tarot or shell reading is usually 10–15 minutes. Bring a question or come with an open mind — I'll read what comes up straight, no filler." },
      { question: "How long does a house cleansing take?", answer: "About 20–30 minutes, depending on the space. It's personalized — traditional prayers, herbs, and blessed waters." },
      { question: "Do I need an appointment?", answer: "Appointments are recommended so I can give you the time you need. Walk-ins are welcome when the schedule allows." },
      { question: "What kinds of questions can I bring?", answer: "Relationships, finances, family, work, personal growth — whatever's actually on your mind. There's no wrong question." },
      { question: "Can I buy something without getting a reading?", answer: "Of course — the shop is open for browsing any time, no reading required." },
      { question: "What's the difference between a reading and a consultation?", answer: "A reading (tarot or shell) is focused on the cards or shells themselves. A consultation is a broader sit-down conversation about what's going on in your life." },
    ],
  },
  contactPage: {
    banner: { kicker: "Get in touch", headline: "Stop by or give me a call." },
    story: {
      label: "Contact info",
      headline: "No appointment needed to shop.",
      paragraphs: [
        "Walk-ins are always welcome for browsing the shop — open until 8 PM. Call (610) 704-4022 ahead for a reading, shell reading, cleansing, or consultation.",
        "Readings and cleansings run biweekly, on Thursdays.",
      ],
    },
    cta: { kicker: "Come by", headline: "441 N 7th St, Allentown, PA 18102.", buttons: [{ label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const }] },
    faq: [
      { question: "When are readings and cleansings available?", answer: "Biweekly, on Thursdays. Call ahead to check availability for the next date." },
      { question: "Do I need an appointment to visit the shop?", answer: "No — walk-ins are always welcome for shopping. Appointments are recommended for readings and cleansings." },
      { question: "What kinds of candles do you carry?", answer: "Glass votive candles in colors for protection, court cases, love, prosperity, and cleansing." },
      { question: "Do you carry Orisha or Santería supplies?", answer: "Yes — collares, hand-painted Orisha statues, holy water, and more, alongside general spiritual supplies." },
      { question: "What's your return policy?", answer: "All sales are final." },
    ],
  },
  testimonials: {
    label: "What people say",
    quotes: [
      "I just gave them a 5-star review! The staff are really lovely, especially the woman behind the counter — she's super nice. Everyone's been so helpful, and I'm definitely going back all the time. Thanks again for always assisting me — I love that they had everything I needed!",
      "Always my favorite place to stop when I'm in the area. Great diversified selection, friendly staff.",
      "She is very on point, she really helped me! I'm a believer.",
      "You can get everything you need under one roof.",
      "I've been coming to this store for over two or three years and built a positive relationship with both the business owner and her staff, who have been very pleasant to me and my family. The items within the store are affordable.",
      "That is the most helpful botanica I have been to in all of my life. The people are very knowledgable. All my questions were answered after a consulta. I felt like a new person the next day after my bano. I am now hoping to see results in my candle!",
      "I went here because my best friend told me the reader was on point, and boy was she right — that woman has told me things about me that my own mother didn't know. I found my home. Now I will never go anywhere else to get read. Botanica Chango Spiritual Wonders has the best reader, hands down.",
      "I just moved here in PA and I love love this store. Once you walk in the store it's very positive, and the lady there is very helpful and the prices are affordable. I will be back!",
      "This is a very good place to go, they are very friendly and careing.",
      "Very good knowledge of things, going to recommend all my friends and family.",
      "Love this place, always feel like home.",
      "She is amazing, won't be going anywhere else.",
      "The best place I've been to, love the people there.",
      "Very nice, and very helpful, the lady behind the counter.",
      "Great work, and always there to help your spiritual needs.",
      "I love this store. One stop shop.",
      "First time there and was very comfortable.",
      "They have a lot to offer.",
    ],
  },
  products_catalog: {
    categories: {
      Candles: "Candles",
      "Holy water": "Holy water",
      "Prayer cards": "Prayer cards",
      Oils: "Oils",
      Perfumes: "Perfumes",
    } as Record<string, string>,
    items: {
      "candle-protection": { name: "Protection Candle", description: "Glass votive candle for protection." },
      "candle-prosperity": { name: "Prosperity Candle", description: "Glass votive candle for prosperity." },
      "candle-love": { name: "Love Candle", description: "Glass votive candle for love." },
      "holy-water-8oz": { name: "Holy Water (8oz)", description: "Bottled holy water for practice." },
      "prayer-card-set": { name: "Prayer Card Set", description: "Gold-foil edged prayer cards, set of 5." },
      "oil-protection": { name: "Protection Oil", description: "Small-batch protection oil blend." },
      "perfume-attraction": { name: "Attraction Perfume", description: "Small-batch attraction perfume." },
    } as Record<string, { name: string; description: string }>,
  },
};

const es: typeof en = {
  languagePrompt: {
    eyebrow: "Choose your language / Elige tu idioma",
    headline: "Lee el sitio a tu manera.",
    body: "Botanica Chango Spiritual Wonders está disponible en inglés y español.",
    english: "English",
    spanish: "Español",
    footnote: "Puedes cambiarlo cuando quieras desde el menú.",
  },
  nav: {
    home: "Inicio",
    services: "Servicios",
    shop: "Tienda",
    about: "Nosotros",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
    facebookAria: "Botanica Chango Spiritual Wonders en Facebook",
    instagramAria: "Botanica Chango Spiritual Wonders en Instagram",
    cartAria: (n: number) => `Carrito, ${n} artículo${n === 1 ? "" : "s"}`,
    languageLabel: "Idioma",
  },
  footer: {
    pages: "Páginas",
    follow: "Síguenos",
    facebook: "Facebook",
    instagram: "Instagram",
    rights: (year: number) => `© ${year} Botanica Chango Spiritual Wonders. Todos los derechos reservados.`,
    openLine: "Abierto en la Calle Séptima.",
  },
  cart: {
    title: "Carrito",
    close: "Cerrar",
    empty: "Tu carrito está vacío.",
    keepBrowsing: "Seguir viendo",
    each: "cada uno",
    subtotal: "Subtotal",
    checkout: "Finalizar compra",
    remove: "Quitar",
    decreaseAria: "Disminuir cantidad",
    increaseAria: "Aumentar cantidad",
  },
  checkoutPage: {
    orderSent: "Pedido enviado",
    thanks: (name: string) => `Gracias, ${name}.`,
    confirmBody: (total: string) =>
      `Tu aplicación de correo debió abrirse con un pedido de $${total} listo para enviar a Bosslady. Envíalo y ella confirmará la recogida en 441 N 7th St, Allentown — por ahora el pago se recibe en persona.`,
    backToShop: "Volver a la tienda",
    checkoutLabel: "Finalizar compra",
    emptyHeadline: "Tu carrito está vacío.",
    browseShop: "Ver la tienda",
    reviewHeadline: "Revisa y reserva.",
    each: "cada uno",
    remove: "Quitar",
    subtotal: "Subtotal",
    pickupDetails: "Detalles de recogida",
    name: "Nombre *",
    email: "Correo electrónico *",
    phone: "Teléfono",
    notes: "Notas",
    payment: "Pago",
    paymentNote: "Paga en persona al recoger — 441 N 7th St, Allentown. Pronto habrá pago en línea.",
    placeOrder: (total: string) => `Confirmar pedido — $${total}`,
    emailNote:
      "Esto abre tu aplicación de correo con el pedido ya completado — todavía no se cobra nada automáticamente.",
    continueShopping: "← Seguir comprando",
    decreaseAria: "Disminuir cantidad",
    increaseAria: "Aumentar cantidad",
  },
  contactForm: {
    name: "Nombre *",
    email: "Correo electrónico *",
    phone: "Teléfono",
    lookingFor: "¿Qué estás buscando?",
    topics: ["Pregunta sobre un producto", "Agendar una lectura o limpieza", "Un artículo específico", "Consulta general"],
    message: "Mensaje",
    send: "Enviar mensaje",
    sent: "Abriendo tu aplicación de correo para enviarle esto a Bosslady Evil Eye.",
  },
  assistant: {
    welcome:
      "Hola — puedo ayudarte a encontrar lo que buscas en el sitio: productos, servicios, horarios, o cómo reservar una lectura. ¿Qué necesitas?",
    shopAssistant: "Asistente de la tienda",
    dialogAria: "Asistente de la tienda Botanica Chango Spiritual Wonders",
    close: "Cerrar",
    closeAria: "Cerrar asistente",
    placeholder: "Pregunta sobre productos, servicios, horarios…",
    send: "Enviar",
    genericError: "Algo salió mal.",
    unreachable: "No se pudo conectar con el asistente — mejor llama al (610) 704-4022.",
    openAria: "Abrir el asistente de la tienda",
  },
  home: {
    hero: {
      kicker: "Calle Séptima",
      headline: "Herramientas espirituales. Lecturas honestas. Abierto hasta tarde en la Séptima.",
      buttons: [
        { label: "Ve lo que hay en la tienda", href: "/products" },
        { label: "Visita la tienda", href: "/contact", variant: "filled" as const },
      ],
    },
    features: {
      label: "Lo que hay en el estante",
      headline: "tú no encuentras la cosa. la cosa te encuentra a ti.",
      items: [
        {
          title: "Cristales y piedras curativas",
          description:
            "Amatista, obsidiana, clústeres en bruto y piedras pulidas — sostenidas y sentidas antes de llegar al estante.",
        },
        {
          title: "Baños espirituales y jabones",
          description: "Barras de jabón cortadas a mano — lavanda, romero, copal — y sales de baño con hierbas.",
        },
        {
          title: "Joyería bendecida y collares",
          description: "Collares bendecidos en el mostrador, cadenas cubanas y dijes de protección.",
        },
        {
          title: "Velas para cada intención",
          description:
            "Velas votivas de vidrio en todos los colores — protección, casos legales, amor, prosperidad, limpieza.",
        },
        {
          title: "Estampas y estatuas",
          description: "Estampas con borde dorado y estatuas de Orishas pintadas a mano.",
        },
        {
          title: "Tés de hierbas y aceites",
          description: "Tés de hojas sueltas, aceites capilares de producción limitada, lociones de protección y perfumes.",
        },
      ],
    },
    gallery: {
      label: "Dentro de la tienda",
      captions: ["Velas", "Collares en el mostrador", "Estampas y cristales", "Pasillo de jabones", "Sales de baño", "Velas de intención"],
    },
    cta: {
      kicker: "Pasa por la Calle Séptima",
      headline: "Ven a vernos. Las velas están encendidas y la puerta está abierta.",
      buttons: [
        { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const },
        { label: "Cómo llegar", href: "/contact" },
      ],
    },
    story: {
      label: "Sobre la tienda",
      headline: "¿Qué hay dentro en la Calle Séptima?",
      paragraphs: [
        "Soy Bosslady Evil Eye, y esta es Botanica Chango Spiritual Wonders — una tienda de suministros de verdad para una práctica de verdad, no una tienda de regalos disfrazada. Todo lo que hay en el estante, yo misma lo he sostenido y sentido.",
        "Ya sea que estés metido de lleno en la tradición Orisha o apenas empezando a prestarle atención a tu energía, entra y te diré directamente lo que necesitas.",
      ],
      cta: { label: "Conoce a Bosslady Evil Eye", href: "/about" },
    },
    shopReveal: {
      stepInside: "Entra",
      kicker: "Calle Séptima",
      headline: ["Cada estante tiene una historia.", "Ven a verlo tú mismo."],
      inside: "Dentro de Botanica Chango Spiritual Wonders",
    },
  },
  about: {
    banner: { kicker: "Nuestra historia", headline: "Conoce a Bosslady Evil Eye. Está en el mostrador." },
    features: {
      label: "En lo que creo",
      headline: "Cómo dirijo la tienda",
      items: [
        { title: "Productos reales para una práctica real", description: "Nada en el estante es decoración — cada pieza está hecha para usarse." },
        { title: "Lecturas de caracoles, no charla trivial", description: "Adivinación con caracoles cauri, directa y tradicional — sin teatro." },
        { title: "A fondo, sin prisas", description: "Una limpieza o una lectura recibe el tiempo que necesita, aunque eso signifique esperar el siguiente turno." },
        { title: "Joyería que significa algo", description: "Los collares se bendicen en el mostrador antes de salir de la tienda." },
        { title: "Honesta, no vendedora", description: "Si algo no es para ti, te lo diré — no estoy aquí para venderte de más." },
        { title: "Local de Allentown", description: "441 N 7th St — la tienda en la Calle Séptima, se aceptan visitas sin cita." },
        { title: "Abierta a todos", description: "Ya sea que estés metido en la tradición Orisha o apenas empezando con el trabajo energético — eres bienvenido en el mostrador." },
        { title: "Una sola persona, cada visita", description: "Es una tienda de una sola persona. Cuando entras, hablas con Bosslady, no con empleados." },
      ],
    },
    story: {
      label: "Botanica Chango Spiritual Wonders",
      headline: "Por qué Botanica Chango Spiritual Wonders",
      paragraphs: [
        "Botanica Chango Spiritual Wonders es una tienda de suministros espirituales construida alrededor de la tradición Orisha y la Santería, y alrededor de cualquiera que haga trabajo energético real — manifestación, protección, limpieza, o simplemente prestando más atención a lo que carga consigo.",
        "Soy Bosslady Evil Eye. Esta tienda es mía, y la dirijo como a mí me gustaría que me trataran al entrar: diciéndome la verdad, no vendiéndome un cuento.",
      ],
    },
    cta: {
      kicker: "Ven a visitarnos",
      headline: "Llama antes o simplemente pasa.",
      buttons: [
        { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const },
        { label: "Visita la tienda", href: "/contact" },
      ],
    },
  },
  products: {
    banner: { kicker: "En la Calle Séptima", headline: "Joyería bendecida, cristales y baños espirituales en Allentown." },
    features: {
      label: "Más de 50 productos",
      headline: "Lo que hay en la tienda",
      items: [
        { title: "Joyería bendecida y collares", description: "Collares bendecidos en el mostrador, cadenas cubanas, dijes de protección." },
        { title: "Baños espirituales y jabones de hierbas", description: "Barras de jabón cortadas a mano — lavanda, romero, copal — y sales de baño con hierbas." },
        { title: "Cristales y piedras curativas", description: "Amatista, obsidiana, clústeres en bruto y piedras pulidas." },
        { title: "Estampas y velas", description: "Estampas con borde dorado y velas votivas de vidrio para cada intención." },
        { title: "Estatuas de Orishas y agua bendita", description: "Estatuas de Orishas pintadas a mano y agua bendita embotellada para la práctica." },
        { title: "Perfumes, aceites y lociones", description: "Tés de hojas sueltas, aceites capilares de producción limitada, colonias para atraer dinero y perfumes de atracción." },
      ],
    },
    shopGrid: {
      label: "Ordena en línea",
      headline: "Algunas cosas que puedes reservar en línea.",
      body: "Todo lo demás — los cristales, los collares bendecidos, las piedras en bruto — vale la pena verlo en persona. Estos son los artículos que mantengo en existencia constante.",
      addToCart: "Añadir al carrito",
    },
    gallery: {
      label: "Destacados de productos",
      captions: ["Collares bendecidos", "Exhibición de cristales", "Pared de velas", "Sales de baño", "Estatuas de Orishas", "Estampas"],
    },
    cta: {
      kicker: "Compra ahora",
      headline: "Ven a verlo en persona — ningún catálogo le hace justicia.",
      buttons: [
        { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const },
        { label: "Pregunta sobre un artículo", href: "/contact" },
      ],
    },
    story: {
      label: "Destacados de productos",
      headline: "Collares bendecidos y baños espirituales en la Calle Séptima.",
      paragraphs: [
        "Cada collar se bendice en el mostrador, no llega ya hecho por envío. Lo mismo pasa con los baños y jabones de hierbas — cortados a mano, en lotes pequeños, hechos para usarse.",
        "Todas las ventas son finales, así que pregúntame lo que sea antes de comprar — prefiero que te vayas con lo correcto.",
      ],
    },
  },
  services: {
    banner: { kicker: "Servicios Espirituales", headline: "Reserva una lectura o limpieza. Jueves, cada dos semanas, en la Séptima." },
    grid: {
      items: [
        { title: "Lecturas de tarot", duration: "~10–15 min", description: "Claridad sobre relaciones, finanzas y crecimiento personal. Leo las cartas sin rodeos." },
        { title: "Lecturas de caracoles", description: "Adivinación tradicional con caracoles cauri para revelar verdades ocultas y guiar decisiones." },
        {
          title: "Limpiezas espirituales del hogar",
          duration: "~20–30 min",
          description: "Oraciones tradicionales, hierbas y aguas bendecidas para eliminar energía negativa y bloqueos espirituales. Personalizada para tu hogar.",
        },
        { title: "Consultas personales", description: "Orientación en persona sobre trabajo, familia, finanzas, o cualquier otra cosa que tengas en mente." },
      ],
    },
    story: {
      label: "Lo que hacemos",
      headline: "Cómo reservar un servicio",
      paragraphs: [
        "Todas las lecturas y limpiezas son cada dos semanas, los jueves. Llama antes para consultar disponibilidad — se recomienda cita, pero atiendo sin cita cuando el tiempo lo permite.",
        "Las cancelaciones con menos de 24 horas de aviso tienen un cargo de $27.",
      ],
    },
    cta: { kicker: "Lista cuando tú lo estés", headline: "Reserva una lectura.", buttons: [{ label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const }] },
    faq: [
      { question: "¿Qué incluye una lectura?", answer: "Una lectura de tarot o de caracoles suele durar de 10 a 15 minutos. Trae una pregunta o ven con la mente abierta — te diré lo que salga, sin adornos." },
      { question: "¿Cuánto dura una limpieza del hogar?", answer: "Entre 20 y 30 minutos, dependiendo del espacio. Es personalizada — oraciones tradicionales, hierbas y aguas bendecidas." },
      { question: "¿Necesito una cita?", answer: "Se recomienda hacer cita para poder darte el tiempo que necesitas. Se aceptan visitas sin cita cuando el horario lo permite." },
      { question: "¿Qué tipo de preguntas puedo traer?", answer: "Relaciones, finanzas, familia, trabajo, crecimiento personal — lo que realmente tengas en mente. No hay pregunta equivocada." },
      { question: "¿Puedo comprar algo sin hacerme una lectura?", answer: "Claro que sí — la tienda está abierta para ver en cualquier momento, no se requiere una lectura." },
      { question: "¿Cuál es la diferencia entre una lectura y una consulta?", answer: "Una lectura (de tarot o caracoles) se enfoca en las cartas o los caracoles en sí. Una consulta es una conversación más amplia sobre lo que está pasando en tu vida." },
    ],
  },
  contactPage: {
    banner: { kicker: "Ponte en contacto", headline: "Pasa por aquí o llámame." },
    story: {
      label: "Información de contacto",
      headline: "No necesitas cita para comprar.",
      paragraphs: [
        "Siempre son bienvenidas las visitas sin cita para ver la tienda — abierto hasta las 8 PM. Llama al (610) 704-4022 antes para una lectura, lectura de caracoles, limpieza o consulta.",
        "Las lecturas y limpiezas son cada dos semanas, los jueves.",
      ],
    },
    cta: { kicker: "Ven a visitarnos", headline: "441 N 7th St, Allentown, PA 18102.", buttons: [{ label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" as const }] },
    faq: [
      { question: "¿Cuándo hay lecturas y limpiezas disponibles?", answer: "Cada dos semanas, los jueves. Llama antes para consultar disponibilidad para la próxima fecha." },
      { question: "¿Necesito una cita para visitar la tienda?", answer: "No — siempre son bienvenidas las visitas sin cita para comprar. Se recomienda cita para lecturas y limpiezas." },
      { question: "¿Qué tipos de velas tienen?", answer: "Velas votivas de vidrio en colores para protección, casos legales, amor, prosperidad y limpieza." },
      { question: "¿Tienen artículos de Orisha o Santería?", answer: "Sí — collares, estatuas de Orishas pintadas a mano, agua bendita y más, junto con suministros espirituales generales." },
      { question: "¿Cuál es su política de devoluciones?", answer: "Todas las ventas son finales." },
    ],
  },
  testimonials: {
    label: "Lo que dice la gente",
    quotes: [
      "¡Les acabo de dejar una reseña de 5 estrellas! El personal es muy amable, especialmente la mujer detrás del mostrador — es súper agradable. Todos han sido muy serviciales, y sin duda voy a seguir volviendo siempre. Gracias de nuevo por atenderme siempre — ¡me encanta que tuvieran todo lo que necesitaba!",
      "Siempre es mi lugar favorito para pasar cuando estoy por la zona. Gran selección diversa, personal amable.",
      "Ella es muy certera, ¡de verdad me ayudó! Soy creyente.",
      "Puedes conseguir todo lo que necesitas bajo un mismo techo.",
      "Llevo viniendo a esta tienda más de dos o tres años y he construido una relación positiva tanto con la dueña del negocio como con su personal, quienes han sido muy agradables conmigo y con mi familia. Los artículos de la tienda son accesibles.",
      "Esa es la botánica más útil a la que he ido en toda mi vida. La gente tiene mucho conocimiento. Todas mis preguntas fueron respondidas después de una consulta. Me sentí como una persona nueva al día siguiente de mi baño. ¡Ahora espero ver resultados en mi vela!",
      "Vine aquí porque mi mejor amiga me dijo que la lectora era certera, y vaya que tenía razón — esa mujer me ha dicho cosas sobre mí que ni mi propia madre sabía. Encontré mi lugar. Ahora nunca iré a otro lado para una lectura. Botanica Chango Spiritual Wonders tiene, sin duda, la mejor lectora.",
      "Me acabo de mudar aquí a PA y me encanta esta tienda. En cuanto entras es muy positiva, y la señora ahí es muy servicial y los precios son accesibles. ¡Volveré!",
      "Este es un muy buen lugar para ir, son muy amables y atentos.",
      "Muy buen conocimiento de las cosas, voy a recomendarlo a todos mis amigos y familia.",
      "Me encanta este lugar, siempre se siente como en casa.",
      "Ella es increíble, no iré a ningún otro lado.",
      "El mejor lugar al que he ido, me encanta la gente ahí.",
      "Muy amable y muy servicial, la señora detrás del mostrador.",
      "Excelente trabajo, y siempre ahí para ayudar con tus necesidades espirituales.",
      "Me encanta esta tienda. Todo en un solo lugar.",
      "Primera vez ahí y me sentí muy cómodo.",
      "Tienen mucho que ofrecer.",
    ],
  },
  products_catalog: {
    categories: {
      Candles: "Velas",
      "Holy water": "Agua bendita",
      "Prayer cards": "Estampas",
      Oils: "Aceites",
      Perfumes: "Perfumes",
    },
    items: {
      "candle-protection": { name: "Vela de Protección", description: "Vela votiva de vidrio para protección." },
      "candle-prosperity": { name: "Vela de Prosperidad", description: "Vela votiva de vidrio para prosperidad." },
      "candle-love": { name: "Vela de Amor", description: "Vela votiva de vidrio para el amor." },
      "holy-water-8oz": { name: "Agua Bendita (8oz)", description: "Agua bendita embotellada para la práctica." },
      "prayer-card-set": { name: "Juego de Estampas", description: "Estampas con borde dorado, juego de 5." },
      "oil-protection": { name: "Aceite de Protección", description: "Mezcla de aceite de protección en lote pequeño." },
      "perfume-attraction": { name: "Perfume de Atracción", description: "Perfume de atracción en lote pequeño." },
    },
  },
};

export const translations = { en, es };
export type Translations = typeof en;
