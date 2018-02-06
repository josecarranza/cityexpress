directoryRoot = "";
webservices = "https://www.cityexpress.com.sv/api/";


function doLogout(){


  //location.replace("index.html");
  $.post(webservices+"logout_app",{id_usuario:localStorage.getItem("id_usuario")},function(){
  	localStorage.removeItem("id_usuario");
  	localStorage.removeItem("nombre_usuario");
  	localStorage.removeItem("id_usuarioEncr");
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
document.addEventListener("pause", checkregid, false);

function checkregid(){

	 id_usuario = localStorage.getItem("id_usuario");
	 regid = localStorage.getItem("registrationId");


		$.post(webservices+"check_session",{'id_user':id_usuario,'regid':regid},function(data){
			if(data.error==1){
				location.replace('index.html');
				return true;
			}

		},'json');
}
