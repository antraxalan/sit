var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
function borrar_datos() {
    db.transaction(borrar);
};
function borrar(tx) {
    tx.executeSql('DELETE FROM USUARIO WHERE id = 1');
    // tx.executeSql('INSERT INTO USUARIO (id,codigo,pass) VALUES (1,"'+codigo_usuario+'","'+password_usuario+'")');
    localStorage.g_username = '';
    localStorage.g_password = '';
    localStorage.g_existe = 0;
        // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    // tx.executeSql('INSERT INTO USUARIO (id,codigo,pass) VALUES (1,"11","22")');
};