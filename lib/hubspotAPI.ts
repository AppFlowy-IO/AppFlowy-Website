import axios from 'axios';

export const hubspotAPI = axios.create({
  // baseURL: 'https://api.hubapi.com',
  // rewrite in next.config.js, because of CORS
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

export async function getHubSpotContactWithEmail(email: string) {
  const res = await hubspotAPI.post('/crm/v3/objects/contacts/batch/read?archived=false', {
    properties: ['email'],
    propertiesWithHistory: ['string'],
    idProperty: 'email',
    inputs: [
      {
        id: email,
      },
    ],
  });

  return res.data.results?.[0]?.id;
}

export async function createHubSpotContact(formData: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
}) {
  const res = await hubspotAPI.post('/crm/v3/objects/contacts/batch/create', {
    inputs: [
      {
        properties: {
          email: formData.email,
          company: formData.company || '',
          website: window.location.hostname,
          lastname: formData.lastName,
          firstname: formData.firstName,
        },
        associations: [],
      },
    ],
  });

  return res.data.results?.[0]?.id;
}

export async function createHubSpotTicket(formData: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
}) {
  const email = formData.email;
  let contactId = await getHubSpotContactWithEmail(email);

  if (!contactId) {
    contactId = await createHubSpotContact(formData);
  }

  if (!contactId) return Promise.reject('Failed to create contact');

  const res = await hubspotAPI.post('/crm/v3/objects/tickets/batch/create', {
    inputs: [
      {
        properties: {
          subject: formData.message,
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
