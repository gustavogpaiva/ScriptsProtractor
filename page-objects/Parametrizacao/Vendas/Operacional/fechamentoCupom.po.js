var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var moment = require('moment');
var h = require('../../../../page-objects/helper.po.js');

var fecharCupom = function(){
    var self = this;
    
    //função para sempre pegar o dia atual da execução do teste e um dia após
    var past2years = moment().format('DD/MM/YYYY');
    var tomorrow = moment(past2years, 'DD/MM/YYYY').subtract(2, "years").format('DD/MM/YYYY');
    
    this.filtrarCupons = async function(periodo){
        var arrayDatas = periodo.split(' - ');
        if(await z.component.popup.isOpened()){
            z.component.footer.clickCenterActionByIcon('close-x');
            browser.executeScript("$('div.zh-validation').remove();");
            browser.sleep(5000);
            //arrayDatas[0] = data inicial, arrayDatas[1] = data final
            h.selectIntervalDate('DTREDUCAOZ', arrayDatas[0], arrayDatas[1]);
            z.component.footer.clickRightActionByLabel('OK');
            
            browser.wait(h.filtroUnidade(), 10000);
            z.component.footer.clickRightActionByLabel('Ok');

            browser.sleep(5000);
            z.field.fieldFunctions.click('CDCAIXAFILI');
            var idGrid = await h.getIdGrid();
            z.widget.grid.checkAllRows(idGrid);
            if(await z.component.alert.isVisible())
                z.component.alert.clickButton('Sim');
            browser.sleep(5000);
            z.component.footer.clickRightActionByLabel('Ok');

            browser.sleep(5000);
            z.field.fieldFunctions.click('IDSTATUS');
            var idGrid = await h.getIdGrid();
            z.widget.grid.checkAllRows(idGrid);
            if(await z.component.alert.isVisible())
                z.component.alert.clickButton('Sim');
            browser.sleep(5000);
            z.component.footer.clickRightActionByLabel('Ok');

            browser.sleep(5000);
            z.field.fieldFunctions.click('IDORIGEMREDZ');
            var idGrid = await h.getIdGrid();
            z.widget.grid.checkAllRows(idGrid);
            if(await z.component.alert.isVisible())
                z.component.alert.clickButton('Sim');
            browser.sleep(5000);
            z.component.footer.clickRightActionByLabel('Ok');
            z.component.footer.clickRightActionByLabel('Filtrar');
        }        
    };

    this.cupom = async function(){
        //aguarda a tela exibir os cupons emitido na loja
        if(!await h.gridSemRegistros(await h.getIdGrid())){
            return true;
        }
        //caso não houver vendas para periodo de vendas informado
        else{
            return 'Não foram realizadas vendas para o período.';
        }    
    };

    this.fechamentoCupom = async function(periodo){
        var idGrid = await h.getIdGrid();
        var arrayDatas  = periodo.split(' - ');

        if(!await h.gridSemRegistros(idGrid)){
            //abre o widget para pesquisar um cupom pela data inicial
            z.component.floatingControl.toggle();
            z.component.floatingControl.selectAction('search');
            z.util.pressKey(arrayDatas[0]);
            browser.sleep(5000);
            //se o grid estiver vazio tenta pesquisar pela data final
            if(await h.gridSemRegistros(idGrid)){
                element(by.css('div.floating-card-input > input')).clear();
                browser.sleep(3000);
                element(by.css('div.floating-card-input > input')).click();
                z.util.pressKey(arrayDatas[1]);
                browser.sleep(5000);
            }
            //apaga a data informada no campo de pesquisa e volta filtrar todos cupons
            else{
                element(by.css('div.floating-card-input > input')).clear();
                browser.sleep(5000);
                if(await h.gridSemRegistros(idGrid))
                    return 'Não foram encontrados cupons.';
            }
            //após pesquisar seleciona uma das notas disponiveis no grid
            z.widget.grid.clickColumn(idGrid, 0, 0, true);

            //verifica se os campos obrigatórios estão preenchidos com as informações do cupom
            var erros = '';
            if(await element(by.id('span-field-DTREDUCAOZ')).getText() == '')
                erros = erros.concat('A data do cupom não foi exibida. ');
            if(await element(by.id('span-field-CDFILIAL')).getText() == '')
                erros = erros.concat('O código da unidade não foi exibido. ');
            if(await element(by.id('span-field-NMFILIAL')).getText() == '')
                erros = erros.concat('O nome da unidade não foi exibido. ')
            if(await element(by.id('span-field-CDCAIXA')).getText() == '')
                erros = erros.concat('O código do caixa não foi exibido. ');
            if(await element(by.id('span-field-NMCAIXA')).getText() == '')
                erros = erros.concat('A descrição do caixa não foi exibida. ');
            if(await element(by.id('span-field-IDORIGEMREDZ')).getText() == '')
                erros = erros.concat('Origem da nota não foi exibida. ');
            if(await element(by.id('span-field-IDSTATUS')).getText() == '')
                erros = erros.concat('Status da nota não foi exibido. ');

            if(erros != '')
                return erros;
            else
                return true;
        }
    };

    this.imposto = async function(){
        h.navegar('Imposto');
        browser.sleep(5000);
        if(!await h.gridSemRegistros('5338086941466967270643')){
            browser.sleep(5000);
            var imposto = await element(by.css('#grid-5338086941466967270643 div.body-content>div:nth-child(1)>div:nth-child(1)>span')).getText();
            var percentual = await element(by.css('#grid-5338086941466967270643 div.body-content>div:nth-child(1)>div:nth-child(2)>span')).getText();
            var valorBase = await element(by.css('#grid-5338086941466967270643 div.body-content>div:nth-child(1)>div:nth-child(3)>span')).getText();
            var valorImposto = await element(by.css('#grid-5338086941466967270643 div.body-content>div:nth-child(1)>div:nth-child(4)>span')).getText();

            if(imposto == '')
                return 'Imposto não foi exibido.';
            else if(await parseFloat(percentual) * await parseFloat(valorBase) == await parseFloat(valorImposto))
                return true;
            else
                return 'O valor do imposto está incorreto.';
        }
        else{
            return 'Não foram encontrados impostos.';
        }
    };

    this.venda = async function(){
        h.navegar('Venda');
        browser.sleep(5000);
        if(!await h.gridSemRegistros('5338086943979267505653')){
            browser.sleep(5000);
            var situacao    = await h.gridGetText('5338086943979267505653', 1, 1);
            var caixa       = await h.gridGetText('5338086943979267505653', 1, 2);
            var nrVenda     = await h.gridGetText('5338086943979267505653', 1, 3);
            var nrCupom     = await h.gridGetText('5338086943979267505653', 1, 4);
            var chave       = await h.gridGetText('5338086943979267505653', 1, 5);
            var dtmovimento = await h.gridGetText('5338086943979267505653', 1, 6);
            var hrvenda     = await h.gridGetText('5338086943979267505653', 1, 7);
            var cliente     = await h.gridGetText('5338086943979267505653', 1, 8);
            //move o scroll da tela para direita
            z.util.mouseMoveByAxis('#grid-5338086943979267505653 > div.body-scroll-control', -200, 0, 5);
            browser.sleep(5000);
            var tipoVenda   = await h.gridGetText('5338086943979267505653', 1, 11);

            var erros = '';
            if(situacao != 'Concluída')
                erros = erros.concat('Venda não foi concluída. ');
            if(caixa == '')
                erros = erros.concat('Caixa não foi exibido. ');
            if(nrVenda == '')
                erros = erros.concat('Número da venda não foi exibido. ');
            if(nrCupom == '' && chave == '')
                erros = erros.concat('Cupom e Chave de acesso não foi exibido. ');
            if(dtmovimento == '' && dtmovimento != await h.gridGetText('5338086944003091545642', 1, 2))
                erros = erros.concat('Data do movimento é diferente da data do fechamento do cupom. ');
            if(hrvenda == '')
                erros = erros.concat('Hora da venda não foi exibido. ');
            if(tipoVenda == '')
                erros = erros.concat('Tipo de venda não foi exibido. ');
            //se não foi encontrados erros nas vendas retorna true para o spec senão devole os erros.
            if(erros == '')
                return true;
            else
                return erros;
        }
        else{
            return 'Não foram encontradas vendas.';
        }
    };

    this.recebimento = async function(moeda){
        h.navegar('Recebimento');
        browser.sleep(5000);
        if(!await h.gridSemRegistros('5338086943869647388675')){
            browser.sleep(5000);
            var codTipoRece     = await h.gridGetText('5338086943869647388675', 1, 1);
            var nomeTipoRece    = await h.gridGetText('5338086943869647388675', 1, 2);
            var valorTipoRece   = await h.gridGetText('5338086943869647388675', 1, 3);
            var valorOutraMoeda = await h.gridGetText('5338086943869647388675', 1, 4); 

            var erros = '';
            if(codTipoRece == '')
                erros = erros.concat('Código do tipo de recebimento não foi exibido. ');
            if(nomeTipoRece == '')
                erros = erros.concat('O nome do tipo de recebimento não foi exibido. ');
            if(valorTipoRece == '')
                erros = erros.concat('O valor do recebimento não foi exibido. ');
            if(valorOutraMoeda == '' && nomeTipoRece.indexOf(moeda) >= 0)
                erros = erros.concat('O valor de outras moedas não foi exibido. ');

            if(erros == '')
                return true;
            else
                return erros;
        }
        else{
            return 'Não foram encontrados tipos de recebimento.';
        }
    };

    this.conferenciaFiscal = async function(){
        var totalReceber = 0;
        var totalImposto = 0;
        if(!await h.gridSemRegistros('5338086943869647388675')){
            var linhas = await h.gridGetNrRows('5338086943869647388675');

            for(i = 1; i <= linhas; i++){
                var valor = (await h.gridGetText('5338086943869647388675', i, 3)).replace('.','').replace(',','.');
                totalReceber += parseFloat(valor);
            }
            totalReceber = totalReceber.toFixed(2);
        }
        
        h.navegar('Imposto');
        browser.sleep(5000);
        if(!await h.gridSemRegistros('5338086941466967270643')){
            var linhas = await h.gridGetNrRows('5338086941466967270643');

            for(i = 1; i <= linhas; i++){
                var valor = (await h.gridGetText('5338086941466967270643', i, 3)).replace('.','').replace(',','.');
                totalImposto += parseFloat(valor);
            }
            totalImposto = totalImposto.toFixed(2);
        }
        
        h.navegar('Fechamento de Cupom');
        z.widget.grid.checkRow('5338086944003091545642', 0, true);
        z.component.footer.clickLeftActionByLabel('Voltar');            
        z.component.footer.clickRightActionByLabel('Ações');            
        browser.sleep(3000);
        element(by.cssContainingText('div.zh-first-large > div.col-xs-12 > span.ng-binding','Conferência Fiscal')).click();

        //verifica se exibe algum alerta após clicar na opção Conferência fiscal
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }

        browser.sleep(10000);
        var dataEmissao     = await h.gridGetText('533808694831710114732',4, 1);
        var numeroNota      = await h.gridGetText('533808694831710114732',4, 2);
        var valorNota       = (await h.gridGetText('533808694831710114732',4, 3)).replace('.','').replace(',','.');
        var valorBaseICMS   = (await h.gridGetText('533808694831710114732',4, 6)).replace('.','').replace(',','.');
        //move o scroll da tela para direita
        z.util.mouseMoveByAxis('#grid-533808694831710114732 > div.body-scroll-control', -50, 0, 5);
        browser.sleep(5000);
        var valorICMS       = (await h.gridGetText('533808694831710114732',4, 7)).replace('.','').replace(',','.');
        var valorBasePis    = (await h.gridGetText('533808694831710114732',4, 8)).replace('.','').replace(',','.');
        var valorPis        = (await h.gridGetText('533808694831710114732',4, 9)).replace('.','').replace(',','.');
        var valorBaseCofins = (await h.gridGetText('533808694831710114732',4, 10)).replace('.','').replace(',','.');
        var valorST         = (await h.gridGetText('533808694831710114732',4, 11)).replace('.','').replace(',','.');

        var erros = '';
        if(dataEmissao != await h.gridGetText('5338086944003091545642',1, 2))
            erros = erros.concat('Data de emissão está diferente. ');
        if(numeroNota == '')
            erros = erros.concat('Número da nota não foi exibido. ');
        if(parseFloat(valorNota) != totalReceber)
            erros = erros.concat('Valor da nota diferente do total de recebimentos. ');
        if(parseFloat(valorBaseICMS) != totalImposto)
            erros = erros.concat('Valor base ICMS diferente do total de impostos. ');
        if(parseFloat(valorBasePis) != totalReceber)
            erros = erros.concat('Valor base PIS diferente do total de recebimentos. ');
        if(parseFloat(valorBaseCofins) != totalReceber)
            erros = erros.concat('Valor base COFINS diferente do total de recebimentos. ');
        //volta para o grid principal da tela fechamento de cupom e desmarca o cupom selecionado

        z.component.footer.clickLeftActionByLabel('Voltar');
        z.widget.grid.clickColumn('5338086944003091545642', 0, 0, true);

        //se não houve erros na verificação dos valores retorna true para o spec, ou retorna os erros para o spec
        if(erros == '')
            return true;
        else
            return erros;
    };

    this.conferenciaFinanceiro = async function(moeda){
        var idGrid = await h.getIdGrid();
        var recebimentos = [];
        var codigo;
        var nome;
        var valor;
        var outrasMoedas;
        if(self.cupom() === true){
            z.widget.grid.clickColumn(idGrid, 0, 0, true);
            h.navegar('Recebimento');
            browser.sleep(5000);
        }
        else{
            return self.cupom();
        }
        if(!await h.gridSemRegistros('5338086943869647388675')){
            for(var i = 1; i <= parseInt(await h.gridGetNrRows('5338086943869647388675')); i++){
                codigo       = await h.gridGetText('5338086943869647388675', i, 1);
                nome         = await h.gridGetText('5338086943869647388675', i, 2);
                valor        = await h.gridGetText('5338086943869647388675', i, 3);
                outrasMoedas = await h.gridGetText('5338086943869647388675', i, 4);
                browser.sleep(3000);
                //insere no array de recebimentos os tipos de recebimentos exibidos na tela de recebimento do fechamento de cupom
                await recebimentos.push({"codigo":codigo, "nome":nome, "valor":valor, "outrasMoedas":outrasMoedas});
            }
            h.navegar('Fechamento de Cupom');
            z.widget.grid.checkRow('5338086944003091545642', 0, true);
            z.component.footer.clickLeftActionByLabel('Voltar');            
            z.component.footer.clickRightActionByLabel('Ações');            
            browser.sleep(5000);
            await element(by.cssContainingText('div.zh-first-large > div.col-xs-12 > span.ng-binding','Conferência Financeiro')).click();    
            
            //verifica se exibe algum alerta após clicar na opção Conferência fiscal
            if(await z.component.alert.isVisible()){
                var alerta = z.component.alert.getText();
                z.component.alert.clickButton('OK');
                return alerta;
            }    

            await browser.sleep(10000);
            var erros = '';
            var i = 4;
            while(await recebimentos.length > 0){
                var tipoRece = await recebimentos.shift();
                codigo  = await h.gridGetText('5338086942773391276718', i, 1);
                nome    = await h.gridGetText('5338086942773391276718', i, 2);
                valor   = await h.gridGetText('5338086942773391276718', i, 3);

                if(tipoRece["codigo"] !== codigo)
                    erros = erros.concat('Código do recebimento está diferente do fechamento de cupom. ');
                if(tipoRece["nome"] !== nome)
                    erros = erros.concat('Nome do recebimento está diferente do fechamento de cupom. ');
                if(tipoRece["valor"] !== valor)
                    erros = erros.concat('O valor do recebimento está diferente do fechamento de cupom. ');
                if(await h.gridGetText('5338086942773391276718', i, 4) === '')
                    erros = erros.concat('Data de vencimento não foi exibido. ');
                if(await h.gridGetText('5338086942773391276718', i, 5) === 'Baixado' && await h.gridGetText('5338086942773391276718', i, 6) == '')
                    erros = erros.concat('Data da baixa não foi exibida na conferência. ');
                if(await h.gridGetText('5338086942773391276718', i, 5) === '')
                    erros = erros.concat('Status não foi exibido. ');
                if(await h.gridGetText('5338086942773391276718', i, 7) === '')
                    erros = erros.concat('Tipo de conta não foi exibido. ');
                if(await h.gridGetText('5338086942773391276718', i, 8) === '')
                    erros = erros.concat('O nome do tipo de conta não foi exibido. ');
                if((await h.gridGetText('5338086942773391276718', i, 2)).indexOf(moeda) >= 0 && valor != tipoRece["outrasMoedas"])
                    erros = erros.concat('O valor do recebimento está diferente de outras moedas do fechamento de cupom. ');
                i++;
            }

            //volta para o grid principal da tela fechamento de cupom e desmarca o cupom selecionado
            z.component.footer.clickLeftActionByLabel('Voltar');
            z.widget.grid.clickColumn('5338086944003091545642', 0, 0, true);
            //caso não tem erros na verificação dos campos retorna true para o spec ou a descrição dos erros.
            if(erros == '')
                return true;
            else
                return erros;
        }
        else{
            return 'Não foram encontrados tipos de recebimento.';
        }
    };

    this.conferenciaContabilidade = async function(moeda){
        var idGrid = await h.getIdGrid();
        //verifica se o grid não está vazio e seleciona o primeiro cupom para conferência
        if(!await h.gridSemRegistros(idGrid)){
            z.widget.grid.clickColumn(idGrid, 0, 0, true);
            z.widget.grid.checkRow(idGrid, 0, true);
            z.component.footer.clickRightActionByLabel('Ações');            
            browser.sleep(5000);
            await element(by.cssContainingText('div.zh-first-large > div.col-xs-12 > span.ng-binding','Conferência Contabilidade')).click(); 
        }
        //caso não houver vendas para periodo de vendas informado
        else{
            return 'Não foram realizadas vendas para o período.';
        }
        //verifica se exibe algum alerta após clicar na opção Conferência fiscal
        if(await z.component.alert.isVisible()){
            var alerta = z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }
        else
            return true;
    };

    this.cancelar = async function(){
        var idGrid = await h.getIdGrid();
        //verifica se o grid não está vazio e seleciona o primeiro cupom para conferência
        if(!await h.gridSemRegistros(idGrid)){
            z.widget.grid.clickColumn(idGrid, 0, 0, true);
            z.widget.grid.checkRow(idGrid, 0, true);
            z.component.footer.clickRightActionByLabel('Ações');            
            browser.sleep(5000);
            await element(by.cssContainingText('div.zh-first-large > div.col-xs-12 > span.ng-binding','Cancelar')).click(); 
        }
        //caso não houver vendas para periodo de vendas informado
        else{
            return 'Não foram realizadas vendas para o período.';
        }
        //verifica se exibe algum alerta após clicar na opção Conferência fiscal
        if(await z.component.alert.isVisible()){
            var alerta = z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }
        else
            return true;  
    };
};
module.exports = new fecharCupom();