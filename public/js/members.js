$(document).ready(function () {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    if (data.email === "medTest2@test.com") {

      let imgDisp = $("<img>").attr({ src: "/assets/Dianne.jpg", class: "dispPhoto" });
      $("#photo").append(imgDisp);

    }
    else if (data.email === "medTest1@test.com") {
      console.log("match");
      let imgDisp = $("<img>").attr({ src: "/assets/Charles.jpg", class: "dispPhoto" });
      $("#photo").append(imgDisp);

    }





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
      location.reload();
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
      location.reload();
    })
  }


  const medList = async () => {
    const medications = await $.get("/api/medications");


    for (let i = 0; i < medications.length; i++) {


      const medName = medications[i].medicationName;
      const medTime = medications[i].timeOfDay;
      const medDose = medications[i].dosage;
      const medDesc = medications[i].description;

      let row = $("<tr>");

      let name = $("<td>").text(medName);
      let time = $("<td>").text(medTime);
      let dose = $("<td>").text(medDose);
      let desc = $("<td>").text(medDesc);
      // let edTd = $("<td>");
      // let delTd = $("<td>");

      let editBut = $("<button>").text("Edit/Delete").attr({ type: "button", class: " edDelBut btn btn-primary", "data-id": medications[i].id});

      // let deleteBut = $("<button>").text("Delete").attr("id", "deleteButton");

      // edTd.append(editBut);
      // delTd.append(deleteBut);

      row.append(name, time, dose, desc, editBut);
      row.attr("class", function () {
        return "row-data";
      })
      $("#medData").append(row);
    }
  }
  medList();

  const noteList = async () => {
    const notes = await $.get("/api/notes");


    for (let i = 0; i < notes.length; i++) {


      const noteDesc = notes[i].note;

      let noteDiv = $("<div>").text(noteDesc).attr("id", "noteDiv");
      let edNote = $("<button>").text("Edit/Delete").attr({ type: "button", class: "btn btn-primary edDelNoteBut", "data-id": notes[i].id });
      noteDiv.append(edNote);

      $("#notes").append(noteDiv);
    }
  }
  noteList();

  // for editing a medication
  $("body").on("click", ".edDelBut", async function (event) {
    const id = $(this).attr("data-id");
    const medSel = await $.get(`/api/medications/${id}`);
      
    $("#medModalEdit").modal("show");
    $("#idEd").val(medSel.id);
    $("#medicationNameEd").val(medSel.medicationName);
    $("#timeOfDayEd").val(medSel.timeOfDay);
    $("#dosageEd").val(medSel.dosage);
    $("#descriptionEd").val(medSel.description);

    $("body").on("click", "#medEdit", function(){
      console.log("clicked");
      const editMedicationData = {
        id: $("#idEd").val(),
        medicationName: $("#medicationNameEd").val(),
        timeOfDay: $("#timeOfDayEd").val(),
        dosage: $("#dosageEd").val(),
        description: $("#descriptionEd").val()
      }
      updateMeds(editMedicationData)
    })
    $("body").on("click", "#medClose", function(){      
      $("#medModalEdit").modal("hide");     
    })

    $("body").on("click", "#medDelete", function(){
      console.log("clicked");
      const deleteMedicationData = {
        id: $("#idEd").val(),
        medicationName: $("#medicationNameEd").val(),
        timeOfDay: $("#timeOfDayEd").val(),
        dosage: $("#dosageEd").val(),
        description: $("#descriptionEd").val()
      }
      console.log(deleteMedicationData);
      deleteMeds(deleteMedicationData);
    })

    


  })
  // delete medications
  function deleteMeds(deleteMedicationData){
    $.ajax({
      method: "DELETE",
      url: "api/medications",
      data: deleteMedicationData
    }).then(function(){
      location.reload();
    })

  }

  // update the meds function
  function updateMeds(editMedicationData){
    $.ajax({
      method: "PUT",
      url: "api/medications",
      data: editMedicationData
    }).then(function(){
      location.reload();
    })
  }


  $("body").on("click", ".edDelNoteBut", async function (event) {
    const id = $(this).attr("data-id");
    const noteSel = await $.get(`/api/notes/${id}`);
    $("#noteModalEdit").modal("show");
    console.log(noteSel);
    $("#noteId").val(noteSel.id);
    $("#newNoteEd").val(noteSel.note);

    $("body").on("click", "#noteCloseEd", function(){      
      $("#noteModalEdit").modal("hide");     
    })
    $("body").on("click", "#noteSaveEd", function(){      
      const editNoteData = {
        id: $("#noteId").val(),
        note: $("#newNoteEd").val()
      }    
      updateNotes(editNoteData);
    })
  })
  function updateNotes(editNoteData){
    $.ajax({
      method: "PUT",
      url: "api/notes",
      data:editNoteData
    }).then(function(){
      location.reload();
    })
  }

});
// $("#edDelBut").click(function () {
//   console.log("Delete Clicked");
  // var listItemData = $(this).parent("td").parent("tr").data("medications");
  //   var id = listItemData.id;
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/medications/" + id
  //   })
  //     .then(noteList);

// });


// $.get("/api/user_data").then(data => {
//   $(".member-name").text(data.email);
//   $(".member-name").text(data.password);
// });
