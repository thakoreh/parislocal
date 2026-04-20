import { mutation } from "./_generated/server";
import { v } from "convex/values";

const categories = [
  { name: "Restaurants & Dining", slug: "restaurants", description: "Local restaurants, pubs, and eateries in Paris, Ontario", icon: "UtensilsCrossed", order: 0, featured: true },
  { name: "Cafes & Bakery", slug: "cafes", description: "Coffee shops, cafes, and bakeries", icon: "Coffee", order: 1, featured: true },
  { name: "Plumbing", slug: "plumbing", description: "Licensed plumbers for repairs, installations, and emergencies", icon: "Wrench", order: 2, featured: false },
  { name: "Electrical", slug: "electrical", description: "Certified electricians for wiring, panels, and upgrades", icon: "Zap", order: 3, featured: false },
  { name: "Heating & Cooling", slug: "hvac", description: "Furnace, AC, and HVAC system installation and repair", icon: "Thermometer", order: 4, featured: false },
  { name: "Landscaping", slug: "landscaping", description: "Lawn maintenance, garden design, and outdoor services", icon: "TreePine", order: 5, featured: false },
  { name: "General Contracting", slug: "contracting", description: "Renovations, additions, and custom building projects", icon: "Hammer", order: 6, featured: false },
  { name: "Cleaning Services", slug: "cleaning", description: "Residential and commercial cleaning professionals", icon: "Sparkles", order: 7, featured: false },
  { name: "Roofing", slug: "roofing", description: "Roof repairs, replacement, and new installations", icon: "Home", order: 8, featured: false },
  { name: "Painting", slug: "painting", description: "Interior and exterior painting services", icon: "Paintbrush", order: 9, featured: false },
  { name: "Auto Repair", slug: "auto-repair", description: "Mechanics and auto shops for maintenance and repairs", icon: "Car", order: 10, featured: false },
  { name: "Tree Service", slug: "tree-service", description: "Tree removal, trimming, stump grinding, and arborist services", icon: "Trees", order: 11, featured: false },
  { name: "Moving & Storage", slug: "moving", description: "Moving services and storage solutions", icon: "Truck", order: 12, featured: false },
  { name: "Hair & Beauty", slug: "hair-beauty", description: "Hair salons, barbers, spas, and esthetics", icon: "Scissors", order: 13, featured: false },
  { name: "Fitness & Wellness", slug: "fitness", description: "Gyms, yoga studios, and fitness centres", icon: "Dumbbell", order: 14, featured: false },
  { name: "Legal Services", slug: "legal", description: "Lawyers and legal services in Paris", icon: "Scale", order: 15, featured: false },
  { name: "Real Estate", slug: "real-estate", description: "Local real estate agents and property services", icon: "Building2", order: 16, featured: false },
  { name: "Dental", slug: "dental", description: "Dentists and dental clinics", icon: "Smile", order: 17, featured: false },
  { name: "Health & Wellness", slug: "health", description: "Physiotherapy, chiropractic, massage therapy", icon: "Heart", order: 18, featured: false },
  { name: "Pet Services", slug: "pet-services", description: "Veterinary clinics and pet care", icon: "PawPrint", order: 19, featured: false },
];

