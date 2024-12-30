/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('Navigation', () => {
  const baseIndexUrl = 'http://localhost:3000/';
  beforeEach(() => {
    // Start from the index page
    cy.visit(baseIndexUrl);
  });

  it('hover the community and resources should open the popover', () => {
    const menus = ['Community', 'Resources', 'Download'];
    menus.forEach((menu) => {
      cy.wait(1000);
      // Find the menu and click it
      cy.get('.navigation').contains(menu).as('menu');

      cy.get('@menu').trigger('mouseover');
      // Ensure that the popover element is visible
      cy.get('.popover-paper').should('be.visible');

      cy.get('.popover-paper').trigger('mouseover');
      // Ensure that the popover element is still visible
      cy.wait(300);
      cy.get('.popover-paper').should('be.visible');

      cy.get('@menu').trigger('mouseout');
      // Ensure that the popover element is no longer visible
      cy.wait(300);
      cy.get('.popover-paper').should('not.exist');
    });
  });

  it('should show a new version notification bar', () => {
    cy.wait(1000);
    // Check if the new version notification bar exists
    cy.get('.banner').should('exist');
    // Click the "Learn More" link
    cy.get('.learn-more-link').click();
    cy.wait(300);
    // Wait for the page to navigate to /what-is-new
    cy.url().should('include', '/what-is-new');
    // Ensure that the notification bar is no longer visible
    cy.get('.banner').not('exist');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
