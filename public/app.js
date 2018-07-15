$(document).on("submit", "#frmSearch", function() {
  window.location = 'http://www.google.com/search?q=site:www.huffingtonpost.com ' + document.getElementById('txtSearch').value;
  return false;
});

$(document).on("click", "#show", function() {
  $("#articles").empty();
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<img src='" + data[i].img + "'><b>" + data[i].title + "</b>" + "<button class='btn btn-primary' id='saveb' type='button' align='right' value='" + data[i]._id + "'>Save</button>" + "<br />" + data[i].description + "</p>" + "<a href=" + data[i].link + ">Read Article</a>");
  }

    $(document).on("click", "#saveb", function() {
      // Grab the id associated with the article from the submit button
      var thisId = $(this).val();
      console.log(thisId);
      // Run a POST request to change the note, using what's entered in the inputs
      $.ajax({
        method: "POST",
        url: "/save/" + thisId,
        // data: {
        //   // Value taken from title input
        //   title: $("#titleinput").val(),
        //   // Value taken from note textarea
        //   body: $("#bodyinput").val()
        // }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
          // Empty the notes section
          // $("#notes").empty();
        });
    
      // Also, remove the values entered in the input and textarea for note entry
      // $("#titleinput").val("");
      // $("#bodyinput").val("");
    });

  

  });
});

$(document).on("click", "#saved", function() {
  $("#articles").empty();
  $.getJSON("/saved", function(data) {
      // For each one
      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<img src='" + data[i].img + "'><b>" + data[i].title + "</b>" + "<button class='btn btn-danger' type='button' id='removeb' align='right' value='" + data[i]._id + "'>Remove</button>" + "<br />" + data[i].description + "</p>" + "<a href=" + data[i].link + ">Read Article</a>");
      }

      $(document).on("click", "#removeb", function() {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).val();
      
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
          method: "POST",
          url: "/remove/" + thisId,
          // data: {
          //   // Value taken from title input
          //   title: $("#titleinput").val(),
          //   // Value taken from note textarea
          //   body: $("#bodyinput").val()
          // }
        })
          // With that done
          .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            // $("#notes").empty();
          });
      
        // Also, remove the values entered in the input and textarea for note entry
        // $("#titleinput").val("");
        // $("#bodyinput").val("");
      });


    });
  });

  $(document).on("click", "b", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<h4>Note Title</h4>" + "<input id='titleinput' name='title' >" + "</br>" + "<br>");
        // A textarea to add a new note body
        $("#notes").append("<h4>Note Text</h4>" + "<textarea id='bodyinput' name='body'></textarea>" + "</br>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button class='btn btn-success' data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  $(document).on("click", "#clear", function() {
    // Empty the notes from the note section
    $("#articles").empty();
  });