// -- Exercício 1 – Frete com múltiplos pedidos e relatório final
const listaDePedidos = [];

function adicionarPedido() {
  // entrada
  const precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value);
  const codigo = parseInt(document.getElementById("codigo").value);
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
// --------------------------------------------------------------------------------------------
// Exercício 3 – Sistema de Controle de Produção com Estoque e Relatórios
const listaDeProdutos = [];

function cadastrarOrdem() {
  // entrada
  const codigoOrdem = parseInt(document.getElementById("codigoOrdem").value);
  const codigoProduto = parseInt(document.getElementById("codigoProduto").value);
  const tipoProduto = parseInt(document.getElementById("tipoProduto").value); 
  const qtdproduzida = parseInt(document.getElementById("qtdproduzida").value);
  const custoUnitario = parseFloat(document.getElementById("custoUnitario").value);
  const estoqueInicial = parseInt(document.getElementById("estoqueInicial").value);

  // validação
  if (isNaN(codigoOrdem)) {
    alert("Código da ordem inválido!");
    return;
  }

  const ordensExistentes = listaDeProdutos.map(p => p.codigoOrdem);
  if (ordensExistentes.includes(codigoOrdem)) {
    alert("Código da ordem já cadastrado!");
    return;
  }

  // cálculo de estoque e alertas
  const estoqueFinal = estoqueInicial + qtdproduzida;
  let alertaAlto = false;
  let alertaCritico = false;

  if (estoqueFinal > 5000) {
    alert("Estoque está alto!");
    alertaAlto = true;
  } else if (estoqueFinal < 500) {
    alert("Estoque em estado crítico!");
    alertaCritico = true;
  }

  let custoUnitarioAjustado = custoUnitario;
  switch (tipoProduto) {
    case 1: 
      custoUnitarioAjustado = custoUnitario; 
      break;
    case 2: 
      custoUnitarioAjustado = custoUnitario + (custoUnitario * 0.10); 
      break;
    case 3: 
      custoUnitarioAjustado = custoUnitario + (custoUnitario * 0.20); 
      break;
    default:
      alert("Tipo de produto inválido! Use 1 (Padrão), 2 (Premium) ou 3 (Sob Encomenda).");
      return;
  }
  
  const custoTotal = qtdproduzida * custoUnitarioAjustado;

  listaDeProdutos.push({ 
    codigoOrdem, 
    codigoProduto, 
    tipoProduto, 
    custoUnitarioAjustado, 
    estoqueFinal,
    custoTotal,
    alertaAlto,
    alertaCritico
  });

  alert(`Ordem ${codigoOrdem} cadastrada com sucesso!`);

  document.getElementById("formOrdem").reset(); 
}

