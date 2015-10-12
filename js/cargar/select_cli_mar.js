

var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);


        // Query the database
        //
        function queryDB_select_articulo(tx) {
          tx.executeSql('SELECT CodArt, DesArtReducido from ARTICULO ', [], querySuccess_select_articulo, errorCB_select);
        }
        function queryDB_select_cliente(tx) {
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






         function querySuccess_select_cliente(tx, results) {
          // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
          var tblContent2='';
          // alert("asd");
          // var tblContent2='<select name="select-custom-cliente" id="cliente" class="filterable-select " data-native-menu="false">';
          tblContent2 +='<option value="-">Seleccione un cliente.</option>';
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
          // $("#cliente").trigger("create");

        }





        // Transaction error callback
        //
        function errorCB_select(err) {
          alert("Error processing SQL: "+err.code);
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
        


