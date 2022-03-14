$( document ).ready(function() {
    let cursos = [{"courseID": "31", "institutionID": "83", "title": "Movilizaciones 1r curso Grupo A", "description":"1r curso Grupo A de auxiliar de enfermería…"},{"courseID": "32", "institutionID": "83", "title": "Movilizaciones 1r curso Grupo B", "description":"1r curso Grupo B de auxiliar de enfermería…"}]
    $("#llistaCursos").empty();
    for (let curs in cursos){
        let newElement = $('<a href="#" class="collection-item">'+cursos[curs]["title"]+'</a>');
        $("#llistaCursos").append(newElement);
    }
});