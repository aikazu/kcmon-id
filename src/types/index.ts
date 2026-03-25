export interface Profile {
  name: string;
  tagline: string;
  summary: string;
  location: string;
  status: string;
  specialties: string[];
  cta: CallToAction;
  closingNote: string;
}

export interface CallToAction {
  label: string;
  url: string;
  external: boolean;
}

export interface Item {
  tag: string;
  label: string;
  url: string;
  external: boolean;
  summary?: string;
  year?: string;
  featured?: boolean;
  techStack?: string[];
}

export interface Section {
  title: string;
  description?: string;
  items: Item[];
}

export interface Data {
  profile: Profile;
  sections: Section[];
}
