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

var content = JSON.parse(content1);

console.log(content);

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

var it = pl(content);
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
}
function prob(){
    var element = document.getElementsByName("checkbox");
    console.log(element);
    if (element.length != 0){
        procent = 100 / content.length;
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
