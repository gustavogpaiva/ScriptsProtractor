const loginPage = require('../../../../../page-objects/login.po.js');
const intensCancelados = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/vendasItensCanceladosPeriodo.po.js');
const h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas Itens Cancelados no Periodo', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Vendas/Itens Cancelados no Período');
    });

    afterAll(() => h.sairDoSistema());

    it('Vendas itens Cancelados no Periodo', () => expect(intensCancelados.emitirRelatorio()).toBe(true));
});