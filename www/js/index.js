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
         // console.log("device ready, start making you custom calls!");


         var push = PushNotification.init({
          android: {
            senderID: 172772854626
          },
          
        });

         push.on('registration', function(data) {
          console.log("registration event");
        //here is your registration id

        localStorage.setItem("registrationId", data.registrationId);
        validar_sesion_ready();

      });

       }


     };




     /* se dispara en lugar de onDeviceReady */
     //$(document).ready(function(){
      function validar_sesion_ready(){


        var id_usuario = localStorage.getItem("id_usuario");
        var regid = localStorage.getItem("registrationId");

        if (id_usuario > 0){
          $.post(webservices+"check_session",{'id_user':id_usuario,'regid':regid},function(data){
            if(data.error==0){
             location.replace('principal.html');
             return true;
           }

         },'json');




        }

        /* se presiona el botón de login*/
        $('#login').click(function(){
          doLogin($('#username').val(), $('#password').val());
        });

        var $loading = $('#loadingDiv').hide();
        $(document).ajaxStart(function () {
          $loading.show();
        }).ajaxStop(function () {
          $loading.hide();
        });

      }
    //});

    /* FUNCIONES */



    function doLogin(usr, pwd){

// se valida si el usuario ya esta logeado
var id_usuario = localStorage.getItem("id_usuario");
var regid = localStorage.getItem("registrationId");


/*if (id_usuario > 0){
  //location.replace('principal.html');
  location.href="principal.html";
  return true;
}
else{*/
  $.ajax({
    type: 'POST',
    url: webservices + 'validate_user',
    data: { action: 'getUser',username: usr, password:pwd,registrationId:regid},
    dataType: 'json',
    success: function (data) {
     if (data.id_usuario > 0){
       localStorage.setItem("id_usuario", data.id_usuario);
       localStorage.setItem("nombre_usuario", data.nombres + " " + data.apellidos);
       localStorage.setItem("id_usuarioEncr", data.keyData);
       location.href="principal.html";
       return true;
     }else{
       alert("Usuario o contraeña incorrecto, intente nuevamente");
       return false;
     }
          // console.log(dataArray);
        }

      });




}
