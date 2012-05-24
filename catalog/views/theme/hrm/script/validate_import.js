$(document).ready(function() {
	var geturl 			= location.href;
	var baseLocalUrl 	= geturl.substring(0, geturl.indexOf('/', 14))+'/jsm/';
	
	var validator = $("#formAdd").validate({ 
		rules: { 
			files_type: {
				required: true
			},
			userfile: {
				required: true
			}
		}, 
		
		messages: { 		
			files_type: { 
				required: " Please select data"
			},
			userfile: { 
				required: " Please insert file xls"
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	}); 
	

});