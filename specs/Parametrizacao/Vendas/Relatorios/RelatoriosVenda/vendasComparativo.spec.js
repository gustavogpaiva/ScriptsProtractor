const loginPage = require('../../../../../page-objects/login.po.js');
const vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasComparativo.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Vendas Comparativo', () => {
    
    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Vendas Comparativo');
    });
        
    afterAll(() => h.sairDoSistema());
    
    it('Vendas Comparativo', () => {
        vendas.limparFiltro();
        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarMesAno1('01/2018');
        vendas.selecionarMesAno2('06/2018');
        vendas.selecionarMesAno3('01/2019');
        vendas.emitirRelatorio();
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });  
    
    it('Gerar relatório em PDF', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(vendas.gerarRelatorioCSV()).toBe(true));
});