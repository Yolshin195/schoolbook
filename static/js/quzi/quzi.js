most_recent = $(".answer_id")
//текущее положение
var current = 0; 
//инициализация ммасиива ответов
var answerarray = [];
var checboxvar = [];
var request;
var requestJSON;

function main (content){
    if (content){
        alert(content); 
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

if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open('GET', '/quzi/testJS/' + most_recent.attr('id') + '/');
request.onreadystatechange = function(){
    if((request.readyState===4) && (request.status===200)){
        requestJSON = JSON.parse(request.responseText);
        alert(requestJSON);
        main(requestJSON[current]);
        
    }
}
request.send();

