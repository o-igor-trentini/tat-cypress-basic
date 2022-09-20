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

        const longText = 'Texto '.repeat(50);
        cy.get('#open-text-area').type(longText, { delay: 0 });

        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Igor');
        cy.get('#lastName').type('Trentini');
        cy.get('#email').type('igortrentini@email,com');
        cy.get('#open-text-area').type('Texto');

        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('Campo telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone').type('qualquer coisa').should('have.value', '');
    });
});
