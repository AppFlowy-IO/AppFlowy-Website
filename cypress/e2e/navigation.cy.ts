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

  it('should navigate to the download page', () => {
    cy.get('[aria-label=navbar-menu] a[href="/download"]').click();
    cy.url().should('include', '/download');

    cy.get('[aria-label=navbar-menu] a[href="/"]').click();
    cy.url().should('eq', baseIndexUrl);
  });

  it('clicking the community and resources should open the popover', () => {
    const menus = ['Community', 'Resources'];
    menus.forEach((menu) => {
      cy.wait(1000);
      // Find the menu and click it
      cy.get('[aria-label=navbar-menu]').contains(menu).click();
      // Ensure that the popover element is visible
      cy.get('.MuiModal-root').should('be.visible');
      // Ensure that the current page's URL remains the same
      cy.url().should('eq', baseIndexUrl);

      // Find the Product and click it
      cy.get('[aria-label=navbar-menu]').contains('Download').click();
      // Ensure that the popover element is no longer visible
      cy.get('.MuiModal-root').should('not.be.visible');
      // Ensure that the current page's URL remains the same
      cy.url().should('include', '/download');
      // Go back to the index page
      cy.get('[aria-label=navbar-menu] a[href="/"]').click();
    });
  });

  it('should show a new version notification bar', () => {
    // Check if the new version notification bar exists
    cy.get('[aria-label=topbar]').should('exist');
    // Click the "Learn More" link
    cy.get('.learn-more-link').click();
    // Wait for the page to navigate to /what-is-new
    cy.url().should('include', '/what-is-new');
    // Ensure that the notification bar is no longer visible
    cy.get('[aria-label=topbar]').should(($element) => {
      // Use a custom assertion function to check the element's height
      expect($element.height()).to.equal(0);
    });
  });

  it('clicking the download for free button should navigate to the download page', () => {
    cy.get('.nav-download-free').click();
    // Wait for the page to navigate to /download
    cy.url().should('include', '/download');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
