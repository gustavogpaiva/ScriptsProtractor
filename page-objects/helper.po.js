/*this file is destinated to encapsulate all functions of the project Retail Managent by Odhen
Este arquido é destinado para encapsular todas as funções existentes no projeto Retail management by odhen*/
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../json/leitorJson.po.js');
const protractorHelper = require('protractor-helper');

var helper = function () {
    var self = this;
    
    //navega nas abas das telas e abre somente a informada no parametro
    this.navegar = function(aba){
        element(by.cssContainingText('a.ng-binding', aba)).click();
        console.log('Clicou na aba '+ aba);
    };

    //verifica se uma aba está presente na tela
    this.verificarAba = function(aba){
        return element.all(by.css('a.ng-binding')).count().then(function(qtde){
            return element.all(by.css('a.ng-binding')).getText().then(function(abas){
                //verifica se dentro do array contém uma aba com o nome passado por parâmetro
                for(var i = 0; i < qtde;i++){
                    if(abas[i].includes(aba))     
                        return true;
                }
                //caso não encontre a aba retorna a mensagem
                console.log('Não existe a aba '+aba);
                return 'Não existe a aba '+aba;
            });
        });
    };

    // filtro para selecionar unidade e loja com autocomplete
    this.filtro = function(){
        self.autoComplete('NMFILIAL', j.getValor('filial'));
        self.autoComplete('NMLOJA', j.getValor('cdloja'));
        z.component.footer.clickRightActionByLabel('Filtrar');        
    };
    
    //filtra a unidade pelo campo código ou nome da unidade
    this.filtroUnidade = function(){
        browser.sleep(5000);
        //verifica se o campo unidade está como '#NMFILIAL'
        z.util.elementExists(by.id('NMFILIAL')).then(function(nmfilial){
            if(nmfilial){
                //$('#NMFILIAL').click();
                var e = element(by.css('#NMFILIAL'));    
                browser.executeScript("arguments[0].click();", e.getWebElement());    
            }
        });
        //verifica se o campo unidade está como '#CDFILIAL'
        z.util.elementExists(by.id('CDFILIAL')).then(function(cdfilial){
            if(cdfilial){
                //$('#NMFILIAL').click();
                var e = element(by.css('#CDFILIAL'));    
                browser.executeScript("arguments[0].click();", e.getWebElement());    
            }
        });
        browser.sleep(5000);
        self.getIdGrid().then(function(idGrid){
            //verifica se a unidade existe no grid e seleciona
            z.widget.grid.rowExists('CDFILIAL', j.getValor('cdfilial'), idGrid).then(function(existeUnidade){
                if(existeUnidade){
                    //obtem a id do grid e seleciona a linha que contem a unidade
                    z.widget.grid.click('CDFILIAL', j.getValor('cdfilial'), idGrid);       
                }
                //caso a unidade não exista cancela e volta para tela anterior
                else
                    z.component.footer.clickLeftActionByLabel('Cancelar');
            });
        });
    };
    
    //filtra a loja pelo campo código de loja
    this.filtroLoja = function(){
        browser.sleep(5000);
        //z.field.fieldFunctions.click('NMLOJA');
        var e = element(by.css('#NMLOJA'));
        browser.executeScript("arguments[0].click();", e.getWebElement());
        browser.sleep(5000);
        //obtem a id do grid e seleciona a linha que contem a loja
        self.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDLOJA', j.getValor('cdloja'), idGrid);
        });
    };

    //filtra os caixas da loja
    this.filtroCaixa = async function(){
        browser.sleep(5000);
        //verifica se o id do campo está como 'NMCAIXA'
        if(await z.util.elementExists(by.id('NMCAIXA')))
            await browser.executeScript("arguments[0].click();", await element(by.css('#NMCAIXA')).getWebElement());
        //verifica se o id do campo está como 'CDCAIXA'
        else if(await z.util.elementExists(by.id('CDCAIXA')))
            await browser.executeScript("arguments[0].click();", await element(by.css('#CDCAIXA')).getWebElement());
        browser.sleep(5000);
        var idGrid = await self.getIdGrid();
        //verifica se o caixa existe no grid e seleciona
        if(await z.widget.grid.rowExists('CDCAIXA', j.getValor('cdcaixa'), idGrid)){
            //obtem o id do grid e seleciona a linha que contem o caixa
            z.widget.grid.click('CDCAIXA', j.getValor('cdcaixa'), idGrid);
        }
        //caso o caixa não existe cancela e volta para tela anterior
        else{
            z.component.footer.clickLeftActionByLabel('Cancelar');
        }
    };

    //clica no icone de lupa do campo para abrir o popup, filtra a informação e seleciona no grid o resultado
    this.filtroCampo = function(campo, informacao){
        //verificar se o campo está preenchido com alguma informação, e clica no ícone para remover
        z.util.elementExists(by.css('#' + campo + ' > span.zh-icon.zh-icon-close-x')).then(function(selecionado){
            if(selecionado)
                self.click('#' + campo + ' > span.zh-icon.zh-icon-close-x');
        });
        //abre o popup para filtrar uma informação no grid
        self.click('#' + campo + ' > span');
        //verifica se o widget de pesquisa não está aberto e tenta abri-lo
        z.component.floatingControl.isOpened().then(function(aberto){
            if(!aberto){
                z.component.floatingControl.toggle();    
                z.component.floatingControl.selectAction('search');
            }            
        });
        //altera a opção de filtrar para Todos os campos
        self.click('span.floating-card-search-field');
        element.all(by.css('div.floating-card-search-field-select.opened > ul > li > span.ng-binding')).each(function(filtros){
            filtros.getText().then(function(filtro){
                if(filtro === 'Todos os Campos')
                    filtros.click();
            });
        });
        //envia a informação a ser pesquisado no grid
        browser.sleep(5000);
        self.click('div.floating-card-input > input');
        self.sendKeys('div.floating-card-input > input', informacao);
        browser.sleep(3000);
        //obtem a id do grid do popup
        self.getIdGrid().then(function(idGrid){
            //verifica se a informação existe no grid após processar a pesquisa e seleciona o primeiro encontrado
            self.gridSemRegistros(idGrid).then(function(semRegistros){
                if(!semRegistros)
                    z.widget.grid.clickColumn(idGrid, 0 , 0);
                else
                    z.component.footer.clickLeftActionByLabel('Cancelar');
            });
        });
    };

    //clica em um elemento disponível na tela através do seu locator
    this.click = function(locator){
        //busca o elemento disponível e tenta clicar 
        var elementos = element.all(by.css(locator));
        elementos.each(function (el) {
            el.isDisplayed().then(function (displayed) {
                if (displayed) {
                    try {
                        el.click();
                    } catch (erro) {
                        console.log(erro);
                    }
                }
            });
        });
    };

    //envia um valor para os inputs disponível na tela através do seu locator
    this.sendKeys = function(locator, valor){
        //busca o elemento disponível, tenta clicar e depois envia a valor para o input
        var elementos = element.all(by.css(locator));
        elementos.each(function (el) {
            el.isDisplayed().then(function (displayed) {
                if (displayed) {
                    try {
                        el.sendKeys(valor);
                    } catch (erro) {
                        console.log(erro);
                    }
                }
            });
        });
    };
    
    //abre o menu, digita o nome da tela, aguarda exibir a tela e seleciona na lista 
    this.tela = function (tela) {
        z.component.menu.open();
        z.component.menu.useSearch(tela);
        protractorHelper.waitForElementVisibility(element(by.css('.menu-title.ng-binding')));
        //z.component.menu.clickByLabel(tela);
        browser.executeScript("$('span.menu-title.ng-binding').click();");
    };

    /* procura a tela pelo caminho disponível no menu, passando como parâmetro um array contendo o caminho
     * caminhoDaTela = ['Parametrização', 'Vendas', 'Parâmetros de Gestão de Vendas', 'Parâmetros Gerais'] */
    this.abrirTela = (caminhoDaTela) => {
        z.component.menu.open();
        protractorHelper.waitForElementVisibility(element(by.css('.menu-overlay')));
        z.component.menu.clickByPath(caminhoDaTela);
    };
    
    //função para sair do sistema, geralmente usada no afterAll dos specs
    this.sairDoSistema = function () {
        z.component.menu.open();
        z.component.menu.clickByLabel('Sair');
        z.component.alert.clickButton('Sim');
    };
    
    //pesquisa e seleciona um item em campos com filtro auto-complete
    this.autoComplete = function (campo, item) {
        self.campoClicavel(campo).then(function(clicavel){
            console.log('Campo : '+campo+' clicável = '+clicavel);
            if(clicavel){
                //busca o campo disponível e tenta clicar para abrir a lista com as opções
                self.click('#' + campo);
                browser.sleep(5000);
                z.util.elementExists(by.css('.list-items.show-select')).then(function(existe){
                    if(existe){
                        console.log('abriu lista');
                        browser.sleep(5000);
                        $('#' + campo + ' > input').sendKeys(item);                        
                    }
                });
            }
        });
        //verifica se após digitar a pesquisa o resultado será selecionado na lista autocomplete
        browser.sleep(5000);
        z.util.elementExists(by.css('.list-items.show-select > span.selected')).then(function(existe){
            if(existe){
                browser.sleep(5000);
                console.log('abriu lista com resultado selecionado: '+campo);
                z.externalComponent.selectAutocomplete.waitDropdown(campo);
                z.externalComponent.selectAutocomplete.selectOption(campo, item);         
            }
            else if(!existe){
                //senão verifica se o resultado aparece mas não foi selecionado
                z.util.elementExists(by.css('.list-items.show-select > span')).then(function(resultado){
                    if(resultado){
                        browser.sleep(5000);
                        console.log('abriu lista com resultado: '+campo);
                        self.click('.list-items.show-select > span');
                    }
                });
            }
            else{
                console.log('não existe resultados : '+campo);
            }
        });
    };

    //verifica se um agrupamento de campos existe na tela
    this.verificarGrupoCampos = function(nomeGrupo){
        return element.all(by.css('span.zh-label.zh-field-group-label.ng-binding')).count().then(function(qtde){
            return element.all(by.css('span.zh-label.zh-field-group-label.ng-binding')).getText().then(function(grupos){
                //verifica se dentro do array contém um grupo com o nome passado por parâmetro
                for(var i = 0; i < qtde;i++){
                    if(grupos[i].includes(nomeGrupo))
                        return true;
                }
                //caso não encontre o agrupamento de campo retorna a mensagem
                console.log('Não existe o grupo de campos '+nomeGrupo);
                return 'Não existe o grupo de campos '+nomeGrupo;
            });
        });
    };    
    
    //abre um agrupamento de campos presente na tela
    this.grupoCampos = function(nomeGrupo){
        browser.sleep(5000);
        element.all(by.css('span.zh-label.zh-field-group-label.ng-binding')).each(function(grupo){
            grupo.getText().then(function(nome){
                if (nomeGrupo === nome){
                    console.log('Clicando no agrupamento '+nomeGrupo);
                    grupo.click();
                }
            });                    
        });
    };
    
    //fecha algumas telas do tipo swipe, popup e alert que ficou aberta após a execução dos it
    this.fechaTela = function(){
        browser.sleep(5000);
        z.component.alert.isVisible().then(function (alertPresent) {
            if (alertPresent)
                z.component.alert.clickMessageOk();
        });//promise isVisible
        z.swipe.isPresent().then(function (present) {
            if (present){
                z.component.footer.isLeftActionByLabelPresent('Cancelar').then(function (cancelPresent) {
                    if (cancelPresent)
                        z.component.footer.clickLeftActionByLabel('Cancelar');
                });//promise isLeftActionByLabelPresent
            }
        });//promise isPresent
        z.swipe.isPresent().then(function (present) {
            if (present){
                z.component.footer.isLeftActionByLabelPresent('Voltar').then(function (voltarPresent) {
                    if (voltarPresent)
                        z.component.footer.clickLeftActionByLabel('Voltar');
                });//promise isLeftActionByLabelPresent
            }
        });//promise isPresent
        z.component.popup.isOpened().then(function (opened) {
            if (opened){
                z.component.footer.isLeftActionByLabelPresent('Fechar').then(function (voltarPresent) {
                    if (voltarPresent){
                        z.component.footer.clickLeftActionByLabel('Fechar');
                    }
                });//promise isLeftActionByLabelPresent
            }
        });//promise isOpened         
        z.component.popup.isOpened().then(function (opened) {
            if (opened){
                z.component.footer.isLeftActionByLabelPresent('Cancelar').then(function (cancelPresent) {
                    if (cancelPresent){
                        z.component.footer.clickLeftActionByLabel('Cancelar');
                    }
                });//promise isLeftActionByLabelPresent
            }
        });//promise isOpened
        z.component.popup.isOpened().then(function (opened) {
            if (opened){
                z.component.footer.isLeftActionByLabelPresent('Voltar').then(function (voltarPresent) {
                    if (voltarPresent){
                        z.component.footer.clickLeftActionByLabel('Voltar');
                    }
                });//promise isLeftActionByLabelPresent
            }
        });//promise isOpened       
    };

    //obtem o id do grid disponível na tela.
    this.getIdGrid = function(){
        //verifica se o grid está dentro de um popup, de um swipe ou é o grid principal e retorna sua posição
        var indice = z.component.popup.isOpened().then(async function(popupAberto){
            if(popupAberto){   
                console.log('grid no popup'); 
                return await element.all(by.css('div.zh-new-grid.zh-new-grid')).count() - 1;
            }
            return z.swipe.isPresent().then(async function(swipeAberto){
                if(swipeAberto){   
                    console.log('grid no swipe'); 
                    return await element.all(by.css('div.zh-new-grid.zh-new-grid')).count() - 1;
                }
                else{
                    console.log('grid principal');
                    return await 0;
                }
            });
        });
        //obtem o número do grid 
        var grid = element.all(by.css('div.zh-new-grid.zh-new-grid')).get(indice).getAttribute('id');
        return grid.then(async function(id){
            console.log(id.substring(5));
            return await id.substring(5);
        });
    };

    //verifica se o grid esta vazio, retorna true para vazio.
    this.gridSemRegistros = function (idGrid) {
        return z.util.elementExists(by.css('#grid-' + idGrid + ' > div.body > div > div > div > ng-include > p')).then(async function (vazio) {
            return await vazio;
        });
    };

    //retorna uma mensagem exibida no grid caso esteja vazio, ou mensagem de erro.
    this.mensagemGrid = function(){
        return self.getIdGrid().then(async function(idGrid){
            return await element(by.css('#grid-' + idGrid + ' > div.body > div > div > div > ng-include > p')).getText();
        });
    };

    //seleciona um registro disponível no grid através da sua coluna e o valor que está na coluna
    this.selecionarRegistro = function(nomeColuna, valorColuna){
        browser.sleep(5000);
        return self.getIdGrid().then(function(idGrid){
            return self.gridSemRegistros(idGrid).then(function(semRegistro){
                if(!semRegistro){
                    return z.widget.grid.rowExists(nomeColuna, valorColuna, idGrid).then(function(existeRegistro){
                        //seleciona o valor existente no grid
                        if(existeRegistro){
                            console.log('O \''+valorColuna+'\' encontrado na coluna '+nomeColuna+'.');
                            z.widget.grid.click(nomeColuna, valorColuna, idGrid);
                            return true;
                        }
                        //retorna para o spec a mensagem que o valor não existe na coluna
                        else{
                            console.log('O \''+valorColuna+'\' não foi encontrado na coluna '+nomeColuna+'.');
                            return 'O '+valorColuna+' não existe na coluna '+nomeColuna+'.';
                        }
                    });
                }
                else
                    return self.mensagemGrid();
            });
        });     
    };

    //verifica se o campo está clicável, retorna true se está clicável
    this.campoClicavel = function(campo){
        var e = element(by.id(campo));
        return e.getAttribute('readonly').then(function(atributo){
            if(atributo === null)
                return true;
            else
                return false;
        });
    };

    //verifica a existencia de campos obrigatórios, retorna true se o campo obrigatório não foi preenchido 
    this.campoObrigatorio = function(){
        return z.util.elementExists(by.css('div.zh-validation > span')).then(function(existe){
            if(existe)
                return true;
            else
                return false;
        });
    };

    //converte uma string em número do tipo real
    this.numero = function(string){
        var stringAlterada = string.replace('.','').replace(',','.');
        return parseFloat(stringAlterada);
    };

    //seleciona uma ação(um link) exibido dentro de um popup
    this.selectAction = function(action){
        browser.sleep(5000);
        element(by.cssContainingText('div.zh-first-large > div.col-xs-12 > span.ng-binding', action)).click();
    };

    //verifica se exibirá algum alerta com erros durante a execução dos testes 
    this.alertaDeErro = function(){
        //aguarda algum alerta exibir erros após tentar salvar e retorna a mensagem de erro
        return z.component.alert.isVisible().then(function(alertaVisivel){
            if(alertaVisivel){
                //retorna a mensagem que está exibindo no alert 
                return z.component.alert.getText().then(function(alerta){
                    z.component.alert.clickButton('OK');
                    return alerta;
                });
            }
            //retorna false caso alerta não estiver visivel
            else
                return alertaVisivel;
        });
    };

    //verifica se exibirá alguma notificação após a edição dos dados
    this.notificacao = function(){
        //aguarda exibir a notificação confirmando a parametrização e retorna notificação para o spec
        return z.component.notification.isNotificationMessagePresent().then(function(notificaVisivel){
            if(notificaVisivel)
                return browser.executeScript('return $(\'.zh-notification-messages li:nth-child(1) .notification-message-text\').text()');
            //retorna false caso a notificação não estiver presente
            else
                return notificaVisivel;
        });
    };

    //aguarda mensagens de erros serem exibidas durante a execução ou outras notificações exibidas após salvar a edição dos dados das telas
    this.aguardaMensagem = function(){
        //após salvar aguarda mensagem de erros ser exibidas, senão aguarda notificações serem exibidas
        return self.alertaDeErro().then(function(erro){
            if(erro != false)
                return erro;
            else
                return self.notificacao().then(function(notifica){return notifica});
        });
    };  
    
    //funções alternativas da api
    //select native, para selecionar opções dentro de listas
    this.selectNative = function(campo, opcao){
        element(by.css("select[id='"+campo+"']")).element(by.xpath("..")).element(by.css("div.new-select")).click();
        console.log('Clicou no campo select native: '+campo);
        browser.sleep(3000);
        element(by.cssContainingText('div.new-select.open > ul > li.option', opcao)).click();
        console.log('Selecionou a opção: '+opcao);
    };

    //selectIntervalDate, seleciona um intervalo de datas para um campo do tipo calendar
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

        browser.sleep(3000);
        //clica no campo do tipo calendar
        self.click('.zh-field > div > [id="' + campo + '"]');
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
    //função alternativa da api 'z.widget.grid.text' obtem somente o texto de cada linha e coluna
    //linha e coluna começa com valor 1
    this.gridGetText = function(idGrid, linha, coluna){
        return element(by.css('#grid-'+ idGrid +' div.body-content>div:nth-child('+ linha +')>div:nth-child('+ coluna +')>span')).getText();
    };
    //função utilizada para capturar o total de linhas exibidas no grid
    this.gridGetNrRows = function(idGrid){
        return element.all(by.css('#grid-'+ idGrid +' > div.body > div > div')).count();
    };
    //função alternativa da api 'z.field.fieldFunctions.click' para clicar em campos, pelo name
    this.fieldFunctionsClick = function(name){
        var elementField = element(by.css('#'+name));
        browser.executeScript("arguments[0].click();", elementField.getWebElement());
    };
    //função alternativa da api 'z.field.selectMultiple.click' para checar varios itens no grid
    this.selectMultipleClick = function(fieldName, columnName, rowsValues){
        z.field.fieldFunctions.click(fieldName);
        self.getIdGrid().then(function(idGrid){
            for (var i in rowsValues) {
                z.widget.grid.click(columnName, rowsValues[i], idGrid);
            }            
        });
        z.component.footer.clickRightActionByLabel('Ok');
    };
    //função que permite marcar ou desmarcar campos com opções checkbox
    this.checkbox = function(campo, checar){
        element(by.id('zh-checkbox-'+campo)).getAttribute('checked').then(function(check){
            //se for para marcar o checkbox
            if (!check && checar === 'S'){
                z.field.checkbox.click(campo);
                console.log('O campo '+ campo +' foi marcado.');
            }
            //se for para desmarcar o checkbox
            else if (check && checar === 'N'){
                z.field.checkbox.click(campo);
                console.log('O campo '+ campo +' foi desmarcado.');
            }
        });
    };
    
    this.gridHasData = (field) => {
        z.field.fieldFunctions.click(field);
        return element.all(by.css('div.zh-new-grid.zh-new-grid')).get(1).getAttribute('id').then((grid) => {
            return z.util.elementExists(by.css('#grid-' + grid.substring(5) + ' > div.body > div > div > div > ng-include > p'));
        });
    };
    
    this.selectMultipleBasicTests = (field) => {
        
        const retorno = (retorno) => { 
            z.component.footer.clickRightActionByLabel('Ok'); 
            return retorno;
        };

        return z.field.fieldFunctions.exists(field).then((exist) => {
            return exist ? z.field.fieldFunctions.isFieldClickable(field)().then((isClickable) => {
                return isClickable ? this.gridHasData(field).then((hasData) => {
                    return hasData ? retorno(`O field ${field} não possui dados!`): retorno(true);
                }).catch(() =>`O field ${field} não é clicável!`): `O field ${field} não é clicável!`;
            }): `O field ${field} não existe!`;
        });
    };

    const getWindowTabs = () => browser.driver.getAllWindowHandles();

    const waitsforNewWindow = () => {
        return getWindowTabs().then((windows) => {
        initialWindowsQntd = windows.length;

        return browser.driver.wait(() => {
                return getWindowTabs().then((windows) => {
                    if (typeof windows !== 'undefined' &&
                        windows.length > initialWindowsQntd) {
                        return windows;
                    }
                });
            });
        });
    };

    const changeToTab = (tabIndex) => {
        return getWindowTabs().then(function(tabs){
            browser.driver.switchTo().window(tabs[tabIndex]);
        }.bind(this));
    };

    this.relBirtTest = () => {
        browser.ignoreSynchronization = true;  
        return waitsforNewWindow().then(() => { 
            return changeToTab(1).then(() => { 
                return browser.getCurrentUrl().then((url) => {
                    return browser.close().then(() => {
                        return changeToTab(0).then(() => {
                            browser.ignoreSynchronization = false;
                            return !(url === browser.getCurrentUrl());
                        });
                    });                    
                });     
            });
        });
    };

    this.generateCSVReport = () => {
        z.component.floatingControlPreferences.openAction('file-export');
        z.util.clickElement(by.css('.zh-report-csv > .zh-report-text'));
    };

    this.isCsvReportSuccessfull = () => {
        return z.component.alert.isVisible().then(function(isAlertVisible){
            return z.component.notification.count("error").then(function(errorCount){
                return getWindowTabs().then(function(tabs){
                    return !isAlertVisible &&
                           errorCount === 0 &&
                           tabs.length === 1;
                });
            });
        });
    };

    /**
     * Click on the especified grid's row's column
     *
     * @param {String}  gridId              The grid's id
     * @param {Integer} row                 The row's number, beggining from 0
     * @param {Integer} column              The column's number. Beginning from 0
     * @param {Boolean} [hasCheckbox=false] Param telling if there are checkboxs on the grid
     */
    this.getRowColumnLocator = function(gridId, row, column, hasCheckbox) {
        hasCheckbox = z.util.validateOptionalParameter(hasCheckbox, false);
        if (hasCheckbox) {
            return by.css('#grid-' + gridId + ' div.body-content>div:nth-child(' + (row + 1) + ')>div:nth-child(' + (column + 2) + ')');
        } else {
            return by.css('#grid-' + gridId + ' div.body-content>div:nth-child(' + (row + 1) + ')>div:nth-child(' + (column + 1) + ')');
        }
    };


    /**
     * Edits an inline field
     *
     * @param {(String|Number)} newValue            The value to be inserted
     * @param {Integer}         row                 The row's number, beggining from 0
     * @param {Integer}         column              The columns's number, beggining from 0
     * @param {String}          gridId              The grid's Id
     * @param {Boolean}         [hasCheckbox=false] Param telling if there are checkboxs on the grid
     */
    this.editInlineFieldValue = function(newValue, row, column, gridId, hasCheckbox) {
        var gridRowColumnLocator = element(this.getRowColumnLocator(gridId, row, column, hasCheckbox));
        var inlineField = gridRowColumnLocator.element(by.css('.editable-content>input'));
        z.util.clickByElementFinder(gridRowColumnLocator);
        browser.wait(z.util.ec.presenceOf(inlineField));
        inlineField.clear();
        z.util.clickByElementFinder(gridRowColumnLocator);
        inlineField.sendKeys(newValue);
    };
    //função utilizada para selecionar o mes e o ano em campos do tipo date-time
    this.selecionarMesAno = function(fieldName, value, type) {
        var meses = {
            "numeros":{
                1: '01',
                2: '02',
                3: '03',
                4: '04',
                5: '05',
                6: '06',
                7: '07',
                8: '08',
                9: '09',
                10: '10',
                11: '11',
                12: '12'                
            },
            "meses":{
                1: 'Janeiro',
                2: 'Fevereiro',
                3: 'Março',
                4: 'Abril',
                5: 'Maio',
                6: 'Junho',
                7: 'Julho',
                8: 'Agosto',
                9: 'Setembro',
                10: 'Outubro',
                11: 'Novembro',
                12: 'Dezembro'                
            }
        }
        z.field.fieldFunctions.click(fieldName);
        browser.sleep(3000);
        var mes = parseInt(value.substring(0, 2));
        var ano = parseInt(value.substring(3, value.length));
        var linha;
        var marca;
        var lista;
        var mesano = element.all(by.css('div.dw-li.zh-picker-text-unselected.dw-v.dw-sel > div'));
        //MÊS
        mesano.get(0).getText().then(function(selecao){
            for(var m in meses[type]){
                if(meses[type][m] === selecao){
                    linha = m;
                    marca = m;
                    console.log(m+' - '+selecao);
                }
            }
            if(marca > mes){
                console.log(marca + " > " + mes);
                linha--;
                while(marca > mes){
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(1) > div > div.dwww > div.dww > div > div > div:nth-child(' + linha + ') > div'));
                    linha--;
                    marca--;
                }
            }
            else if(marca < mes){
                console.log(marca + " < " + mes);
                linha++;
                while(marca < mes){
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(1) > div > div.dwww > div.dww > div > div > div:nth-child(' + linha + ') > div'));
                    linha++;
                    marca++;
                }
            }
        });
        //ANO
        mesano.get(1).getText().then(function(selecao){
            if(parseInt(selecao) >= 2099){
                lista = 11;
                linha = (parseInt(selecao) + 1) - 2099;
            }
            else if(parseInt(selecao) >= 2079){
                lista = 10;
                linha = (parseInt(selecao) + 1) - 2079;    
            }
            else if(parseInt(selecao) >= 2059){
                lista = 9;
                linha = (parseInt(selecao) + 1) - 2059;
            }
            else if(parseInt(selecao) >= 2039){
                lista = 8;
                linha = (parseInt(selecao) + 1) - 2039;
            }
            else if(parseInt(selecao) >= 2019){
                lista = 7;
                linha = (parseInt(selecao) + 1) - 2019;
            }
            else if(parseInt(selecao) >= 1999){
                lista = 6;
                linha = (parseInt(selecao) + 1) - 1999;
            }
            else if(parseInt(selecao) >= 1979){
                lista = 5;
                linha = (parseInt(selecao) + 1) - 1979;
            }
            else if(parseInt(selecao) >= 1959){
                lista = 4;
                linha = (parseInt(selecao) + 1) - 1959;
            }
            else if(parseInt(selecao) >= 1939){
                lista = 3;
                linha = (parseInt(selecao) + 1) - 1939;
            }
            else if(parseInt(selecao) >= 1919){
                lista = 2;
                linha = (parseInt(selecao) + 1) - 1919;
            }
            else if(parseInt(selecao) >= 1900){
                lista = 1;
                linha = (parseInt(selecao) + 1) - 1900;
            }
            console.log('lista =' + lista);
            marca = selecao;
            if(marca > ano){
                console.log(marca + " > " + ano);
                linha--;
                while(marca > ano){
                    if (lista == 11 && linha < 1) {
                        console.log('(lista 10)');
                        lista = 10;
                        linha = 20;
                    }
                    else if (lista == 10 && linha < 1) {
                        console.log('(lista 9)');
                        lista = 9;
                        linha = 20;
                    }
                    else if (lista == 9 && linha < 1) {
                        console.log('(lista 8)');
                        lista = 8;
                        linha = 20;
                    }
                    else if (lista == 8 && linha < 1) {
                        console.log('(lista 7)');
                        lista = 7;
                        linha = 20;
                    }
                    else if (lista == 7 && linha < 1) {
                        console.log('(lista 6)');
                        lista = 6;
                        linha = 20;
                    }
                    else if (lista == 6 && linha < 1) {
                        console.log('(lista 5)');
                        lista = 5;
                        linha = 20;
                    }
                    else if (lista == 5 && linha < 1) {
                        console.log('(lista 4)');
                        lista = 4;
                        linha = 20;
                    }
                    else if (lista == 4 && linha < 1) {
                        console.log('(lista 3)');
                        lista = 3;
                        linha = 20;
                    }
                    else if (lista == 3 && linha < 1) {
                        console.log('(lista 2)');
                        lista = 2;
                        linha = 20;
                    }
                    else if (lista == 2 && linha < 1) {
                        console.log('(lista 1)');
                        lista = 1;
                        linha = 19;
                    }
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(2) > div > div.dwww > div.dww > div > div:nth-child(' + lista + ') > div:nth-child(' + linha + ')'));
                    linha--;
                    marca--;
                }
            }
            else if(marca < ano){
                console.log(marca + " < " + ano);
                linha++;
                while (marca < ano) {
                    if (lista == 10 && linha > 20) {
                        console.log('(lista 11)');
                        lista = 11;
                        linha = 1;
                    }
                    else if (lista == 9 && linha > 20) {
                        console.log('(lista 10)');
                        lista = 10;
                        linha = 1;
                    }
                    else if (lista == 8 && linha > 20) {
                        console.log('(lista 9)');
                        lista = 9;
                        linha = 1;
                    }
                    else if (lista == 7 && linha > 20) {
                        console.log('(lista 8)');
                        lista = 8;
                        linha = 1;
                    }
                    else if (lista == 6 && linha > 20) {
                        console.log('(lista 7)');
                        lista = 7;
                        linha = 1;
                    }
                    else if (lista == 5 && linha > 20) {
                        console.log('(lista 6)');
                        lista = 6;
                        linha = 1;
                    }
                    else if (lista == 4 && linha > 20) {
                        console.log('(lista 5)');
                        lista = 5;
                        linha = 1;
                    }
                    else if (lista == 3 && linha > 20) {
                        console.log('(lista 4)');
                        lista = 4;
                        linha = 1;
                    }
                    else if (lista == 2 && linha > 20) {
                        console.log('(lista 3)');
                        lista = 3;
                        linha = 1;
                    }
                    else if (lista == 1 && linha > 19) {
                        console.log('(lista 2)');
                        lista = 2;
                        linha = 1;
                    }
                    else if (linha == 0){
                        lista = 1;
                        linha = 1;
                    }
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(2) > div > div.dwww > div.dww > div > div:nth-child(' + lista + ') > div:nth-child(' + linha + ')'));
                    linha++;
                    marca++;
                }
            }
        });

        element(by.cssContainingText('.dwb0', 'Selecionar')).click();
        browser.sleep(3000);
    };
    
    //utiliza função de controle de fluxo para ajustar a velocidade de execução do script, usado no servidor jenkins
    this.slowDown = function(tempo = 300){
        var protractorSlowDown = browser.driver.controlFlow().execute;
        browser.driver.controlFlow().execute = function () {
            var args = arguments;

            protractorSlowDown.call(browser.driver.controlFlow(), function () {
                //incrementa ou decrementa o tempo em milisegundos - 300 é um valor padrão
                return protractor.promise.delayed(tempo);
            });
            return protractorSlowDown.apply(browser.driver.controlFlow(), args);
        };        
    };
};
module.exports = new helper();