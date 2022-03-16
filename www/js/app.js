$( document ).ready(function() {
    //Mostrar datos de Debug
    $("#s_token").text("Token: "+localStorage.getItem("sesion_token"))
    $("#usedAPI").text("API: "+localStorage.getItem("api"))
    //Obtaining courses with the API 
    $("#llistaCursos").empty();
    $.ajax({
        method: "GET",
        url: localStorage.getItem("api")+"/api/get_courses",
        data: {session_token:localStorage.getItem("sesion_token")},
        dataType: "json",
    }).done(function (data) {
        //Show the curses
        for (let curs in data){
            console.log(data[curs]);
            let newElement = $('<a href="#" class="collection-item">'+data[curs]["title"]+'</a>');
            $("#llistaCursos").append(newElement);
        }
    }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
    });
});