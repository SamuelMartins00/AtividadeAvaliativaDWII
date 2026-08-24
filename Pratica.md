**Exercício 1 -- Frete com múltiplos pedidos e relatório final**

Uma empresa metalmecânica precisa automatizar ainda mais o cálculo do
frete para melhorar sua logística. Amplie o exercício original criando
uma aplicação robusta em JavaScript com as seguintes características
adicionais:

**Requisitos adicionais:**

-   Permitir ao usuário inserir quantos pedidos desejar, usando um loop
    controlado por um menu.

-   Para cada pedido, o usuário deve inserir:

    -   Código do pedido (único, validado pelo sistema)

    -   Região (validar com switch-case e loop while para garantir
        entradas válidas):

        -   Região 1 (Sudeste): R\$ 1,20 por peça

        -   Região 2 (Sul): R\$ 1,30 por peça

        -   Região 3 (Centro-Oeste): R\$ 1,50 por peça

    -   Distância em km.

    -   Quantidade de peças.

    -   Se deseja ou não rastreamento (R\$ 200 fixos).

-   Aplicar desconto de 12% nas peças excedentes acima de 1.000
    unidades.

-   Valor fixo por quilômetro: considere que cada quilômetro custa o
    equivalente a 1 litro de combustível. O preço do litro de
    combustível deverá ser solicitado ao usuário no início da aplicação.

**Ao final, o sistema deve gerar um relatório contendo:**

-   O número total de pedidos realizados.

-   Valor médio pago por pedido.

-   Valor total acumulado em cada região.

-   Código e valor total pago pelo pedido mais caro.

-   Código e valor total pago pelo pedido mais barato.

**Exercício 2 -- Sistema Avançado de Folha de Pagamento com Bônus de
Desempenho e Relatório Mensal**

Uma rede hoteleira deseja aprimorar ainda mais sua folha de pagamento
mensal, incluindo agora bônus por desempenho baseado em avaliações
internas. Crie um sistema robusto em JavaScript para calcular e
gerenciar a folha salarial de vários funcionários, considerando bônus e
diferentes cenários.

**Requisitos:**

-   O programa deve permitir cadastrar múltiplos funcionários até que o
    usuário decida parar.

-   Para cada funcionário cadastrado, o usuário deve inserir as
    seguintes informações:

    -   Código do funcionário (não pode ser repetido, o sistema deve
        validar isso).

    -   Horas trabalhadas no mês.

    -   Categoria:

        -   Funcionário operacional (F)

        -   Gerente (G)

    -   Turno de trabalho:

        -   Matutino (M)

        -   Vespertino (V)

        -   Noturno (N)

    -   Avaliação de desempenho mensal do funcionário (nota de 0 a 10,
        sendo obrigatória a validação).

-   **Valor da Hora Trabalhada** (em % do salário mínimo):

    -   Funcionário operacional (F):

        -   M: 10%

        -   V: 15%

        -   N: 20%

    -   Gerente (G):

        -   M: 30%

        -   V: 35%

        -   N: 40%

-   **Auxílio-Alimentação** (calculado sobre o salário inicial):

    -   Até R\$ 800,00 → 25%

    -   De R\$ 800,01 até R\$ 1200,00 → 20%

    -   Acima de R\$ 1200,00 → 15%

-   **Cálculo do Bônus por desempenho:**

    -   Nota 9 a 10 → bônus de 10% sobre o salário inicial

    -   Nota 7 a 8,99 → bônus de 5% sobre o salário inicial

    -   Nota 5 a 6,99 → bônus de 2% sobre o salário inicial

    -   Nota abaixo de 5 → sem bônus

-   O usuário deve informar o valor atual do salário mínimo no início do
    programa.

**O salário final será calculado da seguinte forma:**

Salário Final = Salário Inicial + Auxílio-Alimentação + Bônus de
desempenho

**Ao finalizar o cadastro, o sistema deverá exibir um relatório
detalhado contendo:**

-   Quantidade total de funcionários cadastrados.

-   Média salarial geral dos funcionários cadastrados (salário final).

-   Média salarial por categoria (Funcionários e Gerentes).

-   Maior e menor salário final, exibindo código, categoria, turno e
    valor recebido.

-   Quantidade de funcionários que receberam cada faixa de bônus (10%,
    5%, 2% e nenhum bônus).

**Exercício 3 - Sistema de Controle de Produção com Estoque e
Relatórios**

**Contexto**

Uma indústria de peças automotivas quer controlar melhor sua produção e
estoque diário.

**Desafio**

Crie um sistema em JavaScript para gerenciar múltiplas ordens de
produção e gerar relatórios consolidados.

**Requisitos do sistema**

• Permitir cadastrar ordens de produção em loop até o usuário decidir
parar (menu).

• Para cada ordem, solicitar:

o Código da ordem (único, validado).

o Código do produto.

o Tipo de produto (1--Padrão, 2--Premium, 3--Sob encomenda), validado
com switch + while.

o Quantidade produzida.

o Custo unitário de produção.

o Estoque inicial do produto.

**Regras de negócio**

• Atualizar estoque final: estoque_final = estoque_inicial +
quantidade_produzida.

• Ajuste de custo unitário:

o Padrão: custo base.

o Premium: +10% sobre custo base.

o Sob encomenda: +20% sobre custo base.

• Alertas de estoque:

o Estoque \> 5000 → alerta de estoque alto.

o Estoque \< 500 → alerta de estoque crítico.

• Calcular custo total da ordem:

custo_total = quantidade_produzida \* custo_unitario_ajustado.

**Relatório final**

• Total de ordens registradas.

• Estoque total final por tipo de produto.

• Média de custo total por ordem.

