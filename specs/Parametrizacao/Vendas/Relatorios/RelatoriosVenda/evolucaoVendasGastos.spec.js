const loginPage = require('../../../../../page-objects/login.po.js');
const evolucaoVendasGastos = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/evolucaoVendasGastos.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Evolução de Vendas e Gastos Diários', () => {
    
    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Evolução de Vendas e Gastos Diários');
    });
        
    afterAll(() => h.sairDoSistema());
    
    it('Evolução de Vendas e Gastos Diários', () => {
        evolucaoVendasGastos.selecionarUnidade(j.getValor('filial'));
        evolucaoVendasGastos.selecionarData('01/2018');
        evolucaoVendasGastos.emitirRelatorio();
        expect(h.relBirtTest()).toBe(true);
    });  

});