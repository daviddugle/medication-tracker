$(document).ready(function() {
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(function(data) {
//     $(".member-name").text(data.email);
//   });
// });
//this is going to pop out the modal for the note
// $("#noteAdd").on("show.bs.modal", function(){
//   console.log("click")
//   $("#newNote").focus();

$("#noteAdd").on("click", function(){
  console.log("Clicked");
  $("#noteModal").modal("show");

});
$("#medAdd").on("click", function(){
  console.log("Clicked");
  $("#medModal").modal("show");

});


})

