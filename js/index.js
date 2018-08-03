$( document ).ready(function() { 
   displayHeader();
});

// Add Content to Table

$("#addContent").on("click",function(e){ 
  e.preventDefault()
  var product =$("#productName").val();
  var qty =$("#productQty").val();

 // Data Validation
if (product != "" && qty != "")
  {
    $("#productQty").removeClass("border border-danger");
    $("#productName").removeClass("border border-danger");
    
    $("#tableContent").find("thead").show();
    $(newRowContent).appendTo($("#tableContent"));
    var newRowContent =  "<tr><td>" + product + "</td><td>" + qty + "</td><td><button>Remove</button></td></tr>";
 
    $(newRowContent).appendTo($("#tableContent"));
    
    clearInputs();
  }
  
  // Data Validation
  else if(product=="" && qty!="")
    {
     $("#productName").addClass("border border-danger");
     clearInputs();
    }
 
   // Data Validation
  else if(qty=="" && product!="") {
     $("#productQty").val("");
     $("#productName").val("");
     $("#productQty").addClass("border border-danger");
    }

  // Data Validation
  else{
     $("#productQty").addClass("border border-danger");
     $("#productName").addClass("border border-danger");
     clearInputs();
  }
});

// Clear Input Fields

  function clearInputs(){
    $("#productQty").val("");
    $("#productName").val("");
  }

//Remove Button Functionlity

$("#tableContent").on('click', 'button', function () {
    $(this).parent().parent().remove();
    displayHeader();
});
 
// Check Data Exist in Table 
   function displayHeader(){
   var tabledata = $("#tableContent tbody tr").length;
     if( tabledata == 0)
     {
        $("#tableContent").find("thead").hide();
     }
 }