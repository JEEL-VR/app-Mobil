$( document ).ready(function() {
    //Mostrar datos de Debug
    //$("#s_token").text("Token: "+localStorage.getItem("sesion_token"))
    //$("#usedAPI").text("API: "+localStorage.getItem("api"))
    //Obtaining courses with the API 
    $("#llistaCursos").empty();
    //Ajax request to show course details
    function getPin(taskID){
        return function(){
            console.log(taskID);
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
                    let newElement = $('<a href="#" class="collection-item avatar"><i class="material-icons circle" style="background-color: #159A9C;">folder</i>'+data["elements"][element]["title"]+'</a>');
                    $("#llista_elements").append(newElement);
                }
                //Show user tasks
                $("#llista_tasks").empty();
                for (let element in data["tasks"]){
                    console.log(data["tasks"][element]);
                    let newElement = $('<a href="#" class="collection-item avatar"><i class="material-icons circle" style="background-color: #159A9C;">format_list_bulleted</i>'+data["tasks"][element]["title"]+'</a>');
                    $("#llista_tasks").append(newElement);
                }
                //Vr tasks
                $("#llista_tasksvr").empty();
                for (let element in data["vr_tasks"]){
                    console.log(data["vr_tasks"][element]);
                    let newElement = $('<a href="#" class="collection-item avatar"><i class="material-icons circle" style="background-color: #159A9C;">format_list_bulleted</i>'+data["vr_tasks"][element]["title"]+'</a>');
                    newElement.click(getPin(data["vr_tasks"][element]["ID"]));
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
                $("#course_desc").text("No se ha podido listar el curso");
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
    //Logout button assign function
    $("#logoutButton").click(logout);
    $("#logoutButtonM").click(logout);
});