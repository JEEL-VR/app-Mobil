(function($){
  $(function(){

    $('.sidenav').sidenav();
    //$('.parallax').parallax();
    //$('.tabs').tabs({"swipeable": true});
    $('select').formSelect();

  }); // end of document ready
})(jQuery); // end of jQuery name space
document.addEventListener('deviceready', onDeviceReady, false);
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    let userList = {"user":"test123","user2":"test"};
    $("#loginButton").click(function(){
      inputUser=$("#user").val();
      inputPass=$("#password").val();
      if(inputUser in userList){
        if(userList[inputUser]==inputPass){
          alert("Dades correctes!!");
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
