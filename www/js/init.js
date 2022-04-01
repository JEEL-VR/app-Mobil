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
              usedAPI="http://classroomvr.herokuapp.com";
              break;
          case "2":
              usedAPI=$("#urlAPI").val();
              break;
      }
      //Token Obtaining
      $.ajax({
        method: "POST",
        url: usedAPI+"/api/login",
        data: JSON.stringify({email:user,password:pass}),
        dataType: "json",
        contentType: "application/json",
      }).done(function (data) {
        console.log(user+" y "+pass+" y el token es: "+data);
        //Check if the ajax call returns a error
        if(Object.keys(data).indexOf("message") > -1){
          alert("ERROR: "+data["message"]);
        }else{
          //We check if the token is valid 
          sToken=data['session_token'];
          console.log(data);
          localStorage.setItem("sesion_token",sToken);
          localStorage.setItem("api",usedAPI);
          location.href = './app.html';
        }
      }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
      });
      
      //Page reload prevention
      return false;
      });
}
