@api @post @carrinho
Feature: Adicionar Produto ao Carrinho
  Como um usuário
  Eu quero adicionar um produto ao meu carrinho
  Para que eu possa comprar itens

  @regressao
  Scenario: Adicionar produto ao carrinho com sucesso
    Given que eu tenho um usuário com ID 1
    And um produto com ID 101
    When eu envio uma requisição POST para "/api/carrinho" com quantidade 2
    Then o status da resposta deve ser 201
    And a resposta deve conter uma mensagem de sucesso
