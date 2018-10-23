$('#submit').click(function(){
	
	$.ajax({
		url: "https://api.apify.com/v2/acts/FHJgED6L56Jku6jnq/runs?token=6CRi6nsTcZQWRdZKCzrPqDp85",
		type: "POST",
		data: {
				"first-name" : "Adam",
				"last-name" : "Smith",
				"status" : "Attending"
		},
		dataType: "json",
		success : function(result){console.log("success");},
		error : function(xhr, ajaxOptions, thrownError){console.log("failed to send");}
	});
	
	
	
});