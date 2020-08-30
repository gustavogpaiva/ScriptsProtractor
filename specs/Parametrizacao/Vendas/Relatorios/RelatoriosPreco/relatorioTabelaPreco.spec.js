const loginPage = require('../../../../../page-objects/login.po.js');
const tabelaPreco = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosPreco/relatorioTabelaPreco.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Relatório de Tabela de Preço', () => {

    beforeAll(() => {
        loginPage.login();
        h.tela('Relatório de Tabela de Preço');
    });

    afterAll(() => h.sairDoSistema());

    it('Relatorio Tabela de Preço', () => {
        //limpa a informações do filtro        
        tabelaPreco.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, tabela de preço, vigência e produtos inicial e final
        browser.executeScript("$('div.zh-validation').remove();");
        tabelaPreco.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        tabelaPreco.selecionarTabelaPreco(j.getValor('tabelaDePreco'));
        browser.executeScript("$('div.zh-validation').remove();");
        tabelaPreco.selecionarVigencia(j.getValor('vigencia'));
        browser.executeScript("$('div.zh-validation').remove();");
        tabelaPreco.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        tabelaPreco.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        tabelaPreco.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(tabelaPreco.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(tabelaPreco.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(tabelaPreco.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(tabelaPreco.gerarRelatorioCSV()).toBe(true));
});