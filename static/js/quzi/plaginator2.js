most_recent = $(".answer_id")

document.getElementById("progress").innerHTML = ""

var content1 = $.ajax({
    type: "GET",
    url: "/quzi/testJS/" + most_recent.attr('id') + "/",
    dataType: "jsonp",
    success: function (data){data;},
    async: false
}).responseText;

console.log(content1);

var content_server = JSON.parse(content1);

console.log(content_server);

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

function next() {
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
    return current;
}
function previous() {
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
    return current;
}

function n(number){
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
}
var current = 0; 
answer(content_server[current]);
plaginator(content_server.length);
document.getElementById("page"+ current).classList = "active" 
