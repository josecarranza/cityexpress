directoryRoot = "";
webservices = "http://demo.web-informatica.info/cityexpress/api/";


function doLogout(){
  localStorage.removeItem("id_usuario");
  localStorage.removeItem("nombre_usuario");
  localStorage.removeItem("id_usuarioEncr");

  location.replace("index.html");

}

function setParameter(parameter, value){
  localStorage.setItem(parameter, value);
}

function getParameter(parameter){
    var parametro = localStorage.getItem(parameter);
return parametro;

}
