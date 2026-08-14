// -- exercício 1
const listaDePedidos = [];

function adicionarPedido() {
  const precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value);
  const codigo = document.getElementById("codigo").value.trim;
  const regiao = parseInt(document.getElementById("regiao").value);
  const distancia = parseFloat(document.getElementById("distancia").value);
  const qtdPecas = parseInt(document.getElementById("qtdPecas").value);
  const temRastreamento = document.getElementById("temRastreamento").checked;

  if (isNaN(precoCombustivel) || precoCombustivel <= 0) {
    alert("Informe um preço de combustível válido!");
    return;
  }

  const codigosExistentes = listaDePedidos.map(p => p.codigo);
  if (!codigo || codigosExistentes.includes(codigo)) {
    alert("Código inválido ou já cadastrado!");
    return;
  }

  if (isNaN(distancia) || distancia <= 0) {
    alert("Distância inválida!");
    return;
  }

  if (isNaN(qtdPecas) || qtdPecas <= 0) {
    alert("Quantidade de peças inválida!");
    return;
  }

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

  listaDePedidos.push({ codigo, regiao, valorTotal });

  alert(`Pedido ${codigo} adicionado com sucesso!`);

  document.getElementById("formPedido").reset();
}

function gerarRelatorio() {
  if (listaDePedidos.length === 0) {
    alert("Nenhum pedido foi cadastrado!");
    return;
  }

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

  const divResultado = document.getElementById("resultado");
  divResultado.innerHTML = `
    <h3>RELATÓRIO FINAL</h3>
    <p><strong>Número Total de Pedidos:</strong> ${listaDePedidos.length}</p>
    <p><strong>Valor Médio por Pedido:</strong> R$ ${valorMedio.toFixed(2)}</p>
    <h4>Valor Total Acumulado por Região:</h4>
    <ul>
      <li>Sudeste (Região 1): R$ ${totalRegiao1.toFixed(2)}</li>
      <li>Sul (Região 2): R$ ${totalRegiao2.toFixed(2)}</li>
      <li>Centro-Oeste (Região 3): R$ ${totalRegiao3.toFixed(2)}</li>
    </ul>
    <p><strong>Pedido Mais Caro:</strong> ${pedidoMaisCaro.codigo} (R$ ${pedidoMaisCaro.valorTotal.toFixed(2)})</p>
    <p><strong>Pedido Mais Barato:</strong> ${pedidoMaisBarato.codigo} (R$ ${pedidoMaisBarato.valorTotal.toFixed(2)})</p>
  `;
}

// ---------------------------------

// -- exercício 2
const listaDeFuncionario = []

function cadastrarFuncionario(){
  const codigoFuncionario = document.getElementById("codigoFuncionario").value.trim;
  const horasTrabalhas  = parseFloat(document.getElementById("horasTrabalhadas").value);
  const categoriaFuncionario = parseInt(document.getElementById("categoriaFuncionario").value);
  const turnoTrabalho = parseInt(document.getElementById("turnoTrabalho").value);
  const avaliacaoGeral = parseInt(document.getElementById("avaliacaoGeral").value);

  const codigosFunExistentes = listaDeFuncionario.map(p => p.codigoFuncionario);
  if (!codigoFuncionario || codigosFunExistentes.includes(codigoFuncionario)) {
    alert("Código do funcionário inválido ou já cadastrado!");
    return;
  }

  if (isNaN(categoriaFuncionario) || categoriaFuncionario < 0 || categoriaFuncionario > 10) {
    alert("Avaliação de desempenho mensal do funcionário inválida!");
    return;
  }
}