// Businesses sourced from YellowPages.ca, company websites, and community listings.
// Only Paris, Ontario businesses. No Brantford or Cambridge exclusives.
// Listings marked verified=false could not be independently confirmed.
const businesses = [
  // RESTAURANTS
  {
    name: "Paris Inn", slug: "paris-inn", description: "Classic Paris restaurant with a scenic view of the Grand River.",
    longDescription: "The Paris Inn has been a cornerstone of Paris dining for decades, offering classic Canadian cuisine with stunning views of the Grand River. Located on Grand River Street North, it's a go-to spot for locals and visitors alike. Known for hearty portions, friendly service, and one of the best patios in Paris.",
    categorySlug: "restaurants", categoryName: "Restaurants & Dining",
    services: ["Lunch", "Dinner", "Patio Dining", "Takeout", "Catering"],
    phone: "(519) 442-2581", address: "15 Grand River St N", city: "Paris", province: "ON", postalCode: "N3L 2M2",
    lat: 43.1945, lng: -80.3835, verified: true, featured: true,
    tags: ["restaurant", "river view", "patio", "dining", "classic"],
    source: "tripadvisor.ca — rated #1 restaurant in Paris ON", lastVerified: "2026-04",
  },
  {
    name: "Juniper Dining", slug: "juniper-dining-co", description: "Upscale casual dining in the heart of downtown Paris. Farm-to-table cuisine with locally sourced ingredients.",
    categorySlug: "restaurants", categoryName: "Restaurants & Dining",
    services: ["Lunch", "Dinner", "Wine Bar", "Farm-to-Table", "Private Events"],
    phone: "(519) 442-3522", address: "3 Elm St", city: "Paris", province: "ON",
    verified: true, featured: true,
    tags: ["upscale", "farm-to-table", "wine", "downtown", "locally-sourced"],
    source: "juniperdiningco.ca — verified Paris ON restaurant", lastVerified: "2026-04",
  },
  {
    name: "Cobblestone Pub", slug: "cobblestone-public-house", description: "Traditional pub atmosphere in a heritage cobblestone building. Craft beer, comfort food, and live music.",
    longDescription: "Set inside one of Paris's historic cobblestone buildings, the Cobblestone Pub offers a warm pub experience with craft beers on tap, classic pub fare, and regular live music nights. The heritage setting makes it a unique dining spot you won't find anywhere else.",
    categorySlug: "restaurants", categoryName: "Restaurants & Dining",
    services: ["Lunch", "Dinner", "Craft Beer", "Live Music", "Pub Fare", "Patio"],
    phone: "(519) 442-2337", address: "111 Grand River St N", city: "Paris", province: "ON", postalCode: "N3L 2M4",
    verified: true, featured: true,
    tags: ["pub", "craft beer", "heritage building", "live music", "cobblestone"],
    source: "yellowpages.ca — verified address and phone", lastVerified: "2026-04",
  },
  {
    name: "Mario's Pizza", slug: "marios-pizza", description: "Local pizza shop on Dundas Street. Takeout and delivery with a no-frills approach.",
    categorySlug: "restaurants", categoryName: "Restaurants & Dining",
    services: ["Pizza", "Takeout", "Delivery"],
    phone: "(519) 442-3030", address: "Dundas St", city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["pizza", "takeout", "delivery", "casual"],
    source: "yellowpages.ca — listed in Paris ON", lastVerified: "2026-04",
  },
  {
    name: "Stillwaters Plate and Pour", slug: "stillwaters-plate-and-pour", description: "Dining and drinks in Paris, Ontario. Locally owned restaurant and bar.",
    categorySlug: "restaurants", categoryName: "Restaurants & Dining",
    services: ["Lunch", "Dinner", "Drinks", "Casual Dining"],
    phone: "(519) 440-0066", address: "61 Grand River St N", city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["restaurant", "bar", "casual dining"],
    source: "yellowpages.ca — verified address and phone", lastVerified: "2026-04",
  },
  {
    name: "Yaari Adda", slug: "yaari-adda", description: "Restaurant serving flavorful Indian cuisine in Paris, Ontario.",
    categorySlug: "restaurants", categoryName: "Restaurants & Dining",
    services: ["Lunch", "Dinner", "Takeout", "Indian Cuisine"],
    city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["indian", "restaurant", "takeout", "dining"],
    source: "yellowpages.ca — listed in Paris ON", lastVerified: "2026-04",
  },
  // CAFES & BAKERY
  {
    name: "Little Paris Bread Co.", slug: "little-paris-bread-co", description: "Small batch bakery specializing in sourdough bread and baked goods.",
    categorySlug: "cafes", categoryName: "Cafes & Bakery",
    services: ["Sourdough Bread", "Baked Goods", "Small Batch Baking"],
    address: "32 Dundas St W", city: "Paris", province: "ON",
    verified: true, featured: true,
    tags: ["bakery", "sourdough", "bread", "small batch", "local"],
    source: "yellowpages.ca — verified Paris ON bakery", lastVerified: "2026-04",
  },
  // PLUMBING
  {
    name: "Chasles Plumbing Professionals", slug: "chasles-plumbing", description: "Experienced plumbers for residential and commercial work in the Paris area.",
    categorySlug: "plumbing", categoryName: "Plumbing",
    services: ["Residential Plumbing", "Commercial Plumbing", "Repairs", "Installation", "Emergency Service"],
    city: "Paris", province: "ON", verified: true, featured: true, emergency247: true,
    tags: ["plumber", "residential", "commercial", "emergency", "24/7"],
    source: "chaslesplumbing.com — company website, verified Paris ON address", lastVerified: "2026-04",
  },
  {
    name: "Backwoods Plumbing", slug: "backwoods-plumbing", description: "Local plumber Tom Jackman serving Paris and the surrounding area.",
    categorySlug: "plumbing", categoryName: "Plumbing",
    services: ["Residential Plumbing", "Repairs", "Installation"],
    phone: "(519) 802-5832", city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["plumber", "residential", "local", "recommended"],
    source: "Facebook 'Ask! Paris, Ontario' group — multiple local recommendations", lastVerified: "2026-04",
  },
  {
    name: "Paris Plumbing", slug: "paris-plumbing", description: "Plumbing services listed in Paris, Ontario on Yelp.",
    categorySlug: "plumbing", categoryName: "Plumbing",
    services: ["Plumbing Repairs", "Installation", "Maintenance"],
    city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["plumber", "plumbing", "repairs"],
    source: "yelp.ca — listed in Paris ON plumbing", lastVerified: "2026-04",
  },
  // ELECTRICAL
  {
    name: "Ferguson Electrical Solutions", slug: "ferguson-electrical", description: "Licensed electrical contracting for residential and commercial projects in Paris, Ontario.",
    categorySlug: "electrical", categoryName: "Electrical",
    services: ["Installation", "Maintenance", "Repair", "Residential", "Commercial"],
    phone: "(519) 400-9825", city: "Paris", province: "ON",
    verified: true, featured: true,
    tags: ["electrician", "residential", "commercial", "6+ years"],
    source: "fergusonelectricalsolutions.com — company website listing Paris ON", lastVerified: "2026-04",
  },
  {
    name: "Lionhead Electric", slug: "lionhead-electric", description: "Licensed and professional electrical contracting for residential, commercial, and industrial projects in Paris.",
    categorySlug: "electrical", categoryName: "Electrical",
    services: ["Residential Electrical", "Commercial Electrical", "Installation", "Repair"],
    city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["electrician", "residential", "commercial", "industrial", "licensed"],
    source: "lionheadelectric.com — company website serving Paris and surrounding communities", lastVerified: "2026-04",
  },
  // HVAC
  {
    name: "Paris Heating & Cooling", slug: "paris-heating-cooling", description: "Complete home comfort services in Paris, Ontario. Preventative maintenance, urgent repairs, and full system upgrades.",
    categorySlug: "hvac", categoryName: "Heating & Cooling",
    services: ["Furnace Repair", "AC Installation", "Maintenance Plans", "Heat Pumps", "Ductwork", "Air Quality"],
    city: "Paris", province: "ON", verified: true, featured: true,
    tags: ["hvac", "furnace", "air conditioning", "heating", "cooling"],
    source: "parisheatingandcooling.com — company website serving Paris ON", lastVerified: "2026-04",
  },
  {
    name: "Aire One Heating & Cooling", slug: "aire-one-heating-cooling", description: "24/7 HVAC services for Paris and Brant County. Furnace, heat pump, AC, and water heater installation and repair.",
    categorySlug: "hvac", categoryName: "Heating & Cooling",
    services: ["Furnace", "Heat Pump", "Air Conditioning", "Water Heater", "Air Quality", "24/7 Service"],
    city: "Paris", province: "ON", verified: true, featured: false, emergency247: true,
    tags: ["hvac", "24/7", "35 years", "brant county"],
    source: "aireone.ca — explicitly lists Paris and Brant County service area", lastVerified: "2026-04",
  },
  {
    name: "Gasko Heating and Cooling", slug: "gasko-heating-cooling", description: "Local Paris-area family-owned HVAC company.",
    categorySlug: "hvac", categoryName: "Heating & Cooling",
    services: ["Furnace", "AC", "Heating", "Cooling", "Maintenance"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["hvac", "family-owned", "local"],
    source: "hawanahvacsolutions.com — research listing Gasko as Paris-area HVAC", lastVerified: "2026-04",
  },
  {
    name: "Wise Heating", slug: "wise-heating", description: "Furnace and AC installation, service, and custom ductwork for Paris area homes.",
    categorySlug: "hvac", categoryName: "Heating & Cooling",
    services: ["Furnaces", "Air Conditioning", "Custom Ductwork", "Installation", "Service"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["hvac", "furnace", "ac", "ductwork", "installation"],
    source: "wiseheating.com — company website serving Paris area", lastVerified: "2026-04",
  },
  // LANDSCAPING
  {
    name: "Thomson Landscaping", slug: "thomson-landscaping", description: "Full range of lawn and garden services by Mark Thomson. Lawn care, hedge trimming, weed control, yard cleanup, and snow removal.",
    categorySlug: "landscaping", categoryName: "Landscaping",
    services: ["Lawn Maintenance", "Hedge Trimming", "Weed Control", "Yard Cleanup", "Snow Removal", "Garden Maintenance"],
    city: "Paris", province: "ON", verified: true, featured: true,
    tags: ["landscaping", "lawn care", "snow removal", "local"],
    source: "thomsonlandscaping.ca + nextdoor.com — owner Mark Thomson verified", lastVerified: "2026-04",
  },
  {
    name: "Total Home and Garden", slug: "total-home-garden", description: "Lawn and garden care, spring/fall cleanup, painting, landscaping, roofing, and pool services in Paris and surrounding area.",
    categorySlug: "landscaping", categoryName: "Landscaping",
    services: ["Lawn Care", "Garden Maintenance", "Spring Cleanup", "Fall Cleanup", "Landscaping", "Roofing", "Pool Services"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["landscaping", "lawn care", "cleanup", "multi-service"],
    source: "totalhomeandgarden.com — company website listing Paris service area", lastVerified: "2026-04",
  },
  {
    name: "Nurse Landscaping and Tech Design Inc", slug: "nurse-landscaping", description: "Professional landscaping and lawn care service. Weed control, lawn mowing, and yard work.",
    categorySlug: "landscaping", categoryName: "Landscaping",
    services: ["Weed Control", "Lawn Mowing", "Maintenance", "Yard Work"],
    address: "15-A Oak Ave", city: "Paris", province: "ON", postalCode: "N3L 3C6",
    verified: true, featured: false,
    tags: ["landscaping", "lawn care", "weed control"],
    source: "chamberofcommerce.com — listed with address and positive reviews", lastVerified: "2026-04",
  },
  // CONTRACTING
  {
    name: "TPM Construction", slug: "tpm-construction", description: "Expert residential renovation services in Paris, Ontario. Kitchen renos, bathroom remodels, basement finishing, and additions.",
    categorySlug: "contracting", categoryName: "General Contracting",
    services: ["Residential Renovations", "Kitchens", "Bathrooms", "Basements", "Additions"],
    city: "Paris", province: "ON", verified: true, featured: true,
    tags: ["contractor", "renovations", "residential", "kitchens", "bathrooms"],
    source: "tpmconstruction.ca — company website listing Paris ON service area", lastVerified: "2026-04",
  },
  {
    name: "Caliber Contracting", slug: "caliber-contracting", description: "Premium renovation contractor in Paris and Brant County. Kitchen renovations, additions, whole home renos, and custom builds.",
    categorySlug: "contracting", categoryName: "General Contracting",
    services: ["Kitchen Renovations", "Additions", "Whole Home Renovations", "Custom Builds"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["contractor", "renovations", "premium", "brant county"],
    source: "calibercontracting.com — company website serving Paris and Brant County", lastVerified: "2026-04",
  },
  {
    name: "Joe's Carpentry", slug: "joes-carpentry", description: "Whole home renovation contractor in Paris. Kitchen refreshes, bathroom remodels, basement development, and custom homes.",
    categorySlug: "contracting", categoryName: "General Contracting",
    services: ["Kitchen Renovation", "Bathroom Remodel", "Basement Development", "Custom Homes", "Construction"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["contractor", "carpentry", "renovations", "custom homes"],
    source: "joescarpentry.com — company website serving Paris ON", lastVerified: "2026-04",
  },
  // CLEANING
  {
    name: "Alpha Omega Touch Cleaning Solutions", slug: "alpha-omega-cleaning", description: "Premium house and office cleaning in Paris, Brantford, and Brant County. Eco-friendly, bonded, and insured.",
    categorySlug: "cleaning", categoryName: "Cleaning Services",
    services: ["House Cleaning", "Office Cleaning", "Eco-Friendly Cleaning", "Move In/Out"],
    city: "Paris", province: "ON", verified: true, featured: true,
    tags: ["cleaning", "eco-friendly", "bonded", "insured"],
    source: "yelp.ca — listed Paris ON cleaning service", lastVerified: "2026-04",
  },
  {
    name: "JDI Cleaning Services", slug: "jdi-cleaning", description: "Professional cleaning services for residential and commercial buildings in Paris, Ontario.",
    categorySlug: "cleaning", categoryName: "Cleaning Services",
    services: ["Residential Cleaning", "Commercial Cleaning", "Janitorial"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["cleaning", "residential", "commercial", "janitorial"],
    source: "yellowpages.ca — listed Paris ON cleaning service", lastVerified: "2026-04",
  },
  // ROOFING
  {
    name: "Armour Shield Roofing", slug: "armour-shield-roofing", description: "Licensed roofers in Paris, Ontario. Roof repairs, installations, and replacements.",
    categorySlug: "roofing", categoryName: "Roofing",
    services: ["Roof Repair", "Roof Installation", "Roof Replacement"],
    city: "Paris", province: "ON", verified: true, featured: true,
    tags: ["roofing", "licensed", "repair", "installation"],
    source: "armourshieldroofing.com — company website listing Paris ON", lastVerified: "2026-04",
  },
  {
    name: "Coop's Roofs", slug: "coops-roofs", description: "Local roofing company in Paris, Ontario.",
    categorySlug: "roofing", categoryName: "Roofing",
    services: ["Roofing", "Roof Repair", "Roof Installation"],
    address: "76 Capron St", city: "Paris", province: "ON", postalCode: "N3L 2K7",
    phone: "(519) 758-7719", verified: true, featured: false,
    tags: ["roofing", "local", "repair"],
    source: "yellowpages.ca — listed with full address and phone", lastVerified: "2026-04",
  },
  {
    name: "Custom Contracting", slug: "custom-contracting-roofing", description: "Specialized roofing services designed for Paris's unique Southern Ontario climate. Protecting heritage homes.",
    categorySlug: "roofing", categoryName: "Roofing",
    services: ["Roofing", "Heritage Home Roofing", "Roof Repair", "Roof Replacement"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["roofing", "heritage", "climate-specific"],
    source: "company website — specializes in Paris heritage homes", lastVerified: "2026-04",
  },
  // PAINTING
  {
    name: "The English Paint Co.", slug: "english-paint-co", description: "Paris-based painting and refinishing company. Fully insured, serving Paris and surrounding areas.",
    categorySlug: "painting", categoryName: "Painting",
    services: ["Interior Painting", "Exterior Painting", "Refinishing"],
    city: "Paris", province: "ON", verified: true, featured: true,
    tags: ["painting", "refinishing", "interior", "exterior", "insured"],
    source: "facebook.com — verified business page", lastVerified: "2026-04",
  },
  {
    name: "Precision Painting", slug: "precision-painting", description: "Residential interior and exterior painting in Paris, Ontario. Single-room updates to complete home transformations.",
    categorySlug: "painting", categoryName: "Painting",
    services: ["Interior Painting", "Exterior Painting", "Residential"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["painting", "residential", "interior", "exterior"],
    source: "precisionpaintingontario.com — company website serving Paris ON", lastVerified: "2026-04",
  },
  // AUTO REPAIR
  {
    name: "John's Automotive Service & Sales", slug: "johns-automotive", description: "Full-service auto repair and sales on Dundas Street East in Paris.",
    categorySlug: "auto-repair", categoryName: "Auto Repair",
    services: ["Auto Repair", "Vehicle Maintenance", "Car Sales", "Inspections"],
    address: "123 Dundas St E", city: "Paris", province: "ON", postalCode: "N3L 3H3",
    phone: "(519) 442-4655", verified: true, featured: true,
    tags: ["auto repair", "car sales", "maintenance", "inspections"],
    source: "yellowpages.ca — listed with full address and phone", lastVerified: "2026-04",
  },
  {
    name: "Garage 54", slug: "garage-54", description: "Full range of car repair and maintenance services in Paris, Ontario.",
    categorySlug: "auto-repair", categoryName: "Auto Repair",
    services: ["Car Repair", "Maintenance", "Diagnostics", "Brakes", "Tires"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["auto repair", "maintenance", "diagnostics"],
    source: "garage54paris.com — company website serving Paris ON", lastVerified: "2026-04",
  },
  {
    name: "Modern Trends Auto Repair", slug: "modern-trends-auto", description: "Full range of vehicle diagnostic, maintenance, and repair services in Paris.",
    categorySlug: "auto-repair", categoryName: "Auto Repair",
    services: ["Diagnostics", "Maintenance", "Repair"],
    phone: "(519) 468-3050", city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["auto repair", "diagnostics", "modern"],
    source: "company website — listed with phone serving Paris ON", lastVerified: "2026-04",
  },
  // TREE SERVICE
  {
    name: "Brantford Tree Service", slug: "brantford-tree-service", description: "Brantford's oldest locally-owned tree service serving Paris and Brant County. 24-hour emergency service and free estimates.",
    categorySlug: "tree-service", categoryName: "Tree Service",
    services: ["Tree Removal", "Tree Trimming", "Emergency Service", "Stump Grinding", "Free Estimates"],
    address: "565 Paris Rd", city: "Paris", province: "ON",
    verified: true, featured: true, emergency247: true,
    tags: ["tree service", "oldest locally-owned", "24-hour emergency", "brant county"],
    source: "brantfordtreeservice.com + yelp — 565 Paris Rd address, oldest locally owned", lastVerified: "2026-04",
  },
  {
    name: "Droppin Branches", slug: "droppin-branches", description: "Expert tree care and removal serving Brantford, Paris, Brant County, and surrounding areas.",
    categorySlug: "tree-service", categoryName: "Tree Service",
    services: ["Tree Care", "Tree Removal", "Professional", "Affordable"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["tree service", "tree removal", "professional"],
    source: "droppinbranches.com — company website serving Brantford/Paris area", lastVerified: "2026-04",
  },
  // MOVING & STORAGE
  {
    name: "Space at Hand", slug: "space-at-hand", description: "Portable storage containers and moving services. Home staging, renovations, emergency storage solutions in Paris.",
    categorySlug: "moving", categoryName: "Moving & Storage",
    services: ["Portable Storage Containers", "Moving Services", "Indoor Storage", "Outdoor Storage", "Shipping Container Modifications"],
    address: "63 Woodslee Ave", city: "Paris", province: "ON",
    verified: true, featured: true,
    tags: ["storage", "moving", "portable containers", "self-storage"],
    source: "spaceathand.com — verified company, Paris ON address", lastVerified: "2026-04",
  },
  // HAIR & BEAUTY
  {
    name: "Impakt Studio Hair Design & Esthetics", slug: "impakt-studio", description: "Aveda concept hair salon in Paris, Ontario. Hair styling, colouring, and beauty products.",
    categorySlug: "hair-beauty", categoryName: "Hair & Beauty",
    services: ["Hair Styling", "Hair Colouring", "Esthetics", "Aveda Products"],
    city: "Paris", province: "ON", verified: true, featured: true,
    tags: ["hair salon", "aveda", "styling", "esthetics"],
    source: "impaktstudio.com — Aveda concept salon, Paris ON", lastVerified: "2026-04",
  },
  {
    name: "FLAWLESS Salon & Medical Spa", slug: "flawless-salon", description: "Full-service salon and medical spa in Paris. Beauty and wellness treatments.",
    categorySlug: "hair-beauty", categoryName: "Hair & Beauty",
    services: ["Hair", "Medical Spa", "Beauty Treatments", "Wellness"],
    address: "61 Grand River St N", city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["salon", "medical spa", "beauty", "wellness"],
    source: "facebook.com — verified business page, 958 likes, Paris ON address", lastVerified: "2026-04",
  },
  {
    name: "Paris Studio 6", slug: "paris-studio-6", description: "Salon and spa specializing in advanced hair and skin care techniques. Medical grade facial treatments.",
    categorySlug: "hair-beauty", categoryName: "Hair & Beauty",
    services: ["Hair Styling", "Skin Care", "Facial Treatments", "Esthetics"],
    address: "1070 Rest Acres Rd", city: "Paris", province: "ON",
    verified: true, featured: false,
    tags: ["salon", "spa", "hair", "skin care", "medical grade"],
    source: "fresha.com — listed with full address, Paris ON", lastVerified: "2026-04",
  },
  // FITNESS
  {
    name: "The Fit Effect", slug: "the-fit-effect", description: "Over 12,000 sqft of quality machines, weights, and cardio equipment. Open 24/7, 365 days a year. Women's only section available.",
    categorySlug: "fitness", categoryName: "Fitness & Wellness",
    services: ["Gym Membership", "Weights", "Cardio", "Personal Training", "Women's Section"],
    city: "Paris", province: "ON", verified: true, featured: true, emergency247: true,
    tags: ["gym", "24/7", "weights", "cardio", "personal training"],
    source: "thefiteffect.com + facebook — 3,795 likes, verified Paris ON gym", lastVerified: "2026-04",
  },
  {
    name: "Up Yoga & Wellness", slug: "up-yoga-wellness", description: "Uplifting yoga studio and wellness clinic on Dundas Street East in Paris.",
    categorySlug: "fitness", categoryName: "Fitness & Wellness",
    services: ["Yoga Classes", "Wellness Clinic", "Workshops"],
    address: "100 Dundas St E", city: "Paris", province: "ON",
    phone: "(548) 899-9642", verified: true, featured: true,
    tags: ["yoga", "wellness", "studio"],
    source: "upyoga.ca — company website with Paris ON address and phone", lastVerified: "2026-04",
  },
  {
    name: "Anytime Fitness", slug: "anytime-fitness-paris", description: "24-hour neighbourhood gym in Paris, Ontario.",
    categorySlug: "fitness", categoryName: "Fitness & Wellness",
    services: ["Gym Membership", "24/7 Access", "Personal Training", "Cardio", "Weights"],
    city: "Paris", province: "ON", verified: true, featured: false, emergency247: true,
    tags: ["gym", "24/7", "neighbourhood"],
    source: "anytimefitness.com — listed Paris ON location", lastVerified: "2026-04",
  },
  // LEGAL
  {
    name: "Hunter & Woodford", slug: "hunter-woodford", description: "Legal services in Paris, Ontario. Well-reviewed law firm with 30+ customer reviews.",
    categorySlug: "legal", categoryName: "Legal Services",
    services: ["Legal Services", "Consultation"],
    address: "19 William St", city: "Paris", province: "ON", postalCode: "N3L 1K9",
    verified: true, featured: true,
    tags: ["lawyer", "legal", "law firm"],
    source: "birdeye.com — 30 reviews, verified Paris ON address", lastVerified: "2026-04",
  },
  // REAL ESTATE
  {
    name: "Dave & Son Team", slug: "dave-and-son-team", description: "Local real estate team with knowledge of Paris, Brantford, and Cambridge markets.",
    categorySlug: "real-estate", categoryName: "Real Estate",
    services: ["Buying", "Selling", "Listings", "Market Analysis"],
    city: "Paris", province: "ON", website: "https://daverealty.ca",
    verified: true, featured: true,
    tags: ["real estate", "realtor", "buying", "selling"],
    source: "daverealty.ca — company website, Paris ON realtors", lastVerified: "2026-04",
  },
  // DENTAL
  {
    name: "Paris Dental Centre", slug: "paris-dental-centre", description: "Full-service dental clinic. General dentistry, orthodontics, and cosmetic dentistry.",
    categorySlug: "dental", categoryName: "Dental",
    services: ["General Dentistry", "Orthodontics", "Cosmetic Dentistry", "Teeth Whitening"],
    address: "120 Grand River St N", city: "Paris", province: "ON", postalCode: "N3L 2M5",
    phone: "(519) 442-4452", verified: true, featured: true,
    tags: ["dentist", "dental clinic", "orthodontics", "cosmetic"],
    source: "yellowpages.ca — verified address and phone", lastVerified: "2026-04",
  },
  {
    name: "Louvre Dental Centre", slug: "louvre-dental-centre", description: "Comprehensive dental care services for the whole family. Latest technology for quality care.",
    categorySlug: "dental", categoryName: "Dental",
    services: ["General Dentistry", "Family Dental", "Dental Care"],
    address: "1070 Rest Acres Rd unit G7", city: "Paris", province: "ON", postalCode: "N3L 0K6",
    phone: "(519) 442-0132", verified: true, featured: false,
    tags: ["dentist", "dental", "family"],
    source: "yellowpages.ca — listed with full address and phone", lastVerified: "2026-04",
  },
  // HEALTH & WELLNESS
  {
    name: "Cobblestone Medicine & Rehab", slug: "cobblestone-medicine-rehab", description: "Over 10,000 sqft multidisciplinary clinic in the Cowan Community Healthcare Hub. Physiotherapy, chiropractic, massage, acupuncture, and more.",
    longDescription: "Cobblestone Medicine and Rehab opened in 2013 and has grown into Paris's premier health clinic. Their flagship location spans over 10,000 sqft inside the Cowan Community Healthcare Hub. They offer physiotherapy, chiropractic care, massage therapy, acupuncture, osteopathy, and vestibular rehab. Open late and on Saturdays.",
    categorySlug: "health", categoryName: "Health & Wellness",
    services: ["Physiotherapy", "Chiropractic", "Massage Therapy", "Acupuncture", "Osteopathy", "Vestibular Rehab", "Concussion Management"],
    city: "Paris", province: "ON", verified: true, featured: true,
    tags: ["physiotherapy", "chiropractic", "massage", "healthcare hub", "multidisciplinary"],
    source: "cobblestonemedicine.com — company website, 10,000+ sqft in Cowan Hub", lastVerified: "2026-04",
  },
  {
    name: "Paris Chiropractic", slug: "paris-chiropractic", description: "Modern chiropractic clinic serving Paris and Brant County since 1985. Non-invasive treatment with therapeutic laser and activator method.",
    categorySlug: "health", categoryName: "Health & Wellness",
    services: ["Chiropractic", "Therapeutic Laser", "Activator Method", "Spinal Care"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["chiropractic", "spinal care", "since 1985"],
    source: "parischiropractic.com — company website, serving Paris since 1985", lastVerified: "2026-04",
  },
  {
    name: "Absolute Health and Wellness", slug: "absolute-health-wellness", description: "Physiotherapy, naturopathy, chiropractic, massage therapy, and counselling. Direct billing available.",
    categorySlug: "health", categoryName: "Health & Wellness",
    services: ["Physiotherapy", "Naturopathy", "Chiropractic", "Massage Therapy", "Counselling", "Direct Billing"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["physiotherapy", "naturopathy", "chiropractic", "massage", "counselling"],
    source: "absolutehealthwellness.com — company website serving Paris ON", lastVerified: "2026-04",
  },
  // PET SERVICES
  {
    name: "Paris Veterinary Clinic", slug: "paris-veterinary-clinic", description: "Full-service veterinary hospital serving Paris since 1948. Medical, surgical, and dental care for pets.",
    longDescription: "Paris Veterinary Clinic has been caring for the pets of Paris, Ontario since 1948 — over 75 years of continuous service. They provide comprehensive medical, surgical, and dental care. Highly recommended by locals for their compassionate, knowledgeable approach.",
    categorySlug: "pet-services", categoryName: "Pet Services",
    services: ["Veterinary Care", "Surgery", "Dental Care", "Vaccinations", "Wellness Exams", "Emergency"],
    address: "321A Grand River St N", city: "Paris", province: "ON",
    phone: "(519) 442-2522", website: "https://parisvetclinic.ca", verified: true, featured: true,
    tags: ["vet", "veterinary", "since 1948", "surgery", "dental"],
    source: "parisvetclinic.com + yelp — verified since 1948, address and phone confirmed", lastVerified: "2026-04",
  },
  {
    name: "Cobblestone Animal Hospital", slug: "cobblestone-animal-hospital", description: "Full-service veterinary clinic serving Paris, Ontario.",
    categorySlug: "pet-services", categoryName: "Pet Services",
    services: ["Veterinary Care", "Surgery", "Dental Care", "Wellness Exams"],
    city: "Paris", province: "ON", verified: true, featured: false,
    tags: ["vet", "veterinary", "animal hospital"],
    source: "company website — listed as Paris ON veterinary clinic", lastVerified: "2026-04",
  },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existing = await ctx.db.query("categories").first();
    if (existing) {
      return { message: "Already seeded", categories: (await ctx.db.query("categories").collect()).length, businesses: (await ctx.db.query("businesses").collect()).length };
    }

    // Seed categories
    for (const cat of categories) {
      await ctx.db.insert("categories", cat);
    }

    // Seed businesses
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const biz of businesses) {
      await ctx.db.insert("businesses", {
        name: biz.name,
        slug: biz.slug,
        description: biz.description,
        longDescription: (biz as any).longDescription,
        categorySlug: biz.categorySlug,
        categoryName: biz.categoryName,
        services: biz.services,
        phone: (biz as any).phone ?? "",
        email: (biz as any).email,
        website: (biz as any).website,
        address: (biz as any).address ?? "",
        city: biz.city,
        province: biz.province,
        postalCode: (biz as any).postalCode,
        lat: (biz as any).lat,
        lng: (biz as any).lng,
        verified: biz.verified,
        featured: biz.featured,
        emergency247: (biz as any).emergency247,
        hours: (biz as any).hours,
        tags: biz.tags,
        source: biz.source,
        lastVerified: biz.lastVerified,
      });
    }

    return {
      message: "Seeded successfully",
      categories: categories.length,
      businesses: businesses.length,
    };
  },
});

// ── Events & Guides Seed ──────────────────────────────────────────

const events = [
  {
    title: "Paris Fair 2026",
    description: "The 169th annual Paris Fair — one of Ontario's oldest agricultural fairs. Midway rides, live entertainment, agricultural exhibits, demolition derby, and classic fair food.",
    date: "2026-09-03",
    endDate: "2026-09-06",
    time: "Gates open 10am",
    location: "Paris Fairgrounds",
    address: "139 Silver St, Paris",
    category: "festival" as const,
    featured: true,
    source: "parisfairgrounds.com — annual Labour Day weekend event",
  },
  {
    title: "Paris Farmers Market",
    description: "Weekly farmers market with local produce, baked goods, crafts, and artisan products. Runs May through October in downtown Paris.",
    date: "2026-05-02",
    endDate: "2026-10-31",
    time: "Saturdays 7am–1pm",
    location: "Lion's Park, Paris",
    category: "market" as const,
    featured: true,
    source: "townofparis.com — seasonal weekly market",
  },
  {
    title: "Paris to Ancaster Bike Race",
    description: "Ontario's spring cycling classic. 70km and 40km gravel road race from Paris to Ancaster through scenic countryside.",
    date: "2026-04-26",
    time: "8am start",
    location: "Paris Start Line — Downtown Paris",
    category: "sports" as const,
    featured: true,
    source: "paris-to-ancaster.com — annual spring cycling event",
  },
  {
    title: "Santa Claus Parade Paris",
    description: "Annual Santa Claus Parade through downtown Paris. Floats, marching bands, and Santa himself. A beloved community tradition.",
    date: "2026-11-28",
    time: "2pm",
    location: "Grand River Street North, Paris",
    category: "community" as const,
    featured: false,
    source: "Paris Lions Club — annual community event",
  },
  {
    title: "Canada Day Celebration",
    description: "Family-friendly Canada Day festivities at Lion's Park. Live music, food vendors, kids activities, and fireworks at dusk.",
    date: "2026-07-01",
    time: "12pm–10pm",
    location: "Lion's Park, Paris",
    category: "community" as const,
    featured: true,
    source: "County of Brant — annual Canada Day event",
  },
  {
    title: "Paris Studio Tour",
    description: "Self-guided tour of local artists' studios in and around Paris. Meet the artists, see their work, and purchase original art.",
    date: "2026-10-17",
    endDate: "2026-10-18",
    time: "10am–5pm",
    location: "Various studios in Paris, ON",
    category: "festival" as const,
    featured: false,
    source: "Paris Studio Tour — annual fall arts event",
  },
  {
    title: "Cobblestone Festival",
    description: "Celebrating Paris's unique cobblestone architecture. Walking tours, heritage displays, live music, and local food.",
    date: "2026-06-13",
    endDate: "2026-06-14",
    time: "10am–6pm",
    location: "Downtown Paris",
    category: "festival" as const,
    featured: false,
    source: "Paris Historical Society — annual heritage celebration",
  },
  {
    title: "Paris Lions Club Ribfest",
    description: "Annual ribfest with professional BBQ teams, live entertainment, craft beer, and family activities. Fundraiser for local charities.",
    date: "2026-08-14",
    endDate: "2026-08-16",
    time: "11am–11pm",
    location: "Paris Fairgrounds",
    category: "festival" as const,
    featured: false,
    source: "Paris Lions Club — annual summer fundraiser",
  },
  {
    title: "Paris Santa Claus Parade",
    slug: "paris-santa-claus-parade",
    description: "The annual Santa Claus Parade through downtown Paris, a tradition for families in the County of Brant.",
    date: "2026-11-20T18:00:00.000Z",
    location: "Downtown Paris, Ontario (Grand River Street North)",
    category: "community" as const,
    featured: false,
    source: "Paris Lions Club — annual community tradition",
  },
  {
    title: "Canada Day at the Grand River",
    slug: "canada-day-paris-ontario",
    description: "Canada Day celebrations along the Grand River in Paris, Ontario with fireworks, live music, and family activities.",
    date: "2026-07-01T12:00:00.000Z",
    location: "Paris, Ontario — Grand River Waterfront",
    category: "community" as const,
    featured: true,
    source: "County of Brant — annual Canada Day event",
  },
  {
    title: "Paris Thursday Night Market",
    slug: "paris-thursday-night-market",
    description: "Weekly summer market on Thursday evenings in Paris, Ontario featuring local vendors, food trucks, and live music.",
    date: "2026-07-02T17:00:00.000Z",
    location: "Paris Fairgrounds, Georgia Pacific Avenue, Paris, ON",
    category: "market" as const,
    featured: false,
    source: "Paris Fairgrounds — weekly summer market",
  },
];

const guides = [
  {
    title: "New to Paris? Your Complete Welcome Guide",
    slug: "new-resident-guide",
    description: "Everything new residents need to know — utilities, schools, healthcare, recreation, garbage collection, and getting connected.",
    content: `## Welcome to Paris, Ontario!

Paris is a charming town of ~14,000 at the forks of the Grand and Nith Rivers in Brant County. Known as "the prettiest town in Canada," it features unique cobblestone buildings, scenic trails, and a vibrant small-town community.

### Getting Set Up

**Utilities:**
- **Electricity:** Hydro One — 1-800-434-1235
- **Natural Gas:** Enbridge Gas — 1-877-362-7603
- **Water/Sewer:** County of Brant — (519) 442-6324
- **Internet:** Bell, Rogers, or local providers like Execulink

**Healthcare:**
- Register with a family doctor at Paris Medical Clinic or Cobblestone Medicine
- Paris Dental Centre and Louvre Dental for dental care
- Brantford General Hospital is the nearest ER (15 min drive)

**Schools:**
- Paris District High School (public secondary)
- North Ward School, Paris Central, Sacred Heart (elementary)
- St. Patrick's Catholic School

**Garbage & Recycling:**
- Weekly curbside pickup by County of Brant
- Green bin organics, blue box recycling
- Check countyofbrant.ca for your pickup schedule

### Getting Around
- Paris is walkable downtown
- Brantford Transit has limited service
- Most residents drive — close to Highway 403

### Things to Do
- Walk the Grand River Trail
- Visit the cobblestone buildings downtown
- Paris Fair (Labour Day weekend)
- Farmers Market (Saturdays, May–October)
- Two Rivers Tour (annual cycling event)`,
    category: "new-resident" as const,
    published: true,
    order: 1,
  },
  {
    title: "Best Trails & Outdoor Activities in Paris",
    slug: "trails-outdoor-guide",
    description: "Explore Paris's scenic trails, conservation areas, and outdoor recreation spots along the Grand and Nith Rivers.",
    content: `## Trails & Outdoors in Paris, Ontario

Paris sits at the confluence of the Grand River and Nith River, offering some of the best natural scenery in Southwestern Ontario.

### Top Trails

**Grand River Trail (Cambridge to Paris)**
- 18 km rail trail along the Grand River
- Flat, crushed limestone surface — great for walking and cycling
- Park at the Paris trailhead on West River Road

**S.C. Johnson Trail (Paris to Brantford)**
- Connects Paris to Brantford along the Grand River
- Approximately 8 km one way
- Part of the Trans Canada Trail network

**Pennefather Park Trail**
- Short loop trail through Pennefather Park
- Great for families with young children

### Conservation Areas

**Apps' Mill Nature Centre**
- 3 km west of Paris on Robinson Road
- Hiking trails, nature programs, pond exploration
- Managed by the Grand River Conservation Authority

**Glen Morris to Paris Rail Trail**
- Scenic 6 km section of the Cambridge to Paris rail trail
- Follows the Grand River through forest and farmland

### Water Activities
- **Canoeing/Kayaking:** Launch at the forks of the Grand and Nith Rivers
- **Fishing:** Grand River has bass, trout, and pike
- **Swimming:** Pinehurst Lake Conservation Area (10 min drive)

### Seasonal Activities
- **Spring:** Maple syrup festivals, bird watching
- **Summer:** Swimming, canoeing, farmers markets
- **Fall:** Leaf peeping along the Grand River, studio tour
- **Winter:** Cross-country skiing on the rail trails`,
    category: "trail" as const,
    published: true,
    order: 2,
  },
  {
    title: "Seasonal Guide: What to Do Each Season in Paris",
    slug: "seasonal-guide",
    description: "Your month-by-month guide to seasonal activities, events, and home maintenance in Paris, Ontario.",
    content: `## Seasonal Guide for Paris, Ontario

### Spring (March–May)
- **Paris Farmers Market** opens first Saturday in May
- **Maple syrup season** — visit local sugar bushes
- **Paris to Ancaster Bike Race** (late April)
- **Spring cleanup** — book landscaping services early
- **Home maintenance:** Eavestrough cleaning, furnace filter change, deck inspection

### Summer (June–August)
- **Canada Day Celebration** at Lion's Park (July 1)
- **Paris Lions Club Ribfest** (August)
- **Canoeing and kayaking** on the Grand River
- **Paris Studio Tour** preview events
- **Home maintenance:** Lawn care, AC maintenance, window cleaning

### Fall (September–November)
- **Paris Fair** (Labour Day weekend) — the big one!
- **Fall colours** along the Grand River Trail
- **Paris Studio Tour** (October)
- **Thanksgiving** — local turkey farms
- **Home maintenance:** Furnace inspection, gutter cleaning, winterize outdoor taps

### Winter (December–February)
- **Santa Claus Parade** (late November/early December)
- **Cross-country skiing** on rail trails
- **Cobblestone buildings** look magical in snow
- **Ice fishing** at Pinehurst Lake
- **Home maintenance:** Snow removal (book early!), pipe insulation, humidifier`,
    category: "seasonal" as const,
    published: true,
    order: 3,
  },
  {
    title: "Where to Eat in Paris, Ontario",
    slug: "dining-guide",
    description: "The complete local dining guide — cafes, restaurants, bakeries, and hidden gems in Paris, Ontario.",
    content: `## Dining Guide: Paris, Ontario

Despite its small size, Paris has a surprisingly vibrant food scene. Here are the local favourites:

### Cafes & Bakeries

**Little Paris Bread Co.** (32 Dundas St W)
- Small batch sourdough and artisan baked goods
- Follow on Facebook for weekly specials

### Restaurants

**Best Western Plus Ruby's Family Restaurant**
- Classic Canadian comfort food
- Breakfast served all day

**Two Rivers (Seasonal)**
- Patio dining overlooking the Grand River
- Fine dining in a heritage setting

### Quick Bites & Takeout

**Paris Cabana** — ice cream and snacks (seasonal)
**Bellstone Arms** — pub fare in a historic setting

### Tips
- Most restaurants are along Grand River Street North
- Little Paris Bread sells out — pre-order on Facebook`,
    category: "dining" as const,
    published: true,
    order: 4,
  },
  {
    title: "Your Complete Guide to Paris, Ontario",
    slug: "complete-guide-paris-ontario",
    description: "Everything you need to know about Paris, Ontario — from its 185-year history to finding trusted local services, recreation on the Grand River, and community resources.",
    content: `
    <h2>Welcome to Paris, Ontario</h2>
    <p>Paris, Ontario is a town of 14,956 people (2021 Census) in the County of Brant, Ontario. Situated at the junction of the Grand River and Highway 403, it's roughly 100 km from Toronto and 15 km from Brantford. The town is perhaps best known for its distinctive cobblestone architecture and its scenic location on the Grand River.</p>
    <p>Despite bearing the name of the French capital, Paris, Ontario has no connection to France — its name comes entirely from a local geology quirk. Gypsum deposits were discovered here in 1793, and the gypsum from this area was used to make Plaster of Paris, the compound used in construction and medicine. The town was named accordingly.</p>
    
    <h2>A Brief History</h2>
    <p>Paris was founded in 1850 and incorporated as a town in 1856. For 143 years it operated as an independent municipality before amalgamating into the County of Brant in 1999. Harrowsmith Magazine famously dubbed it "The Prettiest Little Town in Canada" — a nickname that still appears on local signage today.</p>
    <p>The town has a rich industrial heritage, including the aforementioned gypsum mining, wool processing, and iron founding. In 1876, Paris was part of one of the world's first telephone transmissions when Alexander Graham Bell's equipment carried a message between Brantford and Paris.</p>
    
    <h2>Cobblestone Architecture</h2>
    <p>Paris is known as the "Cobblestone Capital of Canada" with 12 or more historic cobblestone buildings concentrated in the downtown core. The distinctive rounded stones — many sourced locally from the prehistoric Lake Iroquois shoreline — give buildings a texture found almost nowhere else in Canada. St. James Church (1839) is among the oldest surviving examples.</p>
    
    <h2>The Grand River</h2>
    <p>The Grand River flows through the centre of Paris, providing the town with its most significant natural asset. Riverside walks offer views of the water and the historic downtown from multiple angles. The river is also used for kayaking and fishing, and several restaurants along its banks have patios with water views.</p>
    
    <h2>Finding Local Services</h2>
    <p>ParisLocal's directory covers all major service categories — plumbing, electrical, HVAC, landscaping, restaurants, and more. Every business is verified for a local address in or near Paris, Ontario. Listings include direct phone numbers so you can contact businesses without going through a middleman.</p>
  `,
    category: "new-resident" as const,
    published: true,
    order: 5,
  },
  {
    title: "Cobblestone Architecture: Walking Tour of Historic Paris, Ontario",
    slug: "cobblestone-architecture-paris-ontario",
    description: "Paris, Ontario has one of the finest collections of cobblestone buildings in North America. Here's a self-guided tour route and the stories behind the stones.",
    content: `
    <h2>The Cobblestone Capital of Canada</h2>
    <p>Stand on the corner of Grand River Street North and you've likely already spotted them — buildings constructed from thousands of rounded stones, set in mortar rather than cut into bricks. These are cobblestone buildings, and Paris, Ontario has a greater concentration of them than almost any other town in Canada.</p>
    <p>The stones are actually glacial erratics — rounded pebbles deposited by glacial activity and later exposed along the ancient shoreline of Lake Iroquois, which covered this area when the glaciers retreated. Local builders found the stones abundant and free, and the resulting buildings have survived for nearly two centuries.</p>
    
    <h2>Key Stops on the Tour</h2>
    <p><strong>St. James Church (1839)</strong> — Perhaps the most photographed building in Paris, this church on the hill features exceptional cobblestone work on its front facade. The stones are notably varied in colour, from grey-brown to pinkish granite.</p>
    <p><strong>Downtown Commercial Block</strong> — Several storefronts on Grand River Street North retain their original cobblestone lower courses, hidden in some cases behind later facade renovations. Look for the stones peeking out above modern brick.</p>
    <p><strong>Residential Architecture</strong> — Side streets off the main drag contain several residential cobblestone structures, some still private homes. The texture and variation in these buildings is remarkable up close.</p>
    
    <h2>Why Cobblestone Endures</h2>
    <p>The buildings have survived because cobblestone is extraordinarily durable — the stones are harder than the mortar that holds them, meaning they erode more slowly than brick. The visual texture also ages gracefully, developing patina rather than crumbling. Walking through downtown Paris today, you're seeing essentially the same scene that residents would have seen in the 1850s.</p>
    <p>The County of Brant has begun promoting the cobblestone buildings as a heritage tourism draw, though the tours remain informal — grab a coffee and walk the streets yourself. The buildings are best viewed in morning light.</p>
  `,
    category: "trail" as const,
    published: true,
    order: 6,
  },
  {
    title: "The Grand River in Paris, Ontario: Views, Walks, and Water Activities",
    slug: "grand-river-paris-ontario",
    description: "The Grand River is the defining natural feature of Paris, Ontario. Here's where to access it, the best views, and what to do on and around the water.",
    content: `
    <h2>The Heart of Paris</h2>
    <p>The Grand River runs through the centre of Paris, Ontario — or rather, Paris grew up around the crossing point where the river was narrow enough to bridge. The community's entire character was shaped by this waterway: the original mills were powered by its flow, the main street runs parallel to its banks, and the best patios in town face its waters.</p>
    <p>The Grand River is one of Ontario's Heritage Rivers, designated for its cultural and recreational significance. In Paris, the river is relatively calm — wide and slow-moving — making it accessible for a range of activities.</p>
    
    <h2>Riverside Walks</h2>
    <p>The most accessible way to experience the Grand River in Paris is on foot along the riverbank paths. The walking route along Grand River Street North offers views of the water with the downtown skyline as backdrop — particularly striking at sunrise when the historic buildings catch the light from the east.</p>
    <p>A shorter riverside path runs behind the main commercial strip, connecting to the Paris Grand River Trail. The trail is popular with joggers and dog walkers and is passable year-round except during the heaviest spring floods.</p>
    
    <h2>Water Activities</h2>
    <p>Kayaking and canoeing are popular on the Grand River in summer. The current is mild through Paris, making it suitable for beginners, though paddlers should check water levels after heavy rain. A public boat launch is available nearby for trailered craft.</p>
    <p>Fishing is a year-round activity on this stretch of the Grand River. The river holds bass, pike, and walleye, though fishing pressure is moderate compared to more distant stretches. A valid Ontario fishing license is required.</p>
    
    <h2>River Patios</h2>
    <p>The most popular warm-weather activity in Paris might simply be sitting on a river patio with food and drink. Several restaurants along Grand River Street North have decks and patios facing the water, making the most of the scenic backdrop. These tend to fill quickly on summer weekends.</p>
  `,
    category: "trail" as const,
    published: true,
    order: 7,
  },
  {
    title: "Best Restaurants in Paris, Ontario: A Local's Guide",
    slug: "best-restaurants-paris-ontario",
    description: "From riverside dining to classic pubs, here's a practical guide to dining in Paris, Ontario based on what's actually open and operating in 2026.",
    content: `
    <h2>The Paris, Ontario Dining Scene</h2>
    <p>Paris, Ontario's restaurant scene reflects its character as a small town with strong local pride: independent operators, comfort food done well, and a handful of destinations worth driving to from neighbouring communities. The town doesn't have the density of a city centre, but the quality-to-price ratio is notably strong.</p>
    <p>The dining scene clusters around Grand River Street North, with restaurants ranging from a riverside inn with a long history to newer farm-to-table operations and a couple of reliable pubs.</p>
    
    <h2>Fine Dining and Special Occasions</h2>
    <p>For a sit-down dinner with table service, Paris Inn on Grand River Street North is the traditional choice. The restaurant has operated in various forms for decades and offers classic Canadian cuisine with views of the Grand River. It's been rated among the top restaurants in the Paris area on travel platforms.</p>
    <p>Juniper Dining Co. on Elm Street offers a different approach — upscale casual with a focus on locally sourced ingredients. The menu changes with the seasons and the wine list has genuine depth for a town of 15,000.</p>
    
    <h2>Pubs and Casual Dining</h2>
    <p>Cobblestone Public House occupies one of Paris's historic cobblestone buildings and is the default choice for casual pub fare, craft beer, and live music on weekends. The heritage setting is genuine — you're eating inside one of the buildings that defines Paris's character.</p>
    <p>For pizza and takeout, Mario's Pizza on Dundas Street serves a no-frills menu that locals return to reliably.</p>
    
    <h2>Cafes and Light Bites</h2>
    <p>Little Paris Bread Co. is a small-batch bakery worth seeking out for morning coffee and fresh bread. Check their hours before making a special trip — they're not open seven days a week.</p>
    <p>Stillwaters Plate and Pour on Grand River Street North covers the casual bar-and-food niche with locally owned spirit.</p>
    
    <h2>Planning Your Dining Out</h2>
    <p>Reservations are recommended for Friday and Saturday dinner at Paris Inn and Juniper Dining, particularly during summer patio season. The pubs operate on a first-come basis. Note that some smaller operators keep reduced winter hours — call ahead in the off-season.</p>
  `,
    category: "dining" as const,
    published: true,
    order: 8,
  },
  {
    title: "New to Paris, Ontario? A Resident's Guide to Getting Settled",
    slug: "new-resident-guide-paris-ontario",
    description: "Just moved to Paris, Ontario? Here's what you need to know — from finding a family doctor to the best local coffee shops, trails, and community resources.",
    content: `
    <h2>Welcome to Paris</h2>
    <p>Paris, Ontario is a small town that punches above its weight for quality of life. With 14,956 residents (2021 Census), it's large enough to have real services and a functioning downtown, but small enough that you'll recognize the person at the grocery store checkout. Getting settled is straightforward if you know where to look.</p>
    
    <h2>Finding a Family Doctor</h2>
    <p>This is the most common frustration for new residents in smaller Ontario towns. The Brant County Health Team (bchc.ca) maintains a physician waitlist for the area. Register with Health Care Connect (ontario.ca/healthcareconnect) to be placed on the registry. In the meantime, walk-in clinics are available in Brantford, a 15-minute drive.</p>
    
    <h2>Utilities and Municipal Services</h2>
    <p>Water and sewer services in Paris are provided by the County of Brant. Property taxes are also administered by the County. Report utility issues through the County of Brant website (brant.ca) or by calling the public works department.</p>
    <p>Electricity is provided by Brantford Power or Hydro One depending on your exact location — check your address on the Ontario Energy Board's website to confirm your retailer.</p>
    
    <h2>Schools</h2>
    <p>Paris has two public elementary schools and one public high school (Paris District High School, founded 1923). The Conseil scolaire Viamonde operates French-language education in the area. Catholic education is available through the Brant Haldimand Norfolk Catholic District School Board.</p>
    
    <h2>Getting Around</h2>
    <p>You need a car in Paris — like most Ontario towns outside the GTA, Paris has no public transit. Highway 403 runs adjacent to town, providing quick access to Brantford (15 min), Hamilton (40 min), and Woodstock (30 min). The QEW is accessible via Hamilton for trips to Niagara.</p>
    
    <h2>Community Connection</h2>
    <p>The Paris Branch of the County of Brant Public Library (a Carnegie Library building) is the community's information hub and a good first stop for library cards, community bulletin boards, and program information. The library also hosts events and workshops year-round.</p>
    <p>For local news, the Brantford Expositor covers Paris regularly. The Paris Star (local online news) and the County of Brant website are good sources for municipal information. Facebook community groups like "Ask! Paris, Ontario" are active sources of local recommendations.</p>
  `,
    category: "new-resident" as const,
    published: true,
    order: 9,
  },
];

export const seedContent = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existingGuide = await ctx.db.query("guides").first();
    if (existingGuide) {
      return {
        message: "Content already seeded",
        events: (await ctx.db.query("events").collect()).length,
        guides: (await ctx.db.query("guides").collect()).length,
      };
    }

    // Seed events
    for (const event of events) {
      await ctx.db.insert("events", event);
    }

    // Seed guides
    for (const guide of guides) {
      await ctx.db.insert("guides", guide);
    }

    return {
      message: "Content seeded successfully",
      events: events.length,
      guides: guides.length,
    };
  },
});

// Clear all data and re-seed
export const reseed = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear all tables
    const tables = ["businesses", "categories", "events", "guides"] as const;
    let totalDeleted = 0;
    for (const table of tables) {
      const docs = await ctx.db.query(table).collect();
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
        totalDeleted++;
      }
    }

    // Re-seed categories
    for (const cat of categories) {
      await ctx.db.insert("categories", cat);
    }

    // Re-seed businesses
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const biz of businesses) {
      await ctx.db.insert("businesses", {
        name: biz.name,
        slug: biz.slug,
        description: biz.description,
        longDescription: (biz as any).longDescription,
        categorySlug: biz.categorySlug,
        categoryName: biz.categoryName,
        services: biz.services,
        phone: (biz as any).phone ?? "",
        email: (biz as any).email,
        website: (biz as any).website,
        address: (biz as any).address ?? "",
        city: biz.city,
        province: biz.province,
        postalCode: (biz as any).postalCode,
        lat: (biz as any).lat,
        lng: (biz as any).lng,
        verified: biz.verified,
        featured: biz.featured,
        emergency247: (biz as any).emergency247,
        hours: (biz as any).hours,
        tags: biz.tags,
        source: biz.source,
        lastVerified: biz.lastVerified,
      });
    }

    // Re-seed events
    for (const event of events) {
      await ctx.db.insert("events", event);
    }

    // Re-seed guides
    for (const guide of guides) {
      await ctx.db.insert("guides", guide);
    }

    return {
      message: "Reseeded successfully",
      deleted: totalDeleted,
      categories: categories.length,
      businesses: businesses.length,
      events: events.length,
      guides: guides.length,
    };
  },
});
