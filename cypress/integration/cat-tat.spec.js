/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    it('Verifica o título da aplicação', () => {
        cy.visit('src/index.html');

        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT');
    });
});