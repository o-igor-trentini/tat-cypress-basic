Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Igor');
    cy.get('#lastName').type('Trentini');
    cy.get('#email').type('igortrentini@email.com');
    cy.get('#open-text-area').type('Texto');

    cy.get('button[type="submit"]').click();
});
