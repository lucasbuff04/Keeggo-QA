export default class ProdutoPage {
  get botaoAdicionarCarrinho() {
    cy.get('button.add-to-cart[data-id="1"]', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .click({ force: true });
  }

  adicionarAoCarrinho() {
    this.botaoAdicionarCarrinho.click({ force: true });
    return this;
  }

  get botaoAdicionarCarrinhoProduto2() {
    cy.get('button.add-to-cart[data-id="2"]', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .click({ force: true });
  }

  adicionarProduto2AoCarrinho() {
    this.botaoAdicionarCarrinhoProduto2.click({ force: true });
    return this;
  }

  adicionarProdutoAoCarrinho(dataId) {
    cy.get(`button.add-to-cart[data-id="${dataId}"]`).should('exist').should('be.visible').click({ force: true });
    return this;
  }
}