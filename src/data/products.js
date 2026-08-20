export const products = [
  {
    id: "m3-premium-cardamom",
    slug: "m3-premium-cardamom",
    name: "M3 Premium Green Cardamom (Export Grade)",
    subtitle: "Jumbo Hand-Picked Supreme Pods",
    price: 1800.00, // Base price represents Grade A or standard
    rating: 5.0,
    reviewsCount: 198,
    badge: "Export Grade",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80&q=cardamom",
    category: "Whole Spices",
    weight: "250g (8.8 oz)",
    origin: "Idukki Hills, Kerala",
    aromaNotes: {
      Earthy: 35,
      Spicy: 75,
      Warm: 85,
      Herbal: 95,
      Citrusy: 98
    },
    description: "Jumbo-sized, vibrant green cardamom pods selected for their extra-high volatile organic oil content. Perfect for premium desserts, fine dining marinades, and dynamic saffron infusions.",
    story: "Harvested at peak ripeness under native shade canopy in high-altitude estates of Idukki. Hand-sorted to guarantee maximum pod size and seed count per pod.",
    ingredients: "100% Organic Green Cardamom Pods (Supreme Size).",
    aromaDescription: "Highly volatile, refreshing citrus-camphorous top notes, yielding to warm, sweet-spicy herbal undertones.",
    grades: {
      A: { label: "Grade A: Supreme Jumbo (9mm+)", price: 1800 },
      B: { label: "Grade B: Bold Premium (8mm)", price: 1450 },
      C: { label: "Grade C: Kitchen Standard (7mm)", price: 1100 }
    }
  },
  {
    id: "m3-standard-cardamom",
    slug: "m3-standard-cardamom",
    name: "M3 Standard Bold Cardamom",
    subtitle: "Highly Fragrant Mid-Size Whole Pods",
    price: 1200.00,
    rating: 4.9,
    reviewsCount: 145,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    category: "Whole Spices",
    weight: "250g (8.8 oz)",
    origin: "Wayanad Valleys, Kerala",
    aromaNotes: {
      Earthy: 30,
      Spicy: 70,
      Warm: 80,
      Herbal: 90,
      Citrusy: 92
    },
    description: "Highly fragrant whole green cardamom pods, optimal for daily chai brewing, layered rice dishes, and home spice blends. Delivers rich, consistent flavor output.",
    story: "Sourced from a collective of family-run estate farms in Wayanad. Cured in traditional brick kilns immediately after harvesting to seal in flavor profile integrity.",
    ingredients: "100% Organic Green Cardamom Pods (Bold Grade).",
    aromaDescription: "Rich citrusy-floral cardamom oils with subtle forest pine tones and warm herbal sweetness.",
    grades: {
      A: { label: "Grade A: Selected Bold (8.5mm)", price: 1400 },
      B: { label: "Grade B: Standard Bold (7.5mm)", price: 1200 },
      C: { label: "Grade C: Mixed Size (6.5mm)", price: 900 }
    }
  },
  {
    id: "m3-cooking-cardamom",
    slug: "m3-cooking-cardamom",
    name: "M3 Cooking Grade Cardamom",
    subtitle: "Cracked Pods & Seeds for Ground Spices",
    price: 600.00,
    rating: 4.7,
    reviewsCount: 88,
    badge: "Value Pack",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80&q=cardamom-seeds",
    category: "Whole Spices",
    weight: "250g (8.8 oz)",
    origin: "Western Ghats, Karnataka",
    aromaNotes: {
      Earthy: 45,
      Spicy: 65,
      Warm: 75,
      Herbal: 80,
      Citrusy: 82
    },
    description: "Highly economical whole green cardamom pods with minor surface splits. Perfect for crushing, grinding into custom masalas, or long slow-cooking applications.",
    story: "Sourced from native forests in Karnataka. These pods carry the same chemical potency as higher grades but are sorted out due to visual splits or smaller sizes.",
    ingredients: "100% Organic Green Cardamom Pods (Split Grade).",
    aromaDescription: "Grounding, warm herbal camphor notes with pleasant citrus hints and mild woodsy bark finishes.",
    grades: {
      A: { label: "Grade A: Select Split (Clean Pods)", price: 850 },
      B: { label: "Grade B: Cooking Standard (Mixed)", price: 600 },
      C: { label: "Grade C: Seeds Only (Visual Splits)", price: 450 }
    }
  },
  {
    id: "m3-organic-garam-masala",
    slug: "m3-organic-garam-masala",
    name: "M3 Organic Garam Masala",
    subtitle: "Heritage Direct Stone-Ground Blend",
    price: 350.00,
    rating: 4.9,
    reviewsCount: 224,
    badge: "Heritage",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    category: "Ground Blends",
    weight: "100g (3.5 oz)",
    origin: "Wayanad, Kerala",
    aromaNotes: {
      Earthy: 85,
      Spicy: 90,
      Warm: 95,
      Herbal: 40,
      Citrusy: 50
    },
    description: "A symphony of 12 organic ingredients, stone-ground in bi-weekly micro-batches. Adds deep, slow-release warmth and aromatic complex layers to your cooking.",
    story: "Crafted using a family recipe preserved since 1948. Every single pod, seed, and bark is slow-roasted and milled at low speeds to prevent oil vaporization.",
    ingredients: "Organic Cardamom, Black Pepper, Cloves, Cinnamon, Mace, Nutmeg, Star Anise, Fennel, Cumin, Coriander, Bay Leaves, Ginger.",
    aromaDescription: "Dominant sweet cinnamon and spicy cardamom top notes, grounding into dark, earthy black pepper and woodsy nutmeg undertones.",
    grades: {
      A: { label: "Grade A: Gold Reserve (High Cardamom)", price: 450 },
      B: { label: "Grade B: Heritage Standard", price: 350 },
      C: { label: "Grade C: Catering Pack", price: 250 }
    }
  },
  {
    id: "m3-kashmiri-chili",
    slug: "m3-kashmiri-chili",
    name: "M3 Kashmiri Chili Powder",
    subtitle: "Mild Heat Vivid Crimson Powder",
    price: 300.00,
    rating: 4.8,
    reviewsCount: 312,
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    category: "Ground Blends",
    weight: "150g (5.3 oz)",
    origin: "Pampore, Jammu & Kashmir",
    aromaNotes: {
      Earthy: 70,
      Spicy: 55,
      Warm: 80,
      Herbal: 30,
      Citrusy: 65
    },
    description: "Highly prized for its vibrant red coloring and gentle, fruity heat. Crucial for tandoori marinades, visual oil temperings, and mild curry foundations.",
    story: "Sourced from micro-farmers in Kashmiri valleys. Dried slowly under cool Himalayan mountain air before stone-grounding to retain intense natural carotenoids.",
    ingredients: "100% Organic Kashmiri Chilies.",
    aromaDescription: "Smoky, sweet dried fruit aroma with mild warming notes and a subtle, citrus-like finish.",
    grades: {
      A: { label: "Grade A: Silk Crimson (Destalked)", price: 400 },
      B: { label: "Grade B: Vivid Standard", price: 300 },
      C: { label: "Grade C: Culinary Blend", price: 200 }
    }
  },
  {
    id: "m3-saffron",
    slug: "m3-saffron",
    name: "M3 Kashmir Mongra Saffron",
    subtitle: "Grade A+ Kashmir Mongra Threads",
    price: 2600.00,
    rating: 5.0,
    reviewsCount: 95,
    badge: "Exquisite",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80&q=saffron",
    category: "Whole Spices",
    weight: "2g (0.07 oz)",
    origin: "Pampore Fields, Kashmir",
    aromaNotes: {
      Earthy: 95,
      Spicy: 40,
      Warm: 90,
      Herbal: 80,
      Citrusy: 35
    },
    description: "The gold standard of global saffron. Deep crimson stigmas containing high levels of crocin (color), picrocrocin (flavor), and safranal (aroma) parameters.",
    story: "Hand-harvested by local grower families during the brief autumn crocus bloom. Dried on site and preserved in dark glass jars to avoid photo-degradation.",
    ingredients: "100% Kashmir Mongra Saffron (Grade A+).",
    aromaDescription: "Intense hay-like, sweet metallic notes with woody, honeyed, and deep earth-bound undertones.",
    grades: {
      A: { label: "Grade A+: Mongra Supreme Threads", price: 3200 },
      B: { label: "Grade B: Lacha Threads (Mixed Style)", price: 2600 },
      C: { label: "Grade C: Saffron Broken Stigmas", price: 2000 }
    }
  },
  {
    id: "m3-lakadong-turmeric",
    slug: "m3-lakadong-turmeric",
    name: "M3 Lakadong Turmeric",
    subtitle: "Wellness High-Curcumin Turmeric",
    price: 400.00,
    rating: 4.9,
    reviewsCount: 168,
    badge: "Wellness",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80&q=turmeric",
    category: "Ground Blends",
    weight: "200g (7 oz)",
    origin: "Lakadong, Meghalaya",
    aromaNotes: {
      Earthy: 90,
      Spicy: 60,
      Warm: 85,
      Herbal: 65,
      Citrusy: 45
    },
    description: "Sourced from the hills of Meghalaya. Features a high curcumin level of 7-12% (compared to standard 2-3%), rendering it highly anti-inflammatory.",
    story: "Grown organically by women-led farm cooperatives in Meghalaya. Stone-ground in cold mills to preserve Curcumin oil bioavailability.",
    ingredients: "100% Organic Lakadong Turmeric.",
    aromaDescription: "Strong, grounding earthy turmeric backbone, enriched by sweet cinnamon aromatics and spicy pepper kicks.",
    grades: {
      A: { label: "Grade A: Select High-Curcumin (9%+)", price: 500 },
      B: { label: "Grade B: Standard Wellness (7%+)", price: 400 },
      C: { label: "Grade C: Ground Kitchen Blend", price: 300 }
    }
  }
];

export const categories = ["All Spices", "Whole Spices", "Ground Blends"];
