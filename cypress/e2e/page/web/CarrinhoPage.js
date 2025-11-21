export default class CarrinhoPage {
  get tituloCarrinho() {
    return cy.contains('Verifique seus produtos e avance para o checkout:');
  }

  get itemMoletomImpossivel() {
    return cy.contains('Moletom com capuz "Se você acha que nada é impossível..."');
  }

  get itemMoletomFunciona() {
    return cy.contains('Moletom com capuz "Na minha máquina funciona"');
  }

  getBotaoRemoverPorDataId(dataId) {
    return cy.get(`.remove-from-cart[data-product-id="${dataId}"], button[data-product-id="${dataId}"]`);
  }

  get linkCarrinho() {
    return cy.get('a[href="/cart.html"]');
  }

  get botaoCheckout() {
    return cy.get('a[href="/checkout.html"]');
  }

  validarConteudoCarrinhoMultiplos() {
    this.tituloCarrinho.should('be.visible');
    this.itemMoletomImpossivel.should('be.visible');
    this.itemMoletomFunciona.should('be.visible');
    this.getBotaoRemoverPorDataId('1').should('exist');
    this.getBotaoRemoverPorDataId('2').should('exist');
    return this;
  }

  validarDetalhesItemPorDataId(dataId, quantidadeEsperada, totalEsperado) {
    cy.get(`.cart-item[data-product-id="${dataId}"], [data-product-id="${dataId}"]`)
      .within(() => {
        cy.contains(`Quantidade: ${quantidadeEsperada}`).should('be.visible');
        cy.contains(`Total: R$${totalEsperado.toFixed(2)}`).should('be.visible');
      });
    return this;
  }

  validarTodosTotais(totalProdutos, taxaEnvio, totalComEnvio) {
    cy.get('#total-products').invoke('text').then(text => {
      const valor = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
      expect(valor).to.be.closeTo(totalProdutos, 0.01);
    });

    cy.get('#shipping-fee').invoke('text').then(text => {
      const valor = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
      expect(valor).to.be.closeTo(taxaEnvio, 0.01);
    });

    cy.get('#total-with-shipping').invoke('text').then(text => {
      const valor = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
      expect(valor).to.be.closeTo(totalComEnvio, 0.01);
    });

    return this;
  }

  validarCarrinhoVazio() {
    cy.get('.remove-from-cart[data-product-id]').should('not.exist');
    cy.contains('Seu carrinho está vazio.').should('be.visible');
    return this;
  }

  irParaCarrinho() {
    cy.url().then(url => {
      if (!url.includes('/cart')) {
        this.linkCarrinho.click();
        cy.url().should('include', '/cart');
      }
    });
    this.tituloCarrinho.should('be.visible');
    return this;
  }

  validarItensPresentesAntesRemocao() {
    this.validarConteudoCarrinhoMultiplos();
    return this;
  }

  irParaCheckout() {
    this.botaoCheckout.click();
    return this;
  }

  validarMensagemRemocao() {
    cy.contains('Produto removido do carrinho!').should('be.visible');
    return this;
  }
}
