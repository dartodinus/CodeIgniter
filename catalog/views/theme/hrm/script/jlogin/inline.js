$(document).ready(function(){ 
	// PNG FIX
	$('img').pngFix();
	
	// HIDE BOXES
	$('.toggle').click( function() {
		$(this).parent().next('.content').fadeToggle(400);
	});
	
	// SYSTEM MESSAGES
	$("div.message img").click(function () {
      $(this).parent().closest('div.message').fadeOut();
    });
	
	// STYLE FILE BUTTON
	$("input[type=file]").filestyle({
	   imageheight : 24,
	   imagewidth : 89,
	   width : 250
	});
	
	// STYLE SELECT BOXES
	$('.row select').sbCustomSelect();
	$('.actionbox select').sbCustomSelect();
	
});
