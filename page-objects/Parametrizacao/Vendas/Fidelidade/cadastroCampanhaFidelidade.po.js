var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var campanhaFidelidade = function () {

    var self = this;

    this.cadastro = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('DSCAMPANHA', 'Campanha Teste');
        z.field.selectNative.click('IDCAMPANHA', 'Cartão Clube');
        // z.field.fieldFunctions.click('NMTPCAMPANHA');
        var el = element.all(by.css('NMTPCAMPANHA'));
        el.click(); //o clique aqui não é recebido nem no manual
        z.widget.grid.click('CDTPCAMPANHA', '00001', '0');
        z.field.fieldFunctions.click('DTINIVIGCAMP');
        z.field.calendar.clickDate('25/05/2017', 'pt_br');
        z.field.fieldFunctions.click('DTFIMVIGCAMP');
        z.field.calendar.clickDate('25/06/2017', 'pt_br');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.completaCadastro = function () {

        z.widget.grid.click('DSCAMPANHA', 'Campanha Teste', '541476372518310325658');
        h.navegar('Unidade Participante');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('CDFILIAL');
        z.util.pressKey(' FOOD');
        z.widget.grid.click('__CHECKBOX', '', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Salvar');
        /* nao tem produtos cadastrados
        h.navegar('Produto Participante');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMPRODUTOINI');
*/

        z.component.footer.clickLeftActionByLabel('Voltar');
    };


    this.editar = function () {

        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('DSCAMPANHA', 'Campanha Teste', '541476372518310325658');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('DSCAMPANHA', 'Teste 1');
        z.field.fieldFunctions.click('DTFIMVIGCAMP');
        z.field.calendar.clickDate('01/12/2017', 'pt_br');
        z.field.fieldFunctions.click('DTINIVIGCAMP');
        z.field.calendar.clickDate('20/11/2017', 'pt_br');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluir = function () {

        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('DSCAMPANHA', 'Teste 1', '541476372518310325658');
        h.navegar('Unidade Participante');
        z.widget.grid.click('__CHECKBOX', '', '5414763723386823505659');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        h.navegar('Cadastro de Campanha');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
    }

};

module.exports = new campanhaFidelidade();