var path = require("path");
console.log(path.resolve("./configParams.js"));
var configParams = require(path.resolve("./configParams.js"));
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine2',
    seleniumAddress: configParams.seleniumAddress,
    specs: [
        'specs/Parametrizacao/Vendas/Caixa/cadastroDeCaixa_vnd42300.spec.js',
        'specs/Parametrizacao/Vendas/Loja/cadastroDeLoja.spec.js',
        'specs/Parametrizacao/Vendas/Mesa_Comanda/cadastroVendedor.spec.js',
        'specs/Parametrizacao/Vendas/Consumidor/cadastroConsumidor.spec.js',
        'specs/Parametrizacao/Vendas/Integracao/cadastroIntegracao.spec.js',
        'specs/Parametrizacao/Vendas/ParametrosGV/parametrosGerais_vnd10003.spec.js',
        'specs/Parametrizacao/Vendas/ParametrosGV/kds.spec.js',
        'specs/Parametrizacao/Vendas/ParametrosGV/parametrizacaoMensagensKDS.spec.js',
        'specs/Parametrizacao/Vendas/ParametrosGV/delivery.spec.js',
        'specs/Parametrizacao/Vendas/ParametrosGV/noCash.spec.js',
        'specs/Parametrizacao/Vendas/ParametrosGV/controleAcessoCaixa.spec.js',
        'specs/Parametrizacao/Vendas/ParametrosGV/parametroAppConsumidor.spec.js',
        'specs/Parametrizacao/Vendas/Caixa/configuracaoTerminal.spec.js',
        'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/sinteseFaturamentoGeral.spec.js',
        'specs/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/sinteseFaturamentoDia.spec.js'
    ],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
                args: ['disable-popup-blocking', 'test-type', 'disable-extensions',
                'disale-web-security', 'headless', 'disable-gpu', 'no-sandbox'],
        },
    },       
    allScriptsTimeout: 300000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    },
    params: {
        applicationUrl: configParams.baseUrl
    },
    beforeLaunch: function () { },
    onPrepare: function () {
        browser.ignoreSynchronization = false;
        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailedSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true,
        }));

        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            fileNameSeparator: '_',
            savePath: './reports/html-reports',
            fileName: 'report',
            fileNameDateSuffix: true, // Necessario para evitar a sobreescrita de reports
            fixedScreenshotName: true,
            cleanDestination: false,
            consolidate: true,
            takeScreenshotsOnlyOnFailures: true,
        }));
    },
    afterLaunch: function () { },
    rootElement: 'html'
};