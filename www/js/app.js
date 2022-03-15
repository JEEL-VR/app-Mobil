$( document ).ready(function() {
    //Obtencion de cursos
    $("#s_token").text("Token: "+localStorage.getItem("sesion_token"))
    $("#usedAPI").text("API: "+localStorage.getItem("api"))
    //Obtencion de cursos con la API
    $("#llistaCursos").empty();
    $.ajax({
        method: "GET",
        url: "https://classvr-room-api.herokuapp.com/api/get_courses",
        data: {token:localStorage.getItem("sesion_token")},
        dataType: "json",
    }).done(function (data) {
        //console.log(user+" y "+pass+" y el token es: "+data);
        //alert(data);
        //console.log(data[cursos]);
        for (let curs in data){
            console.log(data[curs]);
            let newElement = $('<a href="#" class="collection-item">'+data[curs]["title"]+'</a>');
            $("#llistaCursos").append(newElement);
        }
    }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
    });
});