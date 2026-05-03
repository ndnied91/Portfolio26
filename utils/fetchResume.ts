import { createClient, EntryFieldTypes } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  environment: 'master',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

interface ResumeFields {
  resume: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export const fetchResume = async (): Promise<string> => {
  try {
    const response = await client.getEntries<{ contentTypeId: 'resumedoc'; fields: ResumeFields }>({
      content_type: 'resumedoc',
    });
    
    const url = (response.items[0]?.fields as ResumeFields)?.resume?.fields?.file?.url;
    return url ? `https:${url}` : '';
  } catch (error) {
    console.error('Error fetching resume:', error);
    return '';
  }
};