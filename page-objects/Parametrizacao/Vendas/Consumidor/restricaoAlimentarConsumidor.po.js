var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var restricao = function () {
//issue para remoção dos autocomplete 158780 (19/09/2018)
    var self = this;

    this.consumidor = function () {
        //essa função é usada para clicar na lupa e abrir o grid pois o autocomplete não funciona aqui
        /*var el = element(by.css('#NMFILIAL > span > svg'));
        el.click();
        z.util.pressKey(' TEKNISA FOOD HOUSE');
        z.widget.grid.click('NMFILIAL', 'TEKNISA FOOD HOUSE', '9000');*/

        z.util.clickElement(by.css('#NMRAZSOCCLIE > span > svg'));
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9000');
        z.util.clickElement(by.css('#NMFAMILISALD > span > svg'));
        z.widget.grid.click('NMFAMILISALD', 'REFEICAO', '9000');
        z.component.footer.clickRightActionByLabel('Filtro');

        //parte em que adiciona um novo consumidor
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMCONSUMIDOR');
        z.widget.grid.click('NMCONSUMIDOR', 'Tek', '0')
        z.field.fieldFunctions.fill('VRCONSDIARAL', '200');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.cadastroAutomatico = function () {
        z.util.clickElement(by.css('#NMRAZSOCCLIE > span > svg'));
        
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9000');
        z.util.clickElement(by.css('#NMFAMILISALD > span > svg'));
        z.util.pressKey(' CLIENTE PADRÃO');
        z.widget.grid.click('NMFAMILISALD', 'REFEICAO', '9000');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickRightActionByLabel('Cad. Aut. de Consumidor');
        z.field.fieldFunctions.click('CDCCUSCLIE');
        z.widget.grid.click('__CHECKBOX', '', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDTIPOCONS');
        z.widget.grid.click('__CHECKBOX', '', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDCONSUMIDOR');
        z.widget.grid.click('__CHECKBOX', '', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.checkbox.click('IDSALDNEGRAL');
        z.field.fieldFunctions.fill('VRCONSDIARAL', '150');
        z.component.footer.clickRightActionByLabel('Confirmar');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };

    this.produto = function () {
        z.widget.grid.click('NMCONSUMIDOR', 'Tek', '115649133615094561671140');
        h.navegar('Produto Restrição');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.util.clickElement(by.css('#PRODUTO_F > span > svg'));
        //z.util.pressKey(' ENROLADINHO');
        //z.widget.grid.click('NMPRODUTO', 'ENROLADINHO', '9000');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.fill('QTCONSDIARAL', '5');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.editar = function () {
        z.util.clickElement(by.css('#NMRAZSOCCLIE > span > svg'));
        
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9000');
        z.util.clickElement(by.css('#NMFAMILISALD > span > svg'));
        z.util.pressKey(' CLIENTE PADRÃO');
        z.widget.grid.click('NMFAMILISALD', 'REFEICAO', '9000');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMCONSUMIDOR', 'Tek', '115649133615094561671140');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('VRCONSDIARAL', '400');
        z.field.checkbox.click('IDSALDNEGRAL');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.excluir = function () {
        z.util.clickElement(by.css('#NMRAZSOCCLIE > span > svg'));
        
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9000');
        z.util.clickElement(by.css('#NMFAMILISALD > span > svg'));
        z.util.pressKey(' CLIENTE PADRÃO');
        z.widget.grid.click('NMFAMILISALD', 'REFEICAO', '9000');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMCONSUMIDOR', 'Tek', '115649133615094561671140');
        h.navegar('Produto Restrição');
        z.widget.grid.checkAllRows('1156491336540591151141');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        h.navegar('Restrição');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };

    this.excluirAutomatico = function () {
        z.util.clickElement(by.css('#NMRAZSOCCLIE > span > svg'));
       
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9000');
        z.util.clickElement(by.css('#NMFAMILISALD > span > svg'));
        z.util.pressKey(' CLIENTE PADRÃO');
        z.widget.grid.click('NMFAMILISALD', 'REFEICAO', '9000');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMCONSUMIDOR', 'Teste', '115649133615094561671140');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
};

module.exports = new restricao();