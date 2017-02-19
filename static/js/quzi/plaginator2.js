most_recent = $(".answer_id")

//контент очищаем прогрес бар
document.getElementById("progress").innerHTML = ""

//запрашиваем данные с сервера
var content1 = $.ajax({
    type: "GET",
    url: "/quzi/testJS/" + most_recent.attr('id') + "/",
    dataType: "jsonp",
    success: function (data){data;},
    async: false
}).responseText;

//выводим ответ в консоль
console.log(content1);

//парсим ответ
var content_server = JSON.parse(content1);

console.log(content_server);

//контент генерация и отрисовка html вопросса и ответов
function answer(content){
// функция отрисовки страницы 

    if (content){
        document.getElementById("question").innerHTML = content.question_content
        document.getElementById("answer").innerHTML = ""
        for (fields of content.answer){ 
            var answer = '<tr>'
                + '<td style="width: 30px;" ><label>'
                + '<input type="checkbox" name="checkbox" value="' + fields.ansver_boolean +'">'
                + '</label></td>'
                + '<td>' + fields.ansver_content + '</td>'
                + '</tr>';
            document.getElementById("answer").innerHTML += answer      
        }
    }
    else{
         alert("тест пройден")
    }
    return content
}

//плагинатор генерация и отрисовка html
function plaginator(length){
    var element = '<li class="previous disabled" id="previous"><a role="button" onclick="previous()">&laquo;</a></li>';
    document.getElementById("pager").innerHTML = element 
    for(var number = 0; number < length; number++){
        element = '<li id="page'+ number +'"><a role="button"  onclick="n('+ number+')">'+ (number + 1) +'</a></li>';
        document.getElementById("pager").innerHTML += element 
    }
    element = '<li class="next" id="next"><a role="button" onclick="next()">&raquo;</a></li>'
    document.getElementById("pager").innerHTML += element 
}

//Плагинация следующий вопрос
function next() {
    check(current)
    if (current < content_server.length - 1){
        current++;
        answer(content_server[current]);
    }
    if (current == content_server.length - 1) {
        document.getElementById("next").classList = "next disabled" 
    }
    if (current > 0){
        document.getElementById("previous").classList = "previous" 
    }
    document.getElementById("page"+ current).classList = "active" 
    document.getElementById("page"+ (current-1)).classList = "" 
    answer(content_server[current])
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
        answer(content_server[current]);
    }
    if (current == 0) {
        document.getElementById("previous").classList = "previous disabled" 
    }
    if (current < content_server.length){
        document.getElementById("next").classList = "next" 
    }
    document.getElementById("page"+ current).classList = "active" 
    document.getElementById("page"+ (current+1)).classList = "" 
    answer(content_server[current])
    if (checboxvar[current]){
        checboxv(current);
    }
    return current;
}

//плагинация переключение на произвольную страницу
function n(number){
    check(current)
    document.getElementById("page"+ number).classList = "active" 
    document.getElementById("page"+ current).classList = "" 
    current = number
    if (current == 0) {
        document.getElementById("previous").classList = "previous disabled" 
    }
    if (current < content_server.length){
        document.getElementById("next").classList = "next" 
    }
    if (current == content_server.length - 1) {
        document.getElementById("next").classList = "next disabled" 
    }
    if (current > 0){
        document.getElementById("previous").classList = "previous" 
    }
    answer(content_server[current])
    if (checboxvar[current]){
        checboxv(current);
    }
}

//Блок считывает и запоминает положение checkbox
function check(number){
    // проверяет былли активизхирован хотябы один checkbox
    var element = document.getElementsByName("checkbox");
    checboxvar[number] = [];
    var i = 0;
    if (element.length != 0) {
        for (xer of element){
            checboxvar[number][i++] = xer.checked;
        }
    }
}

//Воспроизводит положение checkBOX
function checboxv(number){
    var element = document.getElementsByName("checkbox");
    for (var i = 0; i < checboxvar[number].length; i++){
        element[i].checked = checboxvar[number][i];
    } 
}

//Блок проверки ответов
function quzi(){
    check(current);
    var ind = 0;
    for (var i = 0; i < answerarray.length; i++){
        if (checboxvar[i]){
            ind = 0; 
            for(var j =0; j < checboxvar[i].length; j++ ){
                if(checboxvar[i][j] == content_server[i].answer[j].ansver_boolean){
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

// блок отрисовки диаграммы 
function chart(){
    quzi();
    var chart_true = 0;
    var chart_false = 0;
    var procent = 100 / content_server.length;
    var progress;
    document.getElementById("progress").innerHTML = "";
    for (variant of answerarray){
        if (variant){
            chart_true++; 
            progress = '<div class="progress-bar progress-bar-success" name="progress_bar" style="width:' + procent + '%">'
                + '<span class="sr-only">' + procent + '% Complete (danger)</span>'
                + '</div>';

            document.getElementById("progress").innerHTML += progress;
        }else{
            chart_false++; 
            progress = '<div class="progress-bar progress-bar-danger" name="progress_bar" style="width:' + procent + '%">'
                + '<span class="sr-only">' + procent + '% Complete (danger)</span>'
                + '</div>';

            document.getElementById("progress").innerHTML += progress;
        } 
    }
}

//текущее положение
var current = 0; 
//инициализация ммасиива ответов
var answerarray = []
for (var i = 0; i < content_server.length; i++){
    answerarray[i] = false;
}
var checboxvar = []
//выводим превый вопрос
answer(content_server[current]);
plaginator(content_server.length);
document.getElementById("page"+ current).classList = "active" 
