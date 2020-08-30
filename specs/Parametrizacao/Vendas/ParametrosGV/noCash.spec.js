var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var nCash = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/noCash.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela No Cash', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();	
        h.tela('No Cash');
    });
    afterEach(function(){
        h.fechaTela();
        //z.component.footer.clickLeftActionByLabel('Cancelar');
    });
    
    afterAll(function () {
      h.sairDoSistema();
    });

    it('Parametrizacao do No Cash aba Geral', function () {
        nCash.noCashGeral();
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
    });
    xit('Parametrizacao do No Cash aba Unidade', function () {
        nCash.noCashUnidade();
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
    });
});
