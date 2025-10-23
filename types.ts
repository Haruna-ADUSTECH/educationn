
export interface KeyFeature {
  feature: string;
  description: string;
  technology: string;
}

export interface EducationalAppIdea {
  appName: string;
  tagline: string;
  problem: string;
  solution: string;
  keyFeatures: KeyFeature[];
  targetAudience: string;
  monetization: string;
  userJourney: string;
}
