export const studio = {
  name: 'Ink Novation',
  tagline: 'Three Artists. One Studio. Custom Work Only.',
  phone: '484-505-8810',
  phoneHref: 'tel:+14845058810',
  email: 'ink.novation22@gmail.com',
  emailHref: 'mailto:ink.novation22@gmail.com',
  instagramHandle: '@ink.novation.art',
  instagramHref: 'https://www.instagram.com/ink.novation.art',
  address: '1111 Union Boulevard, Allentown, PA 18109',
  addressLine1: '1111 Union Boulevard',
  addressLine2: 'Allentown, PA 18109',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=1111+Union+Boulevard+Allentown+PA+18109',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=1111+Union+Boulevard+Allentown+PA+18109&output=embed',
  rating: 5.0,
  bookingNote:
    'Bookings are handled directly via Instagram DM or phone call — this site does not book appointments.',
  hours: [
    { days: 'Monday', time: 'Closed' },
    { days: 'Tuesday – Friday', time: '10AM – 6PM' },
    { days: 'Saturday', time: '11AM – 5PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  stat: {
    value: 300,
    suffix: '+',
    label: 'Custom Pieces Tattooed',
  },
}

export const artists = [
  {
    slug: 'bryan',
    name: 'Bryan Dilone',
    role: 'Owner & Lead Tattoo Artist',
    phone: '484-505-8810',
    phoneHref: 'tel:+14845058810',
    instagramHandle: '@tattoofurius',
    instagramHref: 'https://www.instagram.com/tattoofurius',
    bio: 'Lead artist specializing in custom design work with a signature bold, detailed style.',
  },
  {
    slug: 'junior',
    name: 'Junior',
    role: 'Tattoo Artist',
    phone: '484-469-1479',
    phoneHref: 'tel:+14844691479',
    instagramHandle: '@jncoficial',
    instagramHref: 'https://www.instagram.com/jncoficial',
    bio: 'Versatile tattoo artist known for clean linework and creative custom pieces.',
  },
  {
    slug: 'sharyn',
    name: 'Sharyn',
    role: 'Tattoo Artist',
    // Placeholder — Sharyn's real direct number still needs to be collected.
    // Deliberately NOT reusing Junior's number. See README before launch.
    phone: null,
    phoneHref: null,
    instagramHandle: '@sharyn.tattoo',
    instagramHref: 'https://www.instagram.com/sharyn.tattoo',
    bio: 'Tattoo artist bringing precision and artistic flair to every custom piece.',
  },
]

export const services = [
  {
    title: 'Custom Tattoos',
    price: '$150+',
    description:
      'Fully custom designs built around your idea, sized and placed to fit your body.',
  },
  {
    title: 'Black and Grey',
    price: '$150+',
    description:
      'Classic black and grey work — clean shading and linework built to last.',
  },
  {
    title: 'Color Work',
    price: '$250+',
    description:
      'Bold, saturated color pieces from our artists’ custom design process.',
  },
  {
    title: 'Touch Ups',
    price: '$80+',
    description:
      'Refresh and restore existing work to keep it looking as sharp as day one.',
  },
]

export const testimonials = [
  {
    name: 'Marcus L.',
    rating: 5,
    quote:
      'Bryan brought my idea to life better than I could have described it. The detail in the linework is incredible.',
  },
  {
    name: 'Priya S.',
    rating: 5,
    quote:
      "Junior did my forearm piece and the linework is razor clean. Already planning my next session with him.",
  },
  {
    name: 'Devon K.',
    rating: 5,
    quote:
      'Sharyn nailed the concept on the first try. Precise, patient, and genuinely talented.',
  },
  {
    name: 'Ashley R.',
    rating: 5,
    quote:
      'Three different artists, three different styles, one studio I trust completely. Ink Novation is the real deal.',
  },
]

export const galleryCounts = {
  bryan: 6,
  junior: 6,
  sharyn: 6,
}
