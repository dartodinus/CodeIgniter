$(document).ready(function() {
	var url 			= location.href;
	var baseLocalUrl 	= url.substring(0, url.indexOf('/', 14))+'/sysadmin/';
	
	var validator = $("#formPartner").validate({ 
		rules: { 
			brand: {
				required: true,
				remote: baseLocalUrl+'index.php/partner/check_partner'
			},			
			name: {
				required: true
			},			
			email_address: {
				email : true
			},
			phone: {
				number:true,
				minlength: 7,
				maxlength: 15
			}
		}, 
		
		messages: { 					
			brand: { 
				required: " please enter a brand",
				remote: jQuery.format(" brand allready exist")
			}, 			
			name: {
				required: " please provide a name"
			},
			phone: { 
				number: "invalid phone number",
				minlength: " invalid phone number",
				maxlength: " invalid phone number"
			},
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	}); 
	
	var validator = $("#formRingid").validate({ 
		rules: { 
			userfile: {
				required: true
			},
			ringid: {
				required: true,
				number: true,
				minlength: 7,
				maxlength: 7
			},
			partner_id: {
				required: true
			}
		}, 
		
		messages: { 
			userfile: { 
				required: " please insert files"
			},
			ringid: { 
				required: " please insert ringid",
				number: "invalid ringid",
				minlength: " ringid must consist of at least 7 characters",
				maxlength: " please enter no more than 7 characters"
			},
			partner_id: { 
				required: " please select partner"
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	});
	
	var validator = $("#formImport").validate({ 
		rules: { 
			userfile: {
				required: true
			}
		}, 
		
		messages: { 		
			ringid: { 
				required: " please upload files"
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	}); 
	
	
	var validator = $("#formUser").validate({ 
		rules: { 
			name: {
				required: true
			},
			username: {
				required: true,
				minlength: 3,
				maxlength: 20,
				remote: baseLocalUrl+'index.php/user/check_user'
			},
			group_id: {
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
			}
		}, 
		
		messages: { 		
			name: { 
				required: " please name"
			},
			username: { 
				required: " please username",
				minlength: " your username must be at least 3 characters long",
				maxlength: " please enter no more than 20 characters",
				remote: jQuery.format(" invalid username or username allready exist")
			},
			group_id: { 
				required: " please upload files"
			},
			password1: {
				required: " Please provide a password",
				minlength: " Your password must be at least 5 characters long",
				maxlength: " Please enter no more than 15 characters"
			},
			password2: {
				minlength: " Your password must be at least 5 characters long",
				equalTo: " Please enter the same password as above"
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	}); 
	
	
	

});

function deleteConfirm() {
 	var a = confirm("Really delete your data");
 
 	if (a) { return true; }
 	else { return false; }

}