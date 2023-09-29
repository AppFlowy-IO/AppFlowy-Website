// describe('Switch Mode', () => {
//   const baseIndexUrl = 'http://localhost:3000/';
//
//   beforeEach(() => {
//     // Start from the index page
//     cy.visit(baseIndexUrl);
//   });
//   it('default light mode', () => {
//     cy.get('[data-mode=dark]').should('not.exist');
//   });
//
//   it('switch to dark mode', () => {
//     cy.get('.switch-mode').click();
//     cy.get('[data-mode=dark]').should('exist');
//     cy.reload();
//     cy.get('[data-mode=dark]').should('exist');
//   });
// });
