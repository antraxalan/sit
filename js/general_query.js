
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var general_query;
var general_result={};


function queryDB_general(tx) {         
  tx.executeSql(general_query, [], querySuccess_general, errorCB_general);
}

function querySuccess_general(tx, results) { 
  general_result=results;
}

function errorCB_general(err) {
  alert("Error processing SQL: "+err.code+" message: "+err.message+" query:"+general_query);
}
function errorCB_general1(err) {
  alert("Error 1 processing SQL: "+err.code+" message: "+err.message+" query:"+general_query);
}

function query_general(q) {
  general_query=q;
  db.transaction(queryDB_general,errorCB_general1);
  return general_result;
}



