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

function pl(array){
    var nextIndex = 0;

    return{
        next: function(){
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false}:
                {done: true};
    
        }    
    }
}

var it = pl(content_server);
function answer(){
// функция отрисовки страницы 
    var content = it.next().value
            

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

function prob(ob){
    var element = document.getElementsByName("checkbox");
    console.log(element);
    if (element.length != 0){
        var ind = 0;
        for (xer of element){
            if (''+xer.checked+'' == xer.value){
                ind = ind + 1;
            }
        }
        console.log(ind);
        if ('' + ind + '' == '' + element.length + ''){
            console.log(ob)    
            ob.classList += " progress-bar-success"
            return true
        }else{
            console.log(ob)    
            ob.classList += " progress-bar-danger"
            return false
        }

    }

}

function check(){
    // проверяет былли активизхирован хотябы один checkbox
    var element = document.getElementsByName("checkbox");
    var check1 = false
    if (element.length != 0) {
        for (xer of element){
            if (xer.checked){
                check1 = true;
                break;
            }
        }
    }
    return check1
}
var content_a
var id_list = 0
function main(){
    id_list++
    content_a = answer()
    //рисуем прогрес бар
    procent = 100 / content_server.length;
    progress = '<div class="progress-bar" name="progress_bar" id="'+ content_a.question_id +'" style="width:' + procent + '%">'
        + '<span class="sr-only">' + procent + '% Complete (danger)</span>'
        + '</div>';

    document.getElementById("progress").innerHTML += progress;
}
var progress_bar
function test (){
    progress_bar = document.getElementsByName("progress_bar");
    console.log(progress_bar)
    if (check()){
        prob(progress_bar[id_list - 1])
        if (main()){
            alert("тест завершон");
        }
    }else{
        var div = '<div class="alert alert-danger" role="alert" id="help1"><p>Вы не выбрали не одного варианта ответа</p></div>'; 

        document.getElementById("help").innerHTML = div;
        setTimeout(function(){
            $('#help1').remove(); 
        }, 1000);
    }
}
main()

