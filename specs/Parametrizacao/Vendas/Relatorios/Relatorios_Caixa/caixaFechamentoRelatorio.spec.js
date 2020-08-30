var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var fechamento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/caixaFechamentoRelatorio.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Fechamento de Caixa (Relatório)', function () {
    
    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        browser.sleep(3000);
        browser.get('https://manage.teknisa.com/man/#/man#reports%2Fvnd05606_relFechamentoCaixaControle');
    });

    it('Gerar Relatório de Fechamento de Caixa', function () {
        fechamento.fechaCaixa();        
    });    
});