var updateFlag = false;
var prevContent = [];

$(document).ready(function () {
  tableDataExist();
});

// Add Content to Table
$("#addContent").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  if (updateFlag && checkEmpty()) {

    var replaceProduct = $("#productName").val();
    var replaceQty = $("#productQty").val();

    ReplaceCellContent(prevContent[0], replaceProduct);
    ReplaceCellContent(prevContent[1], replaceQty);

    clearInputs();
    updateFlag = false;
    prevContent = [];
  }
  else if (checkEmpty()) {
    var product = $("#productName").val();
    var qty = $("#productQty").val();
    AddData(product, qty);
  }


});


function ReplaceCellContent(find, replace) {
  try {
    $('td:contains("' + find + '")').html(replace);
  }
  catch{
    console.log("error");
  }
}

// Add Data to Table After Confirmation
function AddData(product, qty) {


  if (confirm("Proceed to Add ? ")) {

    $("#productQty").removeClass("border border-danger");
    $("#productName").removeClass("border border-danger");

    $("#tableContent").find("thead").show();

    var newRowContent =
      "<tr><td>" +
      product +
      "</td><td>" +
      qty +
      '</td>' +
      '<td><i class="fa fa-pencil fa-2x text-warning" id="editBtn"></i></td>' +
      '<td><i class="fa fa-times-circle fa-2x text-danger" id="removeBtn"></i></td>' +
      '</tr>'
      ;

    $(newRowContent).appendTo($("#tableContent"));

    clearInputs();
  }

  // Data Validation
  else {
    highlightEmpty();
    clearInputs();
  }
}

function checkEmpty() {

  if ($("#productQty").val() != "" && $("#productName").val() != "") {
    return true;

  }
  else if ($("#productQty").val() == "" || $("#productName").val() == "") {
    return false;

  }
}


// Clear Input Fields

function clearInputs() {
  $("#productQty").val("");
  $("#productName").val("");
}


$("#productName").keyup(function () {
  if ($("#productName").val().length > 0) {

    $("#productName").addClass("border border-success");
    $("#productName").removeClass("border border-danger");
  }
  else {
    $("#productName").blur();
    $("#productName").addClass("border border-danger");
    $("#productName").removeClass("border border-success");
  }
});


$("#productQty").keyup(function () {
  if ($("#productQty").val().length > 0) {
    $("#productQty").addClass("border border-success");
    $("#productQty").removeClass("border border-danger");
  }
  else {
    $("#productQty").blur();
    $("#productQty").addClass("border border-danger");
    $("#productQty").removeClass("border border-success");
  }
});


//Edit Button

$("#tableContent").on("click", "#editBtn", function (e) {
  e.stopPropagation();

  updateFlag = true;

  $("#productName").val($(this).closest("tr").find("td:nth-child(1)").text());
  $("#productQty").val($(this).closest("tr").find("td:nth-child(2)").text());

  prevContent.push($("#productName").val($(this).closest("tr").find("td:nth-child(1)").text()).val());
  prevContent.push($("#productQty").val($(this).closest("tr").find("td:nth-child(2)").text()).val());

  // console.log(prevContent["oldProduct"].val());
  // console.log(prevContent["oldQty"].val());

  //  oldProduct =  $("#productName").val($(this).closest("tr").find("td:nth-child(1)").text());
  //  oldQty =  $("#productQty").val($(this).closest("tr").find("td:nth-child(2)").text());   
});

//Remove Button Functionlity

$("#tableContent").on("click", "#removeBtn", function () {

  if (confirm("Are you sure ?")) {
    $(this).closest("tr").fadeOut(500, function () {
      $(this).remove();
      tableDataExist();
    });
  }

  // $("#productName").val($(this).closest("tr").find("td:nth-child(1)").text());
  // $("#productQty").val($(this).closest("tr").find("td:nth-child(2)").text());

  //  console.log($(this).closest("tr").find("td:nth-child(1)").text());
  //  console.log($(this).closest("tr").find("td:nth-child(2)").text());       
});

// Check Data Exist in Table
function tableDataExist() {
  var tabledata = $("#tableContent tbody tr").length;
  if (tabledata == 0) {
    $("#tableContent")
      .find("thead")
      .hide();
  }
}
