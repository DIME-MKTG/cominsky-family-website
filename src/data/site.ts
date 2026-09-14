/**
 * Central content/data for the Cominsky Family Foundation site.
 * Editing copy, links, nav, initiatives, events, team, etc. happens here —
 * components stay generic and map over this data.
 */

export const site = {
  name: "Cominsky Family Foundation",
  location: "Barberton, Ohio",
  status: "501(c)(3)",
  email: "cominskyff@gmail.com",
  year: 2026,
} as const;

/** External + cross-page links used across the site. */
export const links = {
  donate:
    "https://app.betterunite.com/cominskyfamilyfoundation-donatenow/donate",
  campRegistration:
    "https://app.betterunite.com/cominskyfamilyfoundation-johncominskyyouthfootballcamp/donate",
  facebook:
    "https://www.facebook.com/Cominsky-Family-Foundation-103672108570734/",
  instagram: "https://www.instagram.com/cominskyff/",
  honeymoonGrille: "https://honeymoongrille.com",
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** Absolute site route used to compute the active state. */
  match?: string;
  external?: boolean;
}

/** Primary header navigation (multi-page). */
export const navLinks: NavLink[] = [
  { label: "Mission", href: "/mission-statement", match: "/mission-statement" },
  { label: "Our Team", href: "/our-team", match: "/our-team" },
  { label: "Backpack Blessings", href: "/backpack-blessings", match: "/backpack-blessings" },
  { label: "Events", href: "/events", match: "/events" },
  { label: "Blog", href: "/blog", match: "/blog" },
  { label: "JC's R4F", href: "/jcs-r4f", match: "/jcs-r4f" },
  { label: "Merch", href: "/merchandise", match: "/merchandise" },
  { label: "Contact", href: "/contact-us", match: "/contact-us" },
];

