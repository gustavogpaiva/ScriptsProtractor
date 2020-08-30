var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var cadastroLoja = function () {
    var self = this;
    
    this.selecionarUnidade = function(unidade) {
        z.component.popup.isOpened().then(function(popupAberto){
            if(popupAberto){
                h.autoComplete('NMFILIAL', unidade);
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
    };

    this.selecionarLoja = function(loja){
        z.swipe.isPresent().then(function(swipeAberto){
            if(!swipeAberto){
                z.widget.grid.rowExists('NMLOJA', loja, '381504103299988759790').then(function(existeLoja){
                    if(existeLoja)
                        z.widget.grid.click('NMLOJA', loja, '381504103299988759790');
                });
            }
        });
    };

    //função para alterar uma loja(nome)
    this.editarLoja = function(novoNome) {
        z.component.footer.clickCenterActionByIcon('pencil');
        z.field.fieldFunctions.fill('NMLOJA', novoNome);
        z.component.footer.clickRightActionByLabel('Salvar');  
        return h.aguardaMensagem();   
    };
    
    //função para desativar uma loja
    this.desativarLoja = function() {
        z.component.footer.clickCenterActionByLabel('Desativar');
        z.component.alert.isVisible().then(function(alertaVisivel){
            if(alertaVisivel)
                z.component.alert.clickButton('Sim');
        });
    };
    
    //função para cadastrar loja
    this.cadastrarLoja = function(codigo, loja){
        z.component.footer.clickCenterActionByLabel('Adicionar');
        var CDLOJA = $$('input#CDLOJA');
        CDLOJA.sendKeys(codigo);
        z.field.fieldFunctions.fill('NMLOJA', loja);
        z.component.footer.clickRightActionByLabel('Salvar');      
    };
    
    this.produtosLoja = function(nivel){
        h.navegar('Produtos por Loja');
        z.component.popup.isOpened().then(function(popupAberto){
            if(popupAberto){
                //busca o campo nivel inicial e insere o valor do nível de produtos
                var elementos = element.all(by.id('NIVELINICIAL'));
                elementos.each(function (el) {
                    el.isDisplayed().then(function (displayed) {
                        if (displayed) {
                            try {
                                el.sendKeys(nivel);
                            } catch (erro) {
                                console.log(erro);
                            }
                        }
                    });
                });
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
        return h.gridSemRegistros('3815041033772036897543').then(function(semRegistro){
            if(semRegistro)
                return $('#grid-3815041033772036897543 > div.body > div > div > div > ng-include > p').getText();
            else
                return true;
        });
    };

    this.adicionarProdutos = function(imprPuxa, imprProd, imprProd2, imprCancelar, produtoInicial, produtoFinal, lista){
        h.navegar('Produtos por Loja');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.autoComplete('NMIMPRPUXA', imprPuxa);
        h.autoComplete('NMIMPRPROD', imprProd);
        h.autoComplete('NMIMPRPROD2', imprProd2);

        if(imprCancelar === 'Sim')
            z.field.checkbox.click('IDIMPCANITEM');
        
        if(lista === 'Sim'){
            //busca o campo produtos e tenta clicar para abrir o filtro de pesquisa de produtos
            var elementos = element.all(by.id('PRODUTOS'));
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
            browser.sleep(5000);
            h.click('div.floating-card-input > input');
            $$('div.floating-card-input > input').get(2).sendKeys(produtoInicial);
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
            h.click('div.floating-card-input > input');
            $$('div.floating-card-input > input').get(2).sendKeys(produtoFinal);
            browser.sleep(3000);
            z.widget.grid.rowExists('NMPRODUTO', produtoFinal, '9999').then(function(existeProduto){
                if(existeProduto){
                    z.widget.grid.checkRowByValue('NMPRODUTO', produtoFinal, '9999');
                }
            });
            z.component.footer.clickRightActionByLabel('Ok');
        }
        //seleciona por intervalo de produtos
        else{
            h.autoComplete('NMPRODINICIAL', produtoInicial);
            h.autoComplete('NMPRODFINAL', produtoFinal);
        }
        //confirma o cadastro dos produtos por loja
        z.component.footer.clickRightActionByLabel('Salvar');
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

    this.cadastrarImpressoraAmbiente = function(configTela, ambiente, impressora, selecao, produtoInicial, produtoFinal, nivel){
        self.produtosLoja(nivel);
        z.component.footer.clickRightActionByLabel('Ações');
        h.selectAction('Cadastrar Impressoras Por Ambiente Automaticamente');
        h.filtroCampo('LABELCONFTELA', configTela);
        h.campoClicavel('LABELAMBIENTE').then(function(clicavel){
            if(clicavel)
                h.filtroCampo('LABELAMBIENTE', ambiente);
        });
        h.filtroCampo('NMIMPRLOJA', impressora);
        //h.selectNative('NMTPSELECT', selecao);
        h.click('div.new-select');
        element.all(by.css('div.new-select.open > ul > li.option')).each(function(tipos){
            tipos.getText().then(function(tipo){
                if(tipo === selecao)
                    tipos.click();
            });
        });
        browser.sleep(5000);
        //define a seleção dos produtos por intervalo
        if(selecao === 'Intervalo'){
            h.autoComplete('NMPRODUTOINICIAL', produtoInicial);
            h.autoComplete('NMPRODUTOFINAL', produtoFinal);
        }
        //define a selação dos produtos por lista
        else if(selecao === 'Lista'){
            h.click('#PRODUTOS');
            browser.sleep(5000);
            self.click('div.floating-card-input > input');
            $$('div.floating-card-input > input').get(2).sendKeys(produtoInicial);
            browser.sleep(5000);
            z.widget.grid.rowExists('NMPRODUTO', produtoInicial, '9999').then(function(existeProduto){
                if(existeProduto)
                    z.widget.grid.click('NMPRODUTO', produtoInicial, '9999');
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
            browser.sleep(5000);
            self.click('div.floating-card-input > input');
            $$('div.floating-card-input > input').get(2).sendKeys(produtoFinal);
            browser.sleep(5000);
            z.widget.grid.rowExists('NMPRODUTO', produtoFinal, '9999').then(function(existeProduto){
                if(existeProduto)
                    z.widget.grid.click('NMPRODUTO', produtoFinal, '9999');
            });
            z.component.footer.clickRightActionByLabel('Ok');
        }
        //confirma o cadastro da impressora de ambiente para os produtos selecionados
        z.component.footer.clickRightActionByLabel('Salvar');
        //verifica se após clicar na opção Salvar será exibida a notificação, algum alerta, ou se existem campos obrigatórios 
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

    this.excluirImpressoraAmbiente = function(configTela, ambiente, impressora, nivel){
        self.produtosLoja(nivel);
        z.component.footer.clickRightActionByLabel('Ações');
        h.selectAction('Excluir Impressoras Automaticamente');
        h.filtroCampo('LABELCONFTELA', configTela);
        h.campoClicavel('LABELAMBIENTE').then(function(clicavel){
            if(clicavel)
                h.filtroCampo('LABELAMBIENTE', ambiente);
        });
        h.filtroCampo('NMIMPRLOJA', impressora);
        //confirma a exclusão da impressora de ambiente para os produtos selecionados
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    
    //função para cadastrar impressora
    this.cadastrarImpressora = function(impressora, nome, porta, dsipimpr, dsipponte) {
        h.navegar('Impressoras por Loja');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.filtroCampo('NMIMPRESSORA', impressora);
        var NMIMPRLOJA = $$('input#NMIMPRLOJA');
        NMIMPRLOJA.sendKeys(nome);
        h.selectNative('CDPORTAIMPR', porta);
        z.field.fieldFunctions.fill('DSIPIMPR', dsipimpr);
        z.field.fieldFunctions.fill('DSIPPONTE', dsipponte);
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluirImpressora = function(impressora){
        h.navegar('Impressoras por Loja');
        z.widget.grid.rowExists('NMIMPRLOJA', impressora, '381504103366549574587').then(function(existeImpressora){
            if(existeImpressora){
                z.widget.grid.click('NMIMPRLOJA', impressora, '381504103366549574587');
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel){
                        $$('.zh-footer-alert>button>span').get(0).getText().then(function(opcao){
                            if(opcao === 'Sim')
                                z.component.alert.clickButton('Sim');
                        });
                    }
                });
            }
        });
    };

    this.cadastrarMapeamento = function(porta, mapeamento){
        h.navegar('Mapeamento de Portas');
        return z.widget.grid.rowExists('CDPORTAIMPR', porta, '3815041033980681183623').then(function(existePorta){
            if(existePorta){
                z.widget.grid.click('CDPORTAIMPR', porta, '3815041033980681183623');
                z.component.footer.clickCenterActionByLabel('Editar');
                z.field.fieldFunctions.fill('DSENDPORTA', mapeamento);
                z.component.footer.clickRightActionByLabel('Salvar');
            }
            else
                return 'A porta da impressora não foi cadastrada.';
        });
    };

    this.excluirMapeamento = function(porta){
        h.navegar('Mapeamento de Portas');
        z.widget.grid.rowExists('CDPORTAIMPR', porta, '3815041033980681183623').then(function(existePorta){
            if(existePorta){
                z.widget.grid.click('CDPORTAIMPR', porta, '3815041033980681183623');
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel){
                        $$('.zh-footer-alert>button>span').get(0).getText().then(function(opcao){
                            if(opcao === 'Sim')
                                z.component.alert.clickButton('Sim');
                        });
                    }
                });
            }
        });
    };

    this.frenteDeCaixa = function(taxaServico, percentual, percentual2, percentual3, trataTaxaServ, trataTaxaEntr, couvert, consumacao, garcomPadrao, vendedor, controle, imprcpnj, mostradesparc, impcupomtroca, produto, produto2){
        h.navegar('Parametrização');
        h.navegar('Frente de Caixa');
        h.navegar('Frente de Caixa (1)');
        z.component.footer.clickCenterActionByLabel('Editar');

        h.grupoCampos('Taxa de Serviços');
        z.field.selectNative.click('IDCOMISVENDA', taxaServico);
        if(taxaServico === 'Cobra taxa de serviço'){
            //z.field.fieldFunctions.fill('VRCOMISVENDA', percentual);
            element(by.id('VRCOMISVENDA')).clear();
            //z.component.alert.clickButton('OK');
            element(by.id('VRCOMISVENDA')).sendKeys(percentual);
            //z.field.fieldFunctions.fill('VRCOMISVENDA2', percentual2);          
            element(by.id('VRCOMISVENDA2')).clear();
            //z.component.alert.clickButton('OK');
            element(by.id('VRCOMISVENDA2')).sendKeys(percentual2); 
            //z.field.fieldFunctions.fill('VRCOMISVENDA3', percentual3);            
            element(by.id('VRCOMISVENDA3')).clear();
            //z.component.alert.clickButton('OK');
            element(by.id('VRCOMISVENDA3')).sendKeys(percentual3); 
        }
        
        h.grupoCampos('Tratamento da Taxa de Serviço');
        h.selectNative('IDTRATTAXASERV', trataTaxaServ);
        if(trataTaxaServ === 'Produto no Cupom')
            h.autoComplete('NMPRODTAXASERV', produto);
        
        h.grupoCampos('Tratamento da Taxa de Entrega (Delivery)');
        h.selectNative('IDTRATTAXAENTR', trataTaxaEntr);
        if(trataTaxaEntr === 'Produto no Cupom')
            h.autoComplete('NMPRODTAXAENTR', produto);
        
        h.grupoCampos('Couver Artístico');
        h.selectNative('IDCOUVERART', couvert);
        if(couvert === 'Sim')
            h.autoComplete('NMPRODCOUVER', produto2);
        
        h.grupoCampos('Consumação Mínima');
        h.selectNative('IDCONSUMAMIN', consumacao);
        if(consumacao === 'Sim'){
            h.autoComplete('NMPRODCONSUM', produto);
            h.autoComplete('NMPRODCONSUF', produto2);
        }
        
        h.grupoCampos('Garçom Padrão');
        h.selectNative('IDUTIVENDPAD', garcomPadrao);
        if(garcomPadrao === 'Sim')
            h.autoComplete('NMRAZSOCVEN', vendedor);
        
        h.grupoCampos('Outros');
        h.selectNative('IDCONTROPROD', controle);
        h.selectNative('IDIMPCNPJCLIE', imprcpnj);
        h.selectNative('IDMOSTRADESPARC', mostradesparc);
        h.selectNative('IDIMPCUPTROCA', mostradesparc);
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.frenteDeCaixa2 = function(obsPedido, grupoPedido, ordemImprPedido, obsCancProduto, grupoCancProduto, obsCancCupom, grupoCancCupom, obsDescVenda, grupoDescVenda, grupoProducao, obrigaObs){
        h.navegar('Parametrização');
        h.navegar('Frente de Caixa');
        h.navegar('Frente de Caixa (2)');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Observação na realização de um pedido');
        h.selectNative('IDSOLOBSPED', obsPedido);
        if(obsPedido === 'Sim'){
            h.autoComplete('NMOBSARVPED', grupoPedido);
            h.selectNative('IDPOSOBSPED', ordemImprPedido);
        }
        h.grupoCampos('Observação na realização de um pedido');
        
        h.grupoCampos('Observação no cancelamento de um produto');
        h.selectNative('IDSOLOBSCAN', obsCancProduto);
        if(obsCancProduto === 'Sim')
            h.autoComplete('NMOBSARVCAN', grupoCancProduto);
        h.grupoCampos('Observação no cancelamento de um produto');
        
        h.grupoCampos('Observação no cancelamento de um cupom');
        h.selectNative('IDSOLOBSCANCUP', obsCancCupom);
        if(obsCancCupom === 'Sim')
            h.autoComplete('NMOBSARVCANCUP', grupoCancCupom);
        h.grupoCampos('Observação no cancelamento de um cupom');

        h.grupoCampos('Observação no desconto da venda');
        h.selectNative('IDSOLOBSDESC', obsDescVenda);
        if(obsDescVenda === 'Sim')
            h.autoComplete('NMOBSARVDESC', grupoDescVenda); 
        h.grupoCampos('Observação no desconto da venda'); 
        
        h.grupoCampos('Grupo de observações para envio de mensagens para produção');
        h.autoComplete('NMOBSERVMSGPROD', grupoProducao);
        h.grupoCampos('Grupo de observações para envio de mensagens para produção');
        
        h.grupoCampos('Obrigatoriedade de Observações');
        h.selectNative('IDOBRIGAOBSCAN', obrigaObs);
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.frenteDeCaixa3 = function(qtmaxpedfos, nrminsemcons, idlugarmesa, idutlcorteped, idutlnmconsmesa, idexibemensop, qtmaxpervndprod, idtipcobra, idexibticcup, iddesbloprodaut, vrmaxdesconto, idutlsenhaoper, idalttxserv, idobrfechdlv, idobrfech){
        h.navegar('Parametrização');
        h.navegar('Frente de Caixa');
        h.navegar('Frente de Caixa (3)');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Controle de Pedidos');
        //z.field.fieldFunctions.fill('QTMAXPEDFOS', qtMaxPedFos);
        element(by.id('QTMAXPEDFOS')).clear();
        element(by.id('QTMAXPEDFOS')).sendKeys(qtmaxpedfos);
        h.grupoCampos('Controle de Pedidos');

        h.grupoCampos('Controle de Mesa');
        element(by.id('NRMINSEMCONS')).clear();
        element(by.id('NRMINSEMCONS')).sendKeys(nrminsemcons);
        h.selectNative('IDLUGARMESA', idlugarmesa);
        if(idlugarmesa === 'Sim')
            h.selectNative('IDUTLCORTEPED', idutlcorteped);
        h.selectNative('IDUTLNMCONSMESA', idutlnmconsmesa);
        h.grupoCampos('Controle de Mesa');

        h.grupoCampos('Mensagem iniciando venda sugestiva para o operador');
        h.selectNative('IDEXIBEMENSOP', idexibemensop);
        if(idexibemensop === 'Sim')
            z.field.fieldFunctions.fill('DSMENSOPERLOJA', 'Teste de mensagem sendo inputada');
        h.grupoCampos('Mensagem iniciando venda sugestiva para o operador');

        h.grupoCampos('Limitador de quantidade vendida');
        //z.field.fieldFunctions.fill('QTMAXPERVNDPROD', qtmaxpervndprod);
        element(by.id('QTMAXPERVNDPROD')).clear();
        element(by.id('QTMAXPERVNDPROD')).sendKeys(qtmaxpervndprod);
        h.grupoCampos('Limitador de quantidade vendida');
        
        h.grupoCampos('Controle de Caixa');
        h.selectNative('IDTIPCOBRA', idtipcobra);
        h.selectNative('IDEXIBTICCUP', idexibticcup);
        h.selectNative('IDDESBLOPRODAUT', iddesbloprodaut);
        //z.field.fieldFunctions.fill('VRMAXDESCONTO', vrmaxdesconto);
        element(by.id('VRMAXDESCONTO')).clear();
        element(by.id('VRMAXDESCONTO')).sendKeys(vrmaxdesconto);
        h.selectNative('IDUTLSENHAOPER', idutlsenhaoper);
        h.grupoCampos('Controle de Caixa');
        
        h.grupoCampos('Taxa de Serviço');
        h.selectNative('IDALTTXSERV', idalttxserv);
        h.grupoCampos('Taxa de Serviço');
        
        h.grupoCampos('Fechamento Pedidos Delivery');
        h.selectNative('IDOBRFECHDLV', idobrfechdlv);
        //Obriga fechamento de pedidos NFCe/SAT abertos a mais de 24h (Delivery, Mesa, Comanda)
        $$('div.new-select').get(11).click();
        $$('li.option').each(function(opcoes){
            opcoes.getText().then(function(opcao){
                if(opcao === idobrfech)
                    opcoes.click();
            });
        });
        h.grupoCampos('Fechamento Pedidos Delivery');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.limiteObservacoes = function(observacao, numMinObs, numMaxObs){
        h.navegar('Parametrização');
        h.navegar('Frente de Caixa');
        h.navegar('Limite de Observações');
        return z.widget.grid.rowExists('DSGRPOCOR', observacao, '3815041031241266787722').then(function(existeObs){
            if(existeObs){
                z.widget.grid.click('DSGRPOCOR', observacao, '3815041031241266787722');
                z.component.footer.clickCenterActionByLabel('Editar');
                //z.field.fieldFunctions.fill('NRMINOCORR',numMinObs);
                element(by.id('NRMINOCORR')).clear();
                z.component.alert.clickButton('OK');
                element(by.id('NRMINOCORR')).sendKeys(numMinObs);
                //z.field.fieldFunctions.fill('NRMAXOCORR',numMinObs);
                element(by.id('NRMAXOCORR')).clear();
                z.component.alert.clickButton('OK');
                element(by.id('NRMAXOCORR')).sendKeys(numMaxObs);
                z.component.footer.clickRightActionByLabel('Salvar');
                return h.aguardaMensagem().then(function(mensagem){return mensagem});
            }
            else
                return 'Grupo de observação não foi cadastrado.';
        });
    };

    this.parametrosComanda = function(idinfmesacom, idinfvendcom, idinfconscom, idcomandaaut, idbloqcomparc, mesaPadrao, idreutilizacmd, idagrupapedcom){
        h.navegar('Parametrização');
        h.navegar('Parametrização de Comanda');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Abertura de comanda');
        h.selectNative('IDINFMESACOM', idinfmesacom);
        h.selectNative('IDINFVENDCOM', idinfvendcom);
        h.selectNative('IDINFCONSCOM', idinfconscom);
        h.selectNative('IDCOMANDAAUT', idcomandaaut);
        h.selectNative('IDBLOQCOMPARC', idbloqcomparc);
        h.grupoCampos('Definição de Padrão Mesa');
        h.autoComplete('NMMESA', mesaPadrao);        
        h.grupoCampos('Reutilização de Comanda');
        h.selectNative('IDREUTILIZACMD', idreutilizacmd);
        h.grupoCampos('Pedidos');
        h.selectNative('IDAGRUPAPEDCOM', idagrupapedcom);
        z.component.footer.clickRightActionByLabel('Salvar');       
    };

    this.gestaoVendas = function(nmtabeprec, dsalmoxarife, cdlocalestoq, nmtipooper, ipservpri, ipservsec){
        h.navegar('Parametrização');
        h.navegar('Gestão de Vendas');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Tabela de Preço utilizada pela loja na venda de produtos');
        h.autoComplete('NMTABEPREC', nmtabeprec);
        h.grupoCampos('Estoque Padrão utilizado pela loja na consolidação de vendas');
        h.autoComplete('DSALMOXARIFE', dsalmoxarife);
        h.autoComplete('CDLOCALESTOQ', cdlocalestoq);
        h.grupoCampos('Tipo de Operação utilizado pela loja na consolidação de vendas');
        h.autoComplete('NMTIPOOPER', nmtipooper);
        h.grupoCampos('Conexão no Caixa (IpServer)');
        //z.field.fieldFunctions.fill('IPSERVPRI', ipservpri);
        element(by.id('IPSERVPRI')).clear();
        element(by.id('IPSERVPRI')).sendKeys(ipservpri);
        h.alertaDeErro();
        //z.field.fieldFunctions.fill('IPSERVSEC', ipservsec);
        element(by.id('IPSERVSEC')).clear();
        element(by.id('IPSERVSEC')).sendKeys(ipservsec);
        h.alertaDeErro();
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    
    this.tef = function(idimprcuptefred, idimprviaconstef, idhabformtef){
        h.navegar('Parametrização');
        h.navegar('TEF');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Parametrização TEF');
        h.selectNative('IDIMPRCUPTEFRED', idimprcuptefred);
        h.selectNative('IDIMPRVIACONSTEF', idimprviaconstef);
        h.selectNative('IDHABFORMTEF', idhabformtef);
        z.component.footer.clickRightActionByLabel('Salvar');        
    }; 
};
module.exports = new cadastroLoja();