export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
};

export const OFFICIAL_INSTAGRAM_URL = "https://www.instagram.com/jyren_the_handpicked?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==";

export const FREE_SHIPPING_THRESHOLD_INR = 2999;
export const SHIPPING_FLAT_RATE_INR = 499;

export const COLOR_PALETTES = [
  { name: 'All Colors', hex: 'linear-gradient(135deg, #5A1224, #C59B68, #1B382B)' },
  { name: 'Crimson Red', hex: '#6E1B32' },
  { name: 'Emerald Green', hex: '#16422D' },
  { name: 'Ivory & Gold', hex: '#E5C388' },
  { name: 'Midnight Black', hex: '#1C1C1E' },
  { name: 'Coral Pink', hex: '#C83E74' },
  { name: 'Royal Mustard', hex: '#C68B1F' },
  { name: 'Deep Plum', hex: '#481D3B' }
];

export const CATEGORIES = [
  {
    id: 'ladieswear',
    title: 'Mustard Silk Co-ord Sets',
    subtitle: 'Contemporary Embroidered Kurtas & Tailored Trousers',
    image: '/images/apparel-mustard-coord.jpg',
  },
  {
    id: 'anarkali-sets',
    title: 'Flared Anarkali Ensembles',
    subtitle: 'Regal Emerald Twirls, Gold Zari Borders & Dupattas',
    image: '/images/apparel-emerald-anarkali.jpg',
  },
  {
    id: 'palazzo-suits',
    title: 'Floral Kurti & Palazzo Sets',
    subtitle: 'Pastel Blush Prints, Relaxed Palazzos & Side Pockets',
    image: '/images/apparel-blush-palazzo.jpg',
  },
  {
    id: 'family-sets',
    title: 'Family Festive Sets',
    subtitle: 'Coordinated Festive Ensembles for Grand Celebrations',
    image: '/images/family-festive-royal.jpg',
  }
];