/** Comprehensive footer navigation. */
export const footerLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Mission Statement", href: "/mission-statement" },
  { label: "Our Team", href: "/our-team" },
  { label: "Backpack Blessings", href: "/backpack-blessings" },
  { label: "Partner Program", href: "/partner-program" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog", match: "/blog" },
  { label: "JC's R4F", href: "/jcs-r4f" },
  { label: "Merchandise", href: "/merchandise" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact-us" },
];

/* ---------------------------------------------------------------------------
   Homepage: initiatives
--------------------------------------------------------------------------- */
export interface Initiative {
  number: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  objectPosition?: string;
  href?: string;
}

export const initiatives: Initiative[] = [
  {
    number: "01",
    title: "Backpack Blessings",
    body: "Reusable backpacks stocked with non-perishable food, sent home quietly with kids who need them — so hunger never gets in the way of a childhood.",
    image: "/photos/initiatives/backpack.jpg",
    alt: "Serving at the BACM food pantry",
    objectPosition: "50% 30%",
    href: "/backpack-blessings",
  },
  {
    number: "02",
    title: "Youth Football Camp",
    body: "A free night under the lights with John and coaches who care — drills, effort, attitude, and toughness for every kid who shows up.",
    image: "/photos/initiatives/football-camp.jpg",
    alt: "Campers in Under the Lights shirts",
    href: "/events",
  },
  {
    number: "03",
    title: "Holiday Turkey Drive",
    body: "Every November we fill a trailer with turkeys and deliver them to local pantries, so more families sit down to a full Thanksgiving table.",
    image: "/photos/initiatives/turkey-drive.jpg",
    alt: "A trailer full of donated turkeys",
  },
  {
    number: "04",
    title: "Community Outreach",
    body: "Showing up for the people and small businesses of Barberton — the shops, schools, and neighbors who raised us.",
    image: "/photos/initiatives/outreach.jpg",
    alt: "John visiting a Barberton small business",
    objectPosition: "50% 40%",
    href: "/partner-program",
  },
];

/* ---------------------------------------------------------------------------
   Events (shared by homepage + /events + event detail pages)
--------------------------------------------------------------------------- */
export interface EventItem {
  slug: string;
  term: string;
  statusLabel: string;
  statusKind: "open" | "closed" | "upcoming";
  title: string;
  location?: string;
  /** Short summary for cards; rendered as HTML so it can hold links. */
  bodyHtml: string;
  /** Longer copy for the detail page. */
  detailHtml?: string;
  image: string;
  alt: string;
  /** Show on the homepage events strip. */
  featured?: boolean;
  registerUrl?: string;
}

export const events: EventItem[] = [
  {
    slug: "john-cominsky-youth-football-camp",
    term: "June 26, 2026 · 6:45–9:15 PM",
    statusLabel: "Open",
    statusKind: "open",
    title: "John Cominsky Youth Football Camp",
    location: "Barberton High School Stadium · 555 Barber Rd, Barberton, OH 44203",
    bodyHtml:
      'Free for all kids. <a href="#register">Click here to register</a> — spots go fast.',
    detailHtml:
      "A free night under the lights with John and a crew of coaches who care. Every kid runs drills, competes, and gets coached on effort, attitude, and toughness — no cost, no catch. Spots fill fast, so register early.",
    image: "/photos/events/football-camp.jpg",
    alt: "Youth football camp",
    featured: true,
    registerUrl: links.campRegistration,
  },
  {
    slug: "under-the-lights-free-youth-football-camp",
    term: "Summer 2026",
    statusLabel: "Upcoming",
    statusKind: "upcoming",
    title: "Under the Lights — Free Youth Football Camp",
    location: "Barberton, OH",
    bodyHtml:
      "John speaks to the youth attending one of the free Under the Lights football camps — drills, effort, and heart.",
    detailHtml:
      "The Under the Lights camp is where it all started. A free evening of football for the youth of Barberton, capped by John speaking directly to the kids about showing up, working hard, and pushing the rock every single day.",
    image: "/photos/initiatives/football-camp.jpg",
    alt: "Under the Lights youth football camp",
  },
  {
    slug: "event-two-cblew",
    term: "Summer 2026",
    statusLabel: "Spots Full",
    statusKind: "closed",
    title: "6th Annual Cornhole Tournament",
    location: "Barberton Moose Lodge · 250 31st St NW, Barberton, OH 44203",
    bodyHtml: "Our biggest fundraiser of the year — teams, boards, and a whole lot of community.",
    detailHtml:
      "Grab a partner and toss some bags for a good cause. Our annual cornhole tournament brings the whole community together for a night of friendly competition, food, and fundraising for the Foundation's youth initiatives.",
    image: "/photos/events/cornhole.jpg",
    alt: "Cornhole tournament",
    featured: true,
  },
  {
    slug: "annual-dodgeball-tournament",
    term: "Spring 2026",
    statusLabel: "Upcoming",
    statusKind: "upcoming",
    title: "Barberton High School Dodgeball Tournament",
    location: "Barberton, OH",
    bodyHtml:
      "In partnership with the Barberton DECA program — a springtime showdown for a good cause.",
    detailHtml:
      "Run in partnership with the Barberton DECA program, our dodgeball tournament is a fast, fun springtime event that rallies students and the community around the Foundation's mission.",
    image: "/photos/story/drills.jpg",
    alt: "Dodgeball tournament action",
  },
];

/* ---------------------------------------------------------------------------
   Homepage: story gallery
--------------------------------------------------------------------------- */
export interface StoryImage {
  image: string;
  alt: string;
  objectPosition?: string;
}

export const storyFeature: StoryImage = {
  image: "/photos/story/huddle.jpg",
  alt: "John talking to campers before drills",
};

export const storyStack: StoryImage[] = [
  { image: "/photos/story/camp-drills.jpg", alt: "Camp drills at Art Wright Stadium" },
  { image: "/photos/story/camp-jersey.jpg", alt: "A camper in a Cominsky jersey", objectPosition: "50% 30%" },
];

export const storyRow: StoryImage[] = [
  { image: "/photos/story/camp-lineup.jpg", alt: "Coaches and campers lined up" },
  { image: "/photos/story/camp-fans.jpg", alt: "John with young fans after camp", objectPosition: "50% 25%" },
  { image: "/photos/story/coaching.jpg", alt: "One-on-one coaching" },
];

export const goal = {
  show: true,
  label: "Backpack Blessings",
  target: "$3,000",
  raisedPercent: 38,
} as const;

/* ---------------------------------------------------------------------------
   Team
--------------------------------------------------------------------------- */
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string[];
  objectPosition?: string;
}

