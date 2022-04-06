(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.tabs').tabs({"swipeable": true});
    $('select').formSelect();
    $('.scrollspy').scrollSpy();
  }); // end of document ready
})(jQuery); // end of jQuery name space
document.addEventListener('deviceready', onDeviceReady, false);
//Api selector 
function otherAPIDetector(){
    switch($("#selectAPI option:selected").val()){
      case "1":
          $("#customAPI").css("visibility","hidden");
          break;
      case "2":
        $("#customAPI").css("visibility","visible");
        break;
  }
}
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    $("#selectAPI").change(otherAPIDetector);
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
              usedAPI=$("#urlAPI").val();
              break;
      }
      //Token Obtaining
      $.ajax({
        method: "GET",
        url: usedAPI+"/api/login",
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
            alert("ERROR: Los datos son incorrectos")
          }
      }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
        alert("ERROR: Los datos son incorrectos")
      });
      
      //Page reload prevention
      return false;
      });
}