export const PRODUCTS = [
  // --- CHURIDARS & ANARKALI SETS ---
  {
    id: 'jyr-ch01',
    name: 'Ruby Crimson Silk Churidar',
    department: 'churidars',
    category: 'churidars',
    colorName: 'Crimson Red',
    colorHex: '#6E1B32',
    priceINR: 4999,
    originalPriceINR: 8499,
    rating: 5.0,
    reviewsCount: 142,
    image: '/images/churidar-ruby-silk.jpg',
    hoverImage: '/images/churidar-emerald-anarkali.jpg',
    badge: 'Artisan Churidar',
    fabric: 'Pure Raw Silk with Scalloped Organza Dupatta',
    zari: 'Handcrafted 24k Gold Zari Neckline & Cuffs',
    description: 'An exquisite straight-silhouette churidar suit cut from luminous ruby red raw silk. Adorned with 24k gold hand-embroidery on the neckline and scalloped sheer dupatta, paired with tailored silk churidar trousers.',
    features: ['Silk Mark & Handloom Certified', 'Form-Fitting Gathered Silk Churidar Leggings', 'Hand-Scalloped Sheer Organza Dupatta', 'Skin-Safe Soft Breathable Inner Lining'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    customOptions: [
      { label: 'Standard Comfort Fit (Included)', surcharge: 0 },
      { label: 'Bespoke Tailored Inseam & Sleeve Length', surcharge: 499 },
      { label: 'Add Custom Tassel Latkans to Dupatta', surcharge: 299 }
    ],
    inStock: true
  },
  {
    id: 'jyr-ch02',
    name: 'Regal Emerald Anarkali Ensemble',
    department: 'churidars',
    category: 'churidars',
    colorName: 'Emerald Green',
    colorHex: '#16422D',
    priceINR: 6499,
    originalPriceINR: 10999,
    rating: 4.9,
    reviewsCount: 128,
    image: '/images/churidar-emerald-anarkali.jpg',
    hoverImage: '/images/churidar-ruby-silk.jpg',
    badge: 'Bestseller',
    fabric: 'Pure Chanderi Silk & Georgette',
    zari: 'Antique Gold Zardozi Floral Trellis',
    description: 'A sovereign emerald anarkali featuring a magnificent kalidar flare, rich antique gold zardozi yoke embroidery, fine matching churidar trousers, and a lightweight zari border dupatta.',
    features: ['Full Kalidar 36-Panel Flared Silhouette', 'Matching Pure Silk Fitted Churidar', 'Antique Gold Zari Bordered Dupatta', 'Complimentary Alteration Guarantee'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    customOptions: [
      { label: 'Standard Stitched (Included)', surcharge: 0 },
      { label: 'Bespoke Padded Yoke & Custom Fit', surcharge: 699 }
    ],
    inStock: true
  },
  {
    id: 'jyr-ch03',
    name: 'Royal Mustard Silk Co-ord Set',
    department: 'churidars',
    category: 'churidars',
    colorName: 'Royal Mustard',
    colorHex: '#C68B1F',
    priceINR: 3999,
    originalPriceINR: 6999,
    rating: 5.0,
    reviewsCount: 94,
    image: '/images/apparel-mustard-coord.jpg',
    hoverImage: '/images/apparel-blush-palazzo.jpg',
    badge: 'Festive Drop',
    fabric: 'Pure Mulberry Chanderi Silk',
    zari: 'Gold Gota Patti & Zari Threadwork',
    description: 'Modern traditional charm with an elongated straight silhouette, hand-embroidered floral neckline, matching churidar bottoms, and coordinated lightweight stole.',
    features: ['100% Breathable Mulberry Chanderi Weave', 'Concealed Side Pockets for Practical Ease', 'Comfort Elastic Waist Churidar', 'Dry Clean Recommended'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    customOptions: [
      { label: 'Standard Comfort Fit (Included)', surcharge: 0 },
      { label: 'Custom Tailored Inseam & Waist', surcharge: 399 }
    ],
    inStock: true
  },
  {
    id: 'jyr-ch04',
    name: 'Pastel Blush Kurti Set',
    department: 'churidars',
    category: 'churidars',
    colorName: 'Coral Pink',
    colorHex: '#C83E74',
    priceINR: 3499,
    originalPriceINR: 5999,
    rating: 4.8,
    reviewsCount: 167,
    image: '/images/apparel-blush-palazzo.jpg',
    hoverImage: '/images/churidar-ruby-silk.jpg',
    badge: 'Trending Now',
    fabric: 'Breathable Cotton-Silk Blend',
    zari: 'Pastel Resham & Micro Gold Border',
    description: 'A diaphanous symphony of blush rose florals, delicate cutwork neckline detailing, and comfortable tapered churidar trousers. Ideal for day festivals and sangeet celebrations.',
    features: ['Featherweight Breathable Fabric', 'Deep Functional Pockets', 'Hypoallergenic Gentle Texture', 'Pre-Shrunk Natural Dyes'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    customOptions: [
      { label: 'Standard Set (Included)', surcharge: 0 },
      { label: 'Custom Tailored Inseam', surcharge: 299 }
    ],
    inStock: true
  },
  {
    id: 'jyr-k01-coral',
    name: 'Coral Red Floral Kurti Set',
    department: 'churidars',
    category: 'churidars',
    colorName: 'Coral Pink',
    colorHex: '#C83E74',
    priceINR: 1299,
    originalPriceINR: 2499,
    rating: 5.0,
    reviewsCount: 148,
    image: '/images/instagram-kurti-post.jpg',
    hoverImage: '/images/kurti-coral-pant.jpg',
    badge: 'Instagram Special',
    fabric: '100% Breathable Cotton • Elegant V-Neck',
    zari: 'Embroidered V-Neckline & Floral Print',
    description: 'Simple comfort everyday style. Straight-cut floral Kurti paired with matching wide-leg pants, convenient side pockets, and elastic waist for all-day ease. Featured on @jyren_the_handpicked.',
    features: [
      'Elegant Neckline (Embroidered V-Neck)',
      'Side Pocket (Convenient & Deep)',
      'Side Slit (For Relaxed Flowing Movement)',
      'Elastic Waist (Comfort Everyday Fit)',
      '100% Breathable Cotton (Soft & Comfortable)',
      'Tradition Meets Comfort'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    customOptions: [
      { label: 'Standard Comfort Fit (Included)', surcharge: 0 },
      { label: 'Custom Tailored Inseam & Waist', surcharge: 199 }
    ],
    inStock: true
  },
  {
    id: 'jyr-k02-blue',
    name: 'Powder Blue Kurti Set',
    department: 'churidars',
    category: 'ladieswear',
    colorName: 'Powder Blue',
    colorHex: '#6BA4B8',
    priceINR: 1499,
    originalPriceINR: 2799,
    discount: '46% OFF',
    rating: 4.9,
    reviewsCount: 112,
    image: '/images/kurti-blue-pant.jpg',
    hoverImage: '/images/instagram-kurti-post.jpg',
    badge: 'New Arrival',
    fabric: 'Soft Cotton-Linen • Side Pockets with Slit',
    zari: 'Fine Threadwork & Floral Motif',
    description: 'Effortless everyday grace. Printed powder blue kurti paired with tailored straight-cut pants, side slit, and functional pocket. Ideal for daily work and festive leisure.',
    features: [
      'Fine Threadwork Embroidered Collar',
      'Deep Side Pockets for Practical Ease',
      'Straight-Cut Trousers with Elastic Waist',
      'Side Slits for Free Unrestricted Movement',
      'Hypoallergenic Soft Cotton-Linen Fabric',
      'Tradition Meets Comfort'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    customOptions: [
      { label: 'Standard Comfort Fit (Included)', surcharge: 0 },
      { label: 'Custom Tailored Inseam & Waist', surcharge: 199 }
    ],
    inStock: true
  },
  {
    id: 'jyr-k03-sage',
    name: 'Pastel Sage Kurti Set',
    department: 'churidars',
    category: 'ladieswear',
    colorName: 'Pastel Sage',
    colorHex: '#8DAA91',
    priceINR: 1399,
    originalPriceINR: 2599,
    discount: '46% OFF',
    rating: 5.0,
    reviewsCount: 96,
    image: '/images/kurti-sage-pant.jpg',
    hoverImage: '/images/kurti-coral-pant.jpg',
    badge: 'Popular',
    fabric: 'Hypoallergenic Linen • Relaxed Fit Silhouette',
    zari: 'Subtle Self-Floral Border Work',
    description: 'Simple comfort everyday style. Beautiful sage floral kurti with delicate border detailing, comfort waist matching trousers, and side slits. Perfect for warm-weather all-day wear.',
    features: [
      'Delicate Embroidered V-Collar',
      'Concealed Functional Side Pockets',
      'Relaxed-Fit Cropped Trousers',
      'Breathable Linen-Cotton Natural Weave',
      'Gentle Skin-Safe Hypoallergenic Fabric',
      'Tradition Meets Comfort'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    customOptions: [
      { label: 'Standard Comfort Fit (Included)', surcharge: 0 },
      { label: 'Custom Tailored Inseam & Waist', surcharge: 199 }
    ],
    inStock: true
  },

  // --- MENSWEAR ---
  {
    id: 'jyr-m01',
    name: 'Imperial Ivory Silk Sherwani',
    department: 'menswear',
    category: 'menswear',
    colorName: 'Ivory & Gold',
    colorHex: '#E5C388',
    priceINR: 14999,
    originalPriceINR: 23999,
    rating: 5.0,
    reviewsCount: 112,
    image: '/images/menswear-sherwani.jpg',
    hoverImage: '/images/menswear-royal-kurta.jpg',
    badge: 'Royal Groom Edit',
    fabric: 'Raw Silk & Benarasi Brocade',
    zari: 'Mughal Paisley Gold Embroidery',
    description: 'Designed for the discerning groom, this regal ivory raw silk sherwani features all-over hand-embroidered floral paisleys in 24k tested gold thread. Paired with a tailored silk churidar and safa.',
    features: ['Pure Raw Silk Base', 'Includes Churidar, Stole & Matching Safa Fabric', 'Pearl & Precious Stone Buttons', 'Bespoke Chest & Shoulder Tailoring'],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)', 'Custom Tailored'],
    customOptions: [
      { label: 'Standard Churidar (Included)', surcharge: 0 },
      { label: 'Dhoti Pant Style Upgrade', surcharge: 599 },
      { label: 'Complete Groom Accessories Pack (Safa + Stole)', surcharge: 1999 }
    ],
    inStock: true
  },
  {
    id: 'jyr-m02',
    name: 'Royal Navy Kurta & Jacket Set',
    department: 'menswear',
    category: 'menswear',
    colorName: 'Midnight Black',
    colorHex: '#1C1C1E',
    priceINR: 7499,
    originalPriceINR: 12999,
    rating: 4.9,
    reviewsCount: 86,
    image: '/images/menswear-royal-kurta.jpg',
    hoverImage: '/images/menswear-sherwani.jpg',
    badge: 'Festive Essential',
    fabric: 'Tussar Silk Kurta & Woven Brocade Nehru Jacket',
    zari: 'Intricate Paisley Gold Threadwork',
    description: 'An aristocratic evening ensemble combining a structured navy brocade Nehru jacket with a crisp silk kurta and tailored cream churidar. Perfect for Sangeet and festive receptions.',
    features: ['3-Piece Ensemble (Jacket, Kurta, Churidar)', 'Pure Metallic Zari Buttons', 'Breathable Silk Inner Lining', 'Wrinkle-Resistant Handloom'],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    customOptions: [
      { label: 'Standard Set (Included)', surcharge: 0 },
      { label: 'Bespoke Pocket Square & Royal Brooch', surcharge: 499 }
    ],
    inStock: true
  },

  // --- KIDS WEAR (BOYS) ---
  {
    id: 'jyr-k01',
    name: 'Little Prince Mustard Kurta Set',
    department: 'kidswear',
    category: 'kidswear',
    colorName: 'Royal Mustard',
    colorHex: '#C68B1F',
    priceINR: 2899,
    originalPriceINR: 4799,
    rating: 5.0,
    reviewsCount: 95,
    image: '/images/kidswear-boys-kurta.jpg',
    hoverImage: '/images/kidswear-festive.jpg',
    badge: 'Kidswear Bestseller',
    fabric: 'Soft Mulberry Silk with Pure Cotton Lining',
    zari: 'Hypoallergenic Gentle Gold Neckline Work',
    description: 'A charming festive ensemble for young boys. Handcrafted mustard silk kurta adorned with gentle traditional embroidery, coupled with an elasticated off-white silk churidar.',
    features: ['100% Breathable Soft Pure Cotton Lining', 'Elasticated Waist Churidar for Playful Ease', 'Featherweight Design for Hours of Fun', 'Hypoallergenic Zari Work'],
    sizes: ['2Y–3Y', '4Y–5Y', '6Y–7Y', '8Y–9Y', '10Y–12Y'],
    customOptions: [
      { label: 'Standard Stitched (Ready to Wear)', surcharge: 0 },
      { label: 'Extra Growth Margin Inside Hem (+2 inches)', surcharge: 299 }
    ],
    inStock: true
  },
  {
    id: 'jyr-k02',
    name: 'Little Prince Emerald Dhoti Set',
    department: 'kidswear',
    category: 'kidswear',
    colorName: 'Emerald Green',
    colorHex: '#16422D',
    priceINR: 2999,
    originalPriceINR: 4999,
    rating: 4.9,
    reviewsCount: 84,
    image: '/images/kidswear-festive.jpg',
    hoverImage: '/images/kidswear-boys-kurta.jpg',
    badge: 'Festive Favorite',
    fabric: 'Raw Silk & Tissue Dhoti',
    zari: 'Subtle Gold Collar Embroidery',
    description: 'A charming traditional outfit for young princes. Royal emerald green raw silk kurta with intricate mandarin collar embroidery, paired with a pre-pleated easy-to-wear golden dhoti.',
    features: ['Pre-Stitched Elasticated Dhoti (Easy Slip-On)', '100% Soft Organic Cotton Inner Lining', 'Traditional Gold Kamarbandh Included', 'Machine Washable on Gentle Cycle'],
    sizes: ['2Y–3Y', '4Y–5Y', '6Y–7Y', '8Y–9Y', '10Y–12Y'],
    customOptions: [
      { label: 'Standard Dhoti Style (Included)', surcharge: 0 },
      { label: 'Churidar Pajama Alternative Style', surcharge: 199 }
    ],
    inStock: true
  },

  // --- GIRLS WEAR ---
  {
    id: 'jyr-g01',
    name: 'Little Princess Magenta Lehenga',
    department: 'girlswear',
    category: 'girlswear',
    colorName: 'Coral Pink',
    colorHex: '#C83E74',
    priceINR: 3699,
    originalPriceINR: 6299,
    rating: 5.0,
    reviewsCount: 114,
    image: '/images/girlswear-festive-lehenga.jpg',
    hoverImage: '/images/ladies-lehenga.jpg',
    badge: 'Little Royalty',
    fabric: 'Pure Brocade Silk & Lightweight Net Dupatta',
    zari: 'Rich 24k Gold Floral Trellis Embroidery',
    description: 'Crafted with tender care for little princesses. Magenta pink pure silk kalidar lehenga featuring soft breathable cotton lining, elasticated drawstring waistband, matching choli, and net dupatta.',
    features: ['100% Breathable Soft Pure Cotton Lining', 'Adjustable Waist with Handcrafted Tassels', 'Featherweight Playful Comfort', 'Gentle Hypoallergenic Zari Work'],
    sizes: ['2Y–3Y', '4Y–5Y', '6Y–7Y', '8Y–9Y', '10Y–12Y'],
    customOptions: [
      { label: 'Standard Stitched (Ready to Wear)', surcharge: 0 },
      { label: 'Extra Growth Margin Inside (+2 inches)', surcharge: 299 }
    ],
    inStock: true
  },
  {
    id: 'jyr-g02',
    name: 'Maharani Ruby Bridal Lehenga',
    department: 'girlswear',
    category: 'girlswear',
    colorName: 'Crimson Red',
    colorHex: '#6E1B32',
    priceINR: 18999,
    originalPriceINR: 28999,
    rating: 5.0,
    reviewsCount: 142,
    image: '/images/ladies-lehenga.jpg',
    hoverImage: '/images/girlswear-festive-lehenga.jpg',
    badge: 'Bespoke Bridal',
    fabric: 'Pure Velvet & Raw Silk',
    zari: 'Handcrafted 24k Gold Zardozi',
    description: 'An ethereal heirloom lehenga intricately hand-embroidered with authentic zardozi, dabka, and tilla work. Features an ornate kalidar flare, matching blouse, and dual organza dupattas.',
    features: ['Silk Mark & Handloom Certified', 'Includes Custom Tailored Blouse & Latkans', 'Dual Hand-embroidered Dupattas', 'Complimentary Bridal Fit Guarantee'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    customOptions: [
      { label: 'Semi-Stitched (Customizable)', surcharge: 0 },
      { label: 'Bespoke Tailored to Measurements', surcharge: 1499 },
      { label: 'Royal Can-Can Padding', surcharge: 999 }
    ],
    inStock: true
  },

  // --- FAMILY TWINNING SETS ---
  {
    id: 'jyr-f01',
    name: 'Family Festive Royal Ensemble',
    department: 'family-sets',
    category: 'family-sets',
    colorName: 'Crimson Red',
    colorHex: '#6E1B32',
    priceINR: 32999,
    originalPriceINR: 49999,
    rating: 5.0,
    reviewsCount: 62,
    image: '/images/family-festive-royal.jpg',
    hoverImage: '/images/family-twinning.jpg',
    badge: 'Complete Family Couture',
    fabric: 'Coordinated Pure Benarasi & Katan Silk',
    zari: 'Synchronized 24k Gold Weave Motifs',
    description: 'Coordinated Festive Ensembles for Grand Celebrations. Includes matching royal ensemble for father, mother, daughter, and son — handcrafted in rich festive silk with gold zari work.',
    features: ['Full 4-Piece Family Couture Wardrobe', 'Personal Dedicated Bridal Styling Concierge', 'Complimentary Doorstep Measurements & Alterations', 'Luxury Wooden Keepsake Wardrobe Box'],
    sizes: ['Full Custom Tailored Family Ensemble'],
    customOptions: [
      { label: '4-Member Family Ensemble (Father, Mother, 2 Kids)', surcharge: 0 },
      { label: 'Add Additional Child Outfit', surcharge: 2999 },
      { label: 'Express VIP Atelier Fitting Concierge', surcharge: 1999 }
    ],
    inStock: true
  }
];

export const LOOKBOOK_REELS = [
  {
    id: 'reel-1',
    title: 'The Handpicked Silk Suit Ensemble Walk',
    location: 'Heritage Courtyard Atelier',
    model: '@jyren_the_handpicked',
    views: '1.4M',
    image: '/images/instagram-reel-walk.jpg',
    productId: 'jyr-ch01'
  },
  {
    id: 'reel-2',
    title: 'Coral Red Floral Kurti with Pant Edit',
    location: 'Everyday Style Studio',
    model: '@jyren_the_handpicked',
    views: '980K',
    image: '/images/instagram-kurti-post.jpg',
    productId: 'jyr-k01-coral'
  },
  {
    id: 'reel-3',
    title: 'Embroidered Zari Neckline & Scalloped Dupatta',
    location: 'Atelier Draping Suite',
    model: '@jyren_the_handpicked',
    views: '2.1M',
    image: '/images/instagram-reel-closeup.jpg',
    productId: 'jyr-ch02'
  },
  {
    id: 'reel-4',
    title: 'Regal Back Drape & Silhouette Detailing',
    location: 'Palace Archway Walkway',
    model: '@jyren_the_handpicked',
    views: '3.6M',
    image: '/images/instagram-reel-back.jpg',
    productId: 'jyr-ch03'
  }
];

export const REVIEWS = [
  {
    id: 'rev-1',
    name: 'Dr. Ananya Sharma',
    role: 'Bride & Surgeon, New Delhi',
    rating: 5,
    verified: true,
    title: 'The lehenga felt like an imperial heirloom passed down generations',
    comment: 'The Ruby Crimson Zardozi Lehenga was the centerpiece of my wedding. The weight of the silk was majestic yet so comfortable to move and dance in. The gold threadwork sparkled under the chandeliers!',
    product: 'Ruby Crimson Zardozi Bridal Lehenga'
  },
  {
    id: 'rev-2',
    name: 'Vikramaditya Roy',
    role: 'Architect & Groom, London',
    rating: 5,
    verified: true,
    title: 'Flawless bespoke fit and unmatched royal aura',
    comment: 'Ordered the Imperial Ivory Sherwani from London with custom measurements. It arrived tailored to millimeter precision. The hand embroidery in 24k gold thread drew endless compliments throughout our reception.',
    product: 'Imperial Ivory Pure Raw Silk Sherwani'
  },
  {
    id: 'rev-3',
    name: 'Pooja & Sameer Kulkarni',
    role: 'Parents, Bangalore',
    rating: 5,
    verified: true,
    title: 'Our kids stole the entire spotlight at Diwali!',
    comment: 'We got the Princess Coral Lehenga for our 5-year-old and the Emerald Kurta Dhoti for our 7-year-old. Pure soft cotton lining meant no itching or discomfort, even after 8 hours of festivities.',
    product: 'Little Princess & Prince Festive Ensembles'
  },
  {
    id: 'rev-4',
    name: 'Rohit & Neha Singhania',
    role: 'Heritage Connoisseurs, Mumbai',
    rating: 5,
    verified: true,
    title: 'Family Twinning Set made our family portraits look like royal paintings',
    comment: 'The coordinated hues across all four outfits were synchronised to perfection. The bespoke concierge service handled every detail with utter grace and luxury.',
    product: 'Imperial Heritage Coordinated Family Twinning'
  },
  {
    id: 'rev-5',
    name: 'Meenakshi Iyer',
    role: 'Stylist & Educator, Chennai',
    rating: 5,
    verified: true,
    title: 'The Coral Red Kurti with Pant is pure everyday comfort perfection',
    comment: 'Found JYREN through Instagram (@jyren_the_handpicked) and ordered the Coral Red Kurti set. The 100% breathable cotton feels like a gentle breeze, and the pockets with elastic waist make it my favorite daily outfit!',
    product: 'Coral Red Floral Kurti with Pant'
  },
  {
    id: 'rev-6',
    name: 'Kavita Menon',
    role: 'Classical Dancer & Patron, Hyderabad',
    rating: 5,
    verified: true,
    title: 'Pure handloom excellence with direct loom pricing',
    comment: 'Visiting the atelier in Hyderabad was such a luxurious experience. The Emerald kalidar anarkali is weightless and flows like liquid silk during my recitals. Truly heirloom couture!',
    product: 'Regal Emerald Flared Anarkali & Churidar'
  }
];

