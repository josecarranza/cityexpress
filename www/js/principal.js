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
   // $("#divNombre").text(localStorage.getItem("nombre_usuario"));

    /* se obtienen las ordenes del usuario */

    $.ajax({
      type: 'POST',
      url: webservices + 'getListTrabajoDriver',
      data: {id: id_usuario},
      dataType: 'json',
      success: function (data) {
        if ('mensaje' in data) {
          $('#listOrdenes').html(data['mensaje'].error);
        }
        else
        {
          for (n in data){
          //  console.log(  + " - " + data[n].direccion);
          $('#listOrdenes').append("<div class='row item-orden'  onclick='viewOrder("+ data[n].id_orden +")'><div id='id_orden'  class='col-xs-12'>ORDEN <b>" + data[n].id_orden + "</b></div><div id='detalleItem'  class='col-xs-12'>" + data[n].direccion + "</div></div>");
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





  function viewOrder(orden){
    setParameter("vieworderId",orden);
    window.location = "detalle_orden.html";
  }

  /* FUNCIONES */
