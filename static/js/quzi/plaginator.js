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

function prob(){
    var element = document.getElementsByName("checkbox");
    console.log(element);
    if (element.length != 0){
        var ind = 0;
        for (xer of element){
            console.log("value " + xer.value);
            console.log("checked "+ xer.checked);
            if (''+xer.checked+'' == xer.value){
                console.log("PFFFFF");
                ind = ind + 1;
            }
        }
        console.log(ind);
        if ('' + ind + '' == '' + element.length + ''){
            progress = '<div class="progress-bar progress-bar-success" style="width:' + procent + '%">'
                + '<span class="sr-only">' + procent + '% Complete (success)</span>'
                + '</div>';

            document.getElementById("progress").innerHTML += progress
        }else{
            progress = '<div class="progress-bar progress-bar-danger" style="width:' + procent + '%">'
                + '<span class="sr-only">' + procent + '% Complete (danger)</span>'
                + '</div>';

            document.getElementById("progress").innerHTML += progress
        
        }

    }

}

function progres(id, percent, classlist){
    classlist = classlist || "";
    progress = '<div class="progress-bar '+ classlist +'" id="'+ id +'" style="width:' + procent + '%">'
        + '<span class="sr-only">' + procent + '% Complete (danger)</span>'
        + '</div>';

    document.getElementById("progress").innerHTML += progress;
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

function main(){
    var content = answer()
    //рисуем прогрес бар
    procent = 100 / content_server.length;
    progres(content.question_id, procent);
}
main()

