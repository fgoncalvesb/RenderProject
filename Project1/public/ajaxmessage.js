function executeAjaxCall(){

    // I save into variables each part of the form
    var formUsername = document.forms["myForm"]["username"].value;
    var formCountry  = document.forms["myForm"]["country"].value;
    var formMessage = document.forms["myForm"]["message"].value;


    var data = {};
					data.username = formUsername;
					data.country = formCountry;
                    data.message = formMessage;

    console.log(JSON.stringify(data));

					$.ajax({
						type: 'POST',
                        data: data,
                        url: '/newmessage',						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });

return false;

}