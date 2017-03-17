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





  /* se obtienen las ordenes del usuario */
  var es_mandado = 0;
  $.ajax({
      type: 'POST',
      url: webservices + 'getDatosOrden',
      data: {id: orden},
      dataType: 'json',
      success: function (data) {

        for (n in data){
          $('#divNombreCliente').text(data[n].nombres + " " + data[n].apellidos);
          $('#divDireccionPickup').text("No definido");
          $('#divDireccionEntrega').text(data[n].direccion);
          $('#divMontoaRecibir').text(data[n].total);
          $('#divEstado').text(data[n].estado);


          es_mandado = data[n].es_mandado;

          /* se muestra botonera correspondiente */
          if (data[n].id_estado == "2"){
            $('#Botonera1').show();
          }
          if (data[n].id_estado == "3"){
            $('#Botonera2').show();
          }



          if (es_mandado == "1"){
            // realiza consulta de mandado.

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
                    $('#divListMandados').append("<div class='row'  onclick='verMandado("+data[n].id_mandado+")'>");
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].pk_nombre + "</div>" );
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].en_nombre + "</div>" );
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].estado + "</div>" );
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

                  $('#divListMandados').append("<div class='row'>");
                  $('#divListMandados').append("<div class='col-xs-4'>Tienda</div>" );
                  $('#divListMandados').append("<div class='col-xs-4'>Producto</div>" );
                  $('#divListMandados').append("<div class='col-xs-4'>Cantidad</div>" );
                  $('#divListMandados').append("</div>")

                  for (n in data){
                    $('#divListMandados').append("<div class='row'>");
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].tienda + "</div>" );
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].nombre + "</div>" );
                    $('#divListMandados').append("<div class='col-xs-4'>" + data[n].cantidad + "</div>" );
                    $('#divListMandados').append("</div><div class=\"clearfix\"></div>")

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
