// -- Exercício 1 – Frete com múltiplos pedidos e relatório final
const listaDePedidos = [];

function adicionarPedido() {
  // entrada
  const precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value);
  const codigo = document.getElementById("codigo").value.trim();
  const regiao = parseInt(document.getElementById("regiao").value);
  const distancia = parseFloat(document.getElementById("distancia").value);
  const qtdPecas = parseInt(document.getElementById("qtdPecas").value);
  const temRastreamento = document.getElementById("temRastreamento").checked;

  // validação
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

  //cálculo
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

  const divResultado = document.getElementById("resultadoFrete");
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

// --------------------------------------------------------------------------------------------

// -- Exercício 2 – Sistema Avançado de Folha de Pagamento com Bônus de Desempenho e Relatório Mensal
const listaDeFuncionario = [];

function cadastrarFuncionario() {
  // entrada
  const salarioMinimo = parseFloat(document.getElementById("salarioMinimo").value);
  const codigoFuncionario = document.getElementById("codigoFuncionario").value.trim();
  const horasTrabalhadas = parseFloat(document.getElementById("horasTrabalhadas").value);
  const categoriaFuncionario = document.getElementById("categoriaFuncionario").value;
  const turnoTrabalho = document.getElementById("turnoTrabalho").value;
  const avaliacaoGeral = parseFloat(document.getElementById("avaliacaoGeral").value);

  // validação
  if (isNaN(salarioMinimo) || salarioMinimo <= 0) {
    alert("Informe um valor válido para o salário mínimo!");
    return;
  }

  const codigosFunExistentes = listaDeFuncionario.map(p => p.codigoFuncionario);
  if (!codigoFuncionario || codigosFunExistentes.includes(codigoFuncionario)) {
    alert("Código do funcionário inválido ou já cadastrado!");
    return;
  }

  if (isNaN(horasTrabalhadas) || horasTrabalhadas <= 0) {
    alert("Informe uma quantidade de horas trabalhadas válida!");
    return;
  }

  if (isNaN(avaliacaoGeral) || avaliacaoGeral < 0 || avaliacaoGeral > 10) {
    alert("A avaliação de desempenho deve ser uma nota entre 0 e 10!");
    return;
  }

  // cálculo
  let percentualHora = 0;

  if (categoriaFuncionario === 'F'){
    if(turnoTrabalho === 'M') percentualHora = 0.10;
    else if (turnoTrabalho === 'V') percentualHora = 0.15;
    else if (turnoTrabalho === 'N') percentualHora = 0.20;
  }
  else if (categoriaFuncionario === 'G'){
    if (turnoTrabalho === 'M') percentualHora = 0.30;
    else if (turnoTrabalho === 'V') percentualHora = 0.35;
    else if (turnoTrabalho === 'N') percentualHora = 0.40;
  }

  const valorHora = salarioMinimo * percentualHora;
  const salarioInicial = horasTrabalhadas * valorHora;

  let percentualAuxilio = 0;

  if (salarioInicial <= 800) {
    percentualAuxilio = 0.25;
  } else if (salarioInicial <= 1200) {
    percentualAuxilio = 0.20;
  } else {
    percentualAuxilio = 0.15;
  }

  const auxilioAlimentacao = salarioInicial * percentualAuxilio;

  let percentualBonus = 0;
  let tipoBonus = "";

  if (avaliacaoGeral >= 9){
    percentualBonus = 0.10;
    tipoBonus = "10%";
  } else if (avaliacaoGeral >= 7){
    percentualBonus = 0.05;
    tipoBonus = "5%";
  } else if (avaliacaoGeral >= 5){
    percentualBonus = 0.02;
    tipoBonus = "2%";
  } else {
    percentualBonus = 0;
    tipoBonus = "Nenhum";
  }

  const bonusDesempenho = salarioInicial * percentualBonus;
  const salarioFinal = salarioInicial + auxilioAlimentacao + bonusDesempenho;

  listaDeFuncionario.push({
    codigoFuncionario,
    categoriaFuncionario,
    turnoTrabalho,
    salarioFinal,
    tipoBonus
  });

  alert(`Funcionário ${codigoFuncionario} cadastrado com sucesso!`);

  document.getElementById("formFormulario").reset();
}

