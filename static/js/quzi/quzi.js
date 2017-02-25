most_recent = $(".answer_id")

var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open('GET', '/quzi/testJS/' + most_recent.attr('id') + '/', false);
request.send();

if(request.status===200){
    var modify = document.getElementById('question');
    modify.innerHTML = request.responseText;
}
