Feature: Adicionar e remover produtos do carrinho de compras
  Como usuário do e-commerce
  Eu quero adicionar e remover itens ao carrinho
  Para que possa gerenciar minha compra

  Background: 
    Given estou na página inicial

  @regressao @item-unico
  Scenario: Adicionar item único ao carrinho e visualizar detalhes
    When adiciono o produto "Moletom com capuz \"Se você acha que nada é impossível...\"" ao carrinho com quantidade 1
    And adiciono o produto "Moletom com capuz \"Na minha máquina funciona\"" ao carrinho com quantidade 1
    And navego para a página do carrinho
    Then o título do carrinho deve ser visível
    And o produto "Moletom com capuz \"Se você acha que nada é impossível...\"" deve estar no carrinho
    And o produto "Moletom com capuz \"Na minha máquina funciona\"" deve estar no carrinho
    And o total dos produtos deve ser 118.00
    And a taxa de envio deve ser 19.90
    And o total com envio deve ser 137.90

  @regressao @remocao-carrinho
  Scenario: Remover itens do carrinho e verificar confirmação
    When adiciono o produto "Moletom com capuz \"Se você acha que nada é impossível...\"" ao carrinho com quantidade 1
    And adiciono o produto "Moletom com capuz \"Na minha máquina funciona\"" ao carrinho com quantidade 1
    And navego para a página do carrinho
    When clico no botão remover do produto "Moletom com capuz \"Se você acha que nada é impossível...\""
    Then a mensagem "Produto removido do carrinho!" deve ser visível
    And o produto "Moletom com capuz \"Se você acha que nada é impossível...\"" não deve estar no carrinho
    When clico no botão remover do produto "Moletom com capuz \"Na minha máquina funciona\""
    Then a mensagem "Produto removido do carrinho!" deve ser visível
    And o produto "Moletom com capuz \"Na minha máquina funciona\"" não deve estar no carrinho
    And o carrinho deve estar vazio após remoções

  @regressao @item-unico
  Scenario: Visualizar carrinho vazio
    When navego para a página do carrinho
    Then a mensagem "Seu carrinho está vazio." deve ser visível

  @regressao @item-unico
  Scenario: Adicionar quantidade maior que 1 do mesmo produto
    When defino a quantidade 4 para o produto "Moletom com capuz \"Se você acha que nada é impossível...\""
    And adiciono o produto "Moletom com capuz \"Se você acha que nada é impossível...\"" ao carrinho
    And navego para a página do carrinho
    Then o título do carrinho deve ser visível
    And o produto "Moletom com capuz \"Se você acha que nada é impossível...\"" deve estar no carrinho
    And o total dos produtos deve ser 236.00
    And a taxa de envio deve ser 19.90
    And o total com envio deve ser 255.90
