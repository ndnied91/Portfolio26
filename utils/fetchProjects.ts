import { createClient, EntryFieldTypes } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  environment: 'master',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

interface ProjectFields {
  title: string;
  text: string;
  tags: string[];
  github: string;
  url?: string;
  details?: string;
  isFeatured?: boolean;
  created: string;
}

export interface Project {
  title: string;
  text: string;
  tags: string[];
  github: string;
  url?: string;
  details?: string;
  isFeatured?: boolean;
  created: string;
}
// to edit, 

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await client.getEntries<{ contentTypeId: 'projects'; fields: ProjectFields }>({
      content_type: 'projects',
    });

    const data = response.items.map((item) => {
      const { title, text, tags, github, url, details, isFeatured, created } = item.fields as ProjectFields;
      return { title, text, tags, github, url, details, isFeatured, created };
    });

    return data.sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};