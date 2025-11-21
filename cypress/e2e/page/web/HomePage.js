export default class HomePage {
  get linkProdutos() {
    return cy.contains('Moletom com capuz "Se você acha que nada é impossível..."', { timeout: 10000 });
  }

  irParaProduto() {
    this.linkProdutos.click();
    return this;
  }

  validarProdutoVisivel(nomeProduto) {
    cy.contains(nomeProduto).should('be.visible');
    return this;
  }

  validarProdutosVisiveis(produtos) {
    produtos.forEach(produto => {
      cy.contains(produto).should('be.visible');
    });
    return this;
  }

  adicionarMultiplosProdutos(produtos) {
    produtos.forEach(produto => {
      cy.get(`#quantity-${produto.id}`).clear().type(produto.qtd.toString());
      cy.get(`button.add-to-cart[data-id="${produto.id}"]`).click({ force: true });
    });
    return this;
  }

  irParaCarrinho() {
    cy.get('a[href="/cart.html"]').click();
    return this;
  }
}