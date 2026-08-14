// --- MÓDULO 1: Variáveis Globais ---
const precoCombustivel = parseFloat(prompt("Digite o preço do litro de combustível (R$):"));

const listaDePedidos = [];
let continuar = true;

// --- MÓDULO 4: Loop Principal para múltiplos pedidos ---
do {
  // MÓDULO 2: Coleta e Validações
  let codigo = prompt("Digite o código do pedido:");
  
  // Validação de código único e não vazio
  const codigosExistentes = listaDePedidos.map(p => p.codigo);
  while (!codigo || codigosExistentes.includes(codigo)) {
    codigo = prompt("Código inválido ou já cadastrado! Digite outro:");
  }

  let regiao = parseInt(prompt("Selecione a Região:\n1 - Sudeste\n2 - Sul\n3 - Centro-Oeste"));
  while (regiao !== 1 && regiao !== 2 && regiao !== 3) {
    regiao = parseInt(prompt("Região inválida! Opções: 1, 2 ou 3:"));
  }

  let distancia = parseFloat(prompt("Digite a distância (km):"));
  while (isNaN(distancia) || distancia <= 0) {
    distancia = parseFloat(prompt("Distância inválida! Digite um valor positivo:"));
  }

  let qtdPecas = parseInt(prompt("Digite a quantidade de peças:"));
  while (isNaN(qtdPecas) || qtdPecas <= 0) {
    qtdPecas = parseInt(prompt("Quantidade inválida! Digite um valor positivo:"));
  }

  let temRastreamento = prompt("Deseja rastreamento? (S/N)").toUpperCase() === "S";

  // MÓDULO 3: Cálculos e Regras de Negócio
  let valorPorPeca = 0;
  switch (regiao) {
    case 1: valorPorPeca = 1.20; break;
    case 2: valorPorPeca = 1.30; break;
    case 3: valorPorPeca = 1.50; break;
  }

  const custoDistancia = distancia * precoCombustivel;
  let custoPecas = 0;

  if (qtdPecas <= 1000) {
    custoPecas = qtdPecas * valorPorPeca;
  } else {
    custoPecas = (1000 * valorPorPeca) + ((qtdPecas - 1000) * (valorPorPeca * 0.88));
  }

  const taxaRastreamento = temRastreamento ? 200 : 0;
  const valorTotal = custoDistancia + custoPecas + taxaRastreamento;

  // Salva no Array de Objetos
  listaDePedidos.push({
    codigo,
    regiao,
    valorTotal
  });

  continuar = prompt("Deseja cadastrar outro pedido? (S/N)").toUpperCase() === "S";

} while (continuar);

// --- MÓDULO 5: Processamento dos Dados ---
let somaTotal = 0;
let totalRegiao1 = 0;
let totalRegiao2 = 0;
let totalRegiao3 = 0;

let pedidoMaisCaro = listaDePedidos[0];
let pedidoMaisBarato = listaDePedidos[0];

for (const p of listaDePedidos) {
  somaTotal += p.valorTotal;

  if (p.regiao === 1) totalRegiao1 += p.valorTotal;
  if (p.regiao === 2) totalRegiao2 += p.valorTotal;
  if (p.regiao === 3) totalRegiao3 += p.valorTotal;

  if (p.valorTotal > pedidoMaisCaro.valorTotal) pedidoMaisCaro = p;
  if (p.valorTotal < pedidoMaisBarato.valorTotal) pedidoMaisBarato = p;
}

const valorMedio = somaTotal / listaDePedidos.length;

// --- MÓDULO 6: Relatório Final ---
console.log("RELATÓRIO FINAL");
console.log(`Número Total de Pedidos: ${listaDePedidos.length}`);
console.log(`Valor Médio por Pedido: R$ ${valorMedio.toFixed(2)}`);
console.log(`Valor Total Acumulado por Região:`);
console.log(`Sudeste (Região 1): R$ ${totalRegiao1.toFixed(2)}`);
console.log(`Sul (Região 2): R$ ${totalRegiao2.toFixed(2)}`);
console.log(`Centro-Oeste (Região 3): R$ ${totalRegiao3.toFixed(2)}`);
console.log(`Pedido Mais Caro: ${pedidoMaisCaro.codigo} (R$ ${pedidoMaisCaro.valorTotal.toFixed(2)})`);
console.log(`Pedido Mais Barato: ${pedidoMaisBarato.codigo} (R$ ${pedidoMaisBarato.valorTotal.toFixed(2)})`);