describe('Pricing page interactions', () => {
  for (const width of [320, 390, 767]) {
    for (const mode of ['cloud', 'self-hosted']) {
      it(`keeps the last ${mode} plan readable at ${width}px`, () => {
        cy.viewport(width, 844);
        cy.visit(mode === 'cloud' ? '/pricing' : '/pricing?source=super-admin');
        cy.get('.mobile-comparison-scroll').scrollIntoView().scrollTo('right');
        cy.get('.mobile-comparison-scroll').should(($region) => {
          const region = $region[0];
          const header = region.firstElementChild!.firstElementChild!;
          const sticky = header.children[0].getBoundingClientRect();
          const lastPlan = header.lastElementChild!;
          const planBounds = lastPlan.getBoundingClientRect();
          const viewport = region.getBoundingClientRect();

          expect(planBounds.left, 'plan clears the sticky labels').to.be.at.least(sticky.right - 1);
          expect(planBounds.right, 'whole plan fits in the viewport').to.be.at.most(viewport.right);

          for (const element of Array.from(lastPlan.querySelectorAll('h3, p, a, button'))) {
            const range = element.ownerDocument.createRange();
            range.selectNodeContents(element);
            const text = range.getBoundingClientRect();

            expect(text.left, element.textContent || '').to.be.at.least(sticky.right - 1);
            expect(text.right, element.textContent || '').to.be.at.most(viewport.right);
          }
        });
      });
    }
  }

  it('preserves the expanded FAQ across billing changes and resets it for a new deployment', () => {
    cy.viewport(1440, 900);
    cy.visit('/pricing');
    cy.contains('h3', 'How do I cancel my paid plan?').click();
    cy.contains('h3', 'How do I cancel my paid plan?').parent().next().should('have.css', 'opacity', '1');
    cy.contains('button', /^Monthly$/).click();
    cy.contains('h3', 'How do I cancel my paid plan?').parent().next().should('have.css', 'opacity', '1');
    cy.contains('button', /^Yearly$/).click();
    cy.contains('h3', 'How do I cancel my paid plan?').parent().next().should('have.css', 'opacity', '1');
    cy.contains('h2', 'Questions & answers').closest('section').as('faq');
    cy.get('@faq').contains('button', 'Self-Hosted').click();
    cy.get('@faq').find('h3').first().parent().next().should('have.css', 'opacity', '1');
    cy.get('@faq').contains('button', 'AppFlowy Cloud').click();
    cy.contains('h3', 'How is pricing calculated for the paid plans?').parent().next().should('have.css', 'opacity', '1');
  });
});
