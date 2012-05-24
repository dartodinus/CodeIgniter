$(document).ready(function() {
	var geturl 			= location.href;
	var baseLocalUrl 	= geturl.substring(0, geturl.indexOf('/', 14))+'/jsm/';
	
	var validator = $("#formAdd").validate({ 
		rules: { 
			group_name: {
				required: true,
				minlength: 3,
				maxlength: 20,
				remote: baseLocalUrl+'hrm/group/check_group'
			}
		}, 
		
		messages: { 		
			group_name: { 
				required: "Please insert group name",
				minlength: "your group name must be at least 3 characters long",
				maxlength: "please enter no more than 20 characters",
				remote: jQuery.format("group name allready exist or invalid")
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	}); 
	
	var validator = $("#formEdit").validate({ 
		rules: { 
			group_name: {
				required: true,
				minlength: 3,
				maxlength: 20,
				remote: baseLocalUrl+'hrm/group/check_group'
			}
		}, 
		
		messages: { 		
			group_name: { 
				required: "Please insert group name",
				minlength: "your group name must be at least 3 characters long",
				maxlength: "please enter no more than 20 characters",
				remote: jQuery.format("group name allready exist or invalid")
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	});
	
	

});