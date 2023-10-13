import axios from 'axios';

enum Stage {
  SUBSCRIBER = 'subscriber',
  UNSUBSCRIBED = 'lead',
}

interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email: string;
  company?: string;
  stage?: Stage;
}

export const hubspotAPI = axios.create({
  // baseURL: 'https://api.hubapi.com',
  // rewrite in next.config.js, because of CORS
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

export async function getOrCreateHubSpotContactWithEmail(data: ContactFormData) {
  const res = await hubspotAPI.post('/crm/v3/objects/contacts/batch/read?archived=false', {
    properties: ['email'],
    idProperty: 'email',
    inputs: [
      {
        id: data.email,
      },
    ],
  });
  const result = res.data.results?.[0];

  const id = result?.id;

  if (result && id) {
    await updateHubSpotContact(id, {
      company: data.company,
      lastname: data.lastName,
      firstname: data.firstName,
      lifecyclestage: data.stage,
    });
    return id;
  }

  return await createHubSpotContact(data);
}

export async function updateHubSpotContact(
  id: string,
  data: Partial<{
    company: string;
    lastname: string;
    firstname: string;
    lifecyclestage: Stage;
  }>
) {
  return await hubspotAPI.post(`/crm/v3/objects/contacts/batch/update`, {
    inputs: [
      {
        id: id,
        properties: data,
      },
    ],
  });
}

export async function createHubSpotContact(formData: {
  firstName?: string;
  lastName?: string;
  email: string;
  company?: string;
  stage?: Stage;
}) {
  const { stage } = formData;
  const res = await hubspotAPI.post('/crm/v3/objects/contacts/batch/create', {
    inputs: [
      {
        properties: {
          email: formData.email,
          company: formData.company || '',
          website: window.location.hostname,
          lastname: formData.lastName || '',
          firstname: formData.firstName || '',
          lifecyclestage: stage,
        },
        associations: [],
      },
    ],
  });

  return res.data.results?.[0]?.id;
}

export async function createHubSpotSubscriber(email: string) {
  return await getOrCreateHubSpotContactWithEmail({
    email,
    stage: Stage.SUBSCRIBER,
  });
}

export async function createHubSpotTicket(formData: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
}) {
  const contactId = await getOrCreateHubSpotContactWithEmail(formData);

  if (!contactId) return Promise.reject('Failed to create contact');

  const res = await hubspotAPI.post('/crm/v3/objects/tickets/batch/create', {
    inputs: [
      {
        properties: {
          subject: 'feedback',
          content: formData.message,
          hs_pipeline: '0',
          hs_pipeline_stage: '1',
          hs_ticket_priority: 'HIGH',
        },
        associations: [
          {
            to: {
              id: contactId,
            },
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 16,
              },
            ],
          },
        ],
      },
    ],
  });

  const ticketId = res.data.results?.[0]?.id;

  if (ticketId) {
    return ticketId;
  }

  return Promise.reject('Failed to create ticket');
}
