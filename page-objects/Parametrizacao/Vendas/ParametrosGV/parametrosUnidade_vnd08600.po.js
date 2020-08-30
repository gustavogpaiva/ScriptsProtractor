var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var parametrosUnidade = function () {
    var self = this;
    //função utilizada para definir a hora do dayPart
    this.setDayPart = function (horaDayPart) {
        browser.sleep(3000);
        var hora = parseInt(horaDayPart.substring(0, 2));
        var minuto = parseInt(horaDayPart.substring(3, 5));
        var segundo = parseInt(horaDayPart.substring(6, 8));
        var lista;
        var linha;
        var marca;
        var hms = element.all(by.css('div.dw-li.zh-picker-text-unselected.dw-v.dw-sel > div'));
        //HORA
        hms.get(0).getText().then(function (selecao) {
            if (parseInt(selecao) >= 19)
                lista = 2;
            else
                lista = 1;
            console.log('lista =' + lista);
            linha = parseInt(selecao) + 1;
            marca = selecao;
            if (marca > hora) {
                console.log(marca + " > " + hora);
                linha--;
                while (marca > hora) {
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(1) > div > div.dwww > div.dww > div > div:nth-child(' + lista + ') > div:nth-child(' + linha + ') > div'));
                    linha--;
                    marca--;
                    if (linha == 19) {
                        lista = 1;
                        linha = 19;
                    }
                }
            }
            else if (marca < hora) {
                console.log(marca + " < " + hora);
                linha++;
                while (marca < hora) {
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(1) > div > div.dwww > div.dww > div > div:nth-child(' + lista + ') > div:nth-child(' + linha + ') > div'));
                    linha++;
                    marca++;
                    if (linha == 20) {
                        lista = 2;
                        linha = 1;
                    }
                }
            }
        });
        //MINUTO
        hms.get(1).getText().then(function (selecao) {
            if (parseInt(selecao) >= 59) {
                lista = 4;
                linha = (parseInt(selecao) + 1) - 59;
            }
            else if (parseInt(selecao) >= 39) {
                lista = 3;
                linha = (parseInt(selecao) + 1) - 39;
            }
            else if (parseInt(selecao) >= 19) {
                lista = 2;
                linha = (parseInt(selecao) + 1) - 19;
            }
            else if (parseInt(selecao) >= 0) {
                lista = 1;
                linha = (parseInt(selecao) + 1);
            }
            console.log('lista =' + lista);
            marca = selecao;
            if (marca > minuto) {
                console.log(marca + " > " + minuto);
                linha--;
                while (marca > minuto) {
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(3) > div > div.dwww > div.dww > div > div:nth-child(' + lista + ') > div:nth-child(' + linha + ') > div'));
                    linha--;
                    marca--;
                    if (lista == 4 && linha < 1) {
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
                }
            }
            else if (marca < minuto) {
                console.log(marca + " < " + minuto);
                linha++;
                while (marca < minuto) {
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(3) > div > div.dwww > div.dww > div > div:nth-child(' + lista + ') > div:nth-child(' + linha + ') > div'));
                    linha++;
                    marca++;
                    if (lista == 3 && linha > 20) {
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
                    else if (linha == 0) {
                        console.log('(lista 1)');
                        lista = 1;
                        linha = 1;
                    }
                }
            }
        });
        //SEGUNDO
        hms.get(2).getText().then(function (selecao) {
            if (parseInt(selecao) >= 59) {
                lista = 4;
                linha = (parseInt(selecao) + 1) - 59;
            }
            else if (parseInt(selecao) >= 39) {
                lista = 3;
                linha = (parseInt(selecao) + 1) - 39;
            }
            else if (parseInt(selecao) >= 19) {
                lista = 2;
                linha = (parseInt(selecao) + 1) - 19;
            }
            else if (parseInt(selecao) >= 0) {
                lista = 1;
                linha = (parseInt(selecao) + 1);
            }
            console.log('lista =' + lista);
            marca = selecao;
            if (marca > segundo) {
                console.log(marca + " > " + segundo);
                linha--;
                while (marca > segundo) {
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(5) > div > div.dwww > div.dww > div > div:nth-child(' + lista + ') > div:nth-child(' + linha + ') > div'));
                    linha--;
                    marca--;
                    if (lista == 4 && linha < 1) {
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
                }
            }
            else if (marca < segundo) {
                console.log(marca + " < " + segundo);
                linha++;
                while (marca < segundo) {
                    console.log('linha ' + linha);
                    z.util.clickElement(by.css('body > div.mbsc-mobiscroll.dw-bottom > div > div.dw.dw-ltr > div > div.dwcc > div > div > div:nth-child(5) > div > div.dwww > div.dww > div > div:nth-child(' + lista + ') > div:nth-child(' + linha + ') > div'));
                    linha++;
                    marca++;
                    if (lista == 3 && linha > 20) {
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
                    else if (linha == 0) {
                        console.log('(lista 1)');
                        lista = 1;
                        linha = 1;
                    }
                }
            }
        });

        element(by.cssContainingText('.dwb0', 'Selecionar')).click();
        browser.sleep(3000);
    };

    this.selecionaUnidade = function (unidade) {
        return h.getIdGrid().then(function(idGrid){
            console.log(idGrid);
            return h.gridSemRegistros(idGrid).then(function(gridVazio){
                if(!gridVazio){
                    return z.widget.grid.rowExists('CDFILIAL', unidade, idGrid).then(function(existeRegistro){
                        if(existeRegistro)
                            z.widget.grid.click('CDFILIAL', unidade, idGrid, false);
                        else
                            return false;
                    });
                }
                else
                    return false;
            });
        });
    };

    this.frenteDeCaixa = function (unidade, operador, cliente, centroCusto, tipoConsumidor, carregaDados, idParceiro, dirArquivoDotz, diaFechamento, numeroMaximo, utilizaConcessao, integraHotel, freteLogistica, tipoSSL) {
        if(self.selecionaUnidade(unidade)){
            h.navegar('Frente de Caixa');
            z.component.footer.clickCenterActionByIcon('pencil');
            h.grupoCampos('Operador padrão utilizado na abertura do caixa no Auto Atendimento');
            h.autoComplete('NMOPERADOR', operador);
            h.grupoCampos('Cliente padrão utilizado na inclusão das vendas a vista');
            h.autoComplete('NMRAZSOCCLIE', cliente);
            h.grupoCampos('Parâmetros utilizados na inclusão automática de consumidor');
            h.autoComplete('NMCCUSCLIE', centroCusto);
            h.autoComplete('NMTIPOCONS', tipoConsumidor);
            h.grupoCampos('Parâmetro utilizado para carregar dados da catraca no MSDE');
            h.selectNative('IDATUIDVCAT', carregaDados);
            h.grupoCampos('DOTZ');
            z.field.fieldFunctions.fill('CDINTEGRADOTZ', idParceiro);
            z.field.fieldFunctions.fill('DSDIRARQDOTZ', dirArquivoDotz);
            h.grupoCampos('Definição do dia de Fechamento da Folha de Pagamento da Filial(utilizado para Venda Débito Consumidor)');
            //z.field.fieldFunctions.fill('NRDIAFECHAFOLHA', diaFechamento);
            element(by.id('NRDIAFECHAFOLHA')).clear();
            z.component.alert.clickButton('OK');
            element(by.id('NRDIAFECHAFOLHA')).sendKeys(diaFechamento);
            h.grupoCampos('Número máximo de pessoas na mesa');
            //z.field.fieldFunctions.fill('NRMAXPESMES', numeroMaximo);
            element(by.id('NRMAXPESMES')).clear();
            z.component.alert.clickButton('OK');
            element(by.id('NRMAXPESMES')).sendKeys(numeroMaximo);
            h.grupoCampos('Parâmetro utilizado para Concessão de Crédito Distrito Federal');
            h.selectNative('IDCONCREDDF', utilizaConcessao);
            h.grupoCampos('Parâmetro utilizado para identificar integração com Hotel');
            h.selectNative('IDINTHOTEL', integraHotel);
            if(integraHotel === 'Sim')
                z.field.fieldFunctions.fill('DSSTRINGHOTEL', 'mysql.teste');
            h.grupoCampos('Frete e Logística');
            z.field.fieldFunctions.fill('VRPERCCUSTPROD', freteLogistica);
            h.grupoCampos('Parâmetro para conexões TEF');
            h.selectNative('IDUTLSSL', tipoSSL);
            z.component.footer.clickRightActionByLabel('Salvar');

            //retorna a mensagem recebida após salvar a parametrização da aba
            return h.aguardaMensagem().then(function(mensagem){return mensagem});
        }
        else{
            return 'Unidade não foi encontrada.';
        }
    };

    this.definicoesNfceSat = function (imprimeLogo, posBema, posEpson1, posEpson2, enviaCodBarXml, codVincSat, codChavAcesVali, codChaveReq, ambiente, arqCertNfce, senhaCertNfce, cancelamentoNfce, geraLogNfce, dirArqLogNfce, cscHomologacao, cscProducao, codIdTokenHomo, codIdTokenProd, versaoXML, versaoQRCODE, timeoutNfce, urlNfce, justCancNfce, utilTransAutoNfce, horarioTransAuto, horarioFixo, dirInstalPHP, dirArqPHP, bloqueioCaixa, umaViaNfce, codChaveSegSat) {
        h.navegar('Definições NFC-e/SAT');
        z.component.footer.clickCenterActionByIcon('pencil');
        
        h.grupoCampos('Imprime Logotipo nas vendas NFCe/SAT');
        h.selectNative('IDIMPLOGONF', imprimeLogo);
        //z.field.fieldFunctions.fill('NRPOSNVBEMA', '1');
        element(by.id('NRPOSNVBEMA')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('NRPOSNVBEMA')).sendKeys(posBema);
        //z.field.fieldFunctions.fill('NRPOSNV1EPSON', '2');
        element(by.id('NRPOSNV1EPSON')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('NRPOSNV1EPSON')).sendKeys(posEpson1);
        //z.field.fieldFunctions.fill('NRPOSNV2EPSON', '3');
        element(by.id('NRPOSNV2EPSON')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('NRPOSNV2EPSON')).sendKeys(posEpson2);
        h.grupoCampos('Imprime Logotipo nas vendas NFCe/SAT');
        
        h.grupoCampos('Geração XML (SAT/NFCe)');
        h.selectNative('IDENVIACDBARXML', enviaCodBarXml);
        h.grupoCampos('Código de vinculação do SAT');
        z.field.fieldFunctions.fill('CDVINCSAT', codVincSat);
        h.grupoCampos('Geração XML (SAT/NFCe)');
        
        h.grupoCampos('Parametrização TEF/POS MFe');
        z.field.fieldFunctions.fill('CDCHAVACESVALI', codChavAcesVali);
        z.field.fieldFunctions.fill('CDCHAVEREQUI', codChaveReq);
        h.grupoCampos('Parametrização TEF/POS MFe');
        
        h.grupoCampos('Parametrização de Nota Fiscal Eletrônica para Consumidor Final(NFC-e)');
        h.selectNative('IDAMBTRABNFCE', ambiente);
        z.field.fieldFunctions.fill('NMARQCERTNFCE', arqCertNfce);
        z.field.fieldFunctions.fill('DSSENHACERTNFCE', senhaCertNfce);
        h.selectNative('IDCANCEXTNFCE', cancelamentoNfce);
        h.selectNative('IDGERALOGNFCE', geraLogNfce);
        if(geraLogNfce === 'Sim')
           z.field.fieldFunctions.fill('DSDIRARQLOGNFCE', dirArqLogNfce);
        h.grupoCampos('Parametrização de Nota Fiscal Eletrônica para Consumidor Final(NFC-e)');
        
        h.grupoCampos('Código de Segurança do Contribuinte - CSC (NFC-e)');
        z.field.fieldFunctions.fill('CDCODSCONSHOMO', cscHomologacao);
        z.field.fieldFunctions.fill('CDCODSCONSPROD', cscProducao);
        z.field.fieldFunctions.fill('CDIDTOKENHOMO', codIdTokenHomo);
        z.field.fieldFunctions.fill('CDIDTOKENPROD', codIdTokenProd);
        h.grupoCampos('Código de Segurança do Contribuinte - CSC (NFC-e)');
        
        h.grupoCampos('Versão XML (NFC-e)');
        h.selectNative('CDVERSAOXMLNFCE', versaoXML);
        h.grupoCampos('Versão XML (NFC-e)');
        
        h.grupoCampos('Versão QRCode');
        h.selectNative('CDVERSAOQRCNFCE', versaoQRCODE);
        h.grupoCampos('Versão QRCode');
        
        h.grupoCampos('TimeOut Transmissão NFCe');
        //z.field.fieldFunctions.fill('NRTIMEOUTNFCE', timeoutNfce);
        browser.wait(element(by.id('NRTIMEOUTNFCE')).clear(), 5000);
        z.component.alert.clickButton('OK');
        element(by.id('NRTIMEOUTNFCE')).sendKeys(timeoutNfce);
        h.grupoCampos('TimeOut Transmissão NFCe');
        
        h.grupoCampos('Endereço do NFC-e Service');
        z.field.fieldFunctions.fill('CDURLWSNFC', urlNfce);
        h.grupoCampos('Endereço do NFC-e Service');

        h.grupoCampos('Cancelamento Automático');
        z.field.fieldFunctions.fill('DSJUSTCANCNFCE', justCancNfce);
        h.grupoCampos('Cancelamento Automático');
        
        h.grupoCampos('Transmissão Automática (NFC-e)');
        h.selectNative('IDTRANSAUTONFCE', utilTransAutoNfce);
        if(utilTransAutoNfce === 'Sim'){
            h.selectNative('IDHRTRANSAUTO', horarioTransAuto);
            if(horarioTransAuto === 'Horário Fixo')
                z.field.fieldFunctions.fill('HRTRANSAUTO', horarioFixo);
            z.field.fieldFunctions.fill('DSDIRINSTALPHP', dirInstalPHP);
            z.field.fieldFunctions.fill('DSDIRARQPHP', dirArqPHP);
        }
        h.grupoCampos('Transmissão Automática (NFC-e)');
        
        h.grupoCampos('Bloqueio de Caixa sem Número de Série');
        h.selectNative('IDBLOQCXSSERIE', bloqueioCaixa);
        h.grupoCampos('Bloqueio de Caixa sem Número de Série');

        h.grupoCampos('Emissão Danfe Contigência (NFC-e)');
        h.selectNative('IDUMAVIANFCE', umaViaNfce);
        h.grupoCampos('Emissão Danfe Contigência (NFC-e)');
        
        h.grupoCampos('Consulta XML (SAT)');
        z.field.fieldFunctions.fill('CDCHAVESEGSAT', codChaveSegSat);
        h.grupoCampos('Consulta XML (SAT)');

        z.component.footer.clickRightActionByLabel('Salvar');
        
        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };

    this.controleCaixa = function (percentual, geraArqXML, solicitaNSU, qtdeDigNSU, solicitaDotz, digitaCPF, valorMin, valorMax, qtdeMaxDias, exportaVendas, limpaTAA, impostoProduto, imprimeTxServ, enviaPedKDS, zebra, infCheque, descTxServ, pedidosViagem) {
        h.navegar('Controle de Caixa');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.grupoCampos('Percentual maximo permitido para troco em Ticket');
        z.field.fieldFunctions.fill('VRPEEMITROCO', percentual);
        
        h.grupoCampos('Gera arquivo XML ( Integração Comanda)');
        h.selectNative('IDGERAARQXMLINT', geraArqXML);
        
        h.grupoCampos('Solicita NSU/DOC nas vendas crédito e venda débito');
        h.selectNative('IDSOLICITANSU', solicitaNSU);
        //z.field.fieldFunctions.fill('QTDMAXDIGNSU', qtdeDigNSU);
        element(by.id('QTDMAXDIGNSU')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('QTDMAXDIGNSU')).sendKeys(qtdeDigNSU);

        h.grupoCampos('DOTZ');
        h.selectNative('IDSOLICITADOTZ', solicitaDotz);
        h.selectNative('IDCPFPINPAD', digitaCPF);
        
        h.grupoCampos('Controla Valor de sangria');
        z.field.fieldFunctions.fill('VRMINSANGRIA', valorMin);
        z.field.fieldFunctions.fill('VRMAXSANGRIA', valorMax);
        
        h.grupoCampos('Sincronização com Banco de dados');
        //z.field.fieldFunctions.fill('NRDIAVALTURCAIX', qtdeMaxDias);
        element(by.id('NRDIAVALTURCAIX')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('NRDIAVALTURCAIX')).sendKeys(qtdeMaxDias);
        //z.field.fieldFunctions.fill('NRMINEXPVENDA', exportaVendas);
        element(by.id('NRMINEXPVENDA')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('NRMINEXPVENDA')).sendKeys(exportaVendas);
                
        h.grupoCampos('Limpeza do Auto-Atendimento');
        //z.field.fieldFunctions.fill('NRSEGLIMPEZATAA', limpaTAA);
        element(by.id('NRSEGLIMPEZATAA')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('NRSEGLIMPEZATAA')).sendKeys(limpaTAA);
        
        h.grupoCampos('Venda de Produtos');
        h.selectNative('IDACRIMPOSTO', impostoProduto);
        
        h.grupoCampos('Impressão Taxa de Serviço');
        h.selectNative('IDIMPTXSERV', imprimeTxServ);
        
        h.grupoCampos('Envia pedido para KDS na venda balcão pelo frente de caixa');
        h.selectNative('IDENVIAPEDKDS', enviaPedKDS);
        
        h.grupoCampos('Impressora Zebra');
        h.selectNative('IDETIQZEBRA', zebra);
        
        h.grupoCampos('Informações de cheque no recebimento da venda');
        h.selectNative('IDIMPCUPFIS', infCheque);
        
        h.grupoCampos('Taxa de Serviço');
        h.selectNative('IDCONDESCTXSERV', descTxServ);
        
        h.grupoCampos('Controle de Pedidos para Viagem');
        h.selectNative('IDCTRLPEDVIAGEM', pedidosViagem);
        
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };

    this.definicoesConsumidor = function (percadconscaixa, exconsatfil, criptocons, perdigcons, qtdigvericador, posIniLeitura, posFinLeitura, cpfPinPad, dadosFidelidade, imprLimite, confirmaCadastro, imprSaldo) {
        h.navegar('Definições de Consumidor');
        z.component.footer.clickCenterActionByIcon('pencil');
        
        h.grupoCampos('Permite cadastrar consumidor no frente do caixa');
        h.selectNative('IDPERCADCONSFCXA', percadconscaixa);
        
        h.grupoCampos('Mostrar somente consumidores ativos na pesquisa de consumidores na frente do caixa');
        h.selectNative('IDEXCONSATFIL', exconsatfil);
        
        h.grupoCampos('Criptografia do Crachá do Consumidor');
        h.selectNative('IDCRIPTOCONS', criptocons);
        
        h.grupoCampos('Parâmetro utilizado nas vendas que solicitam o consumidor');
        h.selectNative('IDPERDIGCONS', perdigcons);
       
        h.grupoCampos('Formatação do crachá do consumidor');
        //z.field.fieldFunctions.fill('QTDIGCDIDCON', '1');
        element(by.id('QTDIGCDIDCON')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('QTDIGCDIDCON')).sendKeys(qtdigvericador);
       
        //z.field.fieldFunctions.fill('NRPOSINICONS', '1');
        element(by.id('NRPOSINICONS')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('NRPOSINICONS')).sendKeys(posIniLeitura);
            
        //z.field.fieldFunctions.fill('NRPOSFINCONS', '1');
        element(by.id('NRPOSFINCONS')).clear();
        z.component.alert.clickButton('OK');
        element(by.id('NRPOSFINCONS')).sendKeys(posFinLeitura);
      
        h.grupoCampos('CPF do Consumidor na Venda');
        h.selectNative('IDINFOCPFPINPAD', cpfPinPad);
        
        h.grupoCampos('Parâmetro Utilizado para Consultar Dados da Campanha Fidelidade');
        h.selectNative('IDCONSCAMPFIDEL', dadosFidelidade);
        
        h.grupoCampos('Parametrização Imprime Limite - Venda Débito Consumidor');
        h.autoComplete('IDPARIMPRLIMVDCFRASE', imprLimite);

        h.grupoCampos('Confirmação do cadastro do Consumidor');
        h.selectNative('IDUTCONFCADCONS', confirmaCadastro);

        h.grupoCampos('Parametrização Imprime Saldo - Venda Crédito Pessoal / Débito Consumidor');
        h.selectNative('IDIMPSALDOCUPOM', imprSaldo);

        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };

    this.regrasPreco = function (unidade, tabelaPreco, precoComposicao, precoManutencao, precoCalculado, custoFormacaoPreco) {
        if(self.selecionaUnidade(unidade)){
            h.navegar('Regras de Preços');
            z.component.footer.clickCenterActionByIcon('pencil');
            h.grupoCampos('Tabela de Preço');
            h.autoComplete('NMTABEPREC', tabelaPreco);

            h.grupoCampos('Composição de Produto');
            h.selectNative('IDPRECDIFCOM', precoComposicao);
            
            h.grupoCampos('Manutenção da Venda');
            h.selectNative('IDALTPRECO', precoManutencao);
            
            h.grupoCampos('Formação do Preço de Venda dos Produtos');
            h.selectNative('IDFORMAPRECO', precoCalculado);
            h.selectNative('IDCUSFOPRECO', custoFormacaoPreco);
            
            z.component.footer.clickRightActionByLabel('Salvar');

            //retorna a mensagem recebida após salvar a parametrização da aba
            return h.aguardaMensagem().then(function(mensagem){return mensagem});
        }
        else
            return 'Unidade não foi encontrada.';
    };

    this.consolidacaoVendas = function (unidade, permiteConsolidar, dataInicio, tipoAtualiza, seriePadrao, tipoRetirada, setorPadrao, consolidaIrregular, visualizaIrregular, geraNotaFiscal, utilizaContabil, bloqueioConsolidacao) {
        if(self.selecionaUnidade(unidade)){
            h.navegar('Consolidação de vendas');
            z.component.footer.clickCenterActionByIcon('pencil');
            
            h.grupoCampos('Restrição de Datas');
            h.selectNative('IDCONSUMIOBR', permiteConsolidar);
            //apaga a data parametrizada e clica no ícone de calendário
            $('div.zh-select-date.zh-field-DTINITESCONS > div.close-button > span > svg').click();
            $('div.zh-select-date.zh-field-DTINITESCONS > div.calendar-button > span > svg').click();
            z.field.calendar.clickDate(dataInicio, 'pt_br');
            
            h.grupoCampos('Padrões da Consolidação');
            h.selectNative('IDATUEST', tipoAtualiza);
            h.autoComplete('DSSERIE', seriePadrao);
            h.autoComplete('NMTIPORETI', tipoRetirada);
            h.autoComplete('NMSETOR', setorPadrao);

            h.selectNative('IDPERCONVESTNEG', consolidaIrregular);
            h.selectNative('IDVISUPRODNEG', visualizaIrregular);
            h.selectNative('IDGERANFVENPROD', geraNotaFiscal);
            h.selectNative('IDUTILCONTAB', utilizaContabil);
            h.selectNative('IDBLOQCONSOLIDA', bloqueioConsolidacao);
            
            z.component.footer.clickRightActionByLabel('Salvar');

            //retorna a mensagem recebida após salvar a parametrização da aba
            return h.aguardaMensagem().then(function(mensagem){return mensagem});
        }
        else
            return 'Unidade não foi encontrada.';
    };

    this.integracao = function (unidade, boletoBanco, bancoItau, bancoBradesco, integraSite, idIfood, idSpoon) {
        if(self.selecionaUnidade(unidade)){
            h.navegar('Integração');
            z.component.footer.clickCenterActionByIcon('pencil');
            
            h.grupoCampos('Opção de pagamento usadas pela Unidade');
            h.selectNative('IDRECBOLETBANC', boletoBanco);
            h.selectNative('IDRECBANCOITAU', bancoItau);
            h.selectNative('IDRECBANCOBRADE', bancoBradesco);
            
            h.grupoCampos('Integração com site');
            h.selectNative('IDFILUTSITE', integraSite);
            
            h.grupoCampos('Integração Delivery');
            z.field.fieldFunctions.fill('CDFILIALEXT', idIfood);
            z.field.fieldFunctions.fill('CDFILIALEXTSPOON', idSpoon);
            
            z.component.footer.clickRightActionByLabel('Salvar');

            //retorna a mensagem recebida após salvar a parametrização da aba
            return h.aguardaMensagem().then(function(mensagem){return mensagem});
        }
        else
            return 'Unidade não foi encontrada.';
    };

    this.gestaoVendas = function (unidade, grupoProdVenda, importaVendas, diasCalcMedia, diasFaturamento, redZMapaResumo, geraSeqMapaResumo, tcFechamentoDia, exportaDados, marcaCatraca, geraPrevConsumo, importaSaldoNegativo, consisteConsolidacao, qtdeFazerPedido, tipoReceQRCode) {
        if(self.selecionaUnidade(unidade)){
            h.navegar('Gestão de Vendas');
            h.navegar('Geral');
            z.component.footer.clickCenterActionByIcon('pencil');
            
            h.grupoCampos('Grupo de produto para venda');
            if(grupoProdVenda != '')
                h.autoComplete('NMGRUPPRODPDV', grupoProdVenda);
            h.selectNative('IDORIGVENDA', importaVendas);
            z.field.fieldFunctions.fill('NRDIASVENDA', diasCalcMedia);
            z.field.fieldFunctions.fill('NRDIAFATVEND', diasFaturamento);
            
            h.grupoCampos('Mapa Resumo ECF');
            h.selectNative('IDCONSREDZMECF', redZMapaResumo);
            h.selectNative('IDTIPMAPRESU', geraSeqMapaResumo);
            
            h.grupoCampos('Geração TC');
            h.selectNative('IDCONSTCFECDIA', tcFechamentoDia);
            h.selectNative('IDGERACAOTC', exportaDados);
            
            h.grupoCampos('Outros');
            h.selectNative('IDPERMARCDUP', marcaCatraca);
            h.selectNative('IDPREVCONSPDV', geraPrevConsumo);
            h.selectNative('IDIMPBLOLANCNEG', importaSaldoNegativo);
            h.selectNative('IDCONSISTECONSO', consisteConsolidacao);
            
            h.grupoCampos('Parâmetros do Waiter');
            h.selectNative('IDUTLQTDPED', qtdeFazerPedido);

            h.grupoCampos('Tipo de recebimento QRCode');
            h.autoComplete('NMTIPORECEQRCODE', tipoReceQRCode);

            z.component.footer.clickRightActionByLabel('Salvar');

            //retorna a mensagem recebida após salvar a parametrização da aba
            return h.aguardaMensagem().then(function(mensagem){return mensagem});
        }
        else
            return 'Unidade não foi encontrada.';
    };

    this.datasRestricoes = function (dataProcessamento, permiteLancarAntes, diasLancamentosAntes, permiteLancarDepois, diasLancamentosDepois, realizaManutencao) {
        h.navegar('Gestão de Vendas');
        h.navegar('Datas e Restrições');
        z.component.footer.clickCenterActionByIcon('pencil');
        
        h.grupoCampos('Data de Processamento');
        //apaga a data parametrizada e clica no ícone de calendário
        $('div.zh-select-date.zh-field-DTPROCVND > div.close-button > span > svg').click();
        $('div.zh-select-date.zh-field-DTPROCVND > div.calendar-button > span > svg').click();
        z.field.calendar.clickDate(dataProcessamento, 'pt_br');

        h.grupoCampos('Antes do Processamento');
        h.selectNative('IDPERLANCANTDP', permiteLancarAntes);
        z.field.fieldFunctions.fill('NRDIAANTLANC', diasLancamentosAntes);
        
        h.grupoCampos('Depois do Processamento');
        h.selectNative('IDPERLANCPOSDP', permiteLancarDepois);
        z.field.fieldFunctions.fill('NRDIAPOSLANC', diasLancamentosDepois);
        
        h.grupoCampos('Manutenção de Venda');
        h.selectNative('IDPERMANUTVEN', realizaManutencao);
        
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };
    
    this.dayPart = function (hrinidaypart1, hrfindaypart1, hrinidaypart2, hrfindaypart2, hrinidaypart3, hrfindaypart3, hrinidaypart4, hrfindaypart4) {
        h.navegar('Gestão de Vendas');
        h.navegar('Day Part');
        z.component.footer.clickCenterActionByIcon('pencil');
        //define a hora inicial e a hora final dos 4 períodos do dayPart
        z.field.fieldFunctions.click('HRINI1DAYPART');
        self.setDayPart(hrinidaypart1);
        z.field.fieldFunctions.click('HRFIN1DAYPART');
        self.setDayPart(hrfindaypart1);
        z.field.fieldFunctions.click('HRINI2DAYPART');
        self.setDayPart(hrinidaypart2);
        z.field.fieldFunctions.click('HRFIN2DAYPART');
        self.setDayPart(hrfindaypart2);
        z.field.fieldFunctions.click('HRINI3DAYPART');
        self.setDayPart(hrinidaypart3);
        z.field.fieldFunctions.click('HRFIN3DAYPART');
        self.setDayPart(hrfindaypart3);
        z.field.fieldFunctions.click('HRINI4DAYPART');
        self.setDayPart(hrinidaypart4);
        z.field.fieldFunctions.click('HRFIN4DAYPART');
        self.setDayPart(hrfindaypart4);

        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };
    
    this.adicionarEmail = function (codigo, email) {
        h.navegar('Gestão de Vendas');
        h.navegar('E-mail dos Gerentes');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        
        z.field.fieldFunctions.fill('CDEMAIL', codigo);
        z.field.fieldFunctions.fill('EMAILGERENTE', email);

        z.component.footer.clickRightActionByLabel('Salvar');

        browser.sleep(3000);
        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){
            z.component.footer.clickLeftActionByLabel('Voltar');
            return mensagem;
        });
    };

    this.editarEmail = function (codigo, email) {
        h.navegar('Gestão de Vendas');
        h.navegar('E-mail dos Gerentes');

        h.gridSemRegistros('4647738361587653793575').then(function(semRegistro){
            if(!semRegistro){
                z.widget.grid.rowExists('CDEMAIL' , codigo, '4647738361587653793575').then(function(existeEmail){
                    if(existeEmail){
                        z.widget.grid.click('CDEMAIL' , codigo, '4647738361587653793575');
                        z.component.footer.clickCenterActionByLabel('Editar');
                        z.field.fieldFunctions.fill('EMAILGERENTE', email);
                        z.component.footer.clickRightActionByLabel('Salvar');
                    }
                });
            }
        });

        browser.sleep(3000);
        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){
            z.component.footer.clickLeftActionByLabel('Voltar');
            return mensagem;
        });
    };

    this.excluirEmail = function (codigo) {
        h.navegar('Gestão de Vendas');
        h.navegar('E-mail dos Gerentes');

        h.gridSemRegistros('4647738361587653793575').then(function(semRegistro){
            if(!semRegistro){
                z.widget.grid.rowExists('CDEMAIL' , codigo, '4647738361587653793575').then(function(existeEmail){
                    if(existeEmail){
                        z.widget.grid.click('CDEMAIL' , codigo, '4647738361587653793575');
                        z.component.footer.clickCenterActionByLabel('Excluir');
                    }
                });
            }
        });

        browser.sleep(3000);
        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };

    this.produtosUnidade = function (unidade, produtoInicial, produtoFinal) {
        if(self.selecionaUnidade(unidade)){
            h.navegar('Produtos por Unidade');
            h.autoComplete('NMPRODUTOINI', produtoInicial);
            h.autoComplete('NMPRODUTOFIN', produtoFinal);
            z.component.footer.clickRightActionByLabel('Filtrar');
            return h.gridSemRegistros('4647738367204214471062').then(function(semRegistro){
                if(!semRegistro){
                    return z.widget.grid.rowExists('NMPRODUTO' , produtoInicial, '4647738367204214471062').then(function(existeProdInicial){
                        return z.widget.grid.rowExists('NMPRODUTO' , produtoFinal, '4647738367204214471062').then(function(existeProdFinal){
                            if(existeProdInicial && existeProdFinal)
                                return true;
                            else
                                return false;
                        });
                    });
                }
                else
                    return 'Não foram localizados produtos para a unidade.';
            });
        }
        else
            return 'Unidade não foi encontrada.';
    };

    this.produtoObrigatorio = function () {
        z.widget.grid.checkAllRows('4647738367204214471062');
        z.component.footer.clickCenterActionByLabel('Utiliza/Não Utiliza');        
        
        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };

    this.parametrizaProdutos = function (toleraQtde, toleraValor, taxaAdm, rejeitaAF, rejeitaOF) {
        //parametriza a tolerância para quantidade
        browser.executeScript("$('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(5) > div > input').click();");
        $('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(5) > div > input').sendKeys(toleraQtde);
        
        //parametriza a tolerância para valor
        browser.executeScript("$('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(6) > div > input').click();");
        $('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(6) > div > input').sendKeys(toleraValor);
        
        //parametriza a taxa administrativa
        browser.executeScript("$('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(7) > div > input').click();");
        $('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(7) > div > input').sendKeys(taxaAdm);
        
        //parametriza a rejeição do AF
        browser.executeScript("$('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(8) > div > input').click();");
        $('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(8) > div > input').sendKeys(rejeitaAF);
        
        //parametriza a rejeição do OF
        browser.executeScript("$('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(9) > div > input').click();");
        $('#grid-4647738367204214471062 > div.body > div > div.tr.cell1 > div:nth-child(9) > div > input').sendKeys(rejeitaOF);

        //move o scroll do grid para direita
        z.util.mouseMoveByAxis('#grid-4647738367204214471062 > div.body-scroll-control > div', -200, 0, 1);

        browser.sleep(5000);
        z.component.footer.clickRightActionByLabel('Salvar alterações');

        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };

    this.ativarProdutos = function () {
        z.widget.grid.checkRow('4647738367204214471062', 1, true);
        z.component.footer.clickCenterActionByLabel('Ativo/Inativo');        
        
        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };

    this.atualizarProdutos = function () {
        z.component.footer.clickRightActionByLabel('Ações');
        h.selectAction('Atualização de produtos para unidade');

        z.component.alert.isVisible().then(function(alertaVisivel){
            if(alertaVisivel)
                z.component.alert.clickButton('Sim');
        });

        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };

    this.exportarProdutos = function (unidadeOrigem, unidadeDestino, agrupamentoUnidade, produtoInicial, produtoFinal) {
        z.component.footer.clickRightActionByLabel('Ações');
        h.selectAction('Exportar produtos de uma unidade para outra');
        h.autoComplete('NMFILIALORI', unidadeOrigem);
        h.autoComplete('NMFILIALDES', unidadeDestino);
        
        //caso a unidade utiliza agrupamento de filial selecione este campo
        if(agrupamentoUnidade !== '')
            h.autoComplete('NMGRUPFILI', agrupamentoUnidade);
        
        h.autoComplete('NMPRODUTOINI', produtoInicial);
        h.autoComplete('NMPRODUTOFIN', produtoFinal);
        h.selectNative('IDTPCONFPAR', 'Atualiza Todos os Registros');
        h.selectNative('All', 'Sim');
        h.selectNative('IDPRODATIV', 'Sim');
        h.selectNative('ARREDONDMENTO', 'Sim');
        h.selectNative('ESTOQUE', 'Sim');
        h.selectNative('REPOSICAO', 'Sim');
        h.selectNative('LOTE', 'Sim');
        h.selectNative('LOCALESTOQUE', 'Sim');
        h.selectNative('DIAESTOQUE', 'Sim');
        h.selectNative('VRTXADMPROD', 'Sim');
        h.selectNative('VRPTOLQTITAF', 'Sim');
        h.selectNative('IDUTPRORIGOBRIG', 'Sim');
        h.selectNative('VRPTOLVRITAF', 'Sim');
        h.selectNative('VRMINEMPENHOAF', 'Sim');
        h.selectNative('MINESTOQUE', 'Sim');
        h.selectNative('VRMINEMPENHOOL', 'Sim');

        z.component.footer.clickRightActionByLabel('Exportar');

        //retorna a mensagem recebida após salvar a parametrização da aba
        return h.aguardaMensagem().then(function(mensagem){return mensagem});
    };
};
module.exports = new parametrosUnidade();
