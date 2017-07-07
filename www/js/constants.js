directoryRoot = "";
webservices = "http://demo.web-informatica.info/cityexpress2/api/";


function doLogout(){
  localStorage.removeItem("id_usuario");
  localStorage.removeItem("nombre_usuario");
  localStorage.removeItem("id_usuarioEncr");

  //location.replace("index.html");
  $.post(webservices+"logout_app",{id_usuario:localStorage.getItem("id_usuario")},function(){
  	location.href="index.html";
  });
  

}

function setParameter(parameter, value){
  localStorage.setItem(parameter, value);
}

function getParameter(parameter){
    var parametro = localStorage.getItem(parameter);
return parametro;

}
