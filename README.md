# Atividade Avaliativa DW2

Projeto acadêmico da disciplina de Desenvolvimento Web II, com 6 exercícios de JavaScript puro (sem frameworks) que simulam sistemas de cadastro e geração de relatórios para diferentes contextos de negócio. Cada exercício possui seu próprio formulário de entrada e sua própria área de relatório, todos na mesma página (`index.html`).

## Estrutura do projeto

```
├── 📝 Pratica.md
├── 📝 README.md
├── 🌐 index.html  # Estrutura e formulários dos 6 exercícios
└── 📄 script.js # Lógica de cadastro, cálculo e geração de relatórios
```

## Como executar

Acesse este projeto [clicando aqui]( "https://samuelmartins00.github.io/AtividadeAvaliativaDWII/")

## Exercícios

### 1 — Frete com múltiplos pedidos e relatório final

Cadastro de pedidos para uma empresa metalmecânica, com cálculo de frete por região.

- Preço do combustível informado no início; cada km custa o equivalente a 1 litro.
- Preço por peça conforme a região: Sudeste R$ 1,20 · Sul R$ 1,30 · Centro-Oeste R$ 1,50.
- Desconto de 12% nas peças excedentes acima de 1.000 unidades.
- Rastreamento opcional (R$ 200 fixos).
- Relatório: total de pedidos, valor médio, total acumulado por região, pedido mais caro e mais barato.

### 2 — Folha de pagamento com bônus de desempenho

Cadastro de funcionários de uma rede hoteleira, com cálculo de salário incluindo bônus por avaliação.

- Valor da hora trabalhada como % do salário mínimo, variando por categoria (Operacional/Gerente) e turno (Matutino/Vespertino/Noturno).
- Auxílio-alimentação em faixas percentuais sobre o salário inicial.
- Bônus por desempenho conforme a avaliação (0 a 10): 10%, 5%, 2% ou nenhum.
- Salário final = salário inicial + auxílio-alimentação + bônus.
- Relatório: total de funcionários, médias salariais (geral e por categoria), maior/menor salário e distribuição de bônus.

### 3 — Controle de produção com estoque

Gestão de ordens de produção para uma indústria de peças automotivas.

- Tipos de produto (Padrão, Premium, Sob encomenda) com ajuste percentual sobre o custo unitário base.
- Estoque final = estoque inicial + quantidade produzida, com alertas de estoque alto (> 5000) e crítico (< 500).
- Custo total da ordem = quantidade × custo unitário ajustado.
- Relatório: total de ordens, estoque final por tipo, custo médio, ordem mais cara/mais barata, alertas e consolidado por produto.

### 4 — Reservas de hotel com tarifas dinâmicas

Sistema de reservas com tarifação por tipo de quarto e temporada.

- Multiplicador por tipo de quarto: Standard 100% · Luxo 150% · Premium 200% da diária base.
- Ajuste por temporada: Baixa sem acréscimo · Alta +25% · Feriado +40%.
- Café da manhã opcional, cobrado por hóspede/dia.
- Relatório: total de reservas, valor médio, totais por tipo de quarto e por temporada, reserva mais cara/mais barata, ocupação total e valor médio por hóspede.

### 5 — Treinos esportivos com carga e risco de lesão

Monitoramento de treinos semanais de um clube de futebol.

- Carga do treino = (duração em minutos ÷ 10) × intensidade × multiplicador do tipo de treino (Físico 1.5 · Técnico 1.2 · Estratégico 1.0).
- Acúmulo de carga por jogador, com sinalização de risco de lesão quando a carga semanal excede o limite recomendado.
- Relatório: total de treinos, carga por jogador, maior/menor carga semanal, jogadores em risco, carga média por tipo de treino e por posição.

### 6 — Vendas com comissões, metas e performance

Registro de vendas com cálculo de comissão para uma rede de lojas.

- Comissão base sobre o valor da venda, com bônus adicional por tipo de cliente (PF +2% / PJ +3%) e por região (Norte/Nordeste +1% · Sudeste 0% · Sul +0,5%).
- Acúmulo de valor vendido e comissão por vendedor.
- Relatório: total de vendas, valores por região e tipo de cliente, vendedor com maior venda/comissão, vendedores que bateram a meta e comissões médias.

## Tecnologias

- HTML5 semântico
- Tailwind (estilização por classes)
- JavaScript puro (vanilla, sem bibliotecas externas)

## Autor

Samuel Martins
