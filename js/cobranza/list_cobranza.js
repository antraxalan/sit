
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;
var total_venta;


function queryDB_cobranza_last_sale(tx) {         
          // tx.executeSql('select IdArt ,IdCli ,Calibre ,Empaque ,Precio ,Caja ,Unidad, CajasCamion, CodMarca, DesArt from TEMPVENTA WHERE IdCli=?', [id_cliente], querySuccess_carrito, errorCB_list_cobranza);
          tx.executeSql('select * from TEMPVENTA where IdCli=?', [id_cliente], querySuccess_cobranza_last_sale, errorCB_list_cobranza_last_sale);
        }
        function queryDB_cobranza(tx) {         
          // tx.executeSql('select IdArt ,IdCli ,Calibre ,Empaque ,Precio ,Caja ,Unidad, CajasCamion, CodMarca, DesArt from TEMPVENTA WHERE IdCli=?', [id_cliente], querySuccess_carrito, errorCB_list_cobranza);
          tx.executeSql('select a.CodCliente CodCliente,Nombre, TipoDctoM,NroDctoM,Fecha,FechaVto, sum(debe-haber) SaldoBs from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1400 and a.codcliente=? group by a.codcliente,nombre, tipodctom,NroDctoM,Fecha,FechaVto having sum(debe-haber)<>0 order by Fecha', [id_cliente], querySuccess_cobranza, errorCB_list_cobranza2);
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
          alert("total_venta: "+total_venta);

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

          var d = new Date();

          var month = d.getMonth()+1;
          var day = d.getDate();
          var fecha_actual =((''+day).length<2 ? '0' : '') + day + '/' +((''+month).length<2 ? '0' : '') + month + '/' +    d.getFullYear() ;

          // lista_contenido='<button type="button" data-theme="b">CONFIRMAR ORDEN<span class="ui-li-count total_carrito">0 Bs</span></button>';
          lista_contenido='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Productos...">';
          alert(len);
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
            lista_contenido+= '<img src="img/bs2.png" >';
            lista_contenido+= '<div class="ui-grid-c">';
            lista_contenido+= '<div class="ui-block-a" align="center"><p style="margin-top: 3px;">Fecha de Emisión: </p></div>';
            lista_contenido+= '<div class="ui-block-b" align="center"><p style="margin-top: 3px;">Fecha de Vencimiento: </p></div>';
            lista_contenido+= '<div class="ui-block-c" align="center"><strong>Saldo</strong></div>';
            lista_contenido+= '<div class="ui-block-d" align="center"><strong>A Cobrar</strong></div>';

            lista_contenido+= '<div class="ui-block-a" align="center" ><p>'+fch+'</p></div>';
            // lista_contenido+= '<div class="ui-block-a" align="center" ><p>'+results.rows.item(i).Fecha+'</p></div>';
            lista_contenido+= '<div class="ui-block-b" align="center" ><p>'+fch_vto+'</p></div>';
            // lista_contenido+= '<div class="ui-block-b" align="center" ><p>'+results.rows.item(i).FechaVto+'</p></div>';
            if(results.rows.item(i).SaldoBs>0){
              color='red';
            }else{
              color='green';
            }
            lista_contenido+= '<div class="ui-block-c '+color+'" align="center" style="margin-top: 4px;"><strong>'+results.rows.item(i).SaldoBs+' Bs.</strong></div>';
            lista_contenido+= '<div class="ui-block-d " align="center" ><p class="html_cobrado" marca-cobranza-html="'+results.rows.item(i).NroDctoM+'">0.00 Bs.</p></div>';
            lista_contenido+= '</div>';
            lista_contenido+= '</a>';
            lista_contenido+= '<a href="#" class="editar_cobranza_class" data-rel="popup" nrodctom="'+results.rows.item(i).NroDctoM+'" saldo="'+results.rows.item(i).SaldoBs+'" fecha="'+fch+'" fecha-venc="'+fch_vto+'" cobrado="">SITRANS</a>';
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
            var a=1;
          }else{
            var f_vto=localStorage.fecha_venta;
            if(f_vto==0){
              f_vto=fecha_actual;
            }else{
              f_vto=f_vto;
            }
           lista_contenido+= '<li><a href="#">';
           lista_contenido+= '<img src="img/bs2.png" >';
           lista_contenido+= '<div class="ui-grid-c">';
           lista_contenido+= '<div class="ui-block-a" align="center"><p style="margin-top: 3px;">Fecha de Emisión: </p></div>';
           lista_contenido+= '<div class="ui-block-b" align="center"><p style="margin-top: 3px;">Fecha de Vencimiento: </p></div>';
           lista_contenido+= '<div class="ui-block-c" align="center"><strong>Saldo</strong></div>';
           lista_contenido+= '<div class="ui-block-d" align="center"><strong>A Cobrar</strong></div>';
           lista_contenido+= '<div class="ui-block-a" align="center" ><p>'+fecha_actual+'</p></div>';
           lista_contenido+= '<div class="ui-block-b" align="center" ><p>'+f_vto+'</p></div>';
           lista_contenido+= '<div class="ui-block-c red" align="center" style="margin-top: 4px;"><strong>'+total_venta+' Bs.</strong></div>';
           lista_contenido+= '<div class="ui-block-d " align="center" ><p class="html_cobrado" marca-cobranza-html="1000'+id_cliente+'">0.00 Bs.</p></div>';
           lista_contenido+= '</div>';
           lista_contenido+= '</a>';
           lista_contenido+= '<a href="#" class="editar_cobranza_class" data-rel="popup" nrodctom="1000'+id_cliente+'" saldo="'+total_venta+'" fecha="'+fecha_actual+'" fecha-venc="'+f_vto+'" cobrado="">SITRANS</a>';
           lista_contenido+= '</li>';
         }

         lista_contenido +='</ul>';
          // lista_contenido +='<button type="button" data-theme="b">CONFIRMAR ORDEN<span class="ui-li-count total_carrito">0 Bs</span></button>';
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