function gerarRelatorioOrdem() {
  if (listaDeProdutos.length === 0) {
    alert("Nenhuma ordem foi cadastrada!");
    return;
  }

  let estoquePadrao = 0;
  let estoquePremium = 0;
  let estoqueSobEncomenda = 0;

  let somaCustoTotal = 0;
  let qtdAlertaAlto = 0;
  let qtdAlertaCritico = 0;

  let ordemMaisCara = listaDeProdutos[0];
  let ordemMaisBarata = listaDeProdutos[0];

  const consolidadoProdutos = {};

  for (const p of listaDeProdutos) {
    if (p.tipoProduto === 1) estoquePadrao += p.estoqueFinal;
    else if (p.tipoProduto === 2) estoquePremium += p.estoqueFinal;
    else if (p.tipoProduto === 3) estoqueSobEncomenda += p.estoqueFinal;

    somaCustoTotal += p.custoTotal;

    if (p.custoTotal > ordemMaisCara.custoTotal) ordemMaisCara = p;
    if (p.custoTotal < ordemMaisBarata.custoTotal) ordemMaisBarata = p;

    if (p.alertaAlto) qtdAlertaAlto++;
    if (p.alertaCritico) qtdAlertaCritico++;

    if (!consolidadoProdutos[p.codigoProduto]) {
      consolidadoProdutos[p.codigoProduto] = { estoque: 0, valorInvestido: 0 };
    }

    consolidadoProdutos[p.codigoProduto].estoque += p.estoqueFinal;
    consolidadoProdutos[p.codigoProduto].valorInvestido += p.custoTotal;
  }

  const mediaCusto = somaCustoTotal / listaDeProdutos.length;

  let htmlProdutosConsolidados = "";
  for (const codProduto in consolidadoProdutos) {
    const dados = consolidadoProdutos[codProduto];
    htmlProdutosConsolidados += `<li><strong>Produto ${codProduto}:</strong> Estoque Final: ${dados.estoque} un. | Valor Investido: R$ ${dados.valorInvestido.toFixed(2)}</li>`;
  }

  const divResultado = document.getElementById("resultadoOrdem"); 
  divResultado.innerHTML = `
    <h3>RELATÓRIO FINAL - CONTROLE DE ESTOQUE</h3>
    <p><strong>Total de Ordens Registradas:</strong> ${listaDeProdutos.length}</p>
    <p><strong>Média de Custo Total por Ordem:</strong> R$ ${mediaCusto.toFixed(2)}</p>
    
    <h4>Estoque Total Final por Tipo de Produto:</h4>
    <ul>
      <li>Padrão (1): ${estoquePadrao} unidades</li>
      <li>Premium (2): ${estoquePremium} unidades</li>
      <li>Sob Encomenda (3): ${estoqueSobEncomenda} unidades</li>
    </ul>

    <h4>Alertas de Estoque:</h4>
    <ul>
      <li>Ordens com Estoque Alto (> 5000): ${qtdAlertaAlto}</li>
      <li>Ordens com Estoque Crítico (< 500): ${qtdAlertaCritico}</li>
    </ul>

    <h4>Extremos de Custo:</h4>
    <p><strong>Ordem Mais Cara:</strong> Código ${ordemMaisCara.codigoOrdem} (R$ ${ordemMaisCara.custoTotal.toFixed(2)})</p>
    <p><strong>Ordem Mais Barata:</strong> Código ${ordemMaisBarata.codigoOrdem} (R$ ${ordemMaisBarata.custoTotal.toFixed(2)})</p>

    <h4>Consolidação por Produto:</h4>
    <ul>
      ${htmlProdutosConsolidados}
    </ul>
  `;
}
// --------------------------------------------------------------------------------------------
// Exercício 04 - Sistema de Reservas de Hotel com Tarifas Dinâmicas
const listadeReservas = [];
function cadastrarReserva(){
  // entrada
  const valorBaseDiaria = parseFloat(document.getElementById("valorBaseDiaria").value);
  const valorBaseCafedaManha = parseFloat(document.getElementById("valorCafedaManha").value);
  const codigoReserva = parseInt(document.getElementById("codigoreserva").value);
  const tipoDeQuarto = parseInt(document.getElementById("tipoDeQuarto").value);
  const temporada = parseInt(document.getElementById("temporada").value);
  const qtdDiarias = parseInt(document.getElementById("qtdDiarias").value);
  const qtdHospedes = parseInt(document.getElementById("qtdHospedes").value);
  const temCafedaManhaincluso = document.getElementById("cafedaManhaInluso").checked;

  // validação
  const reservasExistentes = listadeReservas.map(p => p.codigoReserva);
  if (!codigoReserva || reservasExistentes.includes(codigoReserva)) {
    alert("Código de reserva inválido ou já cadastrado!");
    return;
  }

  // cálculo de multiplicador de quarto
  let valorBaseDiariaAjustada = 0;
  switch (tipoDeQuarto){
    case 1:
      valorBaseDiariaAjustada = valorBaseDiaria;
      break;
    case 2:
      valorBaseDiariaAjustada = valorBaseDiaria * 1.5;
      break;
    case 3:
      valorBaseDiariaAjustada = valorBaseDiaria * 2;
      break; 
  }

  // cálculo de multiplicador de temporada
  let acrescimoReserva = 0;
  switch (temporada){
    case 1:
      acrescimoReserva = 0;
      break;
    case 2:
      acrescimoReserva = valorBaseDiariaAjustada * 0.25;
      break;
    case 3:
      acrescimoReserva = valorBaseDiariaAjustada * 0.40;
      break;
  }
  
  const valorDiariaFinal = valorBaseDiariaAjustada + acrescimoReserva;
  const valorTotalCafedaManha = temCafedaManhaincluso ? (valorBaseCafedaManha * qtdHospedes * qtdDiarias) : 0;
  const valorTotalReserva = (valorDiariaFinal * qtdDiarias) + valorTotalCafedaManha;
    
  listadeReservas.push({
    codigoReserva,
    tipoDeQuarto,
    temporada,
    qtdDiarias,
    qtdHospedes,
    temCafedaManhaincluso,
    valorTotalReserva 
    });

  alert(`Reserva ${codigoReserva} cadastrada com sucesso!`);
  
  document.getElementById("formReserva").reset();
}

