Feature: Carrinho de Compras
  Como um cliente
  Quero adicionar itens e finalizar compras
  Para realizar pedidos com sucesso

  Background:
    Dado que eu acesso a página inicial
    E adiciono um moletom ao carrinho

  @regressao @fumo @item-unico
  Scenario: Adicionar item único ao carrinho e finalizar compra com êxito
    Quando eu preencho os dados de checkout com informações válidas
    E seleciono pagamento PIX
    E aceito os termos de uso
    E clico em "Finalizar Pedido"
    Então vejo a mensagem de confirmação "Obrigado pelo seu pedido Lucas"

  @regressao @error-checkout
  Scenario: Validar erro para CEP com menos de 8 dígitos e email inválido
    Quando eu preencho os dados de checkout com CEP "1234567" e email "teste.com"
    E aceito os termos de uso
    E clico em "Finalizar Pedido"
    Então vejo o erro "O CEP deve ter 8 caracteres"
    E vejo o erro "Por favor, insira um email válido"

  @regressao @error-messages
  Scenario: Validar mensagens de erro em campos obrigatórios
    Quando eu clico em "Finalizar Pedido" sem preencher campos
    Então vejo o erro "Por favor, preencha todos os campos obrigatório marcados com asteriscos"
