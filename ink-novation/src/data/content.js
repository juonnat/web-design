export const studio = {
  name: 'Ink Novation',
  tagline: 'Three Artists. One Studio. Custom Work Only.',
  // No personal numbers go on this site. A dedicated studio business line
  // has not been set up yet — until it exists, both stay null and the UI
  // falls back to `phonePlaceholder`. See README before launch.
  phone: null,
  phoneHref: null,
  phonePlaceholder: 'Business line coming soon',
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
    'Bookings are handled directly through Instagram DM — this site does not book appointments.',
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

// Artists are contacted through Instagram only. Personal phone numbers are
// deliberately absent from this data — do not add them back. When the studio
// business line exists it belongs on `studio`, not on individual artists.
export const artists = [
  {
    slug: 'bryan',
    name: 'Bryan Dilone',
    role: 'Owner & Lead Tattoo Artist',
    instagramHandle: '@tattoofurius',
    instagramHref: 'https://www.instagram.com/tattoofurius',
    bio: 'Lead artist specializing in custom design work with a signature bold, detailed style.',
  },
  {
    // Slug stays 'junior' (his professional name, and the URL/asset folder);
    // the site displays his full name.
    slug: 'junior',
    name: 'Nelson Cruz',
    role: 'Tattoo Artist',
    instagramHandle: '@jncoficial',
    instagramHref: 'https://www.instagram.com/jncoficial',
    bio: 'Versatile tattoo artist known for clean linework and creative custom pieces.',
  },
  {
    slug: 'sharyn',
    name: 'Sharyn Fajardo',
    role: 'Tattoo Artist',
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
      'Nelson did my forearm piece and the linework is razor clean. Already planning my next session with him.',
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
