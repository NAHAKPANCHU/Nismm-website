
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  stock: number;
  tags?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  reviews?: number;
  gender?: 'Men' | 'Women' | 'Unisex';
  material?: string;
  size?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Gold Chain Bracelet",
    price: 299.99,
    originalPrice: 399.99,
    description: "Elegant 18k gold plated chain bracelet perfect for formal occasions. Hypoallergenic and tarnish-resistant.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    rating: 4.8,
    stock: 15,
    tags: ["bestseller", "luxury"],
    gender: "Women",
    material: "18k Gold Plated",
    size: "Adjustable",
    features: ["Hypoallergenic", "Tarnish Resistant", "Gift Box Included", "Lifetime Warranty"],
    specifications: {
      "Material": "18k Gold Plated Brass",
      "Length": "7-9 inches (adjustable)",
      "Width": "8mm",
      "Clasp": "Lobster Claw"
    },
    reviews: 247
  },
  {
    id: 2,
    name: "Silver Tennis Bracelet",
    price: 189.99,
    description: "Classic sterling silver tennis bracelet with cubic zirconia stones. Timeless elegance for any outfit.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    rating: 4.6,
    stock: 28,
    tags: ["classic", "wedding"],
    gender: "Women",
    material: "Sterling Silver",
    size: "7 inches",
    features: ["Cubic Zirconia", "Sterling Silver", "Professional Setting", "Anti-Tarnish"],
    specifications: {
      "Material": "925 Sterling Silver",
      "Stones": "Cubic Zirconia",
      "Length": "7 inches",
      "Stone Count": "48 stones"
    },
    reviews: 156
  },
  {
    id: 3,
    name: "Leather Braided Bracelet",
    price: 79.99,
    originalPrice: 99.99,
    description: "Handcrafted genuine leather bracelet with stainless steel magnetic clasp. Perfect casual accessory for men.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    rating: 4.5,
    stock: 45,
    tags: ["handmade", "casual"],
    gender: "Men",
    material: "Genuine Leather",
    size: "8.5 inches",
    features: ["Handcrafted", "Magnetic Clasp", "Water Resistant", "Adjustable"],
    specifications: {
      "Material": "Genuine Leather",
      "Clasp": "Stainless Steel Magnetic",
      "Length": "8.5 inches",
      "Width": "12mm"
    },
    reviews: 89
  },
  {
    id: 4,
    name: "Diamond Stud Earrings",
    price: 459.99,
    description: "Brilliant cut diamond stud earrings in 14k white gold setting. Certificate of authenticity included.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    rating: 4.9,
    stock: 12,
    tags: ["diamond", "luxury", "certified"],
    gender: "Women",
    material: "14k White Gold",
    features: ["Real Diamonds", "14k Gold", "Certificate Included", "Secure Backing"],
    specifications: {
      "Diamond Weight": "0.5 carat total",
      "Gold Purity": "14k White Gold",
      "Cut": "Brilliant Round",
      "Clarity": "SI1"
    },
    reviews: 324
  },
  {
    id: 5,
    name: "Steel Chain Necklace",
    price: 129.99,
    description: "Heavy duty stainless steel chain necklace. Durable and stylish for everyday wear.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Necklaces",
    rating: 4.4,
    stock: 32,
    tags: ["durable", "everyday"],
    gender: "Men",
    material: "Stainless Steel",
    size: "24 inches",
    features: ["Hypoallergenic", "Rust Resistant", "Heavy Weight", "Secure Clasp"],
    specifications: {
      "Material": "316L Stainless Steel",
      "Length": "24 inches",
      "Width": "6mm",
      "Weight": "85 grams"
    },
    reviews: 189
  },
  {
    id: 6,
    name: "Pearl Drop Earrings",
    price: 199.99,
    description: "Elegant freshwater pearl drop earrings with sterling silver hooks. Perfect for special occasions.",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    rating: 4.7,
    stock: 25,
    tags: ["pearl", "elegant", "wedding"],
    gender: "Women",
    material: "Freshwater Pearl",
    features: ["Natural Pearls", "Sterling Silver", "Secure Hooks", "Gift Packaging"],
    specifications: {
      "Pearl Type": "Freshwater",
      "Pearl Size": "8-9mm",
      "Hook Material": "Sterling Silver",
      "Drop Length": "1.5 inches"
    },
    reviews: 145
  },
  {
    id: 7,
    name: "Rose Gold Bangle Set",
    price: 249.99,
    originalPrice: 319.99,
    description: "Set of 3 stackable rose gold bangles with different textures. Mix and match for versatile styling.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    rating: 4.6,
    stock: 18,
    tags: ["stackable", "trendy", "set"],
    gender: "Women",
    material: "Rose Gold Plated",
    size: "Medium",
    features: ["Set of 3", "Stackable Design", "Different Textures", "Hypoallergenic"],
    specifications: {
      "Material": "Rose Gold Plated Brass",
      "Inner Diameter": "2.5 inches",
      "Width": "4mm, 6mm, 8mm",
      "Finish": "High Polish"
    },
    reviews: 98
  },
  {
    id: 8,
    name: "Black Onyx Ring",
    price: 159.99,
    description: "Bold black onyx signet ring in sterling silver setting. Classic masculine design.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    rating: 4.5,
    stock: 22,
    tags: ["signet", "masculine", "stone"],
    gender: "Men",
    material: "Sterling Silver",
    size: "Size 10",
    features: ["Natural Onyx", "Sterling Silver", "Comfort Fit", "Polished Finish"],
    specifications: {
      "Stone": "Natural Black Onyx",
      "Setting": "925 Sterling Silver",
      "Ring Size": "10 (Other sizes available)",
      "Stone Size": "12x10mm"
    },
    reviews: 76
  },
  {
    id: 9,
    name: "Cubic Zirconia Hoop Earrings",
    price: 89.99,
    description: "Sparkling cubic zirconia hoop earrings that catch the light beautifully. Perfect for day or night.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    rating: 4.3,
    stock: 38,
    tags: ["sparkly", "versatile", "hoops"],
    gender: "Women",
    material: "Sterling Silver",
    features: ["Cubic Zirconia", "Snap Closure", "Lightweight", "Hypoallergenic"],
    specifications: {
      "Material": "925 Sterling Silver",
      "Diameter": "20mm",
      "Stone Count": "12 CZ per earring",
      "Closure": "Snap Back"
    },
    reviews: 134
  },
  {
    id: 10,
    name: "Wooden Bead Bracelet",
    price: 49.99,
    description: "Natural wood bead bracelet with elastic cord. Eco-friendly and comfortable for daily wear.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    rating: 4.2,
    stock: 55,
    tags: ["natural", "eco-friendly", "casual"],
    gender: "Unisex",
    material: "Natural Wood",
    size: "Stretchy",
    features: ["Natural Wood", "Elastic Cord", "Eco-Friendly", "Lightweight"],
    specifications: {
      "Material": "Sandalwood",
      "Bead Size": "8mm",
      "Cord": "Elastic",
      "Circumference": "Stretches 7-9 inches"
    },
    reviews: 67
  },
  {
    id: 11,
    name: "Gold Plated Chain Necklace",
    price: 179.99,
    description: "Layered gold plated chain necklace perfect for stacking. Trendy and fashionable design.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Necklaces",
    rating: 4.4,
    stock: 29,
    tags: ["layered", "trendy", "stackable"],
    gender: "Women",
    material: "Gold Plated",
    size: "18 inches",
    features: ["Layered Design", "Gold Plated", "Adjustable Length", "Tarnish Resistant"],
    specifications: {
      "Material": "Gold Plated Brass",
      "Chain Length": "16-18 inches adjustable",
      "Chain Width": "2mm",
      "Clasp": "Spring Ring"
    },
    reviews: 156
  },
  {
    id: 12,
    name: "Titanium Wedding Band",
    price: 199.99,
    description: "Durable titanium wedding band with brushed finish. Hypoallergenic and lightweight.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    rating: 4.7,
    stock: 15,
    tags: ["wedding", "durable", "hypoallergenic"],
    gender: "Men",
    material: "Titanium",
    size: "Size 9",
    features: ["Titanium", "Brushed Finish", "Hypoallergenic", "Lightweight"],
    specifications: {
      "Material": "Grade 2 Titanium",
      "Width": "6mm",
      "Finish": "Brushed",
      "Ring Size": "9 (Other sizes available)"
    },
    reviews: 89
  },
  {
    id: 13,
    name: "Crystal Chandelier Earrings",
    price: 139.99,
    description: "Stunning crystal chandelier earrings that make a statement. Perfect for evening events.",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    rating: 4.6,
    stock: 21,
    tags: ["statement", "crystal", "evening"],
    gender: "Women",
    material: "Crystal",
    features: ["Austrian Crystal", "Silver Plated", "Statement Design", "Secure Backs"],
    specifications: {
      "Crystal Type": "Austrian Crystal",
      "Length": "3 inches",
      "Base Material": "Silver Plated",
      "Style": "Chandelier Drop"
    },
    reviews: 112
  },
  {
    id: 14,
    name: "Stainless Steel Watch Bracelet",
    price: 119.99,
    description: "Premium stainless steel bracelet designed to complement watches. Adjustable links.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    rating: 4.3,
    stock: 33,
    tags: ["watch", "adjustable", "premium"],
    gender: "Men",
    material: "Stainless Steel",
    size: "Adjustable",
    features: ["Adjustable Links", "Stainless Steel", "Professional Finish", "Easy Clasp"],
    specifications: {
      "Material": "316L Stainless Steel",
      "Link Width": "5mm",
      "Length": "7.5-9 inches adjustable",
      "Clasp": "Deployment"
    },
    reviews: 78
  },
  {
    id: 15,
    name: "Amethyst Pendant Necklace",
    price: 229.99,
    originalPrice: 289.99,
    description: "Natural amethyst pendant on sterling silver chain. Beautiful purple gemstone with healing properties.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Necklaces",
    rating: 4.8,
    stock: 16,
    tags: ["gemstone", "natural", "healing"],
    gender: "Women",
    material: "Amethyst",
    size: "20 inches",
    features: ["Natural Amethyst", "Sterling Silver Chain", "Certificate Included", "Gift Box"],
    specifications: {
      "Gemstone": "Natural Amethyst",
      "Chain": "925 Sterling Silver",
      "Pendant Size": "15x20mm",
      "Chain Length": "20 inches"
    },
    reviews: 145
  },
  {
    id: 16,
    name: "Minimalist Gold Ring",
    price: 89.99,
    description: "Simple and elegant gold band ring. Perfect for stacking or wearing alone.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    rating: 4.4,
    stock: 42,
    tags: ["minimalist", "stackable", "everyday"],
    gender: "Women",
    material: "14k Gold Filled",
    size: "Size 7",
    features: ["14k Gold Filled", "Minimalist Design", "Stackable", "Comfort Fit"],
    specifications: {
      "Material": "14k Gold Filled",
      "Width": "2mm",
      "Ring Size": "7 (Other sizes available)",
      "Finish": "High Polish"
    },
    reviews: 201
  },
  {
    id: 17,
    name: "Rope Chain Bracelet",
    price: 149.99,
    description: "Classic rope chain bracelet in sterling silver. Timeless design that never goes out of style.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    rating: 4.5,
    stock: 27,
    tags: ["classic", "rope", "timeless"],
    gender: "Unisex",
    material: "Sterling Silver",
    size: "8 inches",
    features: ["Sterling Silver", "Rope Design", "Secure Clasp", "Professional Finish"],
    specifications: {
      "Material": "925 Sterling Silver",
      "Length": "8 inches",
      "Width": "4mm",
      "Clasp": "Box Clasp"
    },
    reviews: 93
  },
  {
    id: 18,
    name: "Gemstone Statement Ring",
    price: 279.99,
    description: "Bold statement ring featuring a large oval gemstone in gold setting. Eye-catching design.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    rating: 4.6,
    stock: 19,
    tags: ["statement", "gemstone", "bold"],
    gender: "Women",
    material: "Gold Plated",
    size: "Size 8",
    features: ["Large Gemstone", "Gold Plated", "Statement Design", "Adjustable"],
    specifications: {
      "Stone": "Lab-Created Gemstone",
      "Setting": "Gold Plated Brass",
      "Stone Size": "18x13mm oval",
      "Ring Size": "8 (adjustable)"
    },
    reviews: 67
  },
  {
    id: 19,
    name: "Infinity Symbol Necklace",
    price: 99.99,
    description: "Delicate infinity symbol necklace representing eternal love. Perfect gift for someone special.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Necklaces",
    rating: 4.7,
    stock: 35,
    tags: ["infinity", "love", "gift"],
    gender: "Women",
    material: "Sterling Silver",
    size: "16 inches",
    features: ["Infinity Symbol", "Sterling Silver", "Adjustable Chain", "Gift Ready"],
    specifications: {
      "Material": "925 Sterling Silver",
      "Pendant Size": "10x20mm",
      "Chain Length": "16-18 inches adjustable",
      "Clasp": "Spring Ring"
    },
    reviews: 178
  },
  {
    id: 20,
    name: "Beaded Stretch Bracelet Set",
    price: 69.99,
    description: "Set of 3 beaded stretch bracelets in coordinating colors. Perfect for layering and mixing.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    rating: 4.3,
    stock: 48,
    tags: ["beaded", "set", "layering"],
    gender: "Women",
    material: "Natural Stone",
    size: "Stretchy",
    features: ["Set of 3", "Natural Stones", "Stretch Fit", "Coordinated Colors"],
    specifications: {
      "Bead Material": "Natural Stone Mix",
      "Bead Size": "6mm",
      "Cord": "Elastic",
      "Colors": "Rose Quartz, Amazonite, Clear Quartz"
    },
    reviews: 124
  }
];

export const categories = [
  "All",
  "Bracelets",
  "Earrings", 
  "Necklaces",
  "Rings"
];

export const genderFilters = [
  "All",
  "Men",
  "Women",
  "Unisex"
];
