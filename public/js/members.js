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
      let edNote = $("<button>").text("Edit/Delete").attr({ id: "edDelNoteBut", type: "button", class: "btn btn-primary" });
      noteDiv.append(edNote);

      $("#notes").append(noteDiv);
    }
  }
  noteList();

  // $("#edDelBut").on("click", function(){

  //   console.log("clickness");
  // })
  $("body").on("click", ".edDelBut", async function (event) {
    const id = $(this).attr("data-id");
    const bob = await $.get(`/api/medications/${id}`);
    console.log(bob)
    const rowId = event.target.parentNode.parentNode.id;
    const data = document.getElementById(rowId).querySelectorAll(".row-data");
    $("#medModalEdit").modal("show");
    $("#medicationName").val(data[1].innerHTML);
    $("#timeOfDay").val(data[2].innerHTML);
    $("#dosage").val(data[3].innerHTML);
    $("#description").val(data[4].innerHTML);
  })
  $("body").on("click", "#edDelNoteBut", function (event) {
    $("#noteModalEdit").modal("show");
    var id = $(this).data("id");
    // let selected = event.target.parentNode.parentNode.id;
    // const data = document.getElementById(selected).querySelectorAll("id");
    // let data = event.target.parentNode.getAttribute("id");
    console.log(id);
  })


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
