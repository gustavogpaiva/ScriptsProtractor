var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var bloqueioDeCartao = function (){
        
    this.aplicaFiltroTela = function(numeroCartao, consumidor, cpfConsumidor, situacao){
        z.component.popup.isOpened().then(function(existePopup){
            if(existePopup){
                z.field.fieldFunctions.fill('CDIDCONSUMID', numeroCartao);
                z.field.fieldFunctions.fill('NMCONSUMIDOR', consumidor);
                z.field.fieldFunctions.fill('NRCPFRESPCON', cpfConsumidor);
                z.field.selectNative.click('IDSITCONSUMI', situacao);
                z.component.footer.clickRightActionByLabel('Filtrar');
                console.log('Filtro aplicado');
            }
        });

    };

    this.bloqueioDesbloqueioCartaoGrid = function(nomeConsumidor, acao){
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        var inputPesquisa = element(by.css('div.floating-card-input > input'));
        inputPesquisa.sendKeys(nomeConsumidor);
        browser.sleep(2000);
        z.widget.grid.rowExists('NMCONSUMIDOR', nomeConsumidor, '11855205933641054972385').then(function(existeCliente){
            z.widget.grid.checkRow('11855205933641054972385', 0, true);
            z.component.footer.clickCenterActionByLabel(acao);
        });
        console.log('Ação de '+ acao +' no Grid realizada'); 
    };

    
    this.bloqueioDesbloqueioPorIntervalo = function(nomeConsumidor, acao){
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        var inputPesquisa = element(by.css('div.floating-card-input > input'));
        inputPesquisa.sendKeys(nomeConsumidor);
        browser.sleep(2000);
        z.widget.grid.checkRow('11855205933641054972385', 0, true);
        z.widget.grid.checkRow('11855205933641054972385', 1, true);
        z.widget.grid.checkRow('11855205933641054972385', 2, true);
        z.component.footer.clickCenterActionByLabel(acao);
        console.log('Ação de '+ acao +' por intervalo realizada'); 
    };
    
    this.bloqueioDesbloqueioCartaoTela = function(nomeConsumidor, acao){
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        var inputPesquisa = element(by.css('div.floating-card-input > input'));        
        inputPesquisa.sendKeys(nomeConsumidor);
        browser.sleep(2000);
        z.widget.grid.rowExists('NMCONSUMIDOR', nomeConsumidor, '11855205933641054972385').then(function(existeCliente){
            z.widget.grid.click('NMCONSUMIDOR',nomeConsumidor,'11855205933641054972385');
            z.component.footer.clickCenterActionByLabel(acao);
        });
        console.log('Ação de '+ acao +' na Tela realizada'); 

    };



};
module.exports = new bloqueioDeCartao();