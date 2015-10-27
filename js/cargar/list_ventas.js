
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);


        // Query the database
        //
        function queryDB_new_articulo(tx) {
          tx.executeSql('SELECT CodArt, DesArtReducido, CodMarca from ARTICULO ', [], querySuccess_new_articulo, errorCB_new);
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

         function querySuccess_new_articulo(tx, results) {
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








        





        // Transaction error callback
        //
        function errorCB_new(err) {
          alert("Error processing SQL: "+err.code);
        }



        // Transaction success callback
        //
        function cargar_new_venta_list() {
          // alert("successCB_select_articulo");
          // var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
          db.transaction(queryDB_new_articulo, errorCB_new);
        }
       


