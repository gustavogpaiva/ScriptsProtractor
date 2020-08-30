var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var tabelaDePreco = function() {
    var self = this;

    this.selecionarUnidade = function(unidade) {
        z.component.popup.isOpened().then(function(popupAberto){
            if(popupAberto){
                h.autoComplete('NMFILIAL', unidade);
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
    };

    this.adicionarTabela = function(codigo, tabelaPreco) {
        z.component.footer.isRightActionByLabelPresent('Ações').then(function(presente){
            if(presente){
                z.component.footer.clickRightActionByLabel('Ações');
                h.selectAction('Adicionar Tabela de Preço');
                browser.executeScript('$(\'#CDTABEPREC\').val(\'\');');
                element(by.id('CDTABEPREC')).click();
                element(by.id('CDTABEPREC')).sendKeys(codigo);
                z.field.fieldFunctions.fill('NMTABEPREC', tabelaPreco);
                z.component.footer.clickRightActionByLabel('Salvar');
            }
        });
    };

    this.excluirTabela = function(codigo, tabelaPreco) {
        z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850').then(function(existeTabela){
             if(existeTabela){
                z.widget.grid.click('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850');
                z.component.footer.clickCenterActionByLabel('Excluir tabela');
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel){
                        z.component.alert.clickButton('Sim');
                    }
                });
             }
        });
    };

    this.adicionarVigencia = function(tabelaPreco) {
        z.component.footer.clickCenterActionByLabel('Adicionar Vigência');
        $('#CDTABEPREC > span').click();
        z.widget.grid.rowExists('NMTABEPREC', tabelaPreco, '9000').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('NMTABEPREC', tabelaPreco, '9000');
            }
        });
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.editarVigencia = function(codigo, tabelaPreco) {
        //define a data da nova vigencia da tabela
        var data = new Date();
        var novaVigencia = '30/'+(data.getMonth()+1)+'/'+data.getFullYear();
        //verifica se a tabela está cadastrada
        z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850');
                z.component.footer.clickCenterActionByLabel('Editar vigência');
                //apaga a vigência cadastrada
                $('div.zh-select-date.zh-field-DTFINVGPREC > div.close-button > span').click();
                //abre o calendário para selecionar a data da nova vigência
                $('div.zh-select-date.zh-field-DTFINVGPREC > div.calendar-button > span').click();
                //seleciona a nova data no calendário aberto
                z.field.calendar.selectDate(novaVigencia, 'pt_br');
                //salva a edição da vigência da tabela de preço
                z.component.footer.clickRightActionByLabel('Salvar');
            }
        });
    };

    this.excluirVigencia = function(codigo, tabelaPreco) {
        z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850');
                z.component.footer.clickCenterActionByLabel('Excluir vigência');
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel){
                        z.component.alert.clickButton('Sim');
                    }
                });
             }
        });
    };

    this.adicionarPreco = function(codigo, tabelaPreco, produtoInicial, produtoFinal, preco) {
        z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850');
                h.navegar('Produtos');
                z.component.footer.clickCenterActionByLabel('Adicionar preço');
                h.autoComplete('NMPRODUTOINI', produtoInicial);
                browser.sleep(3000);
                h.autoComplete('NMPRODUTOFINAL', produtoFinal);
                z.field.fieldFunctions.fill('VRPRECITEM', preco);
                z.component.footer.clickRightActionByLabel('Salvar');
            }
        });
    };

    this.alterarPreco = function(codigo, tabelaPreco, produtoInicial, produtoFinal, preco, selecaoProdutos){
        z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850');
                h.navegar('Produtos');
                z.component.footer.clickRightActionByLabel('Alteração Aut. de Preço');
                h.selectNative('TIPOPROD', selecaoProdutos);
                if(selecaoProdutos === 'Intervalo'){
                    h.autoComplete('NMPRODUTOINI', produtoInicial);
                    browser.sleep(5000);
                    z.util.elementExists(by.css('#NMPRODUTOINI > span.value')).then(function(existeProduto){
                        if(!existeProduto){
                            $('#footer > div.zh-footer-left > ul > li:nth-child(1) > a > span.zh-footer-title-sprit.ng-binding').click();
                        }
                    });
                    h.autoComplete('NMPRODUTOFIN', produtoFinal);
                    browser.sleep(5000);
                    z.util.elementExists(by.css('#NMPRODUTOFIN > span.value')).then(function(existeProduto){
                        if(!existeProduto){
                            $('#footer > div.zh-footer-left > ul > li:nth-child(1) > a > span.zh-footer-title-sprit.ng-binding').click();
                        }
                        else{
                            z.field.fieldFunctions.fill('VRPRECITEM', preco);
                            z.component.footer.clickRightActionByLabel('Salvar');
                        }
                    });
                }
                else if(selecaoProdutos === 'Lista'){
                    z.field.fieldFunctions.click('PRODUTOS');
                    browser.sleep(5000);
                    z.util.pressKey(produtoInicial);
                    browser.sleep(3000);
                    z.widget.grid.rowExists('NMPRODUTO', produtoInicial, '9999').then(function(existeProduto){
                        if(existeProduto){
                            z.widget.grid.checkRowByValue('NMPRODUTO', produtoInicial, '9999');
                        }
                    });
                    z.component.floatingControl.isOpened().then(function(aberto){
                        if(aberto){
                            $('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching').click();
                            $('input.mousetrap.zh-input-search-floating.ng-valid.ng-dirty.ng-touched').click();
                        }
                        else{
                            z.component.floatingControl.toggle();
                            z.component.floatingControl.selectAction('search');
                        }
                    });
                    z.util.pressKey(produtoFinal);
                    browser.sleep(3000);
                    z.widget.grid.rowExists('NMPRODUTO', produtoFinal, '9999').then(function(existeProduto){
                        if(existeProduto){
                            z.widget.grid.checkRowByValue('NMPRODUTO', produtoFinal, '9999');
                        }
                    });
                    z.component.footer.clickRightActionByLabel('Ok');
                    z.field.fieldFunctions.fill('VRPRECITEM', preco);
                    z.component.footer.clickRightActionByLabel('Salvar');
                }
            }
        });
    };

    this.adicionarPrecoDiferenciado = function(codigo, tabelaPreco, produto, diaSemana, tipoConsumidor, preco, desconto, percentual, visualiza, horaInicial, horaFinal){
        //define a data inicial e data final do preço diferenciado
        var data = new Date();
        var dataInicial = data.getDate()+'/'+(data.getMonth()+1)+'/'+data.getFullYear();
        var dataFinal   = '30/'+(data.getMonth()+1)+'/'+data.getFullYear();
        //verifica se a tabela de preço está cadastrada
        z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850');
                h.navegar('Produtos');
                //verifca se o produto a cadastrar o preço diferencido existe no grid
                z.widget.grid.rowExists('NMPRODUTO', produto, '19711712372099819066861').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.click('NMPRODUTO', produto, '19711712372099819066861');
                        h.navegar('Preço Diferenciado');
                        z.component.footer.clickCenterActionByLabel('Adicionar');
                        z.field.fieldFunctions.click('NRDIASEMANPR');
                        z.widget.grid.checkRowByValue('label', diaSemana, '9999');
                        z.component.footer.clickRightActionByLabel('Ok');
                        h.autoComplete('NMTIPOCONS', tipoConsumidor);
                        z.field.fieldFunctions.fill('VRPRECODIA', preco);
                        h.selectNative('IDDESCACREPR', desconto);
                        h.selectNative('IDPERVALORPR', percentual);
                        h.selectNative('IDVISUACUPOM', visualiza);
                        z.field.fieldFunctions.fill('HRINIPRECDIA', horaInicial);
                        z.field.fieldFunctions.fill('HRFINPRECDIA', horaFinal);
                        //inicio da validade
                        $('div.zh-select-date.zh-field-DTINIVALPREC > div.calendar-button > span').click();
                        z.field.calendar.selectDate(dataInicial, 'pt_br');
                        //fim da validade
                        $('div.zh-select-date.zh-field-DTFINVALPREC > div.calendar-button > span').click();
                        z.field.calendar.selectDate(dataFinal, 'pt_br');
                        z.component.footer.clickRightActionByLabel('Salvar');
                    }
                });
            }
        });
    };

    this.alterarPrecoDiferenciado = function(codigo, tabelaPreco, produto, diaSemana, tipoConsumidor, preco, desconto, percentual, visualiza, horaFinal){
        //define a data final da promoção a ser alterada
        var data = new Date();
        var dataFinal   = '30/'+(data.getMonth()+1)+'/'+data.getFullYear();
        //verifica se a tabela de preço está cadastrada
        z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850');
                h.navegar('Produtos');
                //verifca se o produto a cadastrar o preço diferencido existe no grid
                z.widget.grid.rowExists('NMPRODUTO', produto, '19711712372099819066861').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.click('NMPRODUTO', produto, '19711712372099819066861');
                        h.navegar('Preço Diferenciado');
                        z.widget.grid.rowExists('NRDIASEMANPR', diaSemana, '19711712371550040696862').then(function(existeDia){
                            if(existeDia){
                                z.widget.grid.rowExists('NMTIPOCONS', tipoConsumidor, '19711712371550040696862').then(function(existeConsumidor){
                                    if(existeConsumidor){
                                        z.widget.grid.click('NMTIPOCONS', tipoConsumidor, '19711712371550040696862');
                                        z.component.footer.clickCenterActionByLabel('Editar');
                                        z.field.fieldFunctions.fill('VRPRECODIA', preco);
                                        h.selectNative('IDDESCACREPR', desconto);
                                        h.selectNative('IDPERVALORPR', percentual);
                                        h.selectNative('IDVISUACUPOM', visualiza);
                                        z.field.fieldFunctions.fill('HRFINPRECDIA', horaFinal);
                                        //fim da validade
                                        $('div.zh-select-date.zh-field-DTFINVALPREC > div.close-button > span').click();
                                        $('div.zh-select-date.zh-field-DTFINVALPREC > div.calendar-button > span').click();
                                        z.field.calendar.selectDate(dataFinal, 'pt_br');
                                        z.component.footer.clickRightActionByLabel('Salvar');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    this.alterarAutomaticoPreco = function(unidade, codigo, tabelaPreco, produto, diaSemana, tipoConsumidor, preco, desconto, percentual, visualiza, horaInicial, horaFinal){
        //define a data inicial e data final do preço diferenciado
        var data = new Date();
        var dataInicial = data.getDate()+'/'+(data.getMonth()+1)+'/'+data.getFullYear();
        var dataFinal   = '30/'+(data.getMonth()+1)+'/'+data.getFullYear();
        z.component.footer.isRightActionByLabelPresent('Ações').then(function(presente){
            if(presente){
                //seleciona ação para altera os preços diferenciados automaticos
                z.component.footer.clickRightActionByLabel('Ações');
                h.selectAction('Alteração Automática de Preço Diferenciado');
                browser.sleep(5000);
                //clica no campo tabela de preço para abrir o filtro
                //z.field.fieldFunctions.click('GROUPED_LABEL');
                h.click('#GROUPED_LABEL');
                browser.sleep(5000);
                z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '9999').then(function(existeTabela){
                    if(existeTabela){
                        //altera a opção de filtrar por unidade
                        $$('span.floating-card-search-field').get(1).click();
                        browser.sleep(3000);
                        element.all(by.css('div.floating-card-search-field-select.opened > ul > li > span.ng-binding')).each(function(filtros){
                            filtros.getText().then(function(filtro){
                                if(filtro === 'Unidade')
                                    filtros.click();
                            });
                        });
                        //envia o código da unidade para ser pesquisado
                        z.util.pressKey(unidade);
                        browser.sleep(5000);
                        //verifica se a unidade pesquisada existe no grid e seleciona
                        z.widget.grid.rowExists('CDFILIAL', unidade, '9999').then(function(existeUnidade){
                            if(existeUnidade){
                                z.widget.grid.click('CDFILIAL', unidade, '9999');
                                z.component.footer.clickRightActionByLabel('Ok');
                            }
                            else
                                z.component.footer.clickLeftActionByLabel('Cancelar');   
                        });
                    }
                    else
                        z.component.footer.clickLeftActionByLabel('Cancelar');   
                });
                //clica no campo produto para abrir o filtro
                z.field.fieldFunctions.click('NMPRODUTO');
                //envia o nome do produto para ser pesquisado
                browser.sleep(5000);
                z.util.pressKey(produto);
                browser.sleep(5000);
                //verifica se o produto existe no grid e seleciona
                z.widget.grid.rowExists('NMPRODUTO', produto, '9999').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.click('NMPRODUTO', produto, '9999');
                        z.component.footer.clickRightActionByLabel('Ok');
                    }
                    else
                        z.component.footer.clickLeftActionByLabel('Cancelar');
                });
                //clica no campo dia da semana para abrir o filtro
                z.field.fieldFunctions.click('NRDIASEMANPR');
                z.widget.grid.click('DSDIASEMAN', diaSemana, '9999');
                z.component.footer.clickRightActionByLabel('Ok');
                //clica no campo tipo de consumidor e seleciona o consumidor
                h.autoComplete('NMTIPOCONS', tipoConsumidor);
                z.field.fieldFunctions.fill('VRPRECODIA', preco);
                h.selectNative('IDDESCACREPR', desconto);
                h.selectNative('IDPERVALORPR', percentual);
                h.selectNative('IDVISUACUPOM', visualiza);
                z.field.fieldFunctions.fill('HRINIPRECDIA', horaInicial);
                z.field.fieldFunctions.fill('HRFINPRECDIA', horaFinal);
                //inicio da validade
                $('div.zh-select-date.zh-field-DTINIVALPREC > div.calendar-button > span').click();
                z.field.calendar.selectDate(dataInicial, 'pt_br');
                //fim da validade
                $('div.zh-select-date.zh-field-DTFINVALPREC > div.calendar-button > span').click();
                z.field.calendar.selectDate(dataFinal, 'pt_br');
                //marca o parametro para sobrescrever os preços dos produtos que possuem preço diferenciado
                z.field.checkbox.click('EXCLUIRPRECODIF');
                z.component.footer.clickRightActionByLabel('Salvar');
            }
        });
        //verifica se após clicar na opção salvar será exibido o alerta confirmando ação do cadastro de preços diferenciados
        z.component.alert.isVisible().then(function(alertaVisivel){
            if(alertaVisivel)
                z.component.alert.clickButton('Sim');
        });
        //verifica se após clicar na opção Salvar será exibida a notificação, algum alerta, ou se existem campo obrigatórios 
        return h.campoObrigatorio().then(function(obrigatorio){
            if(obrigatorio){
                z.component.footer.clickLeftActionByLabel('Cancelar');                
                return 'Existem campos obrigatórios que não foram preenchidos.';
            }
            else{
                return h.aguardaMensagem().then(function(mensagem){
                    //verifica se o popup estará aberto, e clica na opção cancelar para voltar para tela anterior
                    z.component.popup.isOpened().then(function(popupAberto){
                        if(popupAberto)
                            z.component.footer.clickLeftActionByLabel('Cancelar');
                    });
                    return mensagem;
                });
            }
        });
    };

    this.exportarTabelaPreco = function(unidadeOrigem, unidadeDestino, tabelaOrigem, tabelaDestino, codigoTabela, exportaPreco, criarTabela, produto1, produto2, produto3, produto4, variasUnidades, unidades){
        z.component.footer.isRightActionByLabelPresent('Ações').then(function(presente){
            if(presente){
                z.component.footer.clickRightActionByLabel('Ações');
                h.selectAction('Exportar Tabela de Preço');
                h.autoComplete('NMFILIAL', unidadeOrigem);
                h.autoComplete('NMTABEPREC', tabelaOrigem);
                h.click('#CDARVPROD > span');
                //aguarda abrir o filtro de informa o nome do produto a ser pesquisado no grid
                browser.sleep(3000);
                $('input.mousetrap.zh-input-search-floating.ng-pristine.ng-valid.ng-touched').sendKeys(produto1);
                browser.sleep(5000);
                //verifica se o produto pesquisado existe no grid e seleciona-o
                z.widget.grid.rowExists('NMPRODUTO', produto1, '9999').then(function(existeProduto){
                    if(existeProduto)
                        z.widget.grid.checkRowByValue('NMPRODUTO', produto1, '9999');
                });
                //verifica se o widget de pesquisa está aberto
                z.component.floatingControl.isOpened().then(function(aberto){
                    if(aberto){
                        $('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching').click();
                        $('input.mousetrap.zh-input-search-floating.ng-valid.ng-dirty.ng-touched').click();
                    }
                    else{
                        z.component.floatingControl.toggle();
                        z.component.floatingControl.selectAction('search');
                    }
                });
                //informa o segundo produto a ser pesquisado no grid
                browser.sleep(3000);
                $('input.mousetrap.zh-input-search-floating.ng-pristine.ng-valid.ng-touched').sendKeys(produto2);
                browser.sleep(5000);
                //verifica se o produto pesquisado existe no grid e seleciona-o
                z.widget.grid.rowExists('NMPRODUTO', produto2, '9999').then(function(existeProduto){
                    if(existeProduto)
                        z.widget.grid.checkRowByValue('NMPRODUTO', produto2, '9999');
                });
                //verifica se o widget de pesquisa está aberto
                z.component.floatingControl.isOpened().then(function(aberto){
                    if(aberto){
                        $('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching').click();
                        $('input.mousetrap.zh-input-search-floating.ng-valid.ng-dirty.ng-touched').click();
                    }
                    else{
                        z.component.floatingControl.toggle();
                        z.component.floatingControl.selectAction('search');
                    }
                });
                //informa o segundo produto a ser pesquisado no grid
                browser.sleep(3000);
                $('input.mousetrap.zh-input-search-floating.ng-pristine.ng-valid.ng-touched').sendKeys(produto3);
                browser.sleep(5000);
                //verifica se o produto pesquisado existe no grid e seleciona-o
                z.widget.grid.rowExists('NMPRODUTO', produto3, '9999').then(function(existeProduto){
                    if(existeProduto)
                        z.widget.grid.checkRowByValue('NMPRODUTO', produto3, '9999');
                });
                //verifica se o widget de pesquisa está aberto
                z.component.floatingControl.isOpened().then(function(aberto){
                    if(aberto){
                        $('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching').click();
                        $('input.mousetrap.zh-input-search-floating.ng-valid.ng-dirty.ng-touched').click();
                    }
                    else{
                        z.component.floatingControl.toggle();
                        z.component.floatingControl.selectAction('search');
                    }
                });
                //informa o segundo produto a ser pesquisado no grid
                browser.sleep(3000);
                $('input.mousetrap.zh-input-search-floating.ng-pristine.ng-valid.ng-touched').sendKeys(produto4);
                browser.sleep(5000);
                //verifica se o produto pesquisado existe no grid e seleciona-o
                z.widget.grid.rowExists('NMPRODUTO', produto4, '9999').then(function(existeProduto){
                    if(existeProduto)
                        z.widget.grid.checkRowByValue('NMPRODUTO', produto4, '9999');
                });
                //confirma a seleção dos produtos
                z.component.footer.clickRightActionByLabel('Ok');
                //define exportar preço diferenciado
                z.field.checkbox.click('EXPORT_PRECODIA');
                //define se exporta tabela para uma unidade
                if(variasUnidades === 'Não'){
                    //marca o campo para exportar os preços diferenciados
                    z.field.checkbox.click('EXPORT_PRECODIA');
                    h.autoComplete('NMFILIALDES', unidadeDestino);
                    if(criarTabela === 'Não')
                        h.autoComplete('NMTABEPRECDES', tabelaDestino);
                    else if(criarTabela === 'Sim'){
                        z.field.checkbox.click('NEWPRICECHART');
                        z.field.fieldFunctions.fill('CDTABEPRECNEW', codigoTabela);
                        z.field.fieldFunctions.fill('NMTABEPRECNEW', tabelaDestino);
                    }
                }
                //define se exporta tabela para várias unidades
                else if(variasUnidades === 'Sim'){
                    z.field.checkbox.click('DESTINY_MULT');
                    z.field.fieldFunctions.click('CDFILIALDES');
                    //altera a opção de filtrar por unidade
                    $$('span.floating-card-search-field').get(1).click();
                    browser.sleep(3000);
                    element.all(by.css('div.floating-card-search-field-select.opened > ul > li > span.ng-binding')).each(function(filtros){
                        filtros.getText().then(function(filtro){
                            if(filtro === 'Código')
                                filtros.click();
                        });
                    });
                    //informa uma unidade a ser pesquisada no filtro e seleciona
                    browser.sleep(3000);
                    $('input.mousetrap.zh-input-search-floating.ng-pristine.ng-valid.ng-touched').sendKeys(unidadeDestino);
                    browser.sleep(5000);
                    //verifica se o produto pesquisado existe no grid e seleciona-o
                    z.widget.grid.rowExists('CDFILIAL', unidadeDestino, '9999').then(function(existeUnidade){
                        if(existeUnidade)
                            z.widget.grid.checkRowByValue('CDFILIAL', unidadeDestino, '9999');
                    });
                    //verifica se o widget de pesquisa está aberto
                    z.component.floatingControl.isOpened().then(function(aberto){
                        if(aberto){
                            $('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching').click();
                            $('input.mousetrap.zh-input-search-floating.ng-valid.ng-dirty.ng-touched').click();
                        }
                        else{
                            z.component.floatingControl.toggle();
                            z.component.floatingControl.selectAction('search');
                        }
                    });
                    //informa uma outra unidade a ser pesquisada no filtro e seleciona
                    browser.sleep(3000);
                    $('input.mousetrap.zh-input-search-floating.ng-pristine.ng-valid.ng-touched').sendKeys(unidades);
                    browser.sleep(5000);
                    //verifica se o produto pesquisado existe no grid e seleciona-o
                    z.widget.grid.rowExists('CDFILIAL', unidades, '9999').then(function(existeUnidade){
                        if(existeUnidade)
                            z.widget.grid.checkRowByValue('CDFILIAL', unidades, '9999');
                    });
                    //confirma a seleção das unidades
                    z.component.footer.clickRightActionByLabel('Ok');
                }
                //confirma a exportação da tabela de preço
                z.component.footer.clickRightActionByLabel('Exportar');
                //verifica se após clicar na opção exportar será exibido o alerta confirmando ação do cadastro de preços diferenciados
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel)
                        z.component.alert.clickButton('Sim');
                });
            }
        });
    };

    this.atualizarPrecos = function(codigo, tabelaPreco){
        //pesquisa a tabela de preço no grid
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        z.util.pressKey(codigo + ' - ' + tabelaPreco);

        //verifica no grid se existe uma tabela vigência ativa
        z.widget.grid.rowExists('STATUS_VIGENCIA', 'Ativa', '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('STATUS_VIGENCIA', 'Ativa', '19711712373077222435850');
                z.component.footer.isRightActionByLabelPresent('Ações').then(function(presente){
                    if(presente){
                        z.component.footer.clickRightActionByLabel('Ações');
                        h.selectAction('Atualizar preços');
                        z.component.alert.isVisible().then(function(alertaVisivel){
                            if(alertaVisivel)
                                z.component.alert.clickButton('Sim');
                        });
                    }
                });
            }
        });
    };

    this.importarVigencia = function(codigo, tabelaPreco, vigenciaOrigem){
        //pesquisa a tabela de preço no grid
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        z.util.pressKey(codigo + ' - ' + tabelaPreco);

        //verifica no grid se existe uma tabela vigência ativa
        z.widget.grid.rowExists('STATUS_VIGENCIA', 'Ativa', '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('STATUS_VIGENCIA', 'Ativa', '19711712373077222435850');
                z.component.footer.isRightActionByLabelPresent('Ações').then(function(presente){
                    if(presente){
                        z.component.footer.clickRightActionByLabel('Ações');
                        h.selectAction('Importar vigência');
                        h.autoComplete('DTVGPRECLABEL', vigenciaOrigem);
                        z.component.footer.clickRightActionByLabel('Importar');
                        z.component.alert.isVisible().then(function(alertaVisivel){
                            if(alertaVisivel)
                                z.component.alert.clickButton('Sim');
                        });                        
                    }
                });
            }
        });
    };

    this.excluirPrecoDiferenciado = function(codigo, tabelaPreco, produto, diaSemana, tipoConsumidor){
        //verifica se a tabela de preço está cadastrada
        z.widget.grid.rowExists('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850').then(function(existeTabela){
            if(existeTabela){
                z.widget.grid.click('GROUPED_LABEL', codigo+' - '+tabelaPreco, '19711712373077222435850');
                h.navegar('Produtos');
                //verifca se o produto a cadastrar o preço diferencido existe no grid
                z.widget.grid.rowExists('NMPRODUTO', produto, '19711712372099819066861').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.click('NMPRODUTO', produto, '19711712372099819066861');
                        h.navegar('Preço Diferenciado');
                        z.widget.grid.rowExists('NRDIASEMANPR', diaSemana, '19711712371550040696862').then(function(existeDia){
                            if(existeDia){
                                z.widget.grid.rowExists('NMTIPOCONS', tipoConsumidor, '19711712371550040696862').then(function(existeConsumidor){
                                    if(existeConsumidor){
                                        z.widget.grid.click('NMTIPOCONS', tipoConsumidor, '19711712371550040696862');
                                        z.component.footer.clickCenterActionByLabel('Excluir');
                                        z.component.alert.isVisible().then(function(alertaVisivel){
                                            if(alertaVisivel)
                                                z.component.alert.clickButton('Sim');
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

};
module.exports = new tabelaDePreco();