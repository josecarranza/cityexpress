 var valor_fecha_setear = null; 
var app = {
    SOME_CONSTANTS : false,  // some constant
    // Application Constructor
    initialize: function() {
        console.log("console log init");
        this.bindEvents();
        this.initFastClick();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },

    // Phonegap is now ready...
    onDeviceReady: function() {
        console.log("device ready, start making you custom calls!");


        $('#logoutButton').click(function(){
        doLogout();
      });




          nombreUsuario = localStorage.getItem("nombre_usuario");
          $('#divNombre').text(nombreUsuario);

    }
};
  /* se dispara en lugar de onDeviceReady */
  $(document).ready(function(){
    var id_usuario = localStorage.getItem("id_usuario");
    var orden = getParameter("vieworderId");

    $('#Botonera1').hide();
    $('#Botonera2').hide();
    $('#Botonera3').hide();
    $("#ordenBoton").hide();


    $('#aceptarOrden').click(function(){
        var confirmar = confirm("Esta seguro que desea aceptar esta orden");

        if (confirmar){

          // se invoca la llamada ajax para cambio de estado
          $.ajax({
              type: 'POST',
              url: webservices + 'setEstadoOrden',
              data: {id: orden, estado:3},
              dataType: 'json',
              success: function (data) {

                window.location = "detalle_orden.html";


              }
        });


        }
      });

      $('#puntomedio').click(function(){
        var confirmar = confirm("Esta seguro que confirmar llegada a local/punto de inicio de esta orden");

        if (confirmar){

          // se invoca la llamada ajax para cambio de estado
          $.ajax({
              type: 'POST',
              url: webservices + 'setEstadoOrden',
              data: {id: orden, estado:6},
              dataType: 'json',
              success: function (data) {

                window.location = "detalle_orden.html";


              }
        });


        }
      });

      $('#finalizarOrden').click(function(){
          var confirmar = confirm("Esta seguro que finalizar esta orden");
          var comentario = $('#comentario').val();
        //  alert(comentario);
          if (confirmar){

            // se invoca la llamada ajax para cambio de estado
            $.ajax({
                type: 'POST',
                url: webservices + 'setEstadoOrden',
                data: {id: orden, estado:4,comment:comentario},
                dataType: 'json',
                success: function (data) {

                  window.location = "principal.html";


                }
          });


          }
        });
      
         $('#ordenBoton').click(function(){
          var confirmar = confirm("Esta seguro realizar esta marca");
         
        //  alert(comentario);
          if (confirmar){
             //alert("Valor a setear: " + valor_fecha_setear);
            // se invoca la llamada ajax para cambio de estado
         
            $.ajax({
                type: 'POST',
                url: webservices + 'setFechaEstadoOrden',
                data: {id: orden, campo:valor_fecha_setear},
                dataType: 'json',
                success: function (data) {

                  window.location = "detalle_orden.html";


                }
          });


          }

          });
        





  /* se obtienen las ordenes del usuario */
  var es_mandado = 0;
  $.ajax({
      type: 'POST',
      url: webservices + 'getDatosOrden',
      data: {id: orden},
      dataType: 'json',
      success: function (data) {

        for (n in data){
          $('#divNombreCliente').text(data[n].nombre_entrega);
          $('#divDireccionPickup').text("No definido");
          $('#divDireccionEntrega').text(data[n].direccion+" Colonia"+data[n].colonia+", "+data[n].municipio+", "+data[n].departamento);
          $('#divMontoaRecibir').text("$"+data[n].total);
          $('#divEstado').text(data[n].estado);


          es_mandado = data[n].es_mandado;



         

          breakme: if(data[n].fecha_sale_pto4 == null){
            if(data[n].fecha_llega_pto4 == null){
              if(data[n].fecha_sale_pto3 == null){
                if(data[n].fecha_llega_pto3 == null){
                  if(data[n].fecha_sale_pto2 == null){
                    if(data[n].fecha_llega_pto2 == null){
                      if(data[n].fecha_sale_pto1 == null){
                        if(data[n].fecha_llega_pto1 == null){
                            $("#ordenBoton").html('<span class="ui-btn-inner"><span class="ui-btn-text">Ha llegado a punto 1</span></span>');
                          
                            valor_fecha_setear = "fecha_llega_pto1";
                           break breakme;
                        }
                           $("#ordenBoton").html('<span class="ui-btn-inner"><span class="ui-btn-text">Salir de Punto 1</span></span>');
                            valor_fecha_setear = "fecha_sale_pto1";
                            break breakme;
                      }
                           $("#ordenBoton").html('<span class="ui-btn-inner"><span class="ui-btn-text">Ha llegado a punto 2</span></span>');
                            valor_fecha_setear = "fecha_llega_pto2";
                           break breakme;
                    }      
                           $("#ordenBoton").html('<span class="ui-btn-inner"><span class="ui-btn-text">Salir de Punto 2</span></span>');
                            valor_fecha_setear = "fecha_sale_pto2";
                          break breakme;      
                }
                   $("#ordenBoton").html('<span class="ui-btn-inner"><span class="ui-btn-text">Ha llegado a punto 3</span></span>');
                   valor_fecha_setear = "fecha_llega_pto3";
                  break breakme;  
                } 
                   $("#ordenBoton").html('<span class="ui-btn-inner"><span class="ui-btn-text">Salir de Punto 3</span></span>');
                   valor_fecha_setear = "fecha_sale_pto3";
                  break breakme; 
              }
                 $("#ordenBoton").html('<span class="ui-btn-inner"><span class="ui-btn-text">Ha llegado a punto 4</span></span>');
                   valor_fecha_setear = "fecha_llega_pto4";
                break breakme;
            }
               $("#ordenBoton").html('<span class="ui-btn-inner"><span class="ui-btn-text">Salir de Punto 4</span></span>');
              valor_fecha_setear = "fecha_sale_pto4";
              break breakme;
          }else{
              $("#ordenBoton").hide();
          }

          /* se muestra botonera correspondiente */
          if (data[n].id_estado == "2"){
            $('#Botonera1').show();
          }
          if (data[n].id_estado == "3"){
             $("#ordenBoton").show();
            $('#Botonera3').show();
          }
          if (data[n].id_estado == "6"){
            $("#ordenBoton").show();
            $('#Botonera2').show();
          }



          if (es_mandado == "1"){
            // realiza consulta de mandado.
            $('#divDireccionPickup').text(data[n].direccion+" Colonia "+data[n].colonia+", "+data[n].municipio+", "+data[n].departamento);
            $.ajax({
                type: 'POST',
                url: webservices + 'getMandadosOrden',
                data: {id: orden},
                dataType: 'json',
                success: function (data) {

                  $('#divListMandados').append("<div class='row'>") 
                  $('#divListMandados').append("<div class='col-xs-4'>Envía</div>" );
                  $('#divListMandados').append("<div class='col-xs-4'>Recibe</div>" );
                  $('#divListMandados').append("<div class='col-xs-4'>Estado</div>" );
                   
                  $('#divListMandados').append("</div>")

                  for (n in data){
                    $('#divNombreCliente').text(data[n].pk_nombre);
                    $('#divDireccionEntrega').text(data[n].direccion_en+" Colonia "+data[n].colonia_en+", "+data[n].municipio_en+", "+data[n].departamento_en);
                    $('#divListMandados').append("<div class='row'  onclick='verMandado("+data[n].id_mandado+")'>");
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].pk_nombre + "</div>" );
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].en_nombre + "</div>" );
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].estado + "</div>" );
                    $('#divListMandados').append("<div class='col-xs-12'>Descripcion</div>" );
                    $('#divListMandados').append("<div class='col-xs-12'>" + data[n].detalle + "</div>" );
                    $('#divListMandados').append("</div><div class=\"clearfix\"></div>")

                  }


                }
          });





          }else{
            // realiza consulta de productos de tienda
            //TODO: verificar si los productos de tienda no se haran como mandados, debido a que no tiene pickup en la base de datos.


            $.ajax({
                type: 'POST',
                url: webservices + 'getProductosOrden',
                data: {id: orden},
                dataType: 'json',
                success: function (data) {
                  html="<div class='row margin-bottom'>";
                  html+="<div class='col-xs-4'><b>TIENDA</b></div>";
                  html+="<div class='col-xs-6'><b>PRODUCTO</b></div>";
                  html+="<div class='col-xs-2'><b>CANT.</b></div>";
                  html+="</div>";
                  $('#divListMandados').append(html)

                  for (n in data){
                    html2="<div class='row margin-bottom'>";
                    html2+="<div class='col-xs-4'>" + data[n].tienda + "</div>";
                    html2+="<div class='col-xs-6'>" + data[n].nombre + "</div>";
                    html2+="<div class='col-xs-2 text-center'>" + data[n].cantidad + "</div>";
                    html2+="</div><div class=\"clearfix\"></div>";
                    $('#divListMandados').append(html2);


                  }


                }
          });


          }

        }
      }

  });



  var $loading = $('#loadingDiv').hide();
  $(document).ajaxStart(function () {
      $loading.show();
    }).ajaxStop(function () {
      $loading.hide();
    });



  });


      function verMandado(id){
        setParameter("verMandadoId",id);
        window.location = "detalle_mandado.html";
      }


      $('#btnFoto').click(function(){

        alert("Entro a tomar foto")
           navigator.camera.getPicture(onSuccess, onFail, {
             quality: 50,
             destinationType: Camera.DestinationType.FILE_URI,
             correctOrientation: true,
             targetWidth: 450,
             targetHeight: 254
         });

          function onSuccess(imageData) {

            document.getElementById("myimage").src = imageData;
            get_image_size_from_URI(imageData);
            banderaFoto=true;

        }

          function onFail(message) {

          }

      });



      function getBase64Image(imgElem) {
      // imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"

          var canvas = document.createElement("canvas");
          canvas.width = 450;
          canvas.height = 254;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(imgElem, 0, 0);
          var dataURL = canvas.toDataURL("image/png");
          return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      }

$(document).ready(function() {
  $("#app").on("swipeleft",function(){
    history.back();
});
  $("#app").on("swiperight",function(){
    location.reload();
});
});


