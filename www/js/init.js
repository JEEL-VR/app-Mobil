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
  return "ffi48u8d8fjs8f438jvkk";
}
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    let userList = {"user":"test123","user2":"test"};
    $("#loginButton").click(function(){
      inputUser=$("#user").val();
      inputPass=$("#password").val();
      //Prueba con API
      $.ajax({
        method: "GET",
        url: "https://classvr-room-api.herokuapp.com/api/login",
        data: {username:"joserosillo",password:"JoseRosillo"},
        dataType: "json",
      }).done(function (data) {
        for(let item in data) {
          alert(data[item]);
        };
      }).fail(function () {
        alert("ERROR");
      });

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
      // evitar recarrega
      return false;
      });
}
