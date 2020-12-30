$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
// });

$("#noteAdd").on("click", function(){
  console.log("Clicked");
  $("#noteModal").modal("show");

});
$("#medAdd").on("click", function(){
  console.log("Clicked");
  $("#medModal").modal("show");

});
$("#noteClose").on("click", function(){
  $("#noteModal").modal("hide");
});
$("#medClose").on("click", function(){
  $("#medModal").modal("hide");
});
$("#noteSave").on("click", function(event){
  event.preventDefault();
  const newNoteData = {
    note: $("#newNote").val()
  };
  console.log(newNoteData);
  createNotes(newNoteData);
  $("#noteModal").modal("hide");
})
function createNotes(newNoteData){
  $.post("/api/notes", newNoteData).then(res =>{
    if(res === "ok"){
      location.reload();
    }
  })
}
$("#medSave").on("click", function(event){
  event.preventDefault();
  const newMedData = {
    medicationName: $("#medName").val(),
    timeOfDay: $("medTime").val(),
    dosage: $("medDose").val(),
    description: $("medDesc").val(),
  };
  createMed(newMedData);
  $("#medModal").modal("hide");
})
function createMed(newMedData){
  $.post("/api/medications", newMedData).then(res =>{
    if(res === "ok"){
      location.reload();
    }
  })
}


});
// $.get("/api/user_data").then(data => {
//   $(".member-name").text(data.email);
//   $(".member-name").text(data.password);
// });
