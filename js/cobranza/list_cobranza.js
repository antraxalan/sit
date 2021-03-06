
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;
var total_venta;


function queryDB_cobranza_last_sale(tx) {         
          // tx.executeSql('select IdArt ,IdCli ,Calibre ,Empaque ,Precio ,Caja ,Unidad, CajasCamion, CodMarca, DesArt, CodCaja, CodBotella, CodCliente from TEMPVENTA WHERE IdCli=?', [id_cliente], querySuccess_carrito, errorCB_list_cobranza);
          tx.executeSql('select IdArt ,IdCli ,Calibre ,Empaque ,Precio ,Caja ,Unidad, CajasCamion, CodMarca, DesArt, CodCaja, CodBotella, CodCliente from TEMPVENTA where IdCli=?', [id_cliente], querySuccess_cobranza_last_sale, errorCB_list_cobranza_last_sale);
        }
        function queryDB_cobranza(tx) {         

          // tx.executeSql('select a.CodCliente CodCliente,Nombre, TipoDctoM,NroDctoM,Fecha,FechaVto, sum(debe-haber) SaldoBs from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1400 and a.codcliente=? group by a.codcliente,nombre, tipodctom,NroDctoM,Fecha,FechaVto having sum(debe-haber)<>0 order by Fecha', [id_cliente], querySuccess_cobranza, errorCB_list_cobranza2);
          tx.executeSql('select a.codcliente codcliente,Nombre, tipodctom,nrodctom,c.fecha,c.fechavto, sum(debe-haber) SaldoBs from detalle a inner join cliente b on a.codcliente=b.codcliente inner join maestro c on a.tipodctom=c.tipodcto and a.nrodctom=c.nrodcto where codconcepto=1400 and a.codcliente=? group by a.codcliente,nombre, tipodctom,nrodctom,c.fecha,c.fechavto having sum(debe-haber)<>0 order by SaldoBs, c.fecha', [id_cliente], querySuccess_cobranza, errorCB_list_cobranza2);
        }

        function querySuccess_cobranza_last_sale(tx, results_last) {
          var len = results_last.rows.length;
          // alert("len:>"+len);
          var Precio;
          var Caja;
          var Empaque;
          var Unidad;
          total_venta=0;
          for (var i = 0; i < len; i++) {
            // alert("entro a for");
            // IdArt,IdCli,Calibre,Empaque,Precio,Caja,Unidad,CajasCamion,CodMarca,DesArt
            var Precio  =results_last.rows.item(i).Precio;
            var Caja    =results_last.rows.item(i).Caja;
            var Empaque =results_last.rows.item(i).Empaque;
            var Unidad  =results_last.rows.item(i).Unidad;

            total_venta = total_venta+(parseFloat((Precio*Caja)+((Precio/Empaque)*Unidad)));
          }
          total_venta = total_venta.toFixed(2);

        }

        function querySuccess_cobranza(tx, results) { 
          var len = results.rows.length;
          var lista_contenido='';
          var aux;
          var disabled;
          var precio_total=0;
          var color;
          var fch;
          var fch_vto;
          var total_total_total=0;

          var d = new Date();

          var month = d.getMonth()+1;
          var day = d.getDate();
          var fecha_actual =((''+day).length<2 ? '0' : '') + day + '/' +((''+month).length<2 ? '0' : '') + month + '/' +    d.getFullYear() ;

          // lista_contenido='<button type="button" data-theme="b">CONFIRMAR ORDEN<span class="ui-li-count total_carrito">0.00 Bs.</span></button>';





          // lista_contenido='<button type="button" class="class_confirmaciones btn_confirmar_cobranza" data-theme="b">CONFIRMAR COBRO<span style="box-shadow:-1px -1px 4px 1px gray inset;" class="ui-li-count total_cobranza_val ui-page-theme-a">0.00 Bs.</span></button>';
          lista_contenido+='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Cobros..." data-icon="false">';
          // alert(len);
          for (var i = 0; i < len; i++) { 
            fch = results.rows.item(i).Fecha;
            fch = fch.split(" ");
            fch = fch[0].split("-");
            fch = fch[2]+'/'+fch[1]+'/'+fch[0];

            fch_vto = results.rows.item(i).FechaVto;
            fch_vto = fch_vto.split(" ");
            fch_vto = fch_vto[0].split("-");
            fch_vto = fch_vto[2]+'/'+fch_vto[1]+'/'+fch_vto[0];

            // alert(i);
            lista_contenido+= '<li><a href="#">';
            lista_contenido+= '<img src="img/money_old.png" >';
            lista_contenido+= '<div class="ui-grid-c">';
            lista_contenido+= '<div class="ui-block-a" align="center"><p style="margin-top: 3px;">Fecha de Emisión: </p></div>';
            lista_contenido+= '<div class="ui-block-b" align="center"><p style="margin-top: 3px;">Fecha de Vencimiento: </p></div>';
            lista_contenido+= '<div class="ui-block-c" align="center"><p style="margin-top: 3px;">Saldo</p></div>';
            lista_contenido+= '<div class="ui-block-d" align="center"><p style="margin-top: 3px;">A Cobrar</p></div>';

            lista_contenido+= '<div class="ui-block-a" align="center" ><p>'+fch+'</p></div>';
            // lista_contenido+= '<div class="ui-block-a" align="center" ><p>'+results.rows.item(i).Fecha+'</p></div>';
            lista_contenido+= '<div class="ui-block-b" align="center" ><p>'+fch_vto+'</p></div>';
            // lista_contenido+= '<div class="ui-block-b" align="center" ><p>'+results.rows.item(i).FechaVto+'</p></div>';
            if(results.rows.item(i).SaldoBs>0){
              color='red';
            }else{
              color='green';
            }
            var saldo_bs=parseFloat(results.rows.item(i).SaldoBs);
            total_total_total=total_total_total+parseFloat(saldo_bs);
            saldo_bs = saldo_bs.toFixed(2);
            lista_contenido+= '<div class="ui-block-c '+color+'" align="center"><p>'+saldo_bs+' Bs.</p></div>';
            lista_contenido+= '<div class="ui-block-d " align="center" ><p class="html_cobrado" marca-cobranza-html="'+results.rows.item(i).NroDctoM+'">0.00 Bs.</p></div>';
            lista_contenido+= '</div>';
            lista_contenido+= '</a>';
            // lista_contenido+= '<a href="#" class="editar_cobranza_class" data-rel="popup" tipodctom="'+results.rows.item(i).TipoDctoM+'" nrodctom="'+results.rows.item(i).NroDctoM+'" saldo="'+results.rows.item(i).SaldoBs+'" fecha="'+fch+'" fecha-venc="'+fch_vto+'" cobrado="">SITRANS</a>';
            lista_contenido+= '<div href="#" class="editar_cobranza_class" data-rel="popup" tipodctom="'+results.rows.item(i).TipoDctoM+'" nrodctom="'+results.rows.item(i).NroDctoM+'" saldo="'+results.rows.item(i).SaldoBs+'" fecha="'+fch+'" fecha-venc="'+fch_vto+'" cobrado=""></div>';


        // lista_contenido+= '<a href="#" class="editar_cobranza_class" data-rel="popup" nrodctom="'+results.rows.item(i).NroDctoM+'" saldo="'+results.rows.item(i).SaldoBs+'" fecha="'+results.rows.item(i).Fecha+'" fecha-venc="'+results.rows.item(i).FechaVto+'" cobrado="">SITRANS</a>';
        lista_contenido+= '</li>';




            // var co_ma= results.rows.item(i).CodMarca;
            // if(!(co_ma=="18" || co_ma=="25" || co_ma=="35" || co_ma=="50" || co_ma=="70" || co_ma=="94")){ 
            //   co_ma="999";
            // }

            // if(results.rows.item(i).CajasCamion===null){
            //   disabled='class="ui-disabled"';
            // }else{
            //   disabled='';
            // }
            // lista_contenido +='<li><a href="#" '+disabled+'>';
            // lista_contenido +='<img src="img/marcas/'+co_ma+'.png">';
            // lista_contenido +='<h2>'+results.rows.item(i).IdArt+' - '+results.rows.item(i).DesArt+'</h2>';
            // if(results.rows.item(i).Cajas!='0'){
            //   aux=parseFloat(results.rows.item(i).Importe)/parseFloat(results.rows.item(i).Cajas);
            // }else{
            //   aux=0;
            // }
            // var e = results.rows.item(i).Empaque;
            // var c = results.rows.item(i).Caja;
            // var p = results.rows.item(i).Precio;
            // var u = results.rows.item(i).Unidad;
            // var sub_caj=parseFloat(c*p);
            // var sub_uni=parseFloat(u*(p/e)).toFixed(2);
            // var sub = parseFloat(sub_caj)+parseFloat(sub_uni);

            // precio_total=precio_total+sub;

            // lista_contenido += '<div class="ui-grid-c">';
            //   lista_contenido += '<div class="ui-block-a"><p>'+results.rows.item(i).Caja+' caja(s)</p></div>';
            //   lista_contenido += '<div class="ui-block-b"><p>'+results.rows.item(i).Unidad+' unidad(es)</p></div>';
            //   lista_contenido += '<div class="ui-block-c"><p>Precio/Caja <strong>'+results.rows.item(i).Precio+' Bs</strong></p></div>';
            //   lista_contenido += '<div class="ui-block-d price"><strong>'+sub+' Bs</strong></div>';
            // lista_contenido += '</div></a>';

            // lista_contenido +='<a href="#add_venta_popup" '+disabled+' class="add_venta_popup_class_old" data-rel="popup" codigo-venta="'+results.rows.item(i).IdArt+'" last-price="'+results.rows.item(i).Precio+'" cajas-camion="'+results.rows.item(i).CajasCamion+'" calibre="'+results.rows.item(i).Calibre+'" cant-empaque="'+results.rows.item(i).Empaque+'"  caj-adq="'+results.rows.item(i).Caja+'" uni-adq="'+results.rows.item(i).Unidad+'">Historial</a></li>';
          }
          if(total_venta==''|| total_venta==0 || total_venta==='undefined'){
            var a=0;
          }else{
            var a=1;
            var f_vto=localStorage.fecha_venta;
            total_total_total=total_total_total+parseFloat(total_venta);

            if(f_vto==0){
              f_vto=fecha_actual;
            }else{
              f_vto=f_vto;
              f_vto = f_vto.split("-");
              f_vto = f_vto[2]+'/'+f_vto[1]+'/'+f_vto[0];
            }
            lista_contenido+= '<li><a href="#">';
            lista_contenido+= '<img src="img/money_act.png" >';
            lista_contenido+= '<div class="ui-grid-c">';
            lista_contenido+= '<div class="ui-block-a" align="center"><p style="margin-top: 3px;">Fecha de Emisión: </p></div>';
            lista_contenido+= '<div class="ui-block-b" align="center"><p style="margin-top: 3px;">Fecha de Vencimiento: </p></div>';
            lista_contenido+= '<div class="ui-block-c" align="center"><p style="margin-top: 3px;">Saldo</p></div>';
            lista_contenido+= '<div class="ui-block-d" align="center"><p style="margin-top: 3px;">A Cobrar</p></div>';
            lista_contenido+= '<div class="ui-block-a" align="center" ><p>'+fecha_actual+'</p></div>';
            lista_contenido+= '<div class="ui-block-b" align="center" ><p>'+f_vto+'</p></div>';
            lista_contenido+= '<div class="ui-block-c red" align="center"><p>'+total_venta+' Bs.</p></div>';
            lista_contenido+= '<div class="ui-block-d " align="center" ><p class="html_cobrado" marca-cobranza-html="9999999999">0.00 Bs.</p></div>';
            lista_contenido+= '</div>';
            lista_contenido+= '</a>';
            // lista_contenido+= '<a href="#" class="editar_cobranza_class" data-rel="popup" tipodctom="1" nrodctom="9999999999" saldo="'+total_venta+'" fecha="'+fecha_actual+'" fecha-venc="'+f_vto+'" cobrado="">SITRANS</a>';
            lista_contenido+= '<div href="#" class="editar_cobranza_class" data-rel="popup" tipodctom="1" nrodctom="9999999999" saldo="'+total_venta+'" fecha="'+fecha_actual+'" fecha-venc="'+f_vto+'" cobrado=""></div>';
            lista_contenido+= '</li>';
          }
          // lista_contenido+='<button type="button" class="class_confirmaciones btn_confirmar_cobranza" data-theme="b">CONFIRMAR COBRO<span style="box-shadow:-1px -1px 4px 1px gray inset;" class="ui-li-count total_cobranza_val ui-page-theme-a">0.00 Bs.</span></button>';


          if((len+a)!=0){
            if(total_total_total>0){
              color='red';
            }else{
              color='green';
            }
            total_total_total=total_total_total.toFixed(2);
            var cobro_list=localStorage.total_cobro;
            lista_contenido+= '<li><a href="#" class="total_li">';
            // lista_contenido+= '<img src="img/bs2.png">';
            lista_contenido+= '<div class="ui-grid-c">';
            lista_contenido+= '<div class="ui-block-a" align="right" style="margin-top: 4px; font-size: 16px;"><strong >SALDO TOTAL :&nbsp&nbsp</strong></div>';
            lista_contenido+= '<div class="ui-block-b '+color+'" align="left" style="margin-top: 4px; font-size: 16px;"><strong>'+total_total_total+' Bs.</strong></div>';
            lista_contenido+= '<div class="ui-block-c" align="right" style="margin-top: 4px; font-size: 16px;"><strong>A COBRAR TOTAL :&nbsp&nbsp</strong></div>';
            lista_contenido+= '<div class="ui-block-d" align="left" style="margin-top: 4px; font-size: 16px;"><strong class="html_cobrado" marca-cobranza-html="19999999999">'+parseFloat(cobro_list).toFixed(2)+' Bs.</strong></div>';
            // lista_contenido+= '<div class="ui-block-a" align="center" >&nbsp</div>';
            // lista_contenido+= '<div class="ui-block-b" align="center" >&nbsp</div>';
            // lista_contenido+= '<div class="ui-block-c '+color+'" align="center" style="margin-top: 4px;"><strong>'+total_total_total+' Bs.</strong></div>';
            // lista_contenido+= '<div class="ui-block-d " align="center" ><p class="html_cobrado" marca-cobranza-html="19999999999" style="margin-top: 4px; font-size: 16px; font-weight: bold;">'+parseFloat(cobro_list).toFixed(2)+' Bs.</p></div>';
            lista_contenido+= '</div>';
            lista_contenido+= '</a>';
            lista_contenido+= '<a href="#" class="editar_cobranza_class" data-rel="popup" tipodctom="1" nrodctom="19999999999" saldo="'+total_total_total+'" fecha="'+fecha_actual+'" fecha-venc="'+f_vto+'" cobrado="'+parseFloat(cobro_list).toFixed(2)+'" style="width:5.6em;">SITRANS</a>';
            lista_contenido+= '</li>';
            lista_contenido +='</ul>';
          }else{
            lista_contenido= '<h3 align="center">El cliente no tiene deudas.</h3>';
          }
     


          // lista_contenido +='<button type="button" data-theme="b">CONFIRMAR ORDEN<span class="ui-li-count total_carrito">0.00 Bs.</span></button>';
          $('.list_cobranza').html(lista_contenido);
          $(".list_cobranza").trigger("create");
          // precio_total=precio_total.toFixed(2)+' Bs';
          // $('.total_carrito').html(precio_total);
        }

        function errorCB_list_cobranza(err) {
          alert("Error processing cobranza SQL: "+err.code+" Mensaje: "+err.message);
        }
        function errorCB_list_cobranza2(err) {
          alert("Error processing cobranza2 SQL: "+err.code+" Mensaje: "+err.message);
        }
        function errorCB_list_cobranza_last_sale(err) {
          alert("Error processing cobranza last SQL: "+err.code+" Mensaje: "+err.message);
        }

        function cargar_cobranza_list(cli) {
          id_cliente=cli;
          // alert("cargando a carrito db");
          db.transaction(queryDB_cobranza_last_sale, errorCB_list_cobranza_last_sale);
          db.transaction(queryDB_cobranza, errorCB_list_cobranza);
        }

        // function cargar_listas (id_c){
        //   // alert("cargar_listas"+id_c);
        //   // cargar_art_list(id_c);
        //   cargar_cobranza_list(id_c);

        // }


