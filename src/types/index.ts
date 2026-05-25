export interface ProfileIssue {
  number: string;
  year: string;
}

export interface Profile {
  name: string;
  tagline: string;
  subtitle: string;
  location: string;
  status: string;
  role: string;
  issue: ProfileIssue;
}

export interface Item {
  tag: string;
  label: string;
  url: string;
  external: boolean;
  techStack?: string[];
}

export interface Section {
  title: string;
  intro?: string;
  items: Item[];
}

export interface Data {
  profile: Profile;
  sections: Section[];
}
