var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');


var meta = function () {
    var self = this;

    this.realizarMeta = function () {
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '3638210602126535070274');
        h.navegar('Meta Período Especial');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.calendar.selectIntervalDate('PERIODO', '01/08/2018', '04/08/2018', 'pt_br');
        z.field.fieldFunctions.fill('DSMETAESP', 'Teste de inserção');
        z.field.fieldFunctions.fill('PERCCORRECAO', '10');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.editarMetaEspecial = function () {
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '3638210602126535070274');
        h.navegar('Meta Período Especial');
        z.widget.grid.click('NMDIA', 'QUARTA-FEIRA', '3638210602585623398331');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('DSMETAESP', 'Teste de Edição');
        z.field.fieldFunctions.fill('PERCCORRECAO', '20');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluirMetaEspecial = function () {
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '3638210602126535070274');
        h.navegar('Meta Período Especial');
        //exclui o primeiro registro
        z.widget.grid.click('NMDIA', 'QUARTA-FEIRA', '3638210602585623398331');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickMessageOk();
        //exclui o segundo registro
        z.widget.grid.click('NMDIA', 'QUINTA-FEIRA', '3638210602585623398331');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickMessageOk();
        //exclui o terceiro registro
        z.widget.grid.click('NMDIA', 'SEXTA-FEIRA', '3638210602585623398331');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickMessageOk();
        //exclui o quarto registro
        z.widget.grid.click('NMDIA', 'SÁBADO', '3638210602585623398331');
        z.component.footer.clickCenterActionByLabel('Excluir');
        return h.retornaMensagem();
    };

    this.metaMensal = async function () {
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '3638210602126535070274');
        z.component.footer.clickRightActionByLabel('Ações');
        var el = element(by.css('#popup > span > section > section > section > div > div > ul > li:nth-child(1) > div > div > span'));
        el.click();
        //loop para buscar todos 'id' PERCENTUAL e tentar inserir um valor em input
        var elementos = element.all(by.name('PERCENTUAL'));
        elementos.each(function (el) {
            el.isDisplayed().then(function (displayed) {
                if (displayed) {
                    try {
                        el.sendKeys('10');
                    } catch (err) {
                        console.log(err);
                    }
                }
            })
        });

        z.component.footer.clickRightActionByLabel('Estimar Meta');
        z.component.footer.clickLeftActionByLabel('Cancelar');
        h.navegar('Meta por Mês');
        z.widget.grid.click('CDMES', 'Janeiro', '3638210603645353162275');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('VRMES', '1000000');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Meta por Dia da Semana');
        browser.sleep('2000');
        //solução temporaria para o erro que se encontra na tela por não exibir os valores
        browser.refresh();
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '3638210602126535070274');
        h.navegar('Meta por Mês');
        z.widget.grid.click('CDMES', 'Janeiro', '3638210603645353162275');
        h.navegar('Meta por Dia da Semana');
        z.component.footer.clickLeftActionByLabel('Voltar');
        h.navegar('Meta por Mês');
        //z.component.footer.clickRightActionByLabel('Salvar alterações');
    };

    this.atualizaVendas = function () {
        z.component.footer.clickRightActionByLabel('Ações');
        var atualiza = element.all(by.css('#popup > span > section > section > section > div > div > ul > li:nth-child(1)'));
        atualiza.click();
        var msg = element(by.css('span.notification-message-text.ng-binding'));
        //função para pegar notificação
        var notifica = msg.isDisplayed().then(function (visivel) {
            if (visivel) {
                return msg.getText().then(function (texto) {
                    console.log('msg = ' + texto);
                    return texto;
                });
            }
        });
        z.component.footer.clickLeftActionByLabel('Cancelar');
        return notifica;
    };

    this.recalculaMeta = function () {
        z.component.footer.clickRightActionByLabel('Ações');
        var el = element(by.css('#popup > span > section > section > section > div > div > ul > li:nth-child(3)'));
        el.click();
        z.component.alert.clickButton('Sim');
        var el2 = element(by.css('span.notification-message-text.ng-binding'));
        var notificacao = el2.isDisplayed().then(function (banana) {
            if (banana) {
                return el2.getText().then(function (txt) {
                    console.log('msg = ' + txt);
                    return txt;
                });
            };

        });
        z.component.footer.clickLeftActionByLabel('Cancelar');
        return notificacao;
    };
};
module.exports = new meta();