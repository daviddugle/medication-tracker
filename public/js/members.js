$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  // });

  $("#noteAdd").on("click", function () {
    console.log("Clicked");
    $("#noteModal").modal("show");

  });
  $("#medAdd").on("click", function () {
    console.log("Clicked");
    $("#medModal").modal("show");

  });
  $("#noteClose").on("click", function () {
    $("#noteModal").modal("hide");
  });
  $("#medClose").on("click", function () {
    $("#medModal").modal("hide");
  });
  $("#noteSave").on("click", function (event) {
    event.preventDefault();
    const newNoteData = {
      note: $("#newNote").val()
    };
    console.log(newNoteData);
    createNotes(newNoteData);
    $("#noteModal").modal("hide");
  })
  function createNotes(newNoteData) {
    $.post("/api/notes", newNoteData).then(res => {
      if (res === "ok") {
        location.reload();
      }
    })
  }
  $("#medSave").on("click", function (event) {
    event.preventDefault();
    const newMedData = {
      medicationName: $("#medicationName").val(),
      timeOfDay: $("#timeOfDay").val(),
      dosage: $("#dosage").val(),
      description: $("#description").val(),
    };
    console.log(newMedData);
    createMed(newMedData);
    $("#medModal").modal("hide");
  })
  function createMed(newMedData) {
    $.post("/api/medications", newMedData).then(res => {
      if (res === "ok") {
        location.reload();
        medList();
      }
    })
  }


  const medList = async () => {
    const medications = await $.get("/api/medications");
    console.log(medications);

    for (let i = 0; i < medications.length; i++) {
      console.log(medications[i]);

      const medName = medications[i].medicationName;
      const medTime = medications[i].timeOfDay;
      const medDose = medications[i].dosage;
      const medDesc = medications[i].description;      

      let row = $("<tr>");

      let name = $("<td>").text(medName);
      let time = $("<td>").text(medTime);
      let dose = $("<td>").text(medDose);
      let desc = $("<td>").text(medDesc);

      let editBut = $("<button>").text("Edit").attr("id", "editButton");
      let deleteBut = $("<button>").text("Delete").attr("id", "deleteButton");      

      row.append(name,time,dose,desc,editBut,deleteBut);
      $("#medData").append(row);
    }
  }
  medList();

  const noteList = async () => {
    const notes = await $.get("/api/notes");
    console.log(notes);

    for (let i = 0; i < notes.length; i++) {
      console.log(notes[i]);

      const noteDesc = notes[i].note;
      
      let noteDiv = $("<div>").text(noteDesc).attr("id","noteDiv");
      $("#notes").append(noteDiv);
    }
  }
  noteList();



});
// $.get("/api/user_data").then(data => {
//   $(".member-name").text(data.email);
//   $(".member-name").text(data.password);
// });
