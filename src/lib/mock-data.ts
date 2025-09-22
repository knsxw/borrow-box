export interface Item {
  id: string
  title: string
  description: string
  category: string
  location: string
  duration: string
  owner: string
  image: string
  available: boolean
}

export const mockItems: Item[] = [
  {
    id: "1",
    title: "Professional Camera Lens",
    description: "Canon 24-70mm f/2.8L lens, perfect for photography projects. Well maintained and includes lens cap.",
    category: "Electronics",
    location: "Manhattan",
    duration: "1 week",
    owner: "Sarah Chen",
    image: "/professional-camera-lens.jpg",
    available: true,
  },
  {
    id: "2",
    title: "Electric Drill Set",
    description: "DeWalt cordless drill with various bits and attachments. Great for home improvement projects.",
    category: "Tools",
    location: "Brooklyn",
    duration: "3 days",
    owner: "Mike Johnson",
    image: "/electric-drill-set-tools.jpg",
    available: true,
  },
  {
    id: "3",
    title: "Camping Tent (4-person)",
    description: "Spacious 4-person tent, waterproof and easy to set up. Perfect for weekend camping trips.",
    category: "Sports",
    location: "Queens",
    duration: "1 week",
    owner: "Emma Davis",
    image: "/camping-tent-outdoor.jpg",
    available: true,
  },
  {
    id: "4",
    title: "Stand Mixer",
    description: "KitchenAid stand mixer in excellent condition. Includes dough hook, whisk, and paddle attachments.",
    category: "Kitchen",
    location: "Manhattan",
    duration: "2 weeks",
    owner: "Alex Rodriguez",
    image: "/kitchen-stand-mixer.jpg",
    available: true,
  },
  {
    id: "5",
    title: "Mountain Bike",
    description: "Trek mountain bike, 21-speed, perfect for trails and city riding. Helmet included.",
    category: "Sports",
    location: "Central Park",
    duration: "1 week",
    owner: "Lisa Wang",
    image: "/mountain-bike-bicycle.jpg",
    available: true,
  },
  {
    id: "6",
    title: "Projector",
    description: "HD projector perfect for movie nights or presentations. Includes HDMI cable and remote.",
    category: "Electronics",
    location: "Brooklyn",
    duration: "3 days",
    owner: "David Kim",
    image: "/hd-projector-electronics.jpg",
    available: true,
  },
  {
    id: "7",
    title: "Garden Tools Set",
    description: "Complete gardening set with spade, rake, pruning shears, and watering can.",
    category: "Garden",
    location: "Queens",
    duration: "1 week",
    owner: "Maria Garcia",
    image: "/garden-tools-set.png",
    available: true,
  },
  {
    id: "8",
    title: "Board Game Collection",
    description: "Collection of popular board games including Settlers of Catan, Ticket to Ride, and more.",
    category: "Other",
    location: "Manhattan",
    duration: "2 weeks",
    owner: "Tom Wilson",
    image: "/board-games-collection.jpg",
    available: true,
  },
]
