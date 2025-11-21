import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('o usuário adicionou um moletom ao carrinho', () => {
  cy.adicionarMoletomNoCarrinho();
});

When('o usuário preenche o formulário de checkout com dados válidos', (datatable) => {
  const dados = datatable.hashes()[0];
  cy.get('#first-name').type(dados.firstName);
  cy.get('#last-name').type(dados.lastName);
  cy.get('#address').type(dados.address);
  cy.get('#number').type(dados.number);
  cy.get('#cep').type(dados.cep);
  cy.get('#phone').type(dados.phone);
  cy.get('#email').type(dados.email);
});

When('o usuário preenche o formulário de checkout com dados inválidos', (datatable) => {
  const dados = datatable.hashes()[0];
  cy.get('#first-name').type(dados.firstName);
  cy.get('#last-name').type(dados.lastName);
  cy.get('#address').type(dados.address);
  cy.get('#number').type(dados.number);
  cy.get('#cep').type(dados.cep);
  cy.get('#phone').type(dados.phone);
  cy.get('#email').type(dados.email);
});

When('o usuário seleciona pagamento via PIX', () => {
  cy.get('#payment-pix').check({ force: true });
});

When('o usuário aceita os termos de uso', () => {
  cy.get('#terms').check({ force: true });
});

When('o usuário clica em {string}', (botao) => {
  cy.contains('button', botao).click({ force: true });
});

When('o usuário clica em "Finalizar Pedido" sem preencher campos', () => {
  cy.contains('button', 'Finalizar Pedido').click({ force: true });
});

Then('o sistema exibe a mensagem de confirmação {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});

Then('o sistema exibe erro {string}', (erro) => {
  cy.get('.invalid-feedback').contains(erro).should('be.visible');
});

Then('o sistema exibe mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});
