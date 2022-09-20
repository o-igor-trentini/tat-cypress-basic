/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => cy.visit('src/index.html'));

    it('Verifica o título da aplicação', () => {
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Igor');
        cy.get('#lastName').type('Trentini');
        cy.get('#email').type('igortrentini@email.com');
        cy.get('#open-text-area').type('Obrigado pelo bom trabalho!');

        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    });
});