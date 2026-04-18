// Convex business type (matches what comes from the backend)
export interface ConvexBusiness {
  _id: string;
  _creationTime: number;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  categorySlug: string;
  categoryName: string;
  services: string[];
  phone: string;
  email?: string;
  website?: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  reviewCount?: number;
  verified: boolean;
  featured: boolean;
  emergency247?: boolean;
  hours?: { day: string; open: string; close: string }[];
  tags: string[];
  imageUrl?: string;
  source: string;
  lastVerified: string;
}

// Convex category type
export interface ConvexCategory {
  _id: string;
  _creationTime: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  featured?: boolean;
}
