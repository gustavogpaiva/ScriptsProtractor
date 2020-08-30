var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var cadGrupoPromocional = function () {

    var self = this;

    this.cadGrupo = function () {
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NMGRUPROMOC', 'Teste Odhen');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.widget.grid.click('NMGRUPROMOC', 'Teste Odhen', '15777596099201517031944');
        h.navegar('Produtos');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('CDARVPROD');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '0');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.editar = function () {
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.widget.grid.click('NMGRUPROMOC', 'Teste Odhen', '15777596099201517031944');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMGRUPROMOC', 'Teste Apresentação');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Produtos');
        z.component.footer.clickRightActionByLabel('Cad.Automático');
        z.field.fieldFunctions.click('NMPRODUTOI');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto2'), '0');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.excluir = function () {
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.widget.grid.click('NMGRUPROMOC', 'Teste Apresentação', '15777596099201517031944');
        h.navegar('Produtos');
        z.widget.grid.checkAllRows('15777596099124844661945');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        h.navegar('Grupo Promocional');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
};
module.exports = new cadGrupoPromocional();