var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);

var v_save_art_id;
var v_cli_id;
var v_save_cal;
var v_save_emp;
var v_save_pre;
var v_save_caj;
var v_save_uni;
var v_save_caj_cam;
var v_save_cod_mar;
var v_save_des_art;

function insertDB_temp_db(tx) {
  // alert("ingreso a la transaccion");


  // alert('INSERT INTO TEMPVENTA (IdArt,IdCli,Calibre,Empaque,Precio,Caja,Unidad,CajasCamion,CodMarca,DesArt) VALUES (?,?,?,?,?,?,?,?,?,"?"),['+v_save_art_id+','+v_cli_id+','+v_save_cal+','+v_save_emp+','+v_save_pre+','+v_save_caj+','+v_save_uni+','+v_save_caj_cam+','+v_save_cod_mar+','+v_save_des_art+'],realizado,errorinsert');
// tx.executeSql('CREATE TABLE IF NOT EXISTS TEMPVENTA (IdArt INTEGER,IdCli INTEGER,Calibre DECIMAL(18,4),Empaque INTEGER,Precio DECIMAL(18,2),Caja INTEGER,Unidad INTEGER,CajasCamion INTEGER, CodMarca INTEGER, DesArt VARCHAR(255))');
// tx.executeSql('CREATE TABLE IF NOT EXISTS TEMPVENTA2 (IdArt INTEGER,IdCli INTEGER)');
               // tx.executeSql('INSERT INTO TEMPVENTA (IdArt,IdCli,Calibre,Empaque,Precio,Caja,Unidad,CajasCamion,CodMarca,DesArt) VALUES (?,?,?,?,?,?,?,?,?,"?")',[v_save_art_id,v_cli_id,v_save_cal,v_save_emp,v_save_pre,v_save_caj,v_save_uni,v_save_caj_cam,v_save_cod_mar,v_save_des_art],realizado,errorinsert);
  // tx.executeSql('INSERT INTO TEMPVENTA (IdArt,IdCli,Calibre,Empaque,Precio,Caja,Unidad,CajasCamion,CodMarca,DesArt) VALUES ('+v_save_art_id+','+v_cli_id+','+v_save_cal+','+v_save_emp+','+v_save_pre+','+v_save_caj+','+v_save_uni+','+v_save_caj_cam+','+v_save_cod_mar+',"'+v_save_des_art+'")');
  
  // tx.executeSql('INSERT INTO TEMPVENTA2 (IdArt,IdCli) VALUES ('+v_save_art_id+','+v_cli_id+')');

  tx.executeSql('INSERT INTO TEMPVENTA (IdArt,IdCli,Calibre,Empaque,Precio,Caja,Unidad,CajasCamion,CodMarca,DesArt) VALUES ('+v_save_art_id+','+v_cli_id+','+v_save_cal+','+v_save_emp+','+v_save_pre+','+v_save_caj+','+v_save_uni+','+v_save_caj_cam+','+v_save_cod_mar+',"'+v_save_des_art+'")');

  var arr_art = JSON.parse(localStorage.art);
  var lon=arr_art.length;
  arr_art[lon]=v_save_art_id;
  localStorage.art=JSON.stringify(arr_art);
  cargar_listas(v_cli_id);
};

// function updateDB_temp_db(tx) {
//   // tx.executeSql('INSERT INTO TEMPVENTA (IdArt,IdCli,Calibre,Empaque,Precio,Caja,Unidad,CajasCamion,CodMarca,DesArt) VALUES ('+v_save_art_id+','+v_cli_id+','+v_save_cal+','+v_save_emp+','+v_save_pre+','+v_save_caj+','+v_save_uni+','+v_save_caj_cam+','+v_save_cod_mar+',"'+v_save_des_art+'")');
//   tx.executeSql('UPDATE TEMPVENTA SET Precio ='+v_save_pre+', Caja ='+v_save_caj+', Unidad ='+v_save_uni+' WHERE IdArt = '+ v_save_art_id+' and IdCli= '+v_cli_id);

//   // tx.executeSql('UPDATE DEMO SET name ="'+document.getElementById("editNameBox").value+'", number= "'+document.getElementById("editNumberBox").value+ '" WHERE id = '+ currentRow, [], queryDB, errorCB);

//   // var arr_art = JSON.parse(localStorage.art);
//   // var lon=arr_art.length;
//   // arr_art[lon]=v_save_art_id;
//   // localStorage.art=JSON.stringify(arr_art);
//   cargar_listas(v_cli_id);
// };


// db.transaction(function(tx) {
//   tx.executeSql('INSERT INTO TEMPVENTA(firstname,lastname,phonenumber) VALUES (?,?,?)',[inputFirstName,inputLastName,inputPhoneNumber], function(tx) {
//     //Success callback get executed if the INSERT statement worked well
//     //Get the last contact we just added and dynamically add it to the table displaying the contacts
//   });
// });









function errorCB1_carg_tmp(err) {
 alert(err.code+"errorCB1_carg1--: "+err.message);
}
// function errorCB1_update_tmp(err) {
//  alert(err.code+"errorCB1_update--: "+err.message);
// }
function realizado(err) {
 alert("realizado");
}
function errorinsert(err) {
 alert(err.code+"errorinsert--: "+err.message);
}


function db_temp_guardar_venta(save_art_id,cli_id,save_cal,save_emp,save_pre,save_caj,save_uni,save_caj_cam,save_cod_mar,save_des_art) {
 v_save_art_id   =save_art_id;
 v_cli_id        =cli_id;
 v_save_cal      =save_cal;
 v_save_emp      =save_emp;
 v_save_pre      =save_pre;
 v_save_caj      =save_caj;
 v_save_uni      =save_uni;
 v_save_caj_cam  =save_caj_cam;
 v_save_cod_mar  =save_cod_mar;
 v_save_des_art  =save_des_art.trim();
 // alert("ingreso funcion");

 // var arr_art = JSON.parse(localStorage.art);
 // var lon=arr_art.length;
 // arr_art[lon]=v_save_art_id;
 // localStorage.art=JSON.stringify(arr_art);
 // cargar_carrito_venta_list();

 db.transaction(insertDB_temp_db, errorCB1_carg_tmp);

};
// function db_temp_update_venta(save_art_id,cli_id,save_cal,save_emp,save_pre,save_caj,save_uni,save_caj_cam,save_cod_mar,save_des_art) {
//  v_save_art_id   =save_art_id;
//  v_cli_id        =cli_id;
//  v_save_cal      =save_cal;
//  v_save_emp      =save_emp;
//  v_save_pre      =save_pre;
//  v_save_caj      =save_caj;
//  v_save_uni      =save_uni;
//  v_save_caj_cam  =save_caj_cam;
//  v_save_cod_mar  =save_cod_mar;
//  v_save_des_art  =save_des_art.trim();
//  db.transaction(updateDB_temp_db, errorCB1_update_tmp);

// };

