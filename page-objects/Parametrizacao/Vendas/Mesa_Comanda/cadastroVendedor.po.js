var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var cadVendedor = function () {

    var self = this;

    this.cadVend = function () {
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('CDVENDEDOR', '02');
        z.field.fieldFunctions.fill('NMRAZSOCVEN', 'Teste automatizado Odhen');
        z.field.fieldFunctions.fill('NRINSJURVEN', '11225741665205441020');
        z.field.fieldFunctions.fill('DTNASCVEN', '02/05/2017');
        h.pesquisaItem('NMOPERADOR', j.getValor('operador'));
        h.pesquisaItem('NMFILIAL', j.getValor('filial'));
        h.pesquisaItem('NMCAIXA', j.getValor('nmcaixa'));
    };

    this.endereços = function () {
        //h.grupoCampos('Endereços');
        z.field.fieldFunctions.fill('NRCEPVEN', '69929970');
        z.field.fieldFunctions.fill('DSENDEVEN', 'Rua de Teste');
        z.field.fieldFunctions.click('NMPAIS');
        z.widget.grid.click('CDPAIS', '0055', '0');
        z.field.fieldFunctions.click('NMESTADO');
        z.widget.grid.click('SGESTADO', 'AC', '0');
        //z.field.fieldFunctions.click('NMMUNICIPIO');
        //z.widget.grid.click('CDMUNICIPIO', '0157');
        z.field.fieldFunctions.fill('DSEMAILVEN', 'teste@teste.com.br');
    };

    this.telefones = function () {
        z.field.fieldFunctions.fill('NRTELRESIVEN', '3133712046');
        z.field.fieldFunctions.fill('NRCELULARVEN', '31993778337');
    };

    this.taxa = function () {
        z.field.fieldFunctions.fill('VRPERCCOMISVEND', '10');
    };

    this.entregador = function () {
        z.field.fieldFunctions.fill('DSPLACAVEICULO', 'gxp6272');
        z.field.fieldFunctions.fill('VRDIARIAVENDOR', '10');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.alert.clickButton('Sim');
    };

    //o endereço e telefone não salva

    this.editarCadVend = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.clickColumn('17635103652036237344680', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMFANVEN', 'Teste de Edição do Nome');
        z.field.fieldFunctions.click('DTNASCVEN')
        z.field.calendar.clickDate('02/05/2016', 'pt_br');
        z.field.fieldFunctions.click('NMOPERADOR');
        z.widget.grid.click('NMOPERADOR', j.getValor('operador'), '0');
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.field.fieldFunctions.click('NMCAIXA');
        z.widget.grid.click('CDCAIXA', j.getValor('cdcaixa'), '0');
        z.field.fieldFunctions.fill('VRPERCCOMISVEND', '20');
        z.field.fieldFunctions.fill('DSPLACAVEICULO', 'HEL6666');
        z.field.fieldFunctions.fill('VRDIARIAVENDOR', '20');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluirCadVend = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.clickColumn('17635103652036237344680', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
};
module.exports = new cadVendedor();