function gerarRelatorioReserva(){
  if (listadeReservas.length === 0){
    alert("Nenhuma reserva foi cadastrada!");
    return;
  }

  // Variáveis 
  let valorTotalTodasReservas = 0;
  let totalQuartoStandard = 0;
  let totalQuartoLuxo = 0;
  let totalQuartoPremium = 0;
  let temporadaBaixa = 0;
  let temporadaAlta = 0;
  let temporadaFeriado = 0;
  
  let reservaMaisCara = listadeReservas[0];
  let reservaMaisBarata = listadeReservas[0];
  
  let reservasComCafe = 0;
  let reservasSemCafe = 0;
  
  let ocupacaoTotal = 0; // (diárias × hóspedes)
  let totalHospedes = 0;

  
  for (let reserva of listadeReservas) {
    const valor = reserva.valorTotalReserva;
    valorTotalTodasReservas += valor;

    if (reserva.tipoDeQuarto === 1) totalQuartoStandard += valor;
    else if (reserva.tipoDeQuarto === 2) totalQuartoLuxo += valor;
    else if (reserva.tipoDeQuarto === 3) totalQuartoPremium += valor;

    if (reserva.temporada === 1) temporadaBaixa += valor;
    else if (reserva.temporada === 2) temporadaAlta += valor;
    else if (reserva.temporada === 3) temporadaFeriado += valor;

    if (reserva.temCafedaManhaincluso) reservasComCafe++;
    else reservasSemCafe++;

    ocupacaoTotal += (reserva.qtdDiarias * reserva.qtdHospedes);
    totalHospedes += reserva.qtdHospedes;

    if (valor > reservaMaisCara.valorTotalReserva) {
      reservaMaisCara = reserva;
    }
    if (valor < reservaMaisBarata.valorTotalReserva) {
      reservaMaisBarata = reserva;
    }
  }

  const valorMedioReserva = valorTotalTodasReservas / listadeReservas.length;
  const valorMedioHospede = totalHospedes > 0 ? (valorTotalTodasReservas / totalHospedes) : 0;

  const divResultado = document.getElementById("resultadoReserva"); 
  divResultado.innerHTML =`
    <h3>RELATÓRIO FINAL - SISTEMA DE RESERVAS</h3>
    <p><strong>Total de Reservas Registradas:</strong> ${listadeReservas.length}</p>
    <p><strong>Média de Valor por Reserva:</strong> R$ ${valorMedioReserva.toFixed(2)}</p>
    
    <h4>Faturamento por Tipo de Quarto:</h4>
    <ul>
      <li>Standard (1): R$ ${totalQuartoStandard.toFixed(2)}</li>
      <li>Luxo (2): R$ ${totalQuartoLuxo.toFixed(2)}</li>
      <li>Premium (3): R$ ${totalQuartoPremium.toFixed(2)}</li>
    </ul>

    <h4>Faturamento por Temporada:</h4>
    <ul>
      <li>Baixa (1): R$ ${temporadaBaixa.toFixed(2)}</li>
      <li>Alta (2): R$ ${temporadaAlta.toFixed(2)}</li>
      <li>Feriado (3): R$ ${temporadaFeriado.toFixed(2)}</li>
    </ul>

    <h4>Extremos de Faturamento:</h4>
    <p><strong>Reserva Mais Cara:</strong> Código ${reservaMaisCara.codigoReserva} (R$ ${reservaMaisCara.valorTotalReserva.toFixed(2)})</p>
    <p><strong>Reserva Mais Barata:</strong> Código ${reservaMaisBarata.codigoReserva} (R$ ${reservaMaisBarata.valorTotalReserva.toFixed(2)})</p>

    <h4>Estatísticas Adicionais:</h4>
    <ul>
      <li>Reservas com Café da Manhã Incluso: ${reservasComCafe}</li>
      <li>Reservas sem Café da Manhã: ${reservasSemCafe}</li>
      <li>Ocupação Total (diárias x hóspedes): ${ocupacaoTotal}</li>
      <li>Valor Médio por Hóspede: R$ ${valorMedioHospede.toFixed(2)}</li>
    </ul>
  `;
}

