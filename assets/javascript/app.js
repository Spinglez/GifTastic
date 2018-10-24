
let key = "X1gSRmYDFMp8L5GyL1lSRpk0NZkvl5hL";
let topic = ["Wesley Snipes", "Arnold Schwarzenegger","Robin Williams"];
let limit = 10;

function displayGif(){
  let actor = $(this).attr('data-name');
  let queryURL = "http://api.giphy.com/v1/gifs/search?q="+actor+"&api_key="+key+"&limit="+limit;

  $('#gifDis').empty();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    let results = response.data;

    for (var i = 0; i < results.length; i++) {
    let displayDiv = $('<div>');
    let p = $('<p>')
    p.text("Rated: " + results[i].rating);
    let img = $("<img>");
    img.attr('src', results[i].images.fixed_width_still.url);
    img.attr("data-still", results[i].images.fixed_width_still.url);
    img.attr("data-animate", results[i].images.fixed_width.url);
    img.attr("data-state", 'still');
    img.last().addClass('gifGo');
    displayDiv.append(img);
    displayDiv.append(p);
    $('#gifDis').prepend(displayDiv);
    }
    console.log(results);
  });
}

$(document).on('click','.gifGo', function(){
  let state = $(this).attr('data-state');

  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
    }else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }

});


function disButtons() {
  $('#btnDis').empty();

  for (var i = 0; i < topic.length; i++) {
    let b = $('<btn>');
    b.attr("data-name", topic[i]).attr('class', 'btn');
    b.last().addClass('actor btn-info mr-2 mt-2 mb-2');
    b.text(topic[i]);
    $('#btnDis').append(b);
  }
}

$('#addBtn').on('click', function(event){
  event.preventDefault();
  let userInput = $('<input>').val().trim();
  console.log(userInput);
  // topic.push(userInput);
  // disButtons();
});

$(document).on("click", ".actor", displayGif);
disButtons();