export const team: TeamMember[] = [
  {
    name: "John Cominsky",
    role: "Co-Founder",
    image: "/photos/team/john.jpg",
    alt: "John Cominsky",
    objectPosition: "50% 30%",
    bio: [
      "Born and raised in Barberton, OH, John graduated from Barberton High School in 2014 and earned a Bachelor's in Biology and Chemistry from the University of Charleston in December 2018.",
      "Selected in the 2019 NFL Draft by the Atlanta Falcons, John played three seasons in Atlanta and three with the Detroit Lions before retiring from professional football in March 2025.",
      "His foundation work began with the John Cominsky Youth Football Camp — and the community's enthusiasm for investing in youth inspired him to build something bigger. John and Brittany have two children, Emersyn and Wren.",
    ],
  },
  {
    name: "Brittany Cominsky",
    role: "Co-Founder",
    image: "/photos/team/brittany.jpg",
    alt: "Brittany Cominsky",
    objectPosition: "50% 0%",
    bio: [
      "Also a Barberton native, Brittany graduated from Barberton High School in 2009. She holds a Bachelor's in Health Services Management and a Master's in Organizational Leadership from Malone University.",
      "Married to John since 2018, she relocated for his NFL career — three years in Atlanta and three in Detroit.",
      "Brittany is passionate about supporting women, particularly those navigating postpartum challenges, and is pursuing her postpartum doula certification. Co-founding the Foundation realized her longtime goal of running a nonprofit.",
    ],
  },
];

/* ---------------------------------------------------------------------------
   Partners
--------------------------------------------------------------------------- */
export interface Partner {
  name: string;
  url?: string;
  note: string;
}

export const partners: Partner[] = [
  { name: "Honeymoon Grille", url: links.honeymoonGrille, note: "Fuels Backpack Blessings" },
  { name: "Skoops Ice Cream", note: "Supports our youth events" },
];

/* ---------------------------------------------------------------------------
   Testimonials
--------------------------------------------------------------------------- */
export interface Testimonial {
  quote: string;
  name: string;
  location?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Love seeing your dedication to the youth of our area! Thank you.",
    name: "Duane Milford",
    location: "Barberton, Ohio",
  },
];

/* ---------------------------------------------------------------------------
   JC's R4F — Run for Funds giving options
--------------------------------------------------------------------------- */
export interface GivingOption {
  title: string;
  detail: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export const r4fGoal = "$5,000";

export const r4fOptions: GivingOption[] = [
  {
    title: "Give a flat amount",
    detail: "$150 gets your name on the back of the race-day t-shirt.",
    image: "/photos/jcs/flat-amount.JPG",
    imageAlt: "Signed John Cominsky jersey displayed at a foundation event",
    imageWidth: 1365,
    imageHeight: 2048,
  },
  {
    title: "Promote your business",
    detail: "$250 puts your business logo on the front of John's race-day t-shirt.",
    image: "/photos/jcs/promote-business.png",
    imageAlt: "John Cominsky signing a young participant's shirt",
    imageWidth: 1320,
    imageHeight: 871,
  },
  {
    title: "Donate $1 per training mile",
    detail:
      "John began training on July 7th and expects to run 200–400 miles over his 12-week training period.",
    image: "/photos/jcs/want-donate.JPG",
    imageAlt: "John Cominsky posing with a young football camp participant",
    imageWidth: 1320,
    imageHeight: 868,
  },
];
