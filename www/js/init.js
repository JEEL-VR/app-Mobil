(function($){
  $(function(){

    $('.sidenav').sidenav();
    //$('.parallax').parallax();
    $('.tabs').tabs({"swipeable": true});
    $('select').formSelect();
    

  }); // end of document ready
})(jQuery); // end of jQuery name space
document.addEventListener('deviceready', onDeviceReady, false);

//Function to get token
function getSToken(){
  let user = $("#user").val();
  let pass = $("#password").val();
  //Prueba con API
  $.ajax({
    method: "GET",
    url: "https://classvr-room-api.herokuapp.com/api/login",
    data: {username:user,password:pass},
    dataType: "json",
  }).done(function (data) {
    console.log(user+" y "+pass+" y el token es: "+data);
    //alert(data);
    token = data;
    return token;
  }).fail(function () {
    console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
  });
}
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    let userList = {"user":"test123","user2":"test"};
    $("#loginButton").click(function(){
      let user = $("#user").val();
      let pass = $("#password").val();
      let sToken;
      //Obtencion del Token
      $.ajax({
        method: "GET",
        url: "https://classvr-room-api.herokuapp.com/api/login",
        data: {username:user,password:pass},
        dataType: "json",
      }).done(function (data) {
        console.log(user+" y "+pass+" y el token es: "+data);
        //Comprobamos si el token es valido
          sToken=data;
          if(sToken!=undefined){
            let usedAPI = $("#selectAPI option:selected").val();
            localStorage.setItem("sesion_token",sToken);
            localStorage.setItem("api",usedAPI);
            location.href = './app.html';
          }else{
            alert("ERROR: Les dades son incorrectes")
          }
      }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
      });
      

      
    /*
      if(inputUser in userList){
        if(userList[inputUser]==inputPass){
          alert("Dades correctes!!");
          let usedAPI = $("#selectAPI option:selected").val();
          localStorage.setItem("sesion_token",getSToken());
          localStorage.setItem("api",usedAPI);
          
          location.href = './app.html';
        }else{
          alert("Error: Les dades introduides no son correctes");
        }
      }else{
        alert("Error: Les dades introduides no son correctes");
      }
    */
      // evitar recarrega
      return false;
      });
}
