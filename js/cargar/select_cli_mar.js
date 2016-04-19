

var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);


        // Query the database
        //
        function queryDB_select_articulo(tx) {
          tx.executeSql('SELECT CodArt, DesArtReducido, CodMarca from ARTICULO ', [], querySuccess_list_articulo, errorCB_select);
        }
        function queryDB_select_cliente(tx) {
          // alert("queryDB_select_cliente");
          tx.executeSql('SELECT CodCliente, Nombre from CLIENTE ', [], querySuccess_select_cliente, errorCB_select);
        }

        // function searchQueryDB(tx) {
        //  tx.executeSql("SELECT * FROM DEMO where name like ('%"+ document.getElementById("txtName").value + "%')",
        //    [], querySuccess, errorCB);
        // }

        // Query the success callback
        //
        function querySuccess_select_articulo(tx, results) {
          // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
          var tblContent='<option value="-">Seleccione un producto.</option>';
          var len = results.rows.length;
          for (var i = 0; i < len; i++) {
            tblContent +='<option value="'+results.rows.item(i).CodArt+'">'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArtReducido+'</option>'; 
          }
          // alert("art:"+i);

          // document.getElementById("tabla_select").innerHTML =tblContent;
          $('#producto').html(tblContent);
           // $('#tabla_select').append(tblContent);
           $("#producto").trigger("create");

         }

         function querySuccess_list_articulo(tx, results) {
          // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';

          // var tblContent='<option value="-">Seleccione un producto.</option>';
          var tblContent='<ul data-role="listview" data-split-icon="edit" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Productos...">';
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
            tblContent +='<h2>'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArtReducido+'</h2></a>';
            tblContent +='<a href="#add_venta_popup" class="add_venta_popup_class_new" data-rel="popup" codigo-venta="'+results.rows.item(i).CodArt+'" data-transition="flow">Historial</a></li>';
            // tblContent +='<option value="'+results.rows.item(i).CodArt+'">'+results.rows.item(i).CodArt+' - '+results.rows.item(i).DesArtReducido+'</option>'; 
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








        function querySuccess_select_cliente_notused(tx, results) {
          // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
          var tblContent2='';
          // alert("asd");
          // var tblContent2='<select name="select-custom-cliente" id="cliente" class="filterable-select " data-native-menu="false">';
          tblContent2 +='<option value="-">Seleccione un cliente.</option>';
          // tblContent2 +='<option value="3">Alan Aruquipa</option>';
          var len = results.rows.length;
          for (var i = 0; i < len; i++) {
            tblContent2 +='<option value="'+results.rows.item(i).CodCliente+'">'+results.rows.item(i).CodCliente+' - '+results.rows.item(i).Nombre+'</option>'; 
          }
          // tblContent2 +='</select>'; 
          // alert("cli:"+i);

          // document.getElementById("tabla_select").innerHTML =tblContent2;
          $('#cliente').html(tblContent2);
          // $('.mensaje123').html(tblContent2);

          // $('#cliente_div_id').html(tblContent2);
          // $('#tabla_select').append(tblContent2);
          $("#cliente").trigger("create");

        }

        function querySuccess_select_cliente(tx, results) {

          var tblContent2='';
          var len = results.rows.length;
          // alert(len);
          for (var i = 0; i < len; i++) {
          tblContent2 +='<li class="cliente_valido cli_visit" num-cliente="'+results.rows.item(i).CodCliente+'"><div class="image_list"></div><div class="plus_list"></div><label>'+results.rows.item(i).Nombre+'</label><span>'+results.rows.item(i).CodCliente+' - Pendiente</span></li>'; 
          }
          alert(tblContent2);

          $('.circle-list').html(tblContent2);
          $(".circle-list").trigger("create");

        }





        // Transaction error callback
        //
        function errorCB_select(err) {
          alert("Error processing SQL3: "+err.code);
        }



        // Transaction success callback
        //
        function cargar_select_marca() {
          // alert("successCB_select_articulo");
          // var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
          db.transaction(queryDB_select_articulo, errorCB_select);
        }
        function cargar_select_cliente() {
          // alert("successCB_select_cliente");
          // var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
          db.transaction(queryDB_select_cliente, errorCB_select);
        }
        


