import { createClient, EntryFieldTypes } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  environment: 'master',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export interface Job {
  company: string;
  title: string;
  dates: string;
  duties: any[];
  order: number;
}

export const fetchExperience = async (): Promise<Job[]> => {
  try {
    const response = await client.getEntries<{ contentTypeId: 'portfolio'; fields: Job }>({
      content_type: 'portfolio',
    });

    const jobs = response.items.map((item) => {
      const { company, title, dates, duties, order } = item.fields as Job;
      return { company, title, dates, duties, order };
    });

    return jobs.sort((a, b) => b.order - a.order );
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
};