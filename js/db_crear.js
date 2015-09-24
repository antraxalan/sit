document.addEventListener("deviceready", onDeviceReady, false);
var g_username;
var g_password;
function onDeviceReady() {
	var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
	db.transaction(populateDB, errorCB);
	inicio_page();
	localStorage.g_existe = 0;
}
function populateDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS USUARIO (id INTEGER PRIMARY KEY,codigo,pass)');
}






function inicio_page() {
	db.transaction(db_datos, errorCB2, successCB);
    // alert("search");
};
function db_datos(tx) {
	tx.executeSql("SELECT * FROM USUARIO where id = ?", [1], almacenar_user);
    // alert("tx:"+tx);
}

function almacenar_user(tx, results) {
	// alert(results.rows.length);
	if(results.rows.length==0){
		localStorage.g_existe = results.rows.length;
		localStorage.removeItem("g_username");
		localStorage.removeItem("g_password");
		$( "#panel-overlay" ).panel( "open" );

	}else{
		localStorage.g_existe = results.rows.length;
		g_username = results.rows.item(0).codigo;
		g_password = results.rows.item(0).pass;
		// alert("user"+g_username+"pass"+g_password);
		localStorage.g_username = g_username;
		localStorage.g_password = g_password;
	}

}
// function debe_completar() {
// 	$( "#panel-overlay" ).panel( "open" );
// 	$("#colapsar").setAttribute("data-collapsed","false");
// 	$("#cod_usuario").focus();
// }