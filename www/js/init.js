(function($){
  $(function(){

    $('.sidenav').sidenav();
    //$('.parallax').parallax();
    $('.tabs').tabs({"swipeable": true});
    $('select').formSelect();
    $('.scrollspy').scrollSpy();
  }); // end of document ready
})(jQuery); // end of jQuery name space
document.addEventListener('deviceready', onDeviceReady, false);
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    //LoginButton onclick function
    $("#loginButton").click(function(){
      let user = $("#user").val();
      let pass = $("#password").val();
      let sToken;
      //We identify the API to be used
      let usedAPI;
      switch($("#selectAPI option:selected").val()){
          case "1":
              usedAPI="https://classvr-room-api.herokuapp.com";
              break;
          case "2":
              usedAPI="https://testAPI1.com";
              break;
          case "3":
              usedAPI="https://testAPI2.com";
              break;
      }
      //Token Obtaining
      $.ajax({
        method: "GET",
        url: "https://classvr-room-api.herokuapp.com/api/login",
        data: {username:user,password:pass},
        dataType: "json",
      }).done(function (data) {
        console.log(user+" y "+pass+" y el token es: "+data);
        //We check if the token is valid 
          sToken=data;
          if(sToken!="Unauthorized"){
            localStorage.setItem("sesion_token",sToken);
            localStorage.setItem("api",usedAPI);
            location.href = './app.html';
          }else{
            alert("ERROR: Les dades son incorrectes")
          }
      }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
        alert("ERROR: Les dades son incorrectes")
      });
      
      //Page reload prevention
      return false;
      });
}
