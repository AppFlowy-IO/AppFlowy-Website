/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('Footer', () => {
  const baseIndexUrl = 'http://localhost:3000/';
  beforeEach(() => {
    // Start from the index page
    cy.visit(baseIndexUrl);
  });

  it('should verify all links in the footer', () => {
    // Find the footer element
    cy.get('.footer').as('footer');

    [
      {
        title: `What's New`,
        link: '/what-is-new',
      },
      {
        title: `Appflowy Blocks`,
        link: '/blocks',
      },
      {
        title: `About us`,
        link: '/about-us',
      },
      {
        title: `Careers`,
        link: '/career',
      },
      {
        title: `Contact`,
        link: '/contact-us',
      },
    ].forEach((item) => {
      cy.get('@footer').find('a').contains(item.title).click();
      cy.url().should('contain', item.link);
    });
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