// --------------------------------------------------------------------------------------------
// Exercício 5 - Sistema de Treinos Esportivos com Carga e Risco de Lesão
const listaDeTreinos = [];
function cadastrarTreino() {
  // entrada
  const cargaMaximaSemanal = parseInt(document.getElementById("cargaMaximaSemanal").value);
  const codigoTreino = parseInt(document.getElementById("codigoTreino").value);
  const nomeJogador = document.getElementById("nomeJogador").value.trim();
  const posicaoJogador = parseInt(document.getElementById("posicaoJogador").value);
  const tipoTreino = parseInt(document.getElementById("tipoTreino").value);
  const duracaoMin = parseFloat(document.getElementById("duracaoMin").value);
  const intensidadeTreino = parseFloat(document.getElementById("intensidadeTreino").value);

  // validação
  const treinosExistentes = listaDeTreinos.map(p => p.codigoTreino);
  if (!codigoTreino || treinosExistentes.includes(codigoTreino)) {
    alert("Código de treino inválido ou já cadastrado!");
    return;
  }

  if (isNaN(cargaMaximaSemanal) || cargaMaximaSemanal <= 0) {
    alert("Informe um valor válido para a Carga Máxima Semanal");
    return;
  }

  if (intensidadeTreino < 1 || intensidadeTreino > 10) {
    alert("Intensidade de treino inválida! informe um valor entre 1 e 10");
    return;
  }

  let nomePosicao = "";
  switch (posicaoJogador) {
    case 1: 
      nomePosicao = "Goleiro"; 
      break;
    case 2: 
      nomePosicao = "Zagueiro"; 
      break;
    case 3: 
      nomePosicao = "Meio-campo";   
      break;
    case 4: 
      nomePosicao = "Atacante";
      break;
  }

  // cálculo da carga
  let multiplicadorTipo = 0; 
  switch (tipoTreino) {
    case 1: 
      multiplicadorTipo = 1.5; 
      break; 
    case 2: 
      multiplicadorTipo = 1.2; 
      break; 
    case 3: 
      multiplicadorTipo = 1;
      break;  
  }

  let cargaDoTreino = (duracaoMin / 10) * intensidadeTreino * multiplicadorTipo;

  listaDeTreinos.push({
    codigoTreino,
    nomeJogador,
    posicaoJogador: nomePosicao,
    tipoTreino,
    duracaoMin,
    intensidadeTreino,
    cargaDoTreino
  });

  alert(`Treino ${codigoTreino} cadastrado com sucesso! Jogador: ${nomeJogador}`);
  
  document.getElementById("formTreinos").reset();
}

