$(document).ready(function() {

	$('.form_submit').submit(function() {
		$.ajax({
			type: "POST",
			url: $(this).attr('action'),
			data: $(this).serialize(),
			cache: false,
			success: function() {
				//$('#result').html(data);
			}
		});
		return false;
	});
	
	
	$(".delete").click(function() {
		var a = confirm("Really delete your data ?");
		var parent = $(this).closest('tr');
		
		if (a) {
			$.ajax({
				type: "GET",
				url: $(this).attr('href'),
				data: $(this).serialize(),
				cache: false,
				success: function(){
					parent.fadeOut(300,function() {
                    	parent.remove();
                	});
				}
			});
			
			return false;
			
		}else { return false; }
	 
	});
	
	$(".keylockup").keyup(function() {
		var selState = $(this).attr('value');
        console.log(selState);
		$.ajax({
			url: $(this).attr('src'),
            async: false,
            type: "POST",
            data: "state="+selState,
            dataType: "html",
                         
            success: function(data) {
            	$('#city').html(data);
            }
		})
		
	 
	});
	
});	
	/**
	$("a[href='#myAnchor']").click(function() {
		$.ajax({
			type: 'GET',
			url: $(this).attr('action'),
			data: $(this).serialize(),
			success: function(data) {
				$('#result').html(data);
			}
		})
		return false;
	});
	*/
	


/**
$('.post').submit(function() {
	$.ajax({
		type: 'POST',
		url: $(this).attr('action'),
		data: $(this).serialize(),
		success: function(data) {
			$('#result').html(data);
		}
	})
	return false;
});
	
	
$("#ajax_form").submit( function() {
	var post_data = $(this).serialize();
	var form_action = $(this).attr("action");
	var form_method = $(this).attr("method");
	$.ajax( {
		type :form_method,
		url :form_action,
		cache :false,
		data :post_data,
		success : function() {
			alert("Data berhasil dimasukkan.");
		},
		error : function() {
			alert("Data gagal dimasukkan.");
		}
	});
	return false;
});
*/
