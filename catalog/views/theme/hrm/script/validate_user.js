$(document).ready(function() {
	var geturl 			= location.href;
	var baseLocalUrl 	= geturl.substring(0, geturl.indexOf('/', 14))+'/jsm/';
	
	var validator = $("#formAdd").validate({ 
		rules: { 
			name: {
				required: true
			},
			username: {
				required: true,
				minlength: 3,
				maxlength: 20,
				remote: baseLocalUrl+'hrm/user/check_username'
			},
			password1: {
				required: true,
				minlength: 5,
				maxlength: 15
			},
			password2: {
				minlength: 5,
				equalTo: "#password1"
			},
			email:{
				email: true
			},
			group_id: {
				required: true
			}
		}, 
		
		messages: { 		
			name: { 
				required: "please insert name"
			},
			username: { 
				required: "please insert username",
				minlength: "your username must be at least 3 characters long",
				maxlength: "please enter no more than 20 characters",
				remote: jQuery.format(" username allready exist")
			},
			password1: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				maxlength: "Please enter no more than 15 characters"
			},
			password2: {
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: { 
				required: "please insert valid email"
			},
			group_id: { 
				required: "please select group"
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	}); 
	
	var validator = $("#formEdit").validate({ 
		rules: { 
			name: {
				required: true
			},
			password1: {
				required: true,
				minlength: 5,
				maxlength: 15
			},
			password2: {
				minlength: 5,
				equalTo: "#password1"
			},
			email:{
				email: true
			},
			group_id: {
				required: true
			}
		}, 
		
		messages: { 		
			name: { 
				required: "please insert name"
			},
			password1: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				maxlength: "Please enter no more than 15 characters"
			},
			password2: {
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: { 
				required: "please insert valid email"
			},
			group_id: { 
				required: "please select group"
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	});

});