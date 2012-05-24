<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE HTML>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta charset="utf-8"/>
	<title>{$title}</title>
    <style type="text/css">
	@import url("{$PATH_DIR_CSS}style_page_reset.css");
	@import url("{$PATH_DIR_CSS}style_page_general.css");
	@import url("{$PATH_DIR_CSS}style_page_icon.css");
	@import url("{$PATH_DIR_CSS}styles/default/style_page_ui.css");
	@import url("{$PATH_DIR_CSS}style_page_forms.css");
	@import url("{$PATH_DIR_CSS}style_page_forms_popup.css");
	@import url("{$PATH_DIR_CSS}style_page_tables.css");
	@import url("{$PATH_DIR_CSS}style_page_messages.css");
	@import url("{$PATH_DIR_CSS}style_page_highslide.css");
    </style>
	
    <style type="text/css">
	body{ 
		width:100%; 
		/**min-width:970px;*/
	}
	
	#header{ 
		min-width:1012px;
	}
	
	#main-content{ 
		min-width:770px;
	}
	
	div.scroll {
		scrollbar-3dlight-color: #4FBDDD;
        scrollbar-arrow-color: #EEE1AE;
        scrollbar-darkshadow-color: #000000;
        scrollbar-face-color: #A0CCE0;
        scrollbar-highlight-color: #F8F2DC;
        scrollbar-shadow-color: #176F99;
        scrollbar-track-color: #E7F2FA;
		overflow: scroll;
        min-width:370px;
       	border: 1px solid #cccccc;
	}
	
	</style> 

    {literal}
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/superfish.js"></script>
    
    <!-- Datepicker-->
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/jquery-ui-1.7.2.js"></script>
    
    <!-- Tooltip-->
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/tooltip.js"></script>
    
    <!-- Table sorter-->
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/tablesorter.js"></script>
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/tablesorter-pager.js"></script>
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/cookie.js"></script>
    
    <!-- Highslide-->
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/highslide-with-html.js"></script>
	
    <!-- Tabs-->
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/jquery.hashchange.min.js"></script>
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/jquery.easytabs.js"></script>
    
    <!-- Validate Form-->
	<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/jquery.validate.js"></script>
	<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/cmxforms.js"></script>
    
    <!-- Custom-->
    <script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}custom.js"></script>
    {/literal}
    
    {section name=js loop=$load_js}
    <script type="text/javascript" src="{$PATH_DIR_JS}{$load_js[js].js}"></script>
	{/section}
	
	<style>
    	.etabs { margin: 0; padding: 0; }
    	.tab { display: inline-block; zoom:1; *display:inline; background: #eee; 
				border: solid 1px #999; border-bottom:none; -moz-border-radius: 4px 4px 0 0; 
				-webkit-border-radius: 4px 4px 0 0; }
    	.tab a { font-size: 12px; line-height: 1.5em; display: block; padding: 0 10px; outline: none; font-weight: bold; }
    	.tab a:hover { text-decoration: underline; }
    	.tab.active { background: #fff; padding-top: 6px; position: relative; top: 1px; border-color: #666; }
    	.tab a.active { font-weight: bold; }
    	.tab-container .panel-container { background: #fff; border: solid #666 1px; 
			padding: 10px; -moz-border-radius: 0 4px 4px 4px; -webkit-border-radius: 0 4px 4px 4px; }
    	.panel-container { margin-bottom: 10px; }
		
	</style>
  
  	{literal}
  	<script type="text/javascript">
    $(document).ready( function() {
      	$('#tab-container').easytabs();
		
    });
  	</script>
  	{/literal}
    
	<!--[if IE 6]>

	<link href="css/ie6.css" rel="stylesheet" media="all" />
	
	<script src="js/pngfix.js"></script>
	<script>
	  /* EXAMPLE */
	  DD_belatedPNG.fix('.logo, .other ul#dashboard-buttons li a');

	</script>
	<![endif]-->
	<!--[if IE 7]>
	<link href="css/ie7.css" rel="stylesheet" media="all" />
	<![endif]-->
    
</head>
<body>
	<!--
	<div id="header" style=" height:80px; margin-top:-29px;">
		<div id="top-menu">
	
		</div>
        
		<div id="sitename">
			<a href="{$BASE_URL}polytron/home" title="POLYTRON"><img src="{$PATH_DIR_IMG}logo.png" /></a>
			
		</div>

	</div>
    -->
    	
	