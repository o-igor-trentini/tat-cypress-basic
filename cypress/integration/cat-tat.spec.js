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

        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Igor');
        cy.get('#lastName').type('Trentini');
        cy.get('#email').type('igortrentini@email,com');
        cy.get('#open-text-area').type('Texto');

        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('Campo telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone').type('qualquer coisa').should('have.value', '');
    });

    it('Exibe mensagem de erro quando telefone se torna obrigatório, mas não é preenchido', () => {
        cy.get('#firstName').type('Igor');
        cy.get('#lastName').type('Trentini');
        cy.get('#email').type('igortrentini@email.com');
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type('Texto');

        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').
            type('Igor').
            should('have.value', 'Igor').
            clear().
            should('have.value', '');

        cy.get('#lastName').
            type('Trentini').
            should('have.value', 'Trentini').
            clear().
            should('have.value', '');

        cy.get('#email').
            type('igortrentini@email.com').
            should('have.value', 'igortrentini@email.com').
            clear().
            should('have.value', '');

        cy.get('#phone').
            type('1235467890').
            should('have.value', '1235467890').
            clear().
            should('have.value', '');
    });

    it('Exibe mensagem de erro ao submeter formulário sem preencher campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('Envia o formulário com sucesso usando comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.success').should('be.visible');
    });

    it('Selecionar o produto (Youtube) pelo texto', () => {
        cy.
            get('#product').
            select('YouTube').
            should('have.value', 'youtube');
    });

    it('Selecionar o produto (Mentoria) pelo seu valor', () => {
        cy.
            get('#product').
            select('mentoria').
            should('have.value', 'mentoria');
    });

    it('Seleciona o produto (Blog) pelo índice', () => {
        cy.
            get('#product').
            select(1).
            should('have.value', 'blog');
    });

    it('Marca o tipo de atendimento (Feedback)', () => {
        cy.get('input[type="radio"][value="feedback"]').
            check().
            should('have.value', 'feedback');
    });

    it.only('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').
            should('have.length', 3).
            each((item) => cy.wrap(item).check().should('be.checked'));
    });
});
