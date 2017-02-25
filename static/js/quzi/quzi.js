most_recent = $(".answer_id")

var request = new XMLHttpRequest();
request.open('GET', '/quzi/testJS/' + most_recent.attr('id') + '/', false);
request.send();
if(request.status===200){
    console.log(request);
    document.writeln(request.responseText);
}
