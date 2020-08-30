var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var parametrosUnidade = function () {
    var self = this;

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

        element(by.cssContainingText('.dwb0', 'Selecionar')).click();
        browser.sleep(3000);
    };

    this.parametros = function () {
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.widget.grid.clickColumn('4647738362226231657726', '0', '0', false);
        h.navegar('Frente de Caixa');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.grupoCampos('Operador padrão utilizado na abertura do caixa no Auto Atendimento');
        z.field.fieldFunctions.click('NMOPERADOR');
        z.widget.grid.click('NMOPERADOR', j.getValor('operador'), '0');
        h.grupoCampos('Cliente padrão utilizado na inclusão das vendas a vista');
        z.field.fieldFunctions.click('NMRAZSOCCLIE');
        z.widget.grid.click('NMRAZSOCCLIE',j.getValor('cliente'), '0');
        h.grupoCampos('Parâmetros utilizados na inclusão automática de consumidor');
        z.field.fieldFunctions.click('NMCCUSCLIE');
        z.widget.grid.click('NMCCUSCLIE', 'TEKNISA', '0');
        z.field.fieldFunctions.click('NMTIPOCONS');
        z.widget.grid.click('NMTIPOCONS',j.getValor('consumidor'), '0');
        h.grupoCampos('Parâmetro utilizado para carregar dados da catraca no MSDE');
        z.field.selectNative.click('IDATUIDVCAT', 'Não');
        h.grupoCampos('DOTZ');
        z.field.fieldFunctions.fill('CDINTEGRADOTZ', 'TEKNISA');
        z.field.fieldFunctions.fill('DSDIRARQDOTZ', 'teste');
        /* está dando erro nesta parte 
        h.grupoCampos('Definição do dia de Fechamento da Folha de Pagamento da Filial(utilizado para Venda Débito Consumidor)');
        z.field.fieldFunctions.fill('NRDIAFECHAFOLHA', '99');
        h.grupoCampos('Número máximo de pessoas na mesa');
        z.field.fieldFunctions.fill('NRMAXPESMES', '10');*/
        h.grupoCampos('Parâmetro utilizado para Concessão de Crédito Distrito Federal');
        z.field.selectNative.click('IDCONCREDDF', 'Sim');
        h.grupoCampos('Parâmetro utilizado para identificar integração com Hotel');
        z.field.selectNative.click('IDINTHOTEL', 'Sim');
        z.field.fieldFunctions.fill('DSSTRINGHOTEL', 'mysql.teste');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.definiçoesNFCE = function () {
        h.navegar('Definições NFC-e/SAT');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.grupoCampos('Imprime Logotipo nas vendas NFCe/SAT');
        z.field.selectNative.click('IDIMPLOGONF', 'Sim');
        /*erro ao inserir codigo
        z.field.fieldFunctions.fill('NRPOSNVBEMA', '1');
        z.field.fieldFunctions.fill('NRPOSNV1EPSON', '2');
        z.field.fieldFunctions.fill('NRPOSNV2EPSON', '3');
        */
        h.grupoCampos('Geração XML (SAT/NFCe)');
        z.field.selectNative.click('IDENVIACDBARXML', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.controleCaixa = function () {
        h.navegar('Controle de Caixa');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.grupoCampos('Percentual maximo permitido para troco em Ticket');
        z.field.fieldFunctions.fill('VRPEEMITROCO', '10');
        h.grupoCampos('Gera arquivo XML ( Integração Comanda)');
        z.field.selectNative.click('IDGERAARQXMLINT', 'Não');
        h.grupoCampos('Solicita NSU/DOC nas vendas crédito e venda débito');
        z.field.selectNative.click('IDSOLICITANSU', 'Sim');
        //z.field.fieldFunctions.fill('QTDMAXDIGNSU', '10');
        h.grupoCampos('DOTZ');
        z.field.selectNative.click('IDSOLICITADOTZ', 'Sim');
        h.grupoCampos('Controla Valor de sangria');
        z.field.fieldFunctions.fill('VRMINSANGRIA', '100');
        z.field.fieldFunctions.fill('VRMAXSANGRIA', '300');
        h.grupoCampos('Sincronização com Banco de dados');
        /* z.field.fieldFunctions.fill('NRDIAVALTURCAIX', '2');
         z.field.fieldFunctions.fill('NRMINEXPVENDA', '6');
        h.grupoCampos('Limpeza do Auto-Atendimento');
        z.field.fieldFunctions.fill('NRSEGLIMPEZATAA', '120');*/
        h.grupoCampos('Venda de Produtos');
        z.field.selectNative.click('IDACRIMPOSTO', 'Sim');
        h.grupoCampos('Impressão Taxa de Serviço');
        z.field.selectNative.click('IDIMPTXSERV', 'Sim');
        h.grupoCampos('Envia pedido para KDS na venda balcão pelo frente de caixa');
        z.field.selectNative.click('IDENVIAPEDKDS', 'Sim');
        h.grupoCampos('Impressora Zebra');
        z.field.selectNative.click('IDETIQZEBRA', 'Não utiliza');
        h.grupoCampos('Informações de cheque no recebimento da venda');
        z.field.selectNative.click('IDIMPCUPFIS', 'Solicita informações do Cheque e não imprime');
        h.grupoCampos('Taxa de Serviço');
        z.field.selectNative.click('IDCONDESCTXSERV', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.definicoesConsumidor = function () {
        h.navegar('Definições de Consumidor');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.grupoCampos('Permite cadastrar consumidor no frente do caixa');
        z.field.selectNative.click('IDPERCADCONSFCXA', 'Sim');
        h.grupoCampos('Mostrar somente consumidores ativos na pesquisa de consumidores na frente do caixa');
        z.field.selectNative.click('IDEXCONSATFIL', 'Sim');
        h.grupoCampos('Criptografia do Crachá do Consumidor');
        z.field.selectNative.click('IDCRIPTOCONS', 'Não utiliza criptografia');
        h.grupoCampos('Parâmetro utilizado nas vendas que solicitam o consumidor');
        z.field.selectNative.click('IDPERDIGCONS', 'Sim');
        /* h.grupoCampos('Formatação do crachá do consumidor');
         z.field.fieldFunctions.fill('QTDIGCDIDCON', '1');
         z.field.fieldFunctions.fill('NRPOSINICONS', '1');
         z.field.fieldFunctions.fill('NRPOSFINCONS', '1');*/
        h.grupoCampos('CPF do Consumidor na Venda');
        z.field.selectNative.click('IDINFOCPFPINPAD', 'Sim');
        h.grupoCampos('Parâmetro Utilizado para Consultar Dados da Campanha Fidelidade');
        z.field.selectNative.click('IDCONSCAMPFIDEL', 'Sim');
        h.grupoCampos('Parametrização Imprime Limite - Venda Débito Consumidor');
        z.field.fieldFunctions.click('IDPARIMPRLIMVDCFRASE');
        z.widget.grid.click('IDPARIMPRLIMVDCFRASE', 'Imprime limite diário disponível para consumo no cupom fiscal e no comprovante', 0);
        h.grupoCampos('Parametrização Imprime Saldo - Venda Crédito Pessoal / Débito Consumidor');
        z.field.selectNative.click('IDIMPSALDOCUPOM', 'Imprime saldo total no cupom fiscal');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.regrasPreco = function () {
        h.navegar('Regras de Preços');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.grupoCampos('Tabela de Preço');
        z.field.fieldFunctions.click('NMTABEPREC');
        z.externalComponent.selectAutocomplete.waitDropdown('NMTABEPREC');
        z.externalComponent.selectAutocomplete.selectOption('NMTABEPREC', 'Restaurante');
        h.grupoCampos('Composição de Produto');
        z.field.selectNative.click('IDPRECDIFCOM', 'Sim');
        h.grupoCampos('Manutenção da Venda');
        z.field.selectNative.click('IDALTPRECO', 'Sim');
        h.grupoCampos('Formação do Preço de Venda dos Produtos');
        z.field.selectNative.click('IDFORMAPRECO', 'Sim');
        z.field.selectNative.click('IDCUSFOPRECO', 'Custo Médio Líquido da Época');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.consolidacaoVendas = function () {
        h.navegar('Consolidação de vendas');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.grupoCampos('Restrição de Datas');
        z.field.selectNative.click('IDCONSUMIOBR', 'Sim');
        z.field.fieldFunctions.click('DTINITESCONS');
        z.field.calendar.clickDate('02/05/2018', 'pt_br');
        h.grupoCampos('Padões da consolidação');
        z.field.selectNative.click('IDATUEST', 'Atualiza estoque da composição do produto');
        z.field.fieldFunctions.click('DSSERIE');
        z.externalComponent.selectAutocomplete.waitDropdown('DSSERIE');
        z.externalComponent.selectAutocomplete.selectOption('DSSERIE', 'SERIE 01');
        z.field.fieldFunctions.click('NMTIPORETI');
        z.externalComponent.selectAutocomplete.waitDropdown('NMTIPORETI');
        z.externalComponent.selectAutocomplete.selectOption('NMTIPORETI', 'Consumo Produção');
        z.field.fieldFunctions.click('NMSETOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMSETOR');
        z.externalComponent.selectAutocomplete.selectOption('NMSETOR', 'EXPEDIÇÃO');
        z.field.selectNative.click('IDPERCONVESTNEG', 'Sim');
        z.field.selectNative.click('IDVISUPRODNEG', 'Sim');
        z.field.selectNative.click('IDGERANFVENPROD', 'Sim');
        z.field.selectNative.click('IDUTILCONTAB', 'Sim');
        z.field.selectNative.click('IDBLOQCONSOLIDA', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.integracao = function () {
        h.navegar('Integração');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.grupoCampos('Opção de pagamento usadas pela Unidade');
        z.field.selectNative.click('IDRECBOLETBANC', 'Sim');
        z.field.selectNative.click('IDRECBANCOITAU', 'Sim');
        z.field.selectNative.click('IDRECBANCOBRADE', 'Não');
        h.grupoCampos('Integração com site');
        z.field.selectNative.click('IDFILUTSITE', 'Sim');
        h.grupoCampos('Integração Delivery');
        z.field.fieldFunctions.fill('CDFILIALEXT', '78451');
        z.field.fieldFunctions.fill('CDFILIALEXTSPOON', '11251');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.gestaoVendas = function () {
        h.navegar('Gestão de Vendas');
        h.navegar('Geral');
        h.grupoCampos('Grupo de produto para venda');
        z.component.footer.clickCenterActionByIcon('pencil');
        h.clicar('NMGRUPPRODPDV');
        z.field.selectNative.click('IDORIGVENDA', 'Sim');
        z.field.fieldFunctions.fill('NRDIASVENDA', '10');
        z.field.fieldFunctions.fill('NRDIAFATVEND', '10');
        h.grupoCampos('Mapa Resumo ECF');
        z.field.selectNative.click('IDCONSREDZMECF', 'Sim');
        z.field.selectNative.click('IDTIPMAPRESU', 'Gera um sequencial por dia para cada unidade (Somente dias com venda)');
        h.grupoCampos('Geração TC');
        z.field.selectNative.click('IDCONSTCFECDIA', 'Sim');
        z.field.selectNative.click('IDGERACAOTC', 'Tabela');
        h.grupoCampos('Outros');
        z.field.selectNative.click('IDPERMARCDUP', 'Sim');
        z.field.selectNative.click('IDPREVCONSPDV', 'Previsão de consumo gerada com base na média aritmética de vendas');
        z.field.selectNative.click('IDIMPBLOLANCNEG', 'Sim');
        z.field.selectNative.click('IDCONSISTECONSO', 'Sim');
        h.grupoCampos('Parâmetros do Waiter');
        z.field.selectNative.click('IDUTLQTDPED', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.datasRestricoes = function () {
        h.navegar('Gestão de Vendas')
        h.navegar('Datas e Restrições');
        h.grupoCampos('Data de Processamento');
        z.component.footer.clickCenterActionByIcon('pencil');
        z.field.fieldFunctions.click('DTPROCVND');
        z.field.calendar.clickDate('02/08/2018', 'pt_br');
        h.grupoCampos('Antes do Processamento');
        z.field.selectNative.click('IDPERLANCANTDP', 'Sim');
        z.field.fieldFunctions.fill('NRDIAANTLANC', '200');
        h.grupoCampos('Depois do Processamento');
        z.field.selectNative.click('IDPERLANCPOSDP', 'Sim');
        z.field.fieldFunctions.fill('NRDIAPOSLANC', '250');
        h.grupoCampos('Manutenção de Venda');
        z.field.selectNative.click('IDPERMANUTVEN', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    //fazer day Part
    this.dayPart = function (unidade, hrinidaypart1, hrfindaypart1, hrinidaypart2, hrfindaypart2, hrinidaypart3, hrfindaypart3, hrinidaypart4, hrfindaypart4) {
        z.component.popup.isOpened().then(function (opened) {
            if (opened) {
                self.unidade(unidade);
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
            else {
                z.component.footer.clickCenterActionByIcon('filter');
                self.unidade(unidade);
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });//promise
        browser.sleep(5000);
        z.widget.grid.rowExists('CDFILIAL', unidade, '4647738362226231657726').then(function (existe) {
            if (existe) {
                z.widget.grid.click('CDFILIAL', unidade, '4647738362226231657726');
                h.navegar('Gestão de Vendas');
                h.navegar('Day Part');
                z.component.footer.clickCenterActionByIcon('pencil');
                //
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
            }
        });
    };
    this.produtosUnidade = function () {
        h.navegar('Produtos por Unidade');
        z.field.fieldFunctions.click('NMPRODUTOINI');
        z.widget.grid.click('CDARVPROD', '1.01.01.000.00', '0');
        z.component.footer.clickRightActionByLabel('Filtrar');
        //z.widget.grid.clickColumn('4647738367204214471062', '0', '0', true);
        z.widget.grid.click('__CHECKBOX', '', '4647738367204214471062');
        // z.component.footer.clickCenterActionByIcon('Ativo/Inativo');
        z.component.footer.clickRightActionByLabel('Ações');
        //clicar em exportar produtos
        var el = element(by.css('#popup > span > section > section > section > div > div > ul > li:nth-child(2) > div > div > span'));
        el.click();
        h.clicar('NMFILIALORI');
        z.field.fieldFunctions.click('NMFILIALDES');
        z.externalComponent.selectAutocomplete.waitDropdown('NMFILIALDES');
        z.externalComponent.selectAutocomplete.selectOption('NMFILIALDES', '0002');
        //quando faço a transferencia para filial diferente não há necessidade de agrupamento por unidade
        h.clicar('NMPRODUTOINI');
        z.field.fieldFunctions.click('NMPRODUTOFIN');
        z.externalComponent.selectAutocomplete.waitDropdown('NMPRODUTOFIN');
        z.externalComponent.selectAutocomplete.selectOption('NMPRODUTOFIN', 'Acém cubos');

        z.field.selectNative.click('IDTPCONFPAR', 'Atualiza Registros em comum');
        z.field.selectNative.click('All', 'Sim');
        z.component.footer.clickRightActionByLabel('Exportar');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        z.component.footer.clickLeftActionByLabel('Voltar');
        return msg;
    };
};
module.exports = new parametrosUnidade();
