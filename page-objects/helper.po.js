/*this file is destinated to encapsulate all functions of the project Retail Managent by Odhen
Este arquido é destinado para encapsular todas as funções existentes no projeto Retail management by odhen*/
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var moment = require('moment');
var j = require('../json/leitorJson.po.js');

var helper = function () {
    var self = this;
    var today = moment().format('DD/MM/YYYY');
    
    //navega no menu das telas e abre somente a informada no parametro
    this.navegar = function (nome) {
        element(by.cssContainingText('a.ng-binding', nome)).click();
    };

    // filtro para selecionar unidade e loja com autocomplete
    this.filtro = function() {
        self.pesquisaItem('NMFILIAL', j.getValor('filial'));
        self.pesquisaItem('NMLOJA', j.getValor('cdloja'));
        z.component.footer.clickRightActionByLabel('Filtrar');        
    };

    // função para pegar a mensagem e retornar no spec
    this.retornaMensagem = function(){
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
    
    this.filtroGrupoOperador = function(){
        self.pesquisaItem('DSGRUPOPER', j.getValor('grupoOperador'));
        z.component.footer.clickRightActionByLabel('Filtrar');
    };
    
    //filtra a unidade pelo campo código da unidade
    this.filtroUnidade = async function(){
        browser.sleep(5000);
        //verifica se o campo unidade está como '#NMFILIAL'
        if(await z.util.elementExists(by.id('NMFILIAL'))){
            $('#NMFILIAL').click();
        }
        //verifica se o campo unidade está como '#CDFILIAL'
        else if(await z.util.elementExists(by.id('CDFILIAL'))){
            $('#CDFILIAL').click();
        }
        //obtem a id do grid e seleciona a linha que contem a unidade
        z.widget.grid.click('CDFILIAL', j.getValor('cdfilial'), await self.getIdGrid());
    };
    
    //filtra a loja pelo campo código de loja
    this.filtroLoja = function(){
        browser.sleep(5000);
        z.field.fieldFunctions.click('NMLOJA');
        //obtem a id do grid e seleciona a linha que contem a loja
        self.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDLOJA', j.getValor('cdloja'), idGrid);
        });
    };
    
    this.retornaMensagemComCancelar = function(){
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        z.component.footer.clickLeftActionByLabel('Cancelar');
        return msg;
    };

    //  filtro usado quando se tem cliente e unidade na tela 
    this.filtroCliente = function(){
        z.field.fieldFunctions.click('NMRAZSOCCLIE');
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9009');
        this.filtroUnidade();
    };
        
    //caso exista alguma notificação após edição dos dados verifica se existe notificação e recebe seu texto
    this.notificacao = function () {
        var returnNotifica;
        var existe = z.util.elementExists(by.css('.zh-notification-messages li:nth-child(1) .notification-message-text')).then(function (notifica) {
            if (notifica) 
                return true;
            else
                return false;
        });//promise
        if(existe){
            returnNotifica = z.component.notification.getText(0).then(function (texto) {
                if(texto != '')
                    return texto;
            });//promise
        }
        else
            returnNotifica = 'Ok';
        
        return returnNotifica;
    };
    
    //abre a tela desejada pelo menu
    this.tela = function (tela) {
        z.component.menu.open();
        z.component.menu.useSearch(tela);
        z.component.menu.clickByLabel(tela);
    };
    
    //autoComplete usado na tela de parametros da unidade
    this.clicar = function (campo) {
        z.field.fieldFunctions.click(campo);
        //z.util.pressKey(campo);
        z.externalComponent.selectAutocomplete.waitDropdown(campo);
        z.externalComponent.selectAutocomplete.selectOption(campo, '0');
    };
    
    //função para sair do sistema, geralmente usada no afterAll dos specs
    this.sairDoSistema = function () {
        z.component.menu.open();
        z.component.menu.clickByLabel('Sair');
        z.component.alert.clickButton('Sim');
    };
    
    //abre o filtro do campo unidade e seleciona uma unidade existente
    this.unidade = function (unidade) {
        z.util.clickElement(by.css('#CDFILIAL > span.right-search.zh-ripple-effect.zh-icon.zh-icon-search.zh-icon-no-border > svg'));
        browser.sleep(5000);
        self.getIdGrid().then(async function (id) {
            await z.widget.grid.click('CDFILIAL', unidade, id);
        });
    };
    
    //abre o filtro do campo loja e seleciona uma loja existente
    this.loja = function (loja) {
        z.util.clickElement(by.css('#NMLOJA > span > svg'));
        browser.sleep(5000);
        self.getIdGrid().then(async function (id) {
            await z.widget.grid.click('CDLOJA', loja, id);
        });
    };
    
    //pesquisa e seleciona um item em campos com filtro auto-complete
    this.pesquisaItem = function (campo, item) {
        z.field.fieldFunctions.click(campo);
        z.util.elementExists(by.css('.list-items.show-select')).then(function(existe){
            if(existe){
                console.log('abriu lista');
                browser.sleep(5000);
                z.util.pressKey(item);             
            }
        });
        browser.sleep(5000);
        z.util.elementExists(by.css('.list-items.show-select > span:nth-child(1)')).then(function(existe){
            if(existe){
                console.log('abriu lista com resultado : '+campo);
                z.externalComponent.selectAutocomplete.waitDropdown(campo);
                z.externalComponent.selectAutocomplete.selectOption(campo, item);         
            }
            else{
                console.log('não existe resultados : '+campo);
            }
        });
    };
    
    //abre um agrupamento de campos presente na tela
    this.grupoCampos = function (nomeGrupo) {
        var grupos = element.all(by.css('span.zh-label.zh-field-group-label.ng-binding'))
        grupos.each(function (grupo) {
            grupo.getText().then(function (nome, i = 0) {
                if (nomeGrupo == nome) {
                    var idGrupo = element.all(by.css('span.zh-icon.zh-icon-down.zh-icon-no-border.closed')).get(i).isPresent().then(function (close) {
                        if (close)
                            grupo.click();
                    });
                }
                i++;
            })
        });
    };
    
    //fecha algumas telas do tipo swipe, popup e alert que ficou aberta após a execução dos it
    this.fechaTela = function () {
        browser.sleep(5000);
        z.component.alert.isVisible().then(function (alertPresent) {
            if (alertPresent)
                z.component.alert.clickMessageOk();
        });//promise isVisible
        z.swipe.isPresent().then(function (present) {
            if (present) {
                z.component.footer.isLeftActionByLabelPresent('Cancelar').then(function (cancelPresent) {
                    if (cancelPresent)
                        z.component.footer.clickLeftActionByLabel('Cancelar');
                });//promise isLeftActionByLabelPresent
            }
        });//promise isPresent
        z.swipe.isPresent().then(function (present) {
            if (present) {
                z.component.footer.isLeftActionByLabelPresent('Voltar').then(function (voltarPresent) {
                    if (voltarPresent)
                        z.component.footer.clickLeftActionByLabel('Voltar');
                });//promise    			
            }
        });//promise isPresent
        z.component.popup.isOpened().then(function (opened) {
            if (opened)
                z.component.footer.clickLeftActionByLabel('Voltar');
        });//promise isOpened
    };

    //define o id do grid disponível na tela, o indice é opcional por padrão é 0 para unico grid da tela.
    this.getIdGrid = function () {
        //verifica se o grid está dentro de um popup
        var hasPopup = z.component.popup.isOpened();
        var indice = hasPopup.then(async function (open) {
            //caso exista mais de dois grids na tela, o do popup será o último
            if (open && await element.all(by.css('div.zh-new-grid.zh-new-grid')).count() > 1)
                return await element.all(by.css('div.zh-new-grid.zh-new-grid')).count() - 1;
            //caso exista somente um grid na tela, da tela principal ou do popup
            else
                return await 0;
        });
        var grid = element.all(by.css('div.zh-new-grid.zh-new-grid')).get(indice).getAttribute('id');
        return grid.then(async function (id) {
            return await id.substring(5);
        });
    };

    //verifica se o grid esta vazio, retorna true para vazio.
    this.gridSemRegistros = function (grid) {
        return z.util.elementExists(by.css('#grid-' + grid + ' > div.body > div > div > div > ng-include > p')).then(async function (vazio) {
            return await vazio;
        });
    };

    //recebe e verifica os resultados da pesquisa enviadas para o grid se estão de acordo com a referencia passado no parâmetro
    this.existeResultadoGrid = async function(referencia){        
        var existeReferencia = false; 
        //obtem a id do grid
        var idGrid = await self.getIdGrid();
        //obtem o total de colunas presente no grid atraves da id do grid
        var totalCols = await z.widget.grid.getNrColumns(idGrid);
        //obtem o nome do campo da primeira coluna do grid
        var primeiraColuna = await element(by.css('#grid-'+idGrid+' > div.body > div > div > div:nth-child(1)')).getAttribute('data-zh-field-name');
        //obtem o total de linha presente no grid atraves do nome campo da primeira coluna
        var totalRows = await element.all(by.css('#grid-'+idGrid+' > div.body > div > div')).count();   
        for(var linha = 0; linha < totalRows; linha++){
            for(var coluna = 0, resultado = ''; coluna < totalCols; coluna++){
                //obtem o valor da linha do grid retornado após a pesquisa
                resultado = await z.widget.grid.getText(idGrid, linha, coluna);
                //verifica se a referência enviada da pesquisada é igual ao resultado exibido no grid e sinaliza como verdadeiro
                if(referencia == resultado){
                    existeReferencia = true;
                }
            }
        }
        //retorna verdadeiro ou falso a existencia da informação no grid
        return existeReferencia;
    };
    
    //select native alternativo ao da api, para selecionar opções dentro de listas
    this.selectNative = function(campo, opcao){
        element(by.css("select[id='"+campo+"']")).element(by.xpath("..")).element(by.css("div.new-select")).click();
        browser.sleep(3000);
        element(by.cssContainingText('div.new-select.open > ul > li.option', opcao)).click();
    };

    //selectIntervalDate alterantivo da api, seleciona um intervalo de datas para um campo do tipo calendar
    this.selectIntervalDate = function(campo, dataInicial, dataFinal){
        //array contendo todos os meses do campo tipo calendar em pt_br
        var meses = {
            1: 'Jan',
            2: 'Fev',
            3: 'Mar',
            4: 'Abr',
            5: 'Mai',
            6: 'Jun',
            7: 'Jul',
            8: 'Ago',
            9: 'Set',
            10: 'Out',
            11: 'Nov',
            12: 'Dez'
        }
        //quebra a string das datas inicial e final e coloca no array separando o dia mes e ano
        var arrayDataInicial = dataInicial.split('/');
        var arrayDataFinal = dataFinal.split('/');
        //recebe o dia o mes e o ano inicial do array de data inicial
        var diaInicial = parseInt(arrayDataInicial[0]);
        var mesInicial = parseInt(arrayDataInicial[1]);
        var anoInicial = parseInt(arrayDataInicial[2]);
        //recebe o dia o mes e o ano inicial do array de data final
        var diaFinal = parseInt(arrayDataFinal[0]);
        var mesFinal = parseInt(arrayDataFinal[1]);
        var anoFinal = parseInt(arrayDataFinal[2]);             

        //clica no campo do tipo calendar
        z.field.fieldFunctions.click(campo);
        //seleciona o ano inicial
        z.util.clickElement(by.css('.calendar-heading'));
        z.util.clickElement(by.css('.calendar-heading'));
        z.field.calendar.clickYear(anoInicial);
        //seleciona o mes inicial
        z.field.calendar.clickMonth(meses[mesInicial]);
        //seleciona o dia inicial
        z.field.calendar.clickDay(diaInicial);
        //seleciona o ano final
        z.util.clickElement(by.css('.calendar-heading'));
        z.util.clickElement(by.css('.calendar-heading'));
        z.field.calendar.clickYear(anoFinal);
        //seleciona o mes final
        z.field.calendar.clickMonth(meses[mesFinal]);
        //seleciona o dia final
        z.field.calendar.clickDay(diaFinal);
    };
};
module.exports = new helper();