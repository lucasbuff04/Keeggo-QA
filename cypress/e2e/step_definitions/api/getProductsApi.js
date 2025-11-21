import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('realizo uma requisição GET para {string}', (endpoint) => {
  cy.api({
    method: 'GET',
    url: `http://localhost:3000${endpoint}`,
    headers: {
      accept: 'application/json'
    }
  }).as('response');
});

Then('o status da resposta da API de produtos deve ser {int}', (statusCode) => {
  cy.get('@response').then((res) => {
    expect(res.status).to.eq(statusCode);
  });
});

Then('a lista de produtos deve conter pelo menos {int} item', (quantidadeMinima) => {
  cy.get('@response').then((res) => {
    expect(res.body.products).to.have.length.greaterThan(quantidadeMinima - 1);
  });
});

Then('os produtos devem conter os campos obrigatórios', () => {
  cy.get('@response').then((res) => {
    res.body.products.forEach((produto) => {
      expect(produto).to.have.property('id');
      expect(produto).to.have.property('name');
      expect(produto).to.have.property('price');
      expect(produto).to.have.property('description');
    });
  });
});

Then('o produto deve conter os campos obrigatórios', () => {
  cy.get('@response').then((res) => {
    const produto = res.body;
    expect(produto).to.have.property('id');
    expect(produto).to.have.property('name');
    expect(produto).to.have.property('price');
    expect(produto).to.have.property('description');
  });
});
