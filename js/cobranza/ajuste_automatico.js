
function list_cobranza_ajuste_automatico() {
  //cobro='0.00';
  var cobro=localStorage.total_cobro;
  cobro=parseFloat(cobro);
  var cobro_aux=cobro;
  var credito=0;

  var count=1;

  $(".editar_cobranza_class").each(function(index, el) {
    var aux_nro = $(this).attr("nrodctom");
    // var aux_cob = $(this).attr("cobrado");
    var aux_sal = $(this).attr("saldo");
    var aux_fch = $(this).attr("fecha-venc");
    var aux_dcm = $(this).attr("tipodctom");
    var items = $('.editar_cobranza_class').length;
    var sum_aux;
    count=count+1;
    alert("items:"+items+" count:"+count+" \n\n aux_nro:"+aux_nro+" \n\n aux_sal:"+aux_sal+" \n\n credito:"+credito);
    aux_sal=parseFloat(aux_sal);
    aux_fch=parseFloat(aux_fch);
    aux_dcm=parseFloat(aux_dcm);
    items=parseFloat(items);
    cobro=parseFloat(cobro);
    credito = ((cobro*(-1))+parseFloat(credito)).toFixed(2);
    cobro=0;
    if (credito<0 && items>1){
      alert("1 if");
      if( aux_sal < 0 || credito <0){
        alert("2 if");

        if(count==items){
          alert("3 if");
          $('.list_cobranza').find('div[nrodctom="'+aux_nro+'"]').attr('cobrado',(credito*(-1)).toFixed(2));
          $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+aux_nro+"']").html(credito*(-1).toFixed(2)+' Bs.');
          credito=0;
        }
        if(count<items){
          alert("4 if");

          if(aux_sal<0){
            alert("5 if");
            $('.list_cobranza').find('div[nrodctom="'+aux_nro+'"]').attr('cobrado',(aux_sal).toFixed(2));
            $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+aux_nro+"']").html(aux_sal.toFixed(2)+' Bs.');
            credito=parseFloat(credito)+parseFloat(aux_sal);
          }else{
            alert("1 else");

            if((credito*(-1))<=aux_sal){
              alert("6 if");
              $('.list_cobranza').find('div[nrodctom="'+aux_nro+'"]').attr('cobrado',((credito*(-1))).toFixed(2));
              $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+aux_nro+"']").html((credito*(-1)).toFixed(2)+' Bs.');
              credito=0;
            }else{
              alert("2 else");
              // alert("segundo else");
              $('.list_cobranza').find('div[nrodctom="'+aux_nro+'"]').attr('cobrado',(aux_sal.toFixed(2)));
              $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+aux_nro+"']").html(aux_sal.toFixed(2)+' Bs.');
              credito=(parseFloat(credito)+parseFloat(aux_sal)).toFixed(2);
            }
          }
        }
      }
    }
  });

}