function executeAjaxCall(){

    // I save into variables each part of the form
    var formUsername = document.forms["myForm"]["username"].value;
    var formCountry  = document.forms["myForm"]["country"].value;
    var formMessage = document.forms["myForm"]["message"].value;


    var data = {};
					data.username = formUsername;
					data.country = formCountry;
                    data.message = formMessage;

    console.log("Trying to send this json: "+JSON.stringify(data));

					$.ajax({
						type: 'POST',
                        data: data,
                        url: '/newmessageajax',						
                        success: function(data) {
                            console.log('success');

                            //I put proper style to the DIV where I'm going to put the response, below the form.
                            document.getElementById("newGuestbook").style.marginLeft = "450px";
                            document.getElementById("newGuestbook").style.marginRight = "auto";
                            document.getElementById("newGuestbook").style.marginTop = "800px";
                            document.getElementById("newGuestbook").style.textAlign = "center"; 
                            document.getElementById("newGuestbook").innerHTML = data;

                        },
                        error: function() {
                            alert('Error occured while trying to do Ajax call');
                        }
                    });

return false;

}