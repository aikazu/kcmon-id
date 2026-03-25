export interface Profile {
  name: string;
  tagline: string;
  location: string;
  status: string;
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
  items: Item[];
}

export interface Data {
  profile: Profile;
  sections: Section[];
}
