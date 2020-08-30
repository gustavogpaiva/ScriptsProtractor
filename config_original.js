var path = require("path");
console.log(path.resolve("./configParams.js"));
var configParams = require(path.resolve("./configParams.js"));

exports.config = {
    framework: 'jasmine2',
    seleniumAddress: configParams.seleniumAddress,
    specs: ['specs/Parametrizacao/Vendas/**/*.spec.js'],
    suites: {
        //parceiro
        vendedor: 'specs/Parametrizacao/CadastrosGerais/Parceiro/vendedor.spec.js',
        //caixa (Apresentam mais que o CRUD)
        cadastroDeCaixa: 'specs/Parametrizacao/Vendas/Caixa/cadastroDeCaixa_vnd42300.spec.js',
        configuracaoMenuProdutosCombinados: 'specs/Parametrizacao/Vendas/Caixa/configuracaoMenuProdutosCombinados.spec.js',
        configuracaoTerminal: 'specs/Parametrizacao/Vendas/Caixa/configuracaoTerminal.spec.js',
        tipoSangria: 'specs/Parametrizacao/Vendas/Caixa/tipoSangria.spec.js',
        //Cliente Consumidor crédito pessoal(Completar)
        manutencaoContaClienteConsumidorFamilia: 'specs/Parametrizacao/Vendas/ClienteConsumidor/CreditoPessoal/manutencaoContaClienteConsumidorFamilia.spec.js',
        //Débito Consumidor(Falta manuntencaoContaCliente) pra ficar completo
        ajusteSaldo: 'specs/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/ajusteSaldoMensal.spec.js',
        manutencaoContaCliente: 'specs/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/manutencaoContaCliente.spec.js',
        recalculoSaldo: 'specs/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/recalculoSaldos.spec.js',
        transferenciaMovimentacao: ['specs/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/transferenciaMovimentacao.spec.js'],
        //Consumidor(falta cod cliente)
        cadastroConsumidor: 'specs/Parametrizacao/Vendas/Consumidor/cadastroConsumidor.spec.js',
        codigoExternoCliente: 'specs/Parametrizacao/Vendas/Consumidor/CodigoExternoCliente.spec.js',
        restricaoAlimentarConsumidor: 'specs/Parametrizacao/Vendas/Consumidor/restricaoAlimentarConsumidor.spec.js',
        tipoConsumidorCliente: 'specs/Parametrizacao/Vendas/Consumidor/tipoConsumidorCliente.spec.js',
        //Fidelidade (Completos)
        cadastroBeneficio: 'specs/Parametrizacao/Vendas/Fidelidade/cadastroBeneficio.spec.js',
        cadastroCampanhaFidelidade: 'specs/Parametrizacao/Vendas/Fidelidade/cadastroCampanhaFidelidade.spec.js',
        manutencaoBeneficiosFidelidade: 'specs/Parametrizacao/Vendas/Fidelidade/manutencaoBeneficiosFidelidade.spec.js',
        testeCartaoFidelidade: 'specs/Parametrizacao/Vendas/Fidelidade/testeCartaoFidelidade.spec.js',
        //integração (rever após correçao de issue)
        cadastroIntegracao: 'specs/Parametrizacao/Vendas/Integracao/cadastroIntegracao.spec.js',
        //Loja (Completos) + JSON
        cadastroDeLoja: 'specs/Parametrizacao/Vendas/Loja/cadastroDeLoja.spec.js',
        meta: 'specs/Parametrizacao/Vendas/Loja/meta.spec.js',
        consolidacaoAutomatica: 'specs/Parametrizacao/Vendas/Loja/consolidacaoAutomatica.spec.js',
        //Mesa Comanda (Falta realizar validações de cadastro e de exclusão em ambas as telas que ainda não existe)
        ambienteMesa: 'specs/Parametrizacao/Vendas/Mesa_Comanda/ambienteMesa.spec.js',
        cadastroVendedor: 'specs/Parametrizacao/Vendas/Mesa_Comanda/cadastroVendedor.spec.js',
        //operacional
        aberturaCaixa: 'specs/Parametrizacao/Vendas/Operacional/aberturaCaixa.spec.js',
        fechamentoCaixa: 'specs/Parametrizacao/Vendas/Operacional/fechamentoCaixa.spec.js',
        consolidacaoVendas: 'specs/Parametrizacao/Vendas/Operacional/consolidacaoVendas.spec.js',
        fecharDia: 'specs/Parametrizacao/Vendas/Operacional/fecharDia(forSale).spec.js',
        fechamentoCupom: 'specs/Parametrizacao/Vendas/Operacional/fechamentoCupom.spec.js',
        manutencaoLancamentoCaixa: 'specs/Parametrizacao/Vendas/Operacional/manutencaoLancamentoCaixa.spec.js',
        monitoramentoFechamentoCupom: 'specs/Parametrizacao/Vendas/Operacional/monitoramentoFechamentoCupom.spec.js',
	conferenciaCaixa: 'specs/Parametrizacao/Vendas/Operacional/conferenciaCaixa.spec.js',
        //Parametros Parametros Gestao de vendas
        controleAcessoCaixa: 'specs/Parametrizacao/Vendas/ParametrosGV/controleAcessoCaixa.spec.js',
        kds: 'specs/Parametrizacao/Vendas/ParametrosGV/kds.spec.js',
        delivery: 'specs/Parametrizacao/Vendas/ParametrosGV/delivery.spec.js',
        noCash: 'specs/Parametrizacao/Vendas/ParametrosGV/noCash.spec.js',
        parametrizacaoMensagensKDS: 'specs/Parametrizacao/Vendas/ParametrosGV/parametrizacaoMensagensKDS.spec.js',
        parametroAppConsumidor: 'specs/Parametrizacao/Vendas/ParametrosGV/parametroAppConsumidor.spec.js',
        parametrosUnidade: 'specs/Parametrizacao/Vendas/ParametrosGV/parametrosUnidade_vnd08600.spec.js',
        parametrosGerais: 'specs/Parametrizacao/Vendas/ParametrosGV/parametrosGerais_vnd10003.spec.js',
        //Produto
        bloqueioProduto: 'specs/Parametrizacao/Vendas/Produto/bloqueioProduto.spec.js',
        cadastroGrupoPromocional: 'specs/Parametrizacao/Vendas/Produto/cadastroGrupoPromocional.spec.js',
        cadastroObservacao: 'specs/Parametrizacao/Vendas/Produto/cadastroObservacao.spec.js',
        campanhaPromocional: 'specs/Parametrizacao/Vendas/Produto/campanhaPromocional.spec.js',
        familiaDeProdutos: 'specs/Parametrizacao/Vendas/Produto/familiaProdutos.spec.js',
        tabelaDePreco: 'specs/Parametrizacao/Vendas/Produto/tabelaDePreco.spec.js',
        /*Relatorios*/
        //Estatisticas Gerais
        produtividadeVendedor: 'specs/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/produtividadeVendedor.spec.js',
        produtividadeVendedorContinuo: 'specs/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/produtividadeVendedorContinuo.spec.js',
        valoresArrecadadosOperador: 'specs/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/valoresArrecadadosOperador.spec.js',
        lojaSemMovimentacao: 'specs/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/lojaSemMovimentacao.spec.js',
        //Relatorios de Caixa
        relatorioFechamentoCaixa: 'specs/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/caixaFechamentoRelatorio.spec.js',
        mapaResumoECF: 'specs/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/mapaResumoECF.spec.js',
        resumoCaixa: 'specs/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/resumoCaixa.spec.js',
        //Relatorios Cancelamento
        cancelamentoItens: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoItens.spec.js',
        cancelamentoServicos: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoServicos.spec.js',
        cancelamentoCupom: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoCupom.spec.js',
        observacaoCancelamento: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/observacaoCancelamento.spec.js',
        vendasItensCanceladosPeriodo: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/vendasItensCanceladosPeriodo.spec.js',
        //Relatorios DayPart
        vendasDayPart: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPart.spec.js',
        vendasDayPartModalidade: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartModalidade.spec.js',
        vendasDayPartProdutoModalidade: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartProdutoModalidade.spec.js',
        vendasDayPartConsolidado: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartConsolidado.spec.js',
        //Relatorios Desconto
        descontosConcedidos: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosDesconto/descontosConcedidos.spec.js',
        observacaoDesconto: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosDesconto/observacaoDesconto.spec.js',
        //Relatorios Faturamento
        faturamentoDeliveryDia: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoDeliveryDia.spec.js',
        faturamentoDeliveryGeral: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoDeliveryGeral.spec.js',
        faturamentoHoraHora: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoHoraHora.spec.js',
        sinteseFaturamentoGeral: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/sinteseFaturamentoGeral.spec.js',
        sinteseFaturamentoDia: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/sinteseFaturamentoDia.spec.js',
        //Relatorios Ficha Técnica
        composicaoProdutoSintetico: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoSintetico.spec.js',
        composicaoProdutoNivelUnico: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoNivelUnico.spec.js',
        composicaoProdutoNVItensAdd: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoNivelUnicoItensAdd.spec.js',
        composicaoProdutoIndexada: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoIndexada.spec.js',
        //RelatoriosKDS
        tempoProducaoKDS: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosKDS/tempoProducaoKDS.spec.js',
        relatorioTabelaPreco: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosPreco/relatorioTabelaPreco.spec.js',
        //Relatorios Produto
        produtosMaisVendidos: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/produtosMaisVendidos.spec.js',
        vendasProdModalidade: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasProdutoModalidade.spec.js',
        vendasNivelProduto: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasNivelProduto.spec.js',
        vendasProdutoPeriodo: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasProdutoPeriodo.spec.js',
        movimentacaoProdutoMTC: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/movimentacaoProdutoMTC.spec.js',
	movimentacaoProdutoPorHora: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/movimentacaoProdutoPorHora.spec.js',
        MTCComparativoOperador: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/MTCComparativoOperador.spec.js',
        MTCProdutosCompUni: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/MTCProdutosCompUni.spec.js',
        //Relatorios Venda
        consolidacaoVendasPendente: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/consolidacaoVendasPendente.spec.js',
        fechamentoCupomPendente: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/fechamentoCupomPendente.spec.js',
        promocaoCombinadaSintetico: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/promocaoCombinadaSintetico.spec.js',
        promocaoCombinadaAnalitico: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/promocaoCombinadaAnalitico.spec.js',
        relacaoCuponsSatNfce: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/relacaoCuponsSatNfce.spec.js',
        vendasFiscalGerencial: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasFiscalGerencial.spec.js',
        vendasPorHora: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasHora.spec.js',
        vendasTipoRecebimento: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasTipoRecebimento.spec.js',
        vendasTipoRecebimentoUnidade: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasTipoRecebimentoUnidade.spec.js',
        vendasImposto: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasImposto.spec.js',
	vendasComparativo: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasComparativo.spec.js',
        evolucaoVendasGastos: 'specs/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/evolucaoVendasGastos.spec.js'
    },
    //SELENIUM_PROMISE_MANAGER: false,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-popup-blocking', 'test-type', 'disable-extensions', 'disable-web-security', 'incognito'],
        }
    },
    allScriptsTimeout: 300000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    },
    params: {
        applicationUrl: configParams.baseUrl
    },
    beforeLaunch: function () {
    },

    onPrepare: function () {
        return global.browser.getProcessedConfig().then(function (config) {
            //it is ok to be empty
        });
    },

    plugins: [{
        package: 'protractor-screenshoter-plugin',
        screenshotPath: path.resolve('./REPORTS/e2e'),
        screenshotOnExpect: 'failure+success',
        screenshotOnSpec: 'none',
        withLogs: true,
        writeReportFreq: 'asap',
        imageToAscii: 'none',
        clearFoldersBeforeTest: true
    }],

    afterLaunch: function (exitCode) {

    },
    rootElement: 'html'
};