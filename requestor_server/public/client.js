// client-side js
// run by the browser each time your view template is loaded

$(document).ready(function() {  
  let message = "message";
  
  // get private key
  let privateKey = prompt("Please enter your private key:");
  console.log(privateKey);
  
  let ecc = window.eosjs_ecc;
  if(privateKey == null) {
    // no private key
    console.log("Cancelled");
    
    $('#loader').hide();
    $('#error').text("Cancelled");
  } else if(!ecc.isValidPrivate(privateKey)) {
    // invalid private key
    console.log("Invalid private key");
    
    $('#loader').hide();
    $('#error').text("Invalid private key");
  } else {
    // valid private key
    console.log("Valid private key");    
    
    $('#loader').hide();
    $('#error').text("Valid private key");
    
    // sign message with private key using eosjs-ecc
    try {  
      let signature = ecc.sign(message, privateKey);
      console.log(signature);

      // send signature to uclh server
      fetch('/verify', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({signature: signature}), // body data type must match "Content-Type" header
      })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        console.log(json);
        return json.result;
      })
      .then(result => {
        if(result) {
          // show upload form
          $('#loader').hide();
          $('#error').text("Please upload your file");
          $('#form').show();
        } else {
          // hide upload form
          $('#loader').hide();
          $('#error').text("");
        }
      }); 
    } catch(error) {
      console.log(error);
      // TODO: error - update UI      
      $('#loader').hide();
      $('#error').text(error);
    }
  }
});