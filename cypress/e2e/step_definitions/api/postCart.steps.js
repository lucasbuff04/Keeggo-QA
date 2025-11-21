import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let response;

Given('que eu tenho um usuário com ID {int}', function (userId) {
  this.userId = userId;
});

Given('um produto com ID {int}', function (productId) {
  this.productId = productId;
});

When('eu envio uma requisição POST para "/api/carrinho" com quantidade {int}', function (quantity) {
  const requestBody = {
    userId: this.userId,
    productId: this.productId,
    quantity: quantity
  };

  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/carrinho',
    body: requestBody,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false 
  }).then((res) => {
    response = res;
  });
});

Then('o status da resposta deve ser {int}', function (expectedStatus) {
  expect(response.status).to.equal(expectedStatus);
});

Then('a resposta deve conter uma mensagem de sucesso', function () {
  expect(response.body).to.have.property('message');
  expect(response.body.message).to.include('sucesso');
});
