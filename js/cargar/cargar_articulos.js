var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var data_db_articulos;
var id_transp=localStorage.g_username;

function subir_db_articulos() {

  var direccion= $(".direccion").val();
  // var var1= $(".var1").val();

  // var codigo= $("#cod_usuario").val();
  // var password= $("#pass_usuario").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='articulo';
 // alert("in subir_db_articulos."+direccion+"---"+var1);
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/sitrans.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
        //----- alert("success:"+resp);
        db.transaction(populateDB_articulos, errorCB_art);
        call_insert_db_articulos(resp);
        // $.mobile.loading("hide");
    },
    error: function (e) {
      $.mobile.loading("hide");
      //----- alert("No se encuentra conectado a su red: "+e.message+" err code: "+e.code+ "e:"+e);
  }
});
  // codigo_usuario=user;
  // password_usuario=pass;
  // var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
  // db.transaction(insertDB, errorCB);
};

function populateDB_articulos(tx) {
    //----- alert("popul");
    tx.executeSql('DROP TABLE IF EXISTS ARTICULO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (IdArticulo INTEGER PRIMARY KEY AUTOINCREMENT,CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado)');
}


function call_insert_db_articulos(data) {
    data_db_articulos=data;
    //----- alert("call_insert_db_articulos");
    // codigo_usuario=user;
    // password_usuario=pass;
    // var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
    db.transaction(insertDB_articulos, errorCB1_art);
};

function insertDB_articulos(tx) {
    var d1=data_db_articulos;
    //----- alert("insertando: "+d1);

    //----- alert("-longitud1: "+d1[0].length);
    //----- alert("-longitud2: "+d1[1].length);
    //----- alert("-longitud3: "+d1.length);
    //----- alert("-longitud4: "+d1[0][0].length);
    //----- alert("-longitud5: "+d1[0][1].length);
    
    //----- alert("-0 reg: "+d1[0][0]+","+d1[0][1]+","+d1[0][2]+","+d1[0][3]+","+d1[0][4]+","+d1[0][5]+","+d1[0][6]+","+d1[0][7]+","+d1[0][8]+","+d1[0][9]+","+d1[0][10]+","+d1[0][11]+","+d1[0][12]+","+d1[0][13]+","+d1[0][14]+","+d1[0][15]+","+d1[0][16]+","+d1[0][17]+","+d1[0][18]);
    //----- alert("-1 reg: "+d1[1][0]+","+d1[1][1]+","+d1[1][2]+","+d1[1][3]+","+d1[1][4]+","+d1[1][5]+","+d1[1][6]+","+d1[1][7]+","+d1[1][8]+","+d1[1][9]+","+d1[1][10]+","+d1[1][11]+","+d1[1][12]+","+d1[1][13]+","+d1[1][14]+","+d1[1][15]+","+d1[1][16]+","+d1[1][17]+","+d1[1][18]);
    //----- alert("-2 reg: "+d1[2][0]+","+d1[2][1]+","+d1[2][2]+","+d1[2][3]+","+d1[2][4]+","+d1[2][5]+","+d1[2][6]+","+d1[2][7]+","+d1[2][8]+","+d1[2][9]+","+d1[2][10]+","+d1[2][11]+","+d1[2][12]+","+d1[2][13]+","+d1[2][14]+","+d1[2][15]+","+d1[2][16]+","+d1[2][17]+","+d1[2][18]);
    
    for (var i = 0; i < d1.length; i++) {

        tx.executeSql('INSERT INTO ARTICULO (CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado) VALUES ("'+d1[i][0]+'","'+d1[i][1]+'","'+d1[i][2]+'","'+d1[i][3]+'","'+d1[i][4]+'","'+d1[i][5]+'","'+d1[i][6]+'","'+d1[i][7]+'","'+d1[i][8]+'","'+d1[i][9]+'","'+d1[i][10]+'","'+d1[i][11]+'","'+d1[i][12]+'","'+d1[i][13]+'","'+d1[i][14]+'","'+d1[i][15]+'","'+d1[i][16]+'","'+d1[i][17]+'","'+d1[i][18]+'")');
    };
    alert("carga finalizada");
    // localStorage.g_username = codigo_usuario;
    // localStorage.g_password = password_usuario;
    // localStorage.g_existe = 1;
    // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    // tx.executeSql('INSERT INTO USUARIO (id,codigo,pass) VALUES (1,"11","22")');
};


function errorCB_art(err) {
    //----- alert("errorCB_art: "+err.message);
}
function errorCB1_art(err) {
    //----- alert("errorCB1_art: "+err.message);
}


function verificar_usuario() {

  var direccion= $(".direccion").val();
  // var var1= $(".var1").val();
  // var codigo= $("#cod_usuario").val();
  // var password= $("#pass_usuario").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;

  var info='verificar';
  //----- alert("in subir_db_articulos."+direccion+"---"+var1);
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/sitrans.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
        if(resp=='1'){
            subir_db_articulos();
            $.mobile.loading("hide");
        }else{
            $.mobile.loading("hide");
            alert("Por favor verifique su Codigo y Contraseña.");
        }
    },
    error: function (e) {
        $.mobile.loading("hide");
        alert("Verifique su red.");
      //----- alert("No se encuentra conectado a su red: "+e.message+" err code: "+e.code+ "e:"+e);
  }
});
  // codigo_usuario=user;
  // password_usuario=pass;
  // var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
  // db.transaction(insertDB, errorCB);
};
