var quzi_data;
var current = 0; //текущее положение
var most_recent = $(".answer_id");

$.getJSON(
    "/quzi/testJS/" + most_recent.attr('id') + "/",
    onAjaxSuccess
);

function onAjaxSuccess(data){
    
    alert(data);
    quzi_data = data;
    answer(data[current])
}


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
}
