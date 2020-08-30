var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);

var cadBeneficio = function () {

    var self = this;

    this.cadBeneficio = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('DSBENEFICIO', 'Nome Teste');
        z.field.selectNative.click('IDTPBENEFICIO', 'DESCONTO PERCENTUAL');
        z.field.selectNative.click('IDTPATIVABENEFICIO', 'ATIVAÇÃO DO CARTÃO');
        z.field.fieldFunctions.fill('QTDMAXDIASUBSEQ', '5');
        z.field.fieldFunctions.fill('QTDMAXDIACOMPRA', '2');
        z.field.fieldFunctions.fill('VRBENEFICIO', '15');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.editar = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('DSBENEFICIO', 'Nome Teste', '11911190533080875283384');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('DSBENEFICIO', 'Apresentação Odhen');
        z.field.fieldFunctions.fill('QTDMAXDIASUBSEQ', '10');
        z.field.fieldFunctions.fill('QTDMAXDIACOMPRA', '5');
        // z.field.fieldFunctions.fill('VRBENEFICIO', '10'); está com problema na edição
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.excluir = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('DSBENEFICIO', 'Apresentação Odhen', '11911190533080875283384');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
    //essa tela falta algumas interações para poder realizar mais its

};

module.exports = new cadBeneficio();