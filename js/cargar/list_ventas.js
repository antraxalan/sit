
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;
var lista_contenido;
var ids_old = [];
var arr_art_carrito = [];
var cantidad_ids;

        // Query the database
        //
        function queryDB_old_articulo(tx) {
          // alert("queryDB_old_articulo");
          // alert(id_cliente+" old query");
          // tx.executeSql('SELECT CodConcepto,CodCliente,a.CodArt,CodMarca,DesArt,Precio from detalle a inner join articulo b on a.codart=b.codart where codconcepto=1200 and codcliente=? order by codconcepto,codcliente,a.codart', [id_cliente], querySuccess_old_articulo, errorCB_list);
          tx.executeSql('select a.CodConcepto,a.CodCliente,a.Fecha,CodMarca,a.CodArt,DesArt,Calibre,CantxEmpaque,PrecioVtaMax, a.Precio UltPrecioVendido,a.Debe Importe,a.Dcajas Cajas, sum(c.dcajas-c.hcajas) CajasCamion from detalle a inner join articulo b on a.codart=b.codart left outer join detalle c on c.codconcepto=1800 and a.codart=c.codart where a.codconcepto=1200 and a.codcliente=? group by a.codconcepto,a.codcliente,a.fecha,a.codart,desart,calibre,cantxempaque,preciovtamax, a.precio,a.debe,a.dcajas,CodMarca order by a.codconcepto,a.codcliente,a.codart', [id_cliente], querySuccess_old_articulo, errorCB_list);
        }

        function queryDB_new_articulo(tx) {
          // alert("new query");
          tx.executeSql('select a.CodArt,DesArt,CodMarca,Calibre,CantxEmpaque,PrecioVtaMax,sum(dcajas-hcajas) CajasCamion from articulo a inner join detalle b on a.codart=b.codart and codconcepto=1800 where tipoarticulo="P" group by a.codart,desart,calibre,cantxempaque,preciovtamax,CodMarca order by a.codart', [], querySuccess_new_articulo, errorCB_list);
        }


        function querySuccess_old_articulo(tx, results) {
          // alert("ini query");
          // alert("succes old");

          var len = results.rows.length;
          var precio;
          var aux;
          var disabled;
          var fecha_ultm;
          ids_old = [];
          arr_art_carrito = JSON.parse(localStorage.art);
          cantidad_ids=0;
          lista_contenido='<button type="button" class="class_confirmaciones btn_confirmar_ventas_vacia" data-theme="b">AVANZAR SIN COMPRAR</button>';
          lista_contenido+='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Productos...">';
          // alert(arr_art_carrito);
          for (var i = 0; i < len; i++) {

            if($.inArray( results.rows.item(i).CodArt, arr_art_carrito )==-1){

              var co_ma= results.rows.item(i).CodMarca;
              if(!(co_ma=="18" || co_ma=="25" || co_ma=="35" || co_ma=="50" || co_ma=="70" || co_ma=="94")){ 
                // alert(co_ma);
                co_ma="999";
              }
              // alert(results.rows.item(i).CajasCamion+"->CajasCamion  "+results.rows.item(i).CodMarca+"->CodMarca  "+results.rows.item(i).Importe+"->Importe  "+results.rows.item(i).Cajas+"->Cajas  "+results.rows.item(i).CodArt+"->CodArt");
              if(results.rows.item(i).CajasCamion===null){
                disabled='class="ui-disabled"';
                // alert("null");
              }else{
                disabled='';
                // alert("not null");
              }

              ids_old[cantidad_ids] = results.rows.item(i).CodArt;
              cantidad_ids=cantidad_ids+1;

              lista_contenido +='<li><a href="#" '+disabled+'>';
              lista_contenido +='<img src="img/marcas/'+co_ma+'.png">';
              lista_contenido +='<h2>'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArt+'</h2>';


              // alert('Importe:'+results.rows.item(i).Importe);
              // alert('Debe:'+results.rows.item(i).Debe);
              // alert('Cajas:'+results.rows.item(i).Cajas);

              if(results.rows.item(i).Cajas!='0'){
                aux=parseFloat(results.rows.item(i).Importe)/parseFloat(results.rows.item(i).Cajas);
              }else{
                aux=0;
              }
              // alert('aux:'+aux);
              precio=(parseFloat( aux )).toFixed(2);
              // alert('precio:'+precio);


              fecha_ultm = results.rows.item(i).Fecha;
              fecha_ultm = fecha_ultm.split(" ");
              fecha_ultm = fecha_ultm[0].split("-");
              fecha_ultm = fecha_ultm[2]+'/'+fecha_ultm[1]+'/'+fecha_ultm[0];
              // (results.rows.item(i).Importe) reemplazado por (precio)
              lista_contenido +='<p>Ultima venta: <strong>'+results.rows.item(i).Cajas+'</strong> cajas a <strong>'+precio+'</strong> Bolivianos por cada caja. (<strong>'+fecha_ultm+'</strong>)</p></a>';

              lista_contenido +='<a href="#" '+disabled+' class="add_venta_popup_class_old" data-rel="popup" codigo-venta="'+results.rows.item(i).CodArt+'" last-price="'+precio+'" cajas-camion="'+results.rows.item(i).CajasCamion+'" calibre="'+results.rows.item(i).Calibre+'" cant-empaque="'+results.rows.item(i).CantxEmpaque+'" cod-marca="'+results.rows.item(i).CodMarca+'" des-art="'+results.rows.item(i).DesArt+'"  >Historial</a></li>';
              // lista_contenido +='<option value="'+results.rows.item(i).CodArt+'">'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArt+'</option>'; 
            }
          }
          // lista_contenido +='</ul>';

          // alert("art:"+i);

          // document.getElementById("tabla_select").innerHTML =lista_contenido;
          // $('#producto').html(lista_contenido);
          // $('#tabla_select').append(lista_contenido);
          // $("#producto").trigger("create");


          // $('.list_old_venta').html(lista_contenido);
          // $(".list_old_venta").trigger("create");
          // $('.mensaje_venta_c').html('Ready');
        }

        function querySuccess_new_articulo(tx, results) {
          // alert("succes new");

          var len = results.rows.length;


          arr_art_carrito = JSON.parse(localStorage.art);
          // alert(arr_art_carrito);
          // alert(ids_old);
          // var lista_contenido='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Productos...">';
          for (var i = 0; i < len; i++) {



            if($.inArray( results.rows.item(i).CodArt, arr_art_carrito )==-1){
            if($.inArray( results.rows.item(i).CodArt, ids_old )==-1) {

              var co_ma= results.rows.item(i).CodMarca;
              // if(co_ma!=15 || co_ma!=18 || co_ma!=20 || co_ma!=25 || co_ma!=30 || co_ma!=34 || co_ma!=35 || co_ma!=40 || co_ma!=50 || co_ma!=55 || co_ma!=64 || co_ma!=65 || co_ma!=66 || co_ma!=67 || co_ma!=68 || co_ma!=69 || co_ma!=70 || co_ma!=75 || co_ma!=80 || co_ma!=90 || co_ma!=94 || co_ma!=95 || co_ma!=96)
              if(!(co_ma=="18" || co_ma=="25" || co_ma=="35" || co_ma=="50" || co_ma=="70" || co_ma=="94")){ 
                // alert(co_ma);
                co_ma="999";
              }
              lista_contenido +='<li><a href="#">';
              lista_contenido +='<img src="img/marcas/'+co_ma+'.png">';
              lista_contenido +='<h2>'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArt+'</h2></a>';
              lista_contenido +='<a href="#" class="add_venta_popup_class_old" data-rel="popup" codigo-venta="'+results.rows.item(i).CodArt+'" last-price="'+results.rows.item(i).PrecioVtaMax+'" cajas-camion="'+results.rows.item(i).CajasCamion+'" calibre="'+results.rows.item(i).Calibre+'" cant-empaque="'+results.rows.item(i).CantxEmpaque+'"  cod-marca="'+results.rows.item(i).CodMarca+'" des-art="'+results.rows.item(i).DesArt+'" >Historial</a></li>';
              // lista_contenido +='<option value="'+results.rows.item(i).CodArt+'">'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArt+'</option>'; 

            }
          }

          }
          lista_contenido+='<button type="button" class="class_confirmaciones btn_confirmar_ventas_vacia" data-theme="b">AVANZAR SIN COMPRAR</button>';
          lista_contenido +='</ul>';

          // alert("art:"+i);

          // document.getElementById("tabla_select").innerHTML =lista_contenido;
          // $('#producto').html(lista_contenido);
          // $('#tabla_select').append(lista_contenido);
          // $("#producto").trigger("create");

          $('.list_old_venta').html(lista_contenido);
          $(".list_old_venta").trigger("create");

        }








        





        // Transaction error callback
        //
        function errorCB_list(err) {
          alert("Error processing SQL: "+err.code);
        }



        // Transaction success callback
        //
        function cargar_old_venta_list() {
          // alert("cargar_old_venta_list");
          // alert("successCB_select_articulo");
          // var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
          db.transaction(queryDB_old_articulo, errorCB_list);
        }

        function cargar_new_venta_list() {
          // alert("successCB_select_articulo");
          // var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
          db.transaction(queryDB_new_articulo, errorCB_list);
        }

        function cargar_art_list (id_cli){
          // alert("cargar_listas");
          id_cliente=id_cli;

          cargar_old_venta_list();
          cargar_new_venta_list();
        }


