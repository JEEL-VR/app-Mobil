$( document ).ready(function() {
    let pinButton=false;
    //Mostrar datos de Debug
    $("#s_token").text("Token: "+localStorage.getItem("sesion_token"))
    $("#usedAPI").text("API: "+localStorage.getItem("api"))
    //Obtaining courses with the API 
    $("#llistaCursos").empty();
    //Ajax request to show course details
    function getPin(taskID){
        return function(){
            //Pin request
            $.ajax({
                method: "GET",
                url: localStorage.getItem("api")+"/api/pin_request",
                data: {session_token:localStorage.getItem("sesion_token"),VRtaskID:taskID},
                dataType: "json",
            }).done(function (data) {
                //Show the modal with the PIN
                let pinTitle= $('<br><h4>Su PIN es:</h4>');
                let pin = $('<p id="pinText">'+data+'</p>');
                $("#pin").append(pinTitle)
                $("#pin").append(pin)
                $("#getPIN").addClass('disabled');
            }).fail(function () {
                console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
                let pinTitle= $('<br><h4>PIN:</h4>');
                let pin = $('<p id="pinText">Error al obtener el PIN, vuelve a iniciar sesión</p>');
                $("#pin").append(pinTitle)
                $("#pin").append(pin)
                $("#getPIN").addClass('disabled');
            });
        };
    }
    function getQualifications(taskID,cID){
        return function(){
            console.log(taskID);
            //Empty all results
            $("#qualifications").empty();
            $("#pin").empty();
            $("#getPIN").removeClass('disabled');//Enable pin button
            //Get user qualifications
            $.ajax({
                method: "GET",
                url: localStorage.getItem("api")+"/api/get_course_details",
                data: {session_token:localStorage.getItem("sesion_token"),courseID:cID},
                dataType: "json",
            }).done(function (data) {
                let trys=1;
                let haveTasks=false;
                //Show the modal with the PIN
                
                for (let element in data["vr_tasks"]){
                    for(let completion in data["vr_tasks"][element]["completions"]){
                        if(data["vr_tasks"][element]["completions"][completion]!=null){
                            console.log(data["vr_tasks"][element]["completions"][completion]);
                            let tryText = $('<h5>Intento '+trys+'</h5>');
                            let passedI = $('<h6>Ejercicios correctos: '+data["vr_tasks"][element]["completions"][completion]["autograde"]["passed_items"]+'</h6>');
                            let failedI = $('<h6>Ejercicios incorrectos: '+data["vr_tasks"][element]["completions"][completion]["autograde"]["failed_items"]+'</h6>');
                            let score = $('<h6>Puntuación: '+data["vr_tasks"][element]["completions"][completion]["grade"]+'</h6>');
                            $("#qualifications").append(tryText);
                            $("#qualifications").append(passedI);
                            $("#qualifications").append(failedI);
                            $("#qualifications").append(score);
                            trys++;
                            haveTasks=true;
                        }
                    }
                }
                if(haveTasks==false){
                    let errorTask = $('<h6>No se ha completado ninguna tarea</h6>');
                    $("#qualifications").append(errorTask);
                }
                $('#modal1').modal();
                $('#modal1').modal('open');
            }).fail(function () {
                console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
                let error = $('<p id="qualText">No hay qualificaciones disponibles.</p>');
                $("#qualifications").append(error);
                $('#modal1').modal();
                $('#modal1').modal('open');
                
            });
            //Prevention of adding multiple events to the button
            if (pinButton==false){
                $('#getPIN').click(getPin(taskID));
                pinButton=true;
            }
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
                console.log(cID)
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
                    newElement.click(getQualifications(data["vr_tasks"][element]["ID"],cID));
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
                $("#course_desc").text("No se ha podido listar el curso, vuelve a iniciar sesión");
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
        let newElement = $('<h4>No se ha podido obtener los cursos, vuelve a iniciar sesión.</h4>');
        $("#llistaCursos").append(newElement);
    });
    //Logout button assign function
    $("#logoutButton").click(logout);
    $("#logoutButtonM").click(logout);
});