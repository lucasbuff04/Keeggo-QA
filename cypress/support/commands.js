// cypress/support/commands.js
Cypress.Commands.add('adicionarMoletomNoCarrinho', () => {
  cy.visit('/');

  cy.contains('Moletom com capuz "Se você acha que nada é impossível..."').click();

  cy.get('#add-to-cart[data-id="1"]').click();

  cy.get('a[href="/cart.html"]').click();

  cy.contains('Verifique seus produtos e avance para o checkout:').should('be.visible');
  cy.contains('Moletom com capuz "Se você acha que nada é impossível..."').should('be.visible');
  cy.contains('Preço: R$59.00').should('be.visible');
  cy.contains('Quantidade: 1').should('be.visible');
  cy.contains('Total: R$59.00').should('be.visible');

  cy.validarValores('#total-products', 59.00);
  cy.validarValores('#shipping-fee', 19.90);
  cy.validarValores('#total-with-shipping', 78.90);

  cy.get('a[href="/checkout.html"]').click();
});

Cypress.Commands.add('validarValores', (selector, expectedValue) => {
  cy.get(selector)
    .should('be.visible')
    .invoke('text')
    .then(text => {
      const numeric = parseFloat(
        text.replace(/[^\d,.-]/g, '').replace(',', '.')
      );
      expect(numeric).to.eq(expectedValue);
    });
});

Cypress.Commands.add('adicionarMultiplosProdutos', (produtos) => {
  cy.visit('/');
  const homePage = new (require('../e2e/page/web/HomePage')).HomePage();
  homePage.validarProdutosVisiveis(['Moletom com capuz "Se você acha que nada é impossível..."', 'Moletom com capuz "Na minha máquina funciona"']);
  homePage.adicionarMultiplosProdutos(produtos);
  homePage.irParaCarrinho();
});

