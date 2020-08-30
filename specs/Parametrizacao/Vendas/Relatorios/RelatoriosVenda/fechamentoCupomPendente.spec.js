const loginPage = require('../../../../../page-objects/login.po.js');
const cupom = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/fechamentoCupomPendente.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Fechamento de Cumpom Pendente', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Fechamento de Cupom Pendente');
    });

    afterAll(() => h.sairDoSistema());

    it('Fechamento de Cupom Pendente - Cupom Aprovado', () => {
        //abre o filtro novamente
        cupom.limparFiltro();

        cupom.selecionarUnidade(j.getValor('filial'));
        cupom.selecionarCaixa(j.getValor('nmcaixa'));
        cupom.selecionarPeríodo(j.getValor('periodoComVenda'));
        cupom.selecionarStatus('Aprovado');
        //emite o relatório com as informações inseridas no filtro
        cupom.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(cupom.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Cupom Aprovado', () => expect(cupom.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Cupom Aprovado', () => expect(cupom.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Cupom Aprovado', () => expect(cupom.gerarRelatorioCSV()).toBe(true));

    it('Fechamento de Cupom Pendente - Cupom Pendente', () => {
        //abre o filtro novamente
        cupom.abrirFiltro();
        //abre o filtro novamente
        cupom.limparFiltro();

        cupom.selecionarUnidade(j.getValor('filial'));
        cupom.selecionarCaixa(j.getValor('nmcaixa'));
        cupom.selecionarPeríodo(j.getValor('periodoComVenda'));
        cupom.selecionarStatus('Pendente');
        //emite o relatório com as informações inseridas no filtro
        cupom.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(cupom.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Cupom Pendente', () => expect(cupom.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Cupom Pendente', () => expect(cupom.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Cupom Pendente', () => expect(cupom.gerarRelatorioCSV()).toBe(true));

    it('Fechamento de Cupom Pendente - Cupom Com Erro', () => {
        //abre o filtro novamente
        cupom.abrirFiltro();
        //abre o filtro novamente
        cupom.limparFiltro();

        cupom.selecionarUnidade(j.getValor('filial'));
        cupom.selecionarCaixa(j.getValor('nmcaixa'));
        cupom.selecionarPeríodo(j.getValor('periodoComVenda'));
        cupom.selecionarStatus('Com Erro');
        //emite o relatório com as informações inseridas no filtro
        cupom.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(cupom.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Cupom Com Erro', () => expect(cupom.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Cupom Com Erro', () => expect(cupom.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Cupom Com Erro', () => expect(cupom.gerarRelatorioCSV()).toBe(true));    

});