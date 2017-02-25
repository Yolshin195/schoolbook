var quzi_data;
var most_recent = $(".answer_id");

$.getJSON(
    "/quzi/testJS/" + most_recent.attr('id') + "/",
    onAjaxSuccess
);

function onAjaxSuccess(data){
    alert(data);
}

