var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var ambienteMesa = function () {

    var self = this;

    this.ambiente = function () {
        h.pesquisaItem('NMFILIAL', j.getValor('filial'));
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('SGSALA', 'TST');
        z.field.fieldFunctions.fill('NMSALA', 'Teste');
        z.field.fieldFunctions.fill('NRVAGASSALA', '10');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMSALA', 'Teste', idGrid);
            h.navegar('Lojas');
            z.widget.grid.click('CDLOJA', j.getValor('cdloja'), idGrid);
            h.navegar('Mesa');
            z.component.footer.clickRightActionByLabel('Cad. Automático');
            browser.sleep('2000');
            z.field.fieldFunctions.fill('NRMESAINI','1');
            z.field.fieldFunctions.fill('NRMESAFIN','20');
            //z.component.footer.clickRightActionByLabel('Salvar');
            z.component.footer.clickLeftActionByLabel('Cancelar');
        });      
        /*   Mensagem de Erro ao cadastrar
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NRMESA','10');
        z.field.fieldFunctions.fill('NMMESA','Mesa 10');
        z.field.fieldFunctions.fill('NRPESSOAMESA','5');
        z.field.fieldFunctions.fill('DSPOSICMESA','Centro');
        z.component.footer.clickRightActionByLabel('Salvar');
        */
        z.component.footer.clickLeftActionByLabel('Voltar');
        z.component.footer.clickLeftActionByLabel('Voltar');

    };

    this.editar = function () {
        //não está sendo possível alterar os códigos comentados, so acontece no automatizado
        z.field.fieldFunctions.click('NMFILIAL');
        z.util.pressKey(' food');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMSALA', 'Teste', '18979943125559279821449');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('SGSALA', 'TSTs');
        z.field.fieldFunctions.fill('NMSALA', 'Testes');
        //z.field.fieldFunctions.fill('NRVAGASSALA', '020');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Lojas');
        z.widget.grid.click('CDLOJA', j.getValor('cdloja'), '18979943122197839061450');
        h.navegar('Mesa');
        z.widget.grid.click('NMMESA', 'Mesa 49', '189799431235922801321451');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMMESA', 'Mesa 50');
        //z.field.fieldFunctions.fill('NRPESSOAMESA','5');
        z.field.fieldFunctions.fill('DSPOSICMESA', 'Centro');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.excluir = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        z.util.pressKey(' food');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMSALA', 'Testes', '18979943125559279821449');
        h.navegar('Lojas');
        z.widget.grid.click('CDLOJA', j.getValor('cdloja'), '18979943122197839061450');
        h.navegar('Mesa');
        z.widget.grid.click('__CHECKBOX', '', '189799431235922801321451');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        //z.component.alert.clickMessageOk();
        z.component.footer.clickLeftActionByLabel('Voltar');
        h.navegar('Ambiente');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

};
module.exports = new ambienteMesa();
