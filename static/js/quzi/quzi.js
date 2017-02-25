most_recent = $(".answer_id")
//текущее положение
var current = 0; 
//инициализация ммасиива ответов
var answerarray = [];
var checboxvar = [];
var request;
var requestJSON;

function render (content){
    if (content){
        var question =  document.getElementById("question");
        question.innerHTML = content.question_content;
        var answers = document.getElementById("answer");
        answers.innerHTML = "";
        for (var fields = 0; fields < content.answer.length; fields++){
            answers.innerHTML += '<tr>'
                + '<td style="width: 30px;" ><label>'
                + '<input type="checkbox" name="checkbox" value="' + content.answer[fields].ansver_boolean +'">'
                + '</label></td>'
                + '<td>' + content.answer[fields].ansver_content + '</td>'
                + '</tr>';
        }
    }
}

function plaginator(length){
    var pager = document.getElementById("pager");
    pager.innerHTML = '<li class="previous disabled" id="previous">'
        + '<a role="button" onclick="previous()">&laquo;</a>'
        + '</li>';
    for(var number = 0; number < length; number++){
        pager.innerHTML += '<li id="page'+ number +'">'
            + '<a role="button"  onclick="n('+ number+')">'
            + (number + 1) 
            +'</a></li>';
    }
    pager.innerHTML += '<li class="next" id="next">'
        + '<a role="button" onclick="next()">&raquo;</a>'
        + '</li>'
}

// формирование ajax запроса
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open('GET', '/quzi/testJS/' + most_recent.attr('id') + '/');
request.onreadystatechange = function(){
    if((request.readyState===4) && (request.status===200)){
        requestJSON = JSON.parse(request.responseText);
        render(requestJSON[current]);
        plaginator(requestJSON.length);
        var pagenumber = document.getElementById("page"+ current);
        pagenumber.className = "active";
        for (var i = 0; i < requestJSON.length; i++){
            answerarray[i] = false;
        }
        
    }
}
request.send();

//Блок считывает и запоминает положение checkbox
function check(number){
    // проверяет былли активизхирован хотябы один checkbox
    var checkbox = document.getElementsByName("checkbox");
    checboxvar[number] = [];
    if (checkbox.length) {
        for (var i = 0; i < checkbox.length; i++){
            checboxvar[number][i] = checkbox[i].checked;
        }
    }
}

//Плагинация следующий вопрос
function next() {
    check(current)
    if (current < requestJSON.length - 1){
        current++;
        render(requestJSON[current]);
    }
    if (current == requestJSON.length - 1) {
        document.getElementById("next").className = "next disabled" 
    }
    if (current > 0){
        document.getElementById("previous").className = "previous" 
    }
    document.getElementById("page"+ current).className = "active" 
    document.getElementById("page"+ (current-1)).className = "" 
    //render(requestJSON[current])
    if (checboxvar[current]){
        checboxv(current);
    }
    return current;
}

//Плагинация вернутся на один вопрос назад
function previous() {
    check(current)
    if (current != 0 ){
        current--;
        render(requestJSON[current]);
    }
    if (current == 0) {
        document.getElementById("previous").className = "previous disabled" 
    }
    if (current < requestJSON.length){
        document.getElementById("next").className = "next" 
    }
    document.getElementById("page"+ current).className = "active" 
    document.getElementById("page"+ (current+1)).className = "" 
    //render(requestJSON[current])
    if (checboxvar[current]){
        checboxv(current);
    }
    return current;
}
