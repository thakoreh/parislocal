export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  categorySlug: string;
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
  rating: number;
  reviewCount: number;
  image?: string;
  verified: boolean;
  featured: boolean;
  hours?: { day: string; open: string; close: string }[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    google?: string;
  };
  tags: string[];
  servingAreas: string[];
  createdAt: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  businessCount?: number;
  subcategories?: string[];
}

export interface SearchFilters {
  query?: string;
  category?: string;
  location?: string;
  rating?: number;
  verified?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  businessId?: string;
}

export interface BusinessFormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  services: string;
  address: string;
  city: string;
  website?: string;
  servingAreas: string;
}
