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

          es_mandado = data[n].es_mandado;

          // se realiza dentro del for debido a que se necesita que el hilo sea el mismo y no disparar 2 sentencias ajax

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
                    $('#divListMandados').append("<div id='pk_nombre' class='col-xs-4'>" + data[n].pk_nombre + "</div>" );
                    $('#divListMandados').append("<div id='en_nombre' class='col-xs-4'>" + data[n].en_nombre + "</div>" );
                    $('#divListMandados').append("<div id='detalle' class='col-xs-4'>" + data[n].estado + "</div>" );
                    $('#divListMandados').append("</div>")

                  }
                }
          });

          }else{
            // realiza consulta de productos de tienda
            //TODO: verificar si los productos de tienda no se haran como mandados, debido a que no tiene pickup en la base de datos.
            console.log("entro a producto");

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
