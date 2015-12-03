
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;


        function queryDB_cobranza(tx) {         
          // tx.executeSql('select IdArt ,IdCli ,Calibre ,Empaque ,Precio ,Caja ,Unidad, CajasCamion, CodMarca, DesArt from TEMPVENTA WHERE IdCli=?', [id_cliente], querySuccess_carrito, errorCB_list_cobranza);
          tx.executeSql('select a.codcliente codcliente,Nombre, tipodctom,nrodctom,fecha,fechavto, sum(debe-haber) SaldoBs from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1400 and a.codcliente=? group by a.codcliente,nombre, tipodctom,nrodctom,fecha,fechavto having sum(debe-haber)<>0 order by fecha', [id_cliente], querySuccess_cobranza, errorCB_list_cobranza);
        }

        function querySuccess_cobranza(tx, results) { 
          var len = results.rows.length;
          var lista_contenido='';
          var aux;
          var disabled;
          var precio_total=0;
          lista_contenido='<button type="button" data-theme="b">CONFIRMAR ORDEN<span class="ui-li-count total_carrito">0 Bs</span></button>';
          lista_contenido+='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Productos...">';
          alert(len);
          for (var i = 0; i < len; i++) { 
            alert(i);
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
          // lista_contenido +='</ul>';
          // lista_contenido +='<button type="button" data-theme="b">CONFIRMAR ORDEN<span class="ui-li-count total_carrito">0 Bs</span></button>';
          // $('.list_carrito_venta').html(lista_contenido);
          // $(".list_carrito_venta").trigger("create");
          // precio_total=precio_total.toFixed(2)+' Bs';
          // $('.total_carrito').html(precio_total);
        }

        function errorCB_list_cobranza(err) {
          alert("Error processing cobranza SQL: "+err.code);
        }

        function cargar_cobranza_list(cli) {
          id_cliente=cli;
          // alert("cargando a carrito db");
          db.transaction(queryDB_cobranza, errorCB_list_cobranza);
        }

        function cargar_listas (id_c){
          // alert("cargar_listas"+id_c);
          // cargar_art_list(id_c);
          cargar_cobranza_list(id_c);

        }