function gerarRelatoriofuncionario(){
  if (listaDeFuncionario.length === 0){
    alert("Nenhum funcionário foi cadastrado!");
    return;
  }

  let somaSalarioGeral = 0;

  let somaSalarioOperacional = 0;
  let qtdOperacional = 0;

  let somaSalarioGerente = 0;
  let qtdGerente = 0;

  let qtdBonus10 = 0;
  let qtdBonus5 = 0;
  let qtdBonus2 = 0;
  let qtdSemBonus = 0;

  let maiorSalario = listaDeFuncionario[0];
  let menorSalario = listaDeFuncionario[0];

  for (const f of listaDeFuncionario){
    somaSalarioGeral += f.salarioFinal;

    if(f.categoriaFuncionario === "F"){
      somaSalarioOperacional += f.salarioFinal;
      qtdOperacional++;
    } else if (f.categoriaFuncionario === "G"){
      somaSalarioGerente += f.salarioFinal;
      qtdGerente++;
    }

    if (f.tipoBonus === "10%") qtdBonus10++;
    else if (f.tipoBonus === "5%") qtdBonus5++;
    else if (f.tipoBonus === "2%") qtdBonus2++;
    else if (f.tipoBonus === "Nenhum") qtdSemBonus++;

    if (f.salarioFinal > maiorSalario.salarioFinal){
      maiorSalario = f;
    }

    if (f.salarioFinal < menorSalario.salarioFinal){
      menorSalario = f;
    }
  }
  
  const mediaGeral = somaSalarioGeral / listaDeFuncionario.length;
  const mediaOperacional = qtdOperacional > 0 ? (somaSalarioOperacional / qtdOperacional) : 0;
  const mediaGerente = qtdGerente > 0 ? (somaSalarioGerente / qtdGerente) : 0;
  
  const divResultado = document.getElementById("resultadoFuncionario");
  divResultado.innerHTML = `
    <h3>RELATÓRIO MENSAL DA FOLHA DE PAGAMENTO</h3>
    <p><strong>Total de funcionários cadastrados:</strong> ${listaDeFuncionario.length}</p>
    <p><strong>Média salarial geral:</strong> R$ ${mediaGeral.toFixed(2)}</p>
    
    <h4>Média Salarial por Categoria:</h4>
    <ul>
      <li><strong>Operacionais (F):</strong> R$ ${mediaOperacional.toFixed(2)}</li>
      <li><strong>Gerentes (G):</strong> R$ ${mediaGerente.toFixed(2)}</li>
    </ul>

    <h4>Distribuição de Bônus de Desempenho:</h4>
    <ul>
      <li><strong>Bônus de 10%:</strong> ${qtdBonus10} funcionário(s)</li>
      <li><strong>Bônus de 5%:</strong> ${qtdBonus5} funcionário(s)</li>
      <li><strong>Bônus de 2%:</strong> ${qtdBonus2} funcionário(s)</li>
      <li><strong>Sem bônus:</strong> ${qtdSemBonus} funcionário(s)</li>
    </ul>

    <h4>Salários</h4>
    <p><strong>Maior Salário:</strong> Código ${maiorSalario.codigoFuncionario} | Categoria: ${maiorSalario.categoriaFuncionario} | Turno: ${maiorSalario.turnoTrabalho} | Valor: R$ ${maiorSalario.salarioFinal.toFixed(2)}</p>
    <p><strong>Menor Salário:</strong> Código ${menorSalario.codigoFuncionario} | Categoria: ${menorSalario.categoriaFuncionario} | Turno: ${menorSalario.turnoTrabalho} | Valor: R$ ${menorSalario.salarioFinal.toFixed(2)}</p>
  `;
}
