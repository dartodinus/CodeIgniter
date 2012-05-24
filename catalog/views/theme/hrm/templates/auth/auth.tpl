<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE HTML>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta charset="utf-8"/>
<title>{$title}</title>

<style type="text/css">
	@import url('{$PATH_DIR_CSS}style_login_inlog.css');
	@import url('{$PATH_DIR_CSS}style_login_styletext.css');
	@import url('{$PATH_DIR_CSS}style_login_grey.css'); /* COLOR FILE CAN CHANGE TO c-blue.ccs, c-grey.ccs, c-orange.ccs, c-purple.ccs or c-red.ccs */ 
	@import url('{$PATH_DIR_CSS}style_login_form.css');
	@import url('{$PATH_DIR_CSS}style_login_messages.css');
</style>

{literal}
<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jquery/jquery-1.5.2.min.js"></script>
<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jlogin/jquery/jquery.filestyle.mini.js"></script>
<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jlogin/jquery/jquery.pngFix.js"></script>
<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jlogin/jquery/jquery.sparkbox-select.js"></script>
<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jlogin/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jlogin/jquery/superfish.js"></script>
<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jlogin/jquery/supersubs.js"></script>
<script type="text/javascript" src="{/literal}{$PATH_DIR_JS}{literal}jlogin/inline.js"></script>
{/literal}


</head>

<body>

<div class="wrapper">
	<div class="container">  
    	<!--[if !IE]> START TOP <![endif]-->  
		<div class="top"> 
			<div class="split"><h1>Admin</h1></div> 
			<div class="split">&nbsp;</div>
		</div> 
		<!--[if !IE]> END TOP <![endif]-->  
        
		  
        <!--[if !IE]> START LOGIN <![endif]--> 
        <div class="box medium">
            <div class="title">
                <div class="corner tl"></div>
                <div class="corner tr"></div>
                <h2>Login</h2>
            </div>
            
            <div class="content forms">

                {if $data['status'] != 0}
                <div class="message blue">
                    <div class="corner tl"></div>
                    <div class="corner tr"></div>
                    <div class="corner bl"></div>
                    <div class="corner br"></div>
                    Click the login button to proceed!
                    <img src="{$PATH_DIR_IMG}icon-close.gif" alt="Close this item" />
                </div>
                {else}
                <div class="message red">
                    <div class="corner tl"></div>
                    <div class="corner tr"></div>
                    <div class="corner bl"></div>
                    <div class="corner br"></div>
                    {$data['error']}
                    <img src="{$PATH_DIR_IMG}icon-close.gif" alt="Close this item" />
                </div>
                
                {/if}

  
                <form id="formLogin" action="{$BASE_URL}auth/get_login" method="post">
					
                    <div class="row">
                        
                        <div class="formlogin-left">
                        	<img src="{$PATH_DIR_IMG}iconLogin.png" />
						</div>
                        
                        <div class="formlogin">
                        	<label>Username:</label>
							<input type="text" name="username" id="username" />
                        </div>
                        
                        <div class="formlogin">
                        	<label>Password:</label>
							<input type="password" name="password" id="password" />
                        </div>
                        
                        <div class="formlogin">
                        	<label>Priviledge:</label>
							<select name="group_id" id="group_id">
							{section name=group loop=$group}
                            	<option value="{$group[group].group_id}">{$group[group].group_name|upper}</option>
							{/section}
                            </select>
                            
                        </div>
                        
                         <div class="formlogin">
                         	<button type="submit"><span>Login</span></button>
                         </div>
					</div>
                    
                </form>
                
            </div>
        </div>
        <!--[if !IE]> END LOGIN <![endif]-->  
		
	</div>
</div>
</body>

</body>

</HTML> 

