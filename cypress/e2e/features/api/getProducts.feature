@api @get @produtos
Feature: Consultar produtos

  @regressao
  Scenario: Buscar todos os produtos com sucesso
    When realizo uma requisição GET para "/api/produtos"
    Then o status da resposta da API de produtos deve ser 200
    And a lista de produtos deve conter pelo menos 1 item
    And os produtos devem conter os campos obrigatórios

  @regressao
  Scenario: Buscar um produto pelo ID com sucesso
    When realizo uma requisição GET para "/api/produtos/5"
    Then o status da resposta da API de produtos deve ser 200
    And o produto deve conter os campos obrigatórios
