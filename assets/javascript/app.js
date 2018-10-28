
// Declaring Variables some are for ease of use (key)0
let key = "X1gSRmYDFMp8L5GyL1lSRpk0NZkvl5hL";
let topic = ["Wesley Snipes", "Arnold Schwarzenegger","Jean Claude Van Dam"];
let limit = 10;
let userInput = "";

//  Function to display the gifs TODO add a button appended at the end to load more gifs
function displayGif(){
  let actor = $(this).attr('data-name');
  let queryURL = "https://api.giphy.com/v1/gifs/search?q="+actor+"&api_key="+key+"&limit="+limit;

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
    // console.log(results); //this was in for testing purposes
  });
}

// on-click function to play or pause gif's
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

// display button function that clears the div with all buttons then displays them
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

// add button on-click listener to add new user inputted buttons
$('#addBtn').on('click', function(event){
  event.preventDefault();
  userInput = $('#usrIn').val().trim();
  $('#usrIn').val('');
  console.log(userInput);
  topic.push(userInput);
  disButtons();
});

// using an on click for the document since all the content is dynamic
$(document).on("click", ".actor", displayGif);
// running the button display on page load.
disButtons();
