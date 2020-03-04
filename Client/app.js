var table = $("#movieTable");

function ajax(url, type, info, htmlMethod) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: type,
        contentType: 'application/json',
        data: info,
        success: htmlMethod,
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

(function ($) {
    function addMovieToDataBase(e) {
        var movie = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            DirectorName: this["directorName"].value
        };
        ajax('https://localhost:44325/api/movie', 'post', JSON.stringify(movie),
        function(data){
            console.log(data);
            $('#response pre').html(data);
            });
        e.preventDefault();
    }
    $('#my-form').submit(addMovieToDataBase);
})
(jQuery);


function makeTable() {
    ajax('https://localhost:44325/api/movie', 'get', null, function (data) {    
    $.each(data, tableAppend)  
        });
};
        

function tableAppend(i ,value){

    console.log(value);
    var rows = "<tr>" + 
                "<td id='title'>" + value.title + "</td>" + 
                "<td id='directorName'>" + value.directorName + "</td>" + 
                "<td id='genre'>" + value.genre + "</td>" +
                "<td id='edit'><button type='submit'>Submit</button></td>" +
                "</tr>";
                 table.append(rows);
}

makeTable();