• Ordem com maior custo total (código e valor).

• Ordem com menor custo total (código e valor).

• Quantidade de ordens com alerta de estoque alto e crítico.

• Para cada produto (por código):

o Estoque final consolidado.

o Valor total investido.

**Exercício 04 - Sistema de Reservas de Hotel com Tarifas Dinâmicas**

**Contexto**\
Uma rede hoteleira quer controlar reservas usando **tarifação dinâmica**
por tipo de quarto e temporada.

**Desafio**\
Crie um sistema em JavaScript para gerenciar reservas e gerar
estatísticas de ocupação e faturamento.

**Configuração inicial**

-   Solicitar o **valor base da diária padrão**.

-   Solicitar **valor do café da manhã por hóspede/dia**.

**Cadastro de reservas**\
Em loop, até o usuário escolher sair:

-   Código da reserva (único, validado).

-   Tipo de quarto (S--Standard, L--Luxo, P--Premium).

-   Temporada (B--Baixa, A--Alta, F--Feriado).

-   Quantidade de diárias.

-   Número de hóspedes.

-   Café da manhã incluso (S/N).

**Regras de preços**

-   Multiplicador por tipo de quarto:

    -   Standard: 100% da base.

    -   Luxo: 150% da base.

    -   Premium: 200% da base.

-   Ajuste por temporada:

    -   Baixa: sem acréscimo.

    -   Alta: +25% sobre a diária ajustada.

    -   Feriado: +40% sobre a diária ajustada.

-   Café da manhã:\
    `cafe_total`` = ``valorCafe`` * hospedes * ``diarias`.

-   Valor total da reserva:\
    `valor_total`` = (``valor_diaria_final`` * ``diarias``) + ``cafe_total`.

**Relatório final**

-   Total de reservas cadastradas.

-   Valor médio por reserva.

-   Valor total por tipo de quarto (S, L, P).

-   Valor total por temporada (B, A, F).

-   Reserva mais cara (código, tipo, temporada, hóspedes, valor).

-   Reserva mais barata (código, tipo, temporada, hóspedes, valor).

-   Quantidade de reservas com café incluso e sem café.

-   Ocupação total (soma de diárias × hóspedes) e valor médio por
    hóspede.

**Exercício 5 - Sistema de Treinos Esportivos com Carga e Risco de
Lesão**

**Contexto**\
Um clube de futebol quer controlar os treinos dos atletas e monitorar
risco de sobrecarga.

**Desafio**\
Crie um sistema em JavaScript para gerenciar **treinos semanais** de
vários jogadores e identificar risco de lesão.

**Configuração inicial**

-   Solicitar **carga máxima semanal recomendada** (em pontos).

**Cadastro de treinos**\
Em loop, até o usuário decidir parar:

-   Código do treino (único).

-   Nome do jogador.

-   Posição (G--Goleiro, Z--Zagueiro, M--Meio-campo, A--Atacante).

-   Tipo de treino (F--Físico, T--Técnico, E--Estratégico).

-   Duração em minutos.

-   Intensidade de 1 a 10 (validar com `while`).

**Cálculo da carga**

-   Multiplicador por tipo:

    -   Físico: 1.5

    -   Técnico: 1.2

    -   Estratégico: 1.0

-   Fórmula:\
    `carga = (``duracao_min`` / 10) * intensidade * multiplicador`.

-   Acumular carga por jogador.

-   Se carga semanal de um jogador \> carga máxima recomendada → marcar
    **risco de lesão**.

**Relatório final**

-   Total de treinos cadastrados.

-   Lista de jogadores com:

    -   Carga semanal total.

    -   Quantidade de treinos.

-   Jogador com maior carga semanal (nome, posição, nº de treinos).

-   Jogador com menor carga semanal.

-   Quantidade de jogadores com risco de lesão.

-   Carga média por tipo de treino (F, T, E).

-   Para cada posição:

    -   Total de treinos.

    -   Carga média.

**Exercício 6 - Sistema de Vendas com Comissões, Metas e Performance**

**Contexto**\
Uma rede de lojas quer controlar as vendas dos seus vendedores, com
comissões e análise de metas.

**Desafio**\
Crie um sistema em JavaScript para registrar vendas, calcular comissões
e gerar um relatório de performance por vendedor e região.

**Configuração inicial**

-   Solicitar meta mensal de vendas por vendedor (R\$).

-   Solicitar percentual base de comissão (ex.: 5%).

**Cadastro de vendas**\
Em loop, até o usuário decidir sair:

-   Código da venda (único).

-   Código do vendedor.

-   Região da loja (1--Norte, 2--Nordeste, 3--Sudeste, 4--Sul).

-   Valor da venda.

-   Tipo de cliente (PF--Pessoa Física, PJ--Pessoa Jurídica).

**Regras de comissão**

-   Comissão base: `valor_venda`` * ``percentual_base`.

-   Bônus por tipo de cliente:

    -   PF: +2% do valor da venda.

    -   PJ: +3% do valor da venda.

-   Bônus por região:

    -   Norte/Nordeste: +1%.

    -   Sudeste: 0%.

    -   Sul: +0,5%.

-   Comissão total da venda = base + bônus tipo de cliente + bônus
    região.

-   Acumular por vendedor:

    -   Valor total vendido.

    -   Comissão total acumulada.

**Relatório final**

-   Total de vendas registradas.

-   Valor total vendido por região.

-   Valor total vendido por tipo de cliente (PF, PJ).

-   Vendedor com maior valor total de vendas.

-   Vendedor com maior comissão total.

-   Quantidade de vendedores que bateram a meta.

-   Comissão média geral.

-   Comissão média por região.