

var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);

        // Query the database
        //
        function queryDB_enviar_detalle(tx) {
            // alert("queryDB_enviar_detalle");
            tx.executeSql('SELECT * FROM DETALLE Apu<>0', [], querySuccess_enviar_detalle, errorCB_enviar);
        }
        function queryDB_enviar_maestro(tx) {
        	tx.executeSql('SELECT * FROM MAESTRO WHERE Conteo=-1', [], querySuccess_enviar_maestro, errorCB_enviar);
        }


        // function searchQueryDB(tx) {
        // 	tx.executeSql("SELECT * FROM DEMO where name like ('%"+ document.getElementById("txtName").value + "%')",
        // 		[], querySuccess, errorCB);
        // }

        // Query the success callback
        //
        function querySuccess_enviar_detalle(tx, results) {
            $.mobile.loading("show");
            // alert("querySuccess_enviar_detalle");
            var data = '';
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                data=data+results.rows.item(i).TipoDcto+'|';
                data=data+results.rows.item(i).NroDcto+'|';
                data=data+results.rows.item(i).Apu+'|';
                data=data+results.rows.item(i).Fecha+'|';
                data=data+results.rows.item(i).FechaVto+'|';
                data=data+results.rows.item(i).TipoDctoM+'|';
                data=data+results.rows.item(i).NroDctoM+'|';
                data=data+results.rows.item(i).Precio+'|';
                data=data+results.rows.item(i).Tc+'|';
                data=data+results.rows.item(i).CodConcepto+'|';
                data=data+results.rows.item(i).CodCliente+'|';
                data=data+results.rows.item(i).Debe+'|';
                data=data+results.rows.item(i).Haber+'|';
                data=data+results.rows.item(i).CodArt+'|';
                data=data+results.rows.item(i).Dcajas+'|';
                data=data+results.rows.item(i).Hcajas+'|';
                data=data+results.rows.item(i).Dunidades+'|';
                data=data+results.rows.item(i).Hunidades+'|';
            }
            var direccion   =$(".direccion").val();
            var codigo      =localStorage.g_username;
            var password    =localStorage.g_password;
            var info='detalle';
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: "http://"+direccion+"/sitrans_server/sitrans_insert.php",
                data: "codigo=" + codigo + "&password=" + password + "&info=" + info + "&data=" + data,
                success: function (resp) {
                  $.mobile.loading("hide");
                  alert(resp);
              },
              error: function (e) {
                  $.mobile.loading("hide");
                  alert('error enviar');
              }
          });
        }

        function querySuccess_enviar_maestro(tx, results) {
            $.mobile.loading("show");
            var data = '';
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
               data=data+results.rows.item(i).TipoDcto+'|';
               data=data+results.rows.item(i).NroDcto+'|';
               data=data+results.rows.item(i).Fecha+'|';
               data=data+results.rows.item(i).FechaVto+'|';
               data=data+results.rows.item(i).Obs+'|';
               data=data+results.rows.item(i).CodCliente+'|';
               data=data+results.rows.item(i).Conteo+'|';
           }
           var direccion   =$(".direccion").val();
           var codigo      =localStorage.g_username;
           var password    =localStorage.g_password;
           var info='maestro';
           $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "http://"+direccion+"/sitrans_server/sitrans_insert.php",
            data: "codigo=" + codigo + "&password=" + password + "&info=" + info + "&data=" + data,
            success: function (resp) {
              $.mobile.loading("hide");
              alert(resp);
          },
          error: function (e) {
              $.mobile.loading("hide");
              alert('error enviar');
          }
      });
       }







        // Transaction error callback
        //
        function errorCB_enviar(err) {
        	alert("Error processing SQL4: "+err.code);
        }

        // Transaction success callback
        //
        function successCB_enviar_detalle() {
        	// alert("successCB_enviar_detalle");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
            alert("successCB_enviar_detalle");
            db.transaction(queryDB_enviar_detalle, errorCB_enviar);
        }
        function successCB_enviar_maestro() {
        	// alert("successCB_info_enviar_cliente");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
        	db.transaction(queryDB_enviar_maestro, errorCB_enviar);
        }

         // Cordova is ready
        //
        function enviar_detalle() {
        	// alert("cargar_info_enviar_articulo");
            // alert("enviar_detalle");
            db.transaction(successCB_enviar_detalle, errorCB_enviar);
        }
        function enviar_maestro() {
        	// alert("cargar_info_enviar_cliente");
        	db.transaction(successCB_enviar_maestro, errorCB_enviar);
        }
        


