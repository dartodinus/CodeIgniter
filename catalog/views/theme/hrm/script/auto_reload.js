// JavaScript Document
 $(document).ready(function() {
 	 $("#responsecontainer").load("index.php/e-ticket/polytron/ticket");
   var refreshId = setInterval(function() {
      $("#responsecontainer").load("index.php/e-ticket/polytron/ticket");
   }, 9000);
   $.ajaxSetup({ cache: false });
});