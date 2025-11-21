import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../page/web/HomePage.js';
import ProdutoPage from '../../page/web/ProdutoPage.js';
import CarrinhoPage from '../../page/web/CarrinhoPage.js';

const homePage = new HomePage();
const produtoPage = new ProdutoPage();
const carrinhoPage = new CarrinhoPage();

function getDataIdByNome(nomeProduto) {
  if (nomeProduto.includes("impossível")) return "1";
  if (nomeProduto.includes("funciona")) return "2";
  throw new Error(`Produto "${nomeProduto}" não mapeado`);
}

Given("estou na página inicial", () => {
  cy.visit("/");
  cy.title().should('include', 'Home');
});

When("adiciono o produto {string} ao carrinho com quantidade {int}", (nomeProduto, quantidade) => {
  const dataId = getDataIdByNome(nomeProduto);
  cy.get(`#quantity-${dataId}`)
    .clear()
    .type(quantidade.toString());
  produtoPage.adicionarProdutoAoCarrinho(dataId);
});

When("defino a quantidade {int} para o produto {string}", (quantidade, nomeProduto) => {
  homePage.validarProdutoVisivel(nomeProduto);
  const dataId = getDataIdByNome(nomeProduto);
  cy.get(`#quantity-${dataId}`)
    .clear()
    .type(quantidade.toString());
});

When("adiciono o produto {string} ao carrinho", (nomeProduto) => {
  const dataId = getDataIdByNome(nomeProduto);
  produtoPage.adicionarProdutoAoCarrinho(dataId);
});

When("navego para a página do carrinho", () => {
  carrinhoPage.irParaCarrinho();
});

When("clico no botão remover do produto {string}", (nomeProduto) => {
  const dataId = getDataIdByNome(nomeProduto);

  carrinhoPage.getBotaoRemoverPorDataId(dataId)
    .should('be.visible')
    .click();

  carrinhoPage.validarMensagemRemocao();

  cy.contains(nomeProduto).should('not.exist');
});

Then("o título do carrinho deve ser visível", () => {
  carrinhoPage.tituloCarrinho.should('be.visible');
});

Then("o produto {string} deve estar no carrinho", (nomeProduto) => {
  cy.contains(nomeProduto).should('be.visible');
});

Then("o produto {string} não deve estar no carrinho", (nomeProduto) => {
  cy.contains(nomeProduto).should('not.exist');
});

Then("o preço do item deve ser {string}", (precoEsperado) => {
  carrinhoPage.validarDetalhesItemPorDataId("1", 4, 236.00);
});

Then("a quantidade do item deve ser {string}", (quantidadeEsperado) => {
  const qtd = parseInt(quantidadeEsperado.match(/\d+/)?.[0] || "4");
  carrinhoPage.validarDetalhesItemPorDataId("1", qtd, 59 * qtd);
});

Then("o total do item deve ser {string}", (totalEsperado) => {
  const total = parseFloat(totalEsperado.match(/R\$([\d.,]+)/)?.[1]?.replace(',', '.') || "236.00");
  carrinhoPage.validarDetalhesItemPorDataId("1", 4, total);
});

Then("o total dos produtos deve ser {float}", (valorEsperado) => {
  carrinhoPage.validarTodosTotais(valorEsperado, 19.90, valorEsperado + 19.90);
});

Then("a taxa de envio deve ser {float}", (valorEsperado) => {
  cy.get('#shipping-fee').invoke('text').then(text => {
    const valor = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
    expect(valor).to.be.closeTo(valorEsperado, 0.01);
  });
});

Then("o total com envio deve ser {float}", (valorEsperado) => {
  cy.get('#total-with-shipping').invoke('text').then(text => {
    const valor = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
    expect(valor).to.be.closeTo(valorEsperado, 0.01);
  });
});

Then("a mensagem {string} deve ser visível", (mensagem) => {
  cy.contains(mensagem, { timeout: 3000 }).should('be.visible');
});

Then("o carrinho deve estar vazio após remoções", () => {
  carrinhoPage.validarCarrinhoVazio();
});