function gerarRelatorioTreinos() {
  if (listaDeTreinos.length === 0) {
    alert("Nenhum treino foi cadastrado!");
    return;
  }

  const cargaMaximaSemanal = parseInt(document.getElementById("cargaMaximaSemanal").value);

  let cargaFisico = 0;
  let qtdFisico = 0;
  let cargaTecnico = 0; 
  let qtdTecnico = 0;
  let cargaEstrategico = 0;
  let qtdEstrategico = 0;

  let cargaGoleiro = 0;
  let qtdGoleiro = 0;
  let cargaZagueiro = 0;
  let qtdZagueiro = 0;
  let cargaMeioCampo = 0;
  let qtdMeioCampo = 0;
  let cargaAtacante = 0;
  let qtdAtacante = 0;

  let resumoJogadores = {};

  for (let treino of listaDeTreinos) {
    const nome = treino.nomeJogador;
    if (!resumoJogadores[nome]) {
      resumoJogadores[nome] = { cargaTotal: 0, qtdTreinos: 0, posicao: treino.posicaoJogador };
    }
    resumoJogadores[nome].cargaTotal += treino.cargaDoTreino;
    resumoJogadores[nome].qtdTreinos++;

    if (treino.tipoTreino === 1) { cargaFisico += treino.cargaDoTreino; qtdFisico++; }
    else if (treino.tipoTreino === 2) { cargaTecnico += treino.cargaDoTreino; qtdTecnico++; }
    else if (treino.tipoTreino === 3) { cargaEstrategico += treino.cargaDoTreino; qtdEstrategico++; }

    if (treino.posicaoJogador === "Goleiro") { cargaGoleiro += treino.cargaDoTreino; qtdGoleiro++; }
    else if (treino.posicaoJogador === "Zagueiro") { cargaZagueiro += treino.cargaDoTreino; qtdZagueiro++; }
    else if (treino.posicaoJogador === "Meio-campo") { cargaMeioCampo += treino.cargaDoTreino; qtdMeioCampo++; }
    else if (treino.posicaoJogador === "Atacante") { cargaAtacante += treino.cargaDoTreino; qtdAtacante++; }
  }

  const nomesDosJogadores = Object.keys(resumoJogadores);
  const primeiroNome = nomesDosJogadores[0];

  let nomeMaiorCarga = primeiroNome;
  let maiorCarga = resumoJogadores[primeiroNome].cargaTotal;
  
  let nomeMenorCarga = primeiroNome;
  let menorCarga = resumoJogadores[primeiroNome].cargaTotal;
  
  let qtdRiscoLesao = 0;
  let htmlListaJogadores = "";

  for (let nome in resumoJogadores) {
    let dados = resumoJogadores[nome];

    if (dados.cargaTotal > cargaMaximaSemanal) {
      qtdRiscoLesao++;
    }

    if (dados.cargaTotal > maiorCarga) {
      maiorCarga = dados.cargaTotal;
      nomeMaiorCarga = nome;
    }

    if (dados.cargaTotal < menorCarga) {
      menorCarga = dados.cargaTotal;
      nomeMenorCarga = nome;
    }

    htmlListaJogadores += `<li>${nome} (${dados.posicao}) - Carga: ${dados.cargaTotal.toFixed(1)} | Treinos: ${dados.qtdTreinos}</li>`;
  }

  const mediaFisico = qtdFisico > 0 ? (cargaFisico / qtdFisico) : 0;
  const mediaTecnico = qtdTecnico > 0 ? (cargaTecnico / qtdTecnico) : 0;
  const mediaEstrategico = qtdEstrategico > 0 ? (cargaEstrategico / qtdEstrategico) : 0;

  const mediaGoleiro = qtdGoleiro > 0 ? (cargaGoleiro / qtdGoleiro) : 0;
  const mediaZagueiro = qtdZagueiro > 0 ? (cargaZagueiro / qtdZagueiro) : 0;
  const mediaMeioCampo = qtdMeioCampo > 0 ? (cargaMeioCampo / qtdMeioCampo) : 0;
  const mediaAtacante = qtdAtacante > 0 ? (cargaAtacante / qtdAtacante) : 0;

  const divResultado = document.getElementById("resultadoTreinos");
  divResultado.innerHTML = `
    <h3>RELATÓRIO DE DESEMPENHO E SAÚDE</h3>
    <p><strong>Total de Treinos Cadastrados:</strong> ${listaDeTreinos.length}</p>
    <p><strong>Jogadores em Risco de Lesão:</strong> ${qtdRiscoLesao}</p>

    <h4>Resumo por Jogador:</h4>
    <ul>
      ${htmlListaJogadores}
    </ul>

    <h4>Extremos da Semana:</h4>
    <p><strong>Maior Carga:</strong> ${nomeMaiorCarga} (${maiorCarga.toFixed(1)} pts)</p>
    <p><strong>Menor Carga:</strong> ${nomeMenorCarga} (${menorCarga.toFixed(1)} pts)</p>

    <h4>Carga Média por Tipo de Treino:</h4>
    <ul>
      <li>Físico (1): ${mediaFisico.toFixed(1)} pts</li>
      <li>Técnico (2): ${mediaTecnico.toFixed(1)} pts</li>
      <li>Estratégico (3): ${mediaEstrategico.toFixed(1)} pts</li>
    </ul>

    <h4>Desempenho por Posição (Total de Treinos | Carga Média):</h4>
    <ul>
      <li><strong>Goleiro:</strong> ${qtdGoleiro} treino(s) | Média: ${mediaGoleiro.toFixed(1)} pts</li>
      <li><strong>Zagueiro:</strong> ${qtdZagueiro} treino(s) | Média: ${mediaZagueiro.toFixed(1)} pts</li>
      <li><strong>Meio-campo:</strong> ${qtdMeioCampo} treino(s) | Média: ${mediaMeioCampo.toFixed(1)} pts</li>
      <li><strong>Atacante:</strong> ${qtdAtacante} treino(s) | Média: ${mediaAtacante.toFixed(1)} pts</li>
    </ul>
  `;
}
// --------------------------------------------------------------------------------------------
// Exercício 6 - Sistema de Vendas com Comissões, Metas e Performance
const listaDeVendas = [];
function registrarVendas() {
  // entrada
  const metaMensalVendas = parseFloat(document.getElementById("metaMensalVendas").value);
  const percentualBaseComissao = parseFloat(document.getElementById("percentualBaseComissao").value);
  const codigoVenda = parseInt(document.getElementById("codigoVenda").value);
  const codigoVendedor = parseInt(document.getElementById("codigoVendedor").value);
  const regiaoLoja = parseInt(document.getElementById("regiaoLoja").value);
  const valorVenda = parseFloat(document.getElementById("valorVenda").value);
  const tipoCliente = document.getElementById("tipoCliente").value.toUpperCase(); // 'PF' ou 'PJ'

  // validação
  if (isNaN(metaMensalVendas) || isNaN(percentualBaseComissao)) {
    alert("Informe os valores de meta e percentual base corretamente!");
    return;
  }

  if (isNaN(codigoVenda) || codigoVenda <= 0) {
    alert("Código de venda inválido!");
    return;
  }

  const vendasExistentes = listaDeVendas.map(v => v.codigoVenda);
  if (vendasExistentes.includes(codigoVenda)) {
    alert("Código de venda já cadastrado!");
    return;
  }

  if (isNaN(valorVenda) || valorVenda <= 0) {
    alert("Valor de venda inválido!");
    return;
  }

  // cálculo da comissão
  const comissaoBase = valorVenda * (percentualBaseComissao / 100);

  let percentualBonusCliente = 0;
  if (tipoCliente === 'PF') {
    percentualBonusCliente = 0.02;
  } else if (tipoCliente === 'PJ') {
    percentualBonusCliente = 0.03;
  }

  let percentualBonusRegiao = 0;
  switch (regiaoLoja) {
    case 1: // Norte
    case 2: // Nordeste
      percentualBonusRegiao = 0.01;
      break;
    case 3: // Sudeste
      percentualBonusRegiao = 0;
      break;
    case 4: // Sul
      percentualBonusRegiao = 0.005;
      break;
    default:
      alert("Região inválida! Use 1 a 4.");
      return;
  }

  const bonusCliente = valorVenda * percentualBonusCliente;
  const bonusRegiao = valorVenda * percentualBonusRegiao;
  const comissaoTotal = comissaoBase + bonusCliente + bonusRegiao;

  listaDeVendas.push({
    codigoVenda,
    codigoVendedor,
    regiaoLoja,
    valorVenda,
    tipoCliente,
    comissaoTotal
  });

  alert(`Venda ${codigoVenda} registrada com sucesso! Comissão gerada: R$ ${comissaoTotal.toFixed(2)}`);

  document.getElementById("formVendas").reset();
}

