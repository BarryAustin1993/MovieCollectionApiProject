(function($){

function addMovieToDataBase( e ){
        var dict = {
            Title : this["title"].value,
            DirectorName: this["directorName"].value,
            Genre : this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function(data){
                $('#response pre').html(data);
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( addMovieToDataBase );


    function showAllMovies(){
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                $("#DisplayScreen").html('');
                var DIV = '';
                $.each(data, function(i, item){
                    var rows = "<tr>" +
                    "<td id = 'Title'>" + item + "</td>" +
                    "</tr";
                $("#Table").append(rows);
                });
                console.log(data);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    };


    $('#showAllMovies').click( showAllMovies );


    


    





})(jQuery);

