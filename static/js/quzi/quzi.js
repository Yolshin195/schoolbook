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

function quzi_comments (procent){
    $.ajax({
        type: "GET",
        url: "/quzi/comments/" + procent + "/",
        dataType: "json",
        success: function (data){
            var comment = document.getElementById("quzi_comments")
            comment.innerHTML = data[0].fields.comment_test;
        },
    });
}

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

//Воспроизводит положение checkBOX
function checboxv(number){
    var checkbox = document.getElementsByName("checkbox");
    for (var i = 0; i < checboxvar[number].length; i++){
        checkbox[i].checked = checboxvar[number][i];
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

//плагинация переключение на произвольную страницу
function n(number){
    check(current)
    document.getElementById("page"+ number).className = "active" 
    document.getElementById("page"+ current).className = "" 
    current = number
    if (current == 0) {
        document.getElementById("previous").className = "previous disabled" 
    }
    if (current < requestJSON.length){
        document.getElementById("next").className = "next" 
    }
    if (current == requestJSON.length - 1) {
        document.getElementById("next").className = "next disabled" 
    }
    if (current > 0){
        document.getElementById("previous").className = "previous" 
    }
    render(requestJSON[current])
    if (checboxvar[current]){
        checboxv(current);
    }
}

//Блок проверки ответов
function check_answers(){
        check(current);
    var ind = 0;
    for (var i = 0; i < answerarray.length; i++){
        if (checboxvar[i]){
                ind = 0; 
            for(var j =0; j < checboxvar[i].length; j++ ){
                if(checboxvar[i][j] == requestJSON[i].answer[j].ansver_boolean){
                    ind = ind + 1;
                }
            }
            if ('' + ind + '' == '' + checboxvar[i].length + ''){
                answerarray[i] = true;
            }else{
                answerarray[i] = false;
            }
        }
        
    } 
}

// блок отрисовки ответа 
function chart(){
    check_answers();
    var chart_true = 0;
    var chart_false = 0;
    var procent = 100 / requestJSON.length;
    var progress;
    var progress_content = '<div id="quzi_comments"></div>'
        + '<div class="progress" id="progress"> </div>'
		+ '<div class="list-group" id="reply">'
		+ '</div>';
    document.getElementById("quzi_content").innerHTML = progress_content;
    var element_progress = document.getElementById("progress");
    element_progress.innerHTML = "";
    for (var i = 0; i < answerarray.length; i++){
        if (answerarray[i]){
            chart_true++; 
            progress = '<div class="progress-bar progress-bar-success" name="progress_bar" style="width:' + procent + '%">'
                + '<span class="sr-only">' + procent + '% Complete (danger)</span>'
                + '</div>';

            element_progress.innerHTML += progress;
        }else{
            chart_false++; 
            progress = '<div class="progress-bar progress-bar-danger" name="progress_bar" style="width:' + procent + '%">'
                + '<span class="sr-only">' + procent + '% Complete (danger)</span>'
                + '</div>';

            element_progress.innerHTML += progress;
        } 
    }
    var amount_true = procent * chart_true;
    switch (true){
        case amount_true >= 0 && amount_true <= 20: 
            amount_true = 20;
            break;

        case amount_true > 20 && amount_true <= 50:
            amount_true = 50;
            break;

        case amount_true > 50 && amount_true <= 70:
            amount_true = 70;
            break;

        case amount_true > 70 && amount_true <= 90:
            amount_true = 90;
            break;

        case amount_true > 90 && amount_true <= 100:
            amount_true = 100;
            break;

        default:
            amount_true = 0;
    }
	var reply = '<a href="'+ location.href 
		+'" class="alert list-group-item" onclik="start()">'
    	+ '<p class="list-group-item-text">Правильных ответов '
		+ chart_true +' из ' + requestJSON.length + '</p>'
  		+ '</a>';
    document.getElementById("reply").innerHTML = reply;
    quzi_comments(amount_true);
}
