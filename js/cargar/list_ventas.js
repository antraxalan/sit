
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;
var lista_contenido;

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
          tx.executeSql('select a.CodArt,DesArt,CodMarca,calibre,cantxempaque,PrecioVtaMax,sum(dcajas-hcajas) CajasCamion from articulo a inner join detalle b on a.codart=b.codart and codconcepto=1800 where tipoarticulo="P" group by a.codart,desart,calibre,cantxempaque,preciovtamax,CodMarca order by a.codart', [], querySuccess_new_articulo, errorCB_list);
        }


        function querySuccess_old_articulo(tx, results) {
          // alert("ini query");
          // alert("succes old");
          var tblContent='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Productos...">';
          var len = results.rows.length;
          var precio;
          var aux;
          var disabled;
          var fecha_ultm;
          for (var i = 0; i < len; i++) {
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

            tblContent +='<li><a href="#" '+disabled+'>';
            tblContent +='<img src="img/marcas/'+co_ma+'.png">';
            tblContent +='<h2>'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArt+'</h2>';


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

            tblContent +='<p>Ultima venta: <strong>'+results.rows.item(i).Cajas+'</strong> cajas a <strong>'+results.rows.item(i).Importe+'</strong> Bolivianos. (<strong>'+fecha_ultm+'</strong>)</p></a>';
    

            tblContent +='<a href="#add_venta_popup" '+disabled+' class="add_venta_popup_class_old" data-rel="popup" codigo-venta="'+results.rows.item(i).CodArt+'" last-price="'+precio+'" cajas-camion="'+results.rows.item(i).CajasCamion+'" data-transition="flow">Historial</a></li>';
            // tblContent +='<option value="'+results.rows.item(i).CodArt+'">'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArt+'</option>'; 
          }
          tblContent +='</ul>';

          // alert("art:"+i);

          // document.getElementById("tabla_select").innerHTML =tblContent;
          // $('#producto').html(tblContent);
          $('.list_old_venta').html(tblContent);
          // $('#tabla_select').append(tblContent);
          // $("#producto").trigger("create");
          $(".list_old_venta").trigger("create");
          $('.mensaje_venta_c').html('Ready');
        }

        function querySuccess_new_articulo(tx, results) {
          // alert("succes new");
          // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';

          // var tblContent='<option value="-">Seleccione un producto.</option>';
          var tblContent='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Productos...">';
          var len = results.rows.length;
          for (var i = 0; i < len; i++) {
            var co_ma= results.rows.item(i).CodMarca;
            // if(co_ma!=15 || co_ma!=18 || co_ma!=20 || co_ma!=25 || co_ma!=30 || co_ma!=34 || co_ma!=35 || co_ma!=40 || co_ma!=50 || co_ma!=55 || co_ma!=64 || co_ma!=65 || co_ma!=66 || co_ma!=67 || co_ma!=68 || co_ma!=69 || co_ma!=70 || co_ma!=75 || co_ma!=80 || co_ma!=90 || co_ma!=94 || co_ma!=95 || co_ma!=96)
            if(!(co_ma=="18" || co_ma=="25" || co_ma=="35" || co_ma=="50" || co_ma=="70" || co_ma=="94")){ 
              // alert(co_ma);
              co_ma="999";
            }
            tblContent +='<li><a href="#">';
            tblContent +='<img src="img/marcas/'+co_ma+'.png">';
            tblContent +='<h2>'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArt+'</h2></a>';
            tblContent +='<a href="#add_venta_popup" class="add_venta_popup_class_new" data-rel="popup" codigo-venta="'+results.rows.item(i).CodArt+'" last-price="'+results.rows.item(i).PrecioVtaMax+'" data-transition="flow">Historial</a></li>';
            // tblContent +='<option value="'+results.rows.item(i).CodArt+'">'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArt+'</option>'; 
          }
          tblContent +='</ul>';

          // alert("art:"+i);

          // document.getElementById("tabla_select").innerHTML =tblContent;
          // $('#producto').html(tblContent);
          $('.list_new_venta').html(tblContent);
          // $('#tabla_select').append(tblContent);
          // $("#producto").trigger("create");
          $(".list_new_venta").trigger("create");

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

        function cargar_listas (id_cli){
          // alert("cargar_listas");
          id_cliente=id_cli;

          cargar_old_venta_list();
          // cargar_new_venta_list();
        }


