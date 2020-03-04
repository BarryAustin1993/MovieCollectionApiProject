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
            
        })
        e.preventDefault();
    }
    $('#my-form').submit(addMovieToDataBase);
})
(jQuery);

function editMovie(movieId){
    var title = promptFor("What should the title be?", chars);
    var directorName = promptFor("Who is the director?", chars);
    var genre = promptFor("What should the genre be?", chars);
    
    var movie = {
        MovieId: movieId,
        Title: title,
        DirectorName: directorName,
        Genre: genre
    };

    ajax('https://localhost:44325/api/movie/' + movieId, 'put', JSON.stringify(movie),
    function(data){
        console.log("sucess?")

    })


}

function makeTable() {
    ajax('https://localhost:44325/api/movie', 'get', null, function (data) {    
    $.each(data, tableAppend)  
        });
};
        

function tableAppend(i ,movie){
var rows = "<tr>" + 
                "<td id='title'>" + movie.title + "</td>" + 
                "<td id='directorName'>" + movie.directorName + "</td>" + 
                "<td id='genre'>" + movie.genre + "</td>" +
                "<td id='edit'><button type='button' onclick = editMovie(" + movie.movieId + ")>Edit</button></td>" +
                "</tr>";
                 table.append(rows);
}

makeTable();

// function that prompts and validates user input
function promptFor(question, callback){
    do{
      var response = prompt(question);
    } while(!response || !callback(response));
    return response;
  }
  
  // helper function to pass into promptFor to validate yes/no answers
  function yesNo(input){
    return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
  }
  
  // helper function to pass in as default promptFor validation
  function chars(input){
    return true; // default validation only
  }