var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');


var manutencaoConta = function () {

    var self = this;
    //refazer essa tela
    this.adicionarFamilia = function(nomeConsumidor, codfamilia, saldo) {
        browser.sleep(3000);
        z.widget.grid.rowExists('NMCONSUMIDOR', nomeConsumidor, '1129274180489907095475').then(function(existeCliente){
            if (existeCliente) {
                z.widget.grid.click('NMCONSUMIDOR', nomeConsumidor, '1129274180489907095475');
                h.navegar('Família de Produto por Consumidor');
                browser.sleep(5000);
                z.component.footer.clickCenterActionByLabel('Adicionar');
                z.field.fieldFunctions.click('CDFAMILISALD');
                var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                inputPesquisa.get(2).sendKeys(codfamilia);  
                browser.sleep(2000); -
                z.widget.grid.click('NMFAMILISALD', codfamilia, '9009');
                browser.sleep(3000);
                browser.executeScript("$('div.zh-validation').remove();");
                var inputSaldo = element(by.id('VRSALDCONFAM'));
                inputSaldo.click();
                inputSaldo.sendKeys(saldo);
                z.component.footer.clickRightActionByLabel('Salvar');
            }
            else {
                console.log('Não clicou');
            }
        })
    };
    this.alterarSaldo = function() {
        browser.sleep(3000);
        z.widget.grid.rowExists('NMCONSUMIDOR', j.getValor('nomeConsumidor'), '1129274180489907095475').then(function(existeCliente){
            if (existeCliente) {
                z.widget.grid.click('NMCONSUMIDOR', j.getValor('nomeConsumidor'), '1129274180489907095475');
                h.navegar('Família de Produto por Consumidor');
                browser.sleep(5000);
                h.editInlineFieldValue('75', 0, 2,'11292741801574629908988', false);
                z.component.footer.clickRightActionByLabel('Salvar alterações');
                z.component.alert.clickButton ('Sim');
            }
            else {
                console.log('Não clicou no Saldo de Bebidas');
            }
        });
    };
    this.aplicaFiltro = function() {
        z.component.popup.isOpened().then(function(existePopup){
            if(existePopup){
                z.component.footer.clickCenterActionByIcon('close-x');
                z.field.fieldFunctions.click('CDFILIAL');
                //obtem o id do grid pela função do helper
                browser.sleep(2000);
                var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                inputPesquisa.get(1).sendKeys(j.getValor('filial'));
                browser.sleep(2000);  
                z.widget.grid.click('NMFILIAL', j.getValor('filial'), '9999');
                z.component.footer.clickRightActionByLabel('Ok');
                //browser.sleep(5000);
                browser.executeScript("$('div.zh-validation').remove();");
                z.field.fieldFunctions.click('NMRAZSOCCLIE');
                browser.sleep(2000);
                var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                inputPesquisa.get(1).sendKeys(j.getValor('cliente'));   
                browser.sleep(3000);
                z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9009');  
                browser.sleep(2000);
                z.component.footer.clickRightActionByLabel('Filtrar');     
            }
        })
    }
    this.aplicarFiltroCliente = function(nomeConsumidor){
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        var inputPesquisa = element(by.css('div.floating-card-input > input'));
        inputPesquisa.sendKeys(nomeConsumidor);
        browser.sleep(3000);
    };

    this.transferirCredito = function(nomeConsumidor,nomeConsumidor2,nomeFamilia, nomeFamiliaDestino, valorTranferido){
        z.component.footer.clickRightActionByLabel('Ações');
        var acaoTransferencia = element(by.css('section > div > div > ul > li:nth-child(1) > div > div'));
        acaoTransferencia.click();
        //Seleciona consumidor origem
        z.field.fieldFunctions.click('NMCONSUMIDOR');
        var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
        inputPesquisa.get(1).sendKeys(nomeConsumidor);
        z.widget.grid.click('NMCONSUMIDOR', nomeConsumidor, '9009');
        //Seleciona família de produtos
        z.field.fieldFunctions.click('NMFAMILISALD');
        var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
        inputPesquisa.get(1).sendKeys(nomeFamilia);
        z.widget.grid.click('NMFAMILISALD', nomeFamilia, '9009');
        browser.sleep(3000);
        //Determina valor a ser transferido
        z.field.fieldFunctions.fill('VALOR',valorTranferido);
        browser.sleep(3000);
        //Seleciona consumidor destino
        z.field.fieldFunctions.click('NMCONSUMIDOR_DESTINO');
        var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
        inputPesquisa.get(1).sendKeys(nomeConsumidor2);
        z.widget.grid.click('NMCONSUMIDOR', nomeConsumidor2, '9009');
        browser.sleep(3000);
        //Seleciona família de produtos destino
        z.field.fieldFunctions.click('NMFAMILISALD_DESTINO');
        var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
        inputPesquisa.get(1).sendKeys(nomeFamiliaDestino);
        z.widget.grid.click('NMFAMILISALD', nomeFamiliaDestino, '9009');
        z.component.footer.clickRightActionByLabel('Transferir');
    };
};
module.exports = new manutencaoConta();