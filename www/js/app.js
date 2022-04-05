$( document ).ready(function() {
    //Mostrar datos de Debug
    //$("#s_token").text("Token: "+localStorage.getItem("sesion_token"))
    //("#usedAPI").text("API: "+localStorage.getItem("api"))
    console.log(localStorage.getItem("sesion_token")['message']);
    //Obtaining courses with the API 
    $("#llistaCursos").empty();
    //Ajax request to show course details
    function getPin(taskID){
        return function(){
            console.log(taskID);
            $.getJSON("../jsonTest/get_courses.json", function(data){
                for (let curs in data){
                    console.log(data[curs]);
                    let newElement = $('<a href="#" class="collection-item">'+data[curs]["title"]+'</a>');
                    newElement.click(openCourse(data[curs]["_id"]));
                    $("#llistaCursos").append(newElement);
                }
            }).fail(function(){
                console.log("An error has occurred.");
            });
            $.ajax({
                method: "GET",
                url: localStorage.getItem("api")+"/api/pin_request",
                data: {session_token:localStorage.getItem("sesion_token"),VRtaskID:taskID},
                dataType: "json",
            }).done(function (data) {
                //Show the modal with the PIN
                $("#pinText").text(data);
                $('#modal1').modal();
                $('#modal1').modal('open');
            }).fail(function () {
                console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
                $('#modal1').modal();
                $('#modal1').modal('open');
                
            });
        };
    }
    function logout(){
        $.ajax({
            method: "GET",
            url: localStorage.getItem("api")+"/api/logout",
            data: {token:localStorage.getItem("sesion_token")},
            dataType: "json",
        }).done(function (data) {
            //Redirect to login page
            location.href = './index.html';
        }).fail(function () {
            console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
            
        });
        return false;
    }
    function openCourse(cID){
        return function(){
            console.log(cID);
            $.ajax({
                method: "POST",
                url: localStorage.getItem("api")+"/api/get_courses_detail",
                headers: {"Authorization":"Token "+localStorage.getItem("sesion_token")},
                data: JSON.stringify({courseID:cID}),
                dataType: "json",
            }).done(function (data) {
                console.log(data);
                //Show user elements
                $("#llista_elements").empty();
                for (let element in data["course"]["elements"]){
                    console.log(data["course"]["elements"][element]);
                    let newElement = $('<a href="#" class="collection-item avatar"><i class="material-icons circle" style="background-color: #159A9C;">folder</i>'+data["course"]["elements"][element]+'</a>');
                    $("#llista_elements").append(newElement);
                }
                //Show user tasks
                $("#llista_tasks").empty();
                for (let element in data["course"]["tasks"]){
                    console.log(data["course"]["tasks"][element]);
                    let newElement = $('<a href="#" class="collection-item avatar"><i class="material-icons circle" style="background-color: #159A9C;">format_list_bulleted</i>'+data["course"]["tasks"][element]+'</a>');
                    $("#llista_tasks").append(newElement);
                }
                //Vr tasks
                $("#llista_tasksvr").empty();
                for (let element in data["course"]["vr_tasks"]){
                    console.log(data["course"]["vr_tasks"][element]);
                    let newElement = $('<a href="#" class="collection-item avatar"><i class="material-icons circle" style="background-color: #159A9C;">format_list_bulleted</i>'+data["course"]["vr_tasks"][element]+'</a>');
                    $("#llista_tasksvr").append(newElement);
                }
                //Title and description edit to 2nd tab
                $("#course_title").text(data["title"]);
                $("#course_desc").text(data["description"]);
            }).fail(function () {
                console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
                $("#llista_elements").empty();
                $("#llista_tasks").empty();
                $("#llista_tasksvr").empty();
                $("#course_title").text("Error");
                $("#course_desc").text("No se ha podido listar los detalles del curso");
            });
        
            //Swipe to 2nd tab
            $('.tabs').tabs('select', "test-swipe-2");
        };
    }
    $.ajax({
        method: "POST",
        url: localStorage.getItem("api")+"/api/get_courses",
        headers: {"Authorization":"Token "+localStorage.getItem("sesion_token")},
        dataType: "json",
    }).done(function (data) {
        //Show the curses
        console.log(data);
        for (let curs in data["course_list"]){
            console.log(data[curs]);
            let newElement = $('<a href="#" class="collection-item">'+data["course_list"][curs]["title"]+'</a>');
            newElement.click(openCourse(data["course_list"][curs]["courseID"]));
            $("#llistaCursos").append(newElement);
        }
    }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
        let newElement = $('<h4>No se han podido listar los cursos, vuelve a iniciar sesión<h4>');
        $("#llistaCursos").append(newElement);
    });
    //Logout button assign function
    $("#logoutButton").click(logout);
    $("#logoutButtonM").click(logout);
});