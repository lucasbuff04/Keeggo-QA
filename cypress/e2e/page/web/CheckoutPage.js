export default class CheckoutPage {
  constructor() {
    this.firstName = () => cy.get('#first-name');
    this.lastName = () => cy.get('#last-name');
    this.address = () => cy.get('#address');
    this.number = () => cy.get('#number');
    this.cep = () => cy.get('#cep');
    this.phone = () => cy.get('#phone');
    this.email = () => cy.get('#email');
    this.paymentPix = () => cy.get('#payment-pix');
    this.terms = () => cy.get('#terms');
    this.botaoFinalizar = () => cy.contains('button', 'Finalizar Pedido');
    this.erroCep = () => cy.get('.invalid-feedback').eq(0);
    this.erroEmail = () => cy.get('.invalid-feedback').eq(1);
    this.erroObrigatorio = () => cy.contains('Por favor, preencha todos os campos obrigatório marcados com asteriscos!');
    this.mensagemConfirmacao = () => cy.contains('Obrigado pelo seu pedido Lucas');
  }

  preencherDadosValidos(dados) {
    this.firstName().type(dados.firstName);
    this.lastName().type(dados.lastName);
    this.address().type(dados.address);
    this.number().type(dados.number);
    this.cep().type(dados.cep);
    this.phone().type(dados.phone);
    this.email().type(dados.email);
    return this;
  }

  preencherDadosInvalidos(dados) {
    this.firstName().type(dados.firstName);
    this.lastName().type(dados.lastName);
    this.address().type(dados.address);
    this.number().type(dados.number);
    this.cep().type(dados.cep);
    this.phone().type(dados.phone);
    this.email().type(dados.email);
    return this;
  }

  selecionarPix() {
    this.paymentPix().check({ force: true });
    return this;
  }

  aceitarTermos() {
    this.terms().check({ force: true });
    return this;
  }

  finalizarPedido() {
    this.botaoFinalizar().click({ force: true });
    return this;
  }

  validarConfirmacao() {
    this.mensagemConfirmacao().should('be.visible');
    return this;
  }

  validarErroCep() {
    this.erroCep().should('contain', 'O CEP deve ter 8 caracteres.');
    return this;
  }

  validarErroEmail() {
    this.erroEmail().should('contain', 'Por favor, insira um email válido.');
    return this;
  }

  validarCamposObrigatorios() {
    this.erroObrigatorio().should('be.visible');
    return this;
  }
}