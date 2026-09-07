export interface AuditBookingData {
  fullName: string;
  email: string;
  linkedinUrl: string;
  founderRole: string;
  companyName: string;
  audienceType: string;
  primaryGoal: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortBenefit: string;
  keyDeliverable: string;
}

export interface ProblemItem {
  id: string;
  emoji: string;
  title: string;
  explanation: string;
  consequence: string;
}

export interface WhoWeHelpItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  desiredOutcome: string;
  statBadge: string;
}

export interface ProcessStepItem {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  deliverable: string;
}

export interface LinkedInPostMockupItem {
  id: string;
  author: {
    name: string;
    headline: string;
    avatarUrl: string;
    verified: boolean;
    followers: string;
  };
  timeAgo: string;
  category: string;
  badgeText: string;
  contentLines: string[];
  hasMedia?: boolean;
  mediaType?: 'carousel' | 'framework' | 'chart';
  mediaTitle?: string;
  mediaSubtitle?: string;
  hashtags: string[];
  stats: {
    reactions: number;
    comments: number;
    reposts: number;
    impressions: string;
  };
}

export interface ResultItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  metric: string;
  iconName: string;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  tagline: string;
  priceInr: string;
  priceUsd: string;
  period: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  idealFor: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  results: string;
  verifiedFollowers: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  keyTakeaway?: string;
}