function gerarRelatorioVendas() {
  if (listaDeVendas.length === 0) {
    alert("Nenhuma venda foi registrada!");
    return;
  }

  const metaMensalVendas = parseFloat(document.getElementById("metaMensalVendas").value);

  let totalVendidoGeral = 0;
  let totalComissoesGeral = 0;

  const totalPorRegiao = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const comissaoPorRegiao = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const qtdVendasRegiao = { 1: 0, 2: 0, 3: 0, 4: 0 };

  let totalVendidoPF = 0;
  let totalVendidoPJ = 0;

  const consolidadoVendedores = {};

  for (const v of listaDeVendas) {
    totalVendidoGeral += v.valorVenda;
    totalComissoesGeral += v.comissaoTotal;

    totalPorRegiao[v.regiaoLoja] += v.valorVenda;
    comissaoPorRegiao[v.regiaoLoja] += v.comissaoTotal;
    qtdVendasRegiao[v.regiaoLoja]++;

    if (v.tipoCliente === 'PF') totalVendidoPF += v.valorVenda;
    else if (v.tipoCliente === 'PJ') totalVendidoPJ += v.valorVenda;
r
    if (!consolidadoVendedores[v.codigoVendedor]) {
      consolidadoVendedores[v.codigoVendedor] = { totalVendas: 0, totalComissao: 0 };
    }
    consolidadoVendedores[v.codigoVendedor].totalVendas += v.valorVenda;
    consolidadoVendedores[v.codigoVendedor].totalComissao += v.comissaoTotal;
  }

  let codVendedorMaiorVenda = null;
  let codVendedorMaiorComissao = null;
  let maiorVendaAcumulada = -1;
  let maiorComissaoAcumulada = -1;
  let qtdVendedoresBateramMeta = 0;

  for (const codVendedor in consolidadoVendedores) {
    const dados = consolidadoVendedores[codVendedor];

    if (dados.totalVendas >= metaMensalVendas) {
      qtdVendedoresBateramMeta++;
    }

    if (dados.totalVendas > maiorVendaAcumulada) {
      maiorVendaAcumulada = dados.totalVendas;
      codVendedorMaiorVenda = codVendedor;
    }

    if (dados.totalComissao > maiorComissaoAcumulada) {
      maiorComissaoAcumulada = dados.totalComissao;
      codVendedorMaiorComissao = codVendedor;
    }
  }

  const comissaoMediaGeral = totalComissoesGeral / listaDeVendas.length;
  
  const getMediaRegiao = (regiao) => {
    return qtdVendasRegiao[regiao] > 0 
      ? (comissaoPorRegiao[regiao] / qtdVendasRegiao[regiao]) 
      : 0;
  };

  const divResultado = document.getElementById("resultadoVendas");
  divResultado.innerHTML = `
    <h3>RELATÓRIO DE PERFORMANCE E COMISSÕES</h3>
    <p><strong>Total de Vendas Registradas:</strong> ${listaDeVendas.length}</p>
    <p><strong>Comissão Média Geral:</strong> R$ ${comissaoMediaGeral.toFixed(2)}</p>
    <p><strong>Vendedores que Bateram a Meta (R$ ${metaMensalVendas.toFixed(2)}):</strong> ${qtdVendedoresBateramMeta}</p>

    <h4>Destaques de Performance:</h4>
    <ul>
      <li><strong>Maior Volume de Vendas:</strong> Vendedor ${codVendedorMaiorVenda} (R$ ${maiorVendaAcumulada.toFixed(2)})</li>
      <li><strong>Maior Comissão Acumulada:</strong> Vendedor ${codVendedorMaiorComissao} (R$ ${maiorComissaoAcumulada.toFixed(2)})</li>
    </ul>

    <h4>Valor Total Vendido por Tipo de Cliente:</h4>
    <ul>
      <li><strong>Pessoa Física (PF):</strong> R$ ${totalVendidoPF.toFixed(2)}</li>
      <li><strong>Pessoa Jurídica (PJ):</strong> R$ ${totalVendidoPJ.toFixed(2)}</li>
    </ul>

    <h4>Valor Vendido e Comissão Média por Região:</h4>
    <ul>
      <li><strong>Norte (1):</strong> R$ ${totalPorRegiao[1].toFixed(2)} | Média de Comissão: R$ ${getMediaRegiao(1).toFixed(2)}</li>
      <li><strong>Nordeste (2):</strong> R$ ${totalPorRegiao[2].toFixed(2)} | Média de Comissão: R$ ${getMediaRegiao(2).toFixed(2)}</li>
      <li><strong>Sudeste (3):</strong> R$ ${totalPorRegiao[3].toFixed(2)} | Média de Comissão: R$ ${getMediaRegiao(3).toFixed(2)}</li>
      <li><strong>Sul (4):</strong> R$ ${totalPorRegiao[4].toFixed(2)} | Média de Comissão: R$ ${getMediaRegiao(4).toFixed(2)}</li>
    </ul>
  `;
}