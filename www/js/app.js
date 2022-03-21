$( document ).ready(function() {
    //Mostrar datos de Debug
    $("#s_token").text("Token: "+localStorage.getItem("sesion_token"))
    $("#usedAPI").text("API: "+localStorage.getItem("api"))
    //Obtaining courses with the API 
    $("#llistaCursos").empty();
    //Ajax request to show course details
    function openCourse(cID){
        return function(){
            alert("Siqueva");
            $.ajax({
                method: "GET",
                url: localStorage.getItem("api")+"/api/get_course_details",
                data: {session_token:localStorage.getItem("sesion_token"),courseID:cID},
                dataType: "json",
            }).done(function (data) {
                //Show user elements
                $("#llista_elements").empty();
                for (let element in data["elements"]){
                    console.log(data["elements"][element]);
                    let newElement = $('<a href="#" class="collection-item avatar"><i class="material-icons circle green">folder</i>'+data["elements"][element]["title"]+'</a>');
                    $("#llista_elements").append(newElement);
                }
                //Show user tasks
                $("#llista_tasks").empty();
                for (let element in data["tasks"]){
                    console.log(data["tasks"][element]);
                    let newElement = $('<a href="#" class="collection-item avatar"><i class="material-icons circle red">format_list_bulleted</i>'+data["tasks"][element]["title"]+'</a>');
                    $("#llista_tasks").append(newElement);
                }
            }).fail(function () {
                console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
            });
            //Swipe to 2nd tab
            $('.tabs').tabs('select', "test-swipe-2");
        };
    }
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
            newElement.click(openCourse(data[curs]["_id"]));
            $("#llistaCursos").append(newElement);
        }
    }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
    });
});