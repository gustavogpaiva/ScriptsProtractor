const loginPage = require('../../../../../page-objects/login.po.js');
const vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasImposto.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Vendas por Imposto', () => {
    
    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Vendas Por Imposto');
    });
        
    afterAll(() => h.sairDoSistema());
    
    it('Vendas por Imposto', () => {
        
        vendas.limparFiltro();

        vendas.selecionarRelatorio('Imposto por Produto (Total Imposto)');
        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        vendas.selecionarImposto('Imposto Circ. Merc. Servicos');
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));

        vendas.emitirRelatorio();

        expect(vendas.gridPossuiRegistros()).toBe(true);
    });  
    
    it('Gerar relatório em PDF', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(vendas.gerarRelatorioCSV()).toBe(true));
});