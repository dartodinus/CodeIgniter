<?php /*%%SmartyHeaderCode:296534fbdceaa5db0b5-37560511%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e1fe564e10747155ccfbfa359518f3d5ff48217c' => 
    array (
      0 => 'catalog\\views\\theme\\hrm\\templates\\auth\\auth.tpl',
      1 => 1335103374,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '296534fbdceaa5db0b5-37560511',
  'variables' => 
  array (
    'title' => 0,
    'PATH_DIR_CSS' => 0,
    'PATH_DIR_JS' => 0,
    'data' => 0,
    'PATH_DIR_IMG' => 0,
    'BASE_URL' => 0,
    'group' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_4fbdceaa6fdb61_03410249',
  'cache_lifetime' => 0,
),true); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_4fbdceaa6fdb61_03410249')) {function content_4fbdceaa6fdb61_03410249($_smarty_tpl) {?><?php echo '<?xml';?> version="1.0" encoding="utf-8"<?php echo '?>';?>

<!DOCTYPE HTML>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta charset="utf-8"/>
<title>HRM</title>

<style type="text/css">
	@import url('http://localhost/CodeIgniter/catalog/views/theme/hrm/stylesheet/style_login_inlog.css');
	@import url('http://localhost/CodeIgniter/catalog/views/theme/hrm/stylesheet/style_login_styletext.css');
	@import url('http://localhost/CodeIgniter/catalog/views/theme/hrm/stylesheet/style_login_grey.css'); /* COLOR FILE CAN CHANGE TO c-blue.ccs, c-grey.ccs, c-orange.ccs, c-purple.ccs or c-red.ccs */ 
	@import url('http://localhost/CodeIgniter/catalog/views/theme/hrm/stylesheet/style_login_form.css');
	@import url('http://localhost/CodeIgniter/catalog/views/theme/hrm/stylesheet/style_login_messages.css');
</style>


<script type="text/javascript" src="http://localhost/CodeIgniter/catalog/views/theme/hrm/script/jquery/jquery-1.5.2.min.js"></script>
<script type="text/javascript" src="http://localhost/CodeIgniter/catalog/views/theme/hrm/script/jlogin/jquery/jquery.filestyle.mini.js"></script>
<script type="text/javascript" src="http://localhost/CodeIgniter/catalog/views/theme/hrm/script/jlogin/jquery/jquery.pngFix.js"></script>
<script type="text/javascript" src="http://localhost/CodeIgniter/catalog/views/theme/hrm/script/jlogin/jquery/jquery.sparkbox-select.js"></script>
<script type="text/javascript" src="http://localhost/CodeIgniter/catalog/views/theme/hrm/script/jlogin/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="http://localhost/CodeIgniter/catalog/views/theme/hrm/script/jlogin/jquery/superfish.js"></script>
<script type="text/javascript" src="http://localhost/CodeIgniter/catalog/views/theme/hrm/script/jlogin/jquery/supersubs.js"></script>
<script type="text/javascript" src="http://localhost/CodeIgniter/catalog/views/theme/hrm/script/jlogin/inline.js"></script>



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

                                <div class="message blue">
                    <div class="corner tl"></div>
                    <div class="corner tr"></div>
                    <div class="corner bl"></div>
                    <div class="corner br"></div>
                    Click the login button to proceed!
                    <img src="http://localhost/CodeIgniter/catalog/views/theme/hrm/images/icon-close.gif" alt="Close this item" />
                </div>
                
  
                <form id="formLogin" action="http://localhost/CodeIgniter/hrm/auth/get_login" method="post">
					
                    <div class="row">
                        
                        <div class="formlogin-left">
                        	<img src="http://localhost/CodeIgniter/catalog/views/theme/hrm/images/iconLogin.png" />
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
							                            	<option value="1">ADMIN</option>
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

<?php }} ?>