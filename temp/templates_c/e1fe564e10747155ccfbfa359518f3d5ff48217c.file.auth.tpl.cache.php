<?php /* Smarty version Smarty-3.1.8, created on 2012-05-24 13:01:14
         compiled from "catalog\views\theme\hrm\templates\auth\auth.tpl" */ ?>
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
  'function' => 
  array (
  ),
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
  'unifunc' => 'content_4fbdceaa6e0897_51673773',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_4fbdceaa6e0897_51673773')) {function content_4fbdceaa6e0897_51673773($_smarty_tpl) {?><?php echo '/*%%SmartyNocache:296534fbdceaa5db0b5-37560511%%*/<?php echo \'<?xml\';?>/*/%%SmartyNocache:296534fbdceaa5db0b5-37560511%%*/';?>
 version="1.0" encoding="utf-8"<?php echo '/*%%SmartyNocache:296534fbdceaa5db0b5-37560511%%*/<?php echo \'?>\';?>/*/%%SmartyNocache:296534fbdceaa5db0b5-37560511%%*/';?>


<!DOCTYPE HTML>
<HTML xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta charset="utf-8"/>
<title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>

<style type="text/css">
	@import url('<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_CSS']->value;?>
style_login_inlog.css');
	@import url('<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_CSS']->value;?>
style_login_styletext.css');
	@import url('<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_CSS']->value;?>
style_login_grey.css'); /* COLOR FILE CAN CHANGE TO c-blue.ccs, c-grey.ccs, c-orange.ccs, c-purple.ccs or c-red.ccs */ 
	@import url('<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_CSS']->value;?>
style_login_form.css');
	@import url('<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_CSS']->value;?>
style_login_messages.css');
</style>


<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_JS']->value;?>
jquery/jquery-1.5.2.min.js"></script>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_JS']->value;?>
jlogin/jquery/jquery.filestyle.mini.js"></script>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_JS']->value;?>
jlogin/jquery/jquery.pngFix.js"></script>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_JS']->value;?>
jlogin/jquery/jquery.sparkbox-select.js"></script>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_JS']->value;?>
jlogin/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_JS']->value;?>
jlogin/jquery/superfish.js"></script>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_JS']->value;?>
jlogin/jquery/supersubs.js"></script>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_JS']->value;?>
jlogin/inline.js"></script>



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

                <?php if ($_smarty_tpl->tpl_vars['data']->value['status']!=0){?>
                <div class="message blue">
                    <div class="corner tl"></div>
                    <div class="corner tr"></div>
                    <div class="corner bl"></div>
                    <div class="corner br"></div>
                    Click the login button to proceed!
                    <img src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_IMG']->value;?>
icon-close.gif" alt="Close this item" />
                </div>
                <?php }else{ ?>
                <div class="message red">
                    <div class="corner tl"></div>
                    <div class="corner tr"></div>
                    <div class="corner bl"></div>
                    <div class="corner br"></div>
                    <?php echo $_smarty_tpl->tpl_vars['data']->value['error'];?>

                    <img src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_IMG']->value;?>
icon-close.gif" alt="Close this item" />
                </div>
                
                <?php }?>

  
                <form id="formLogin" action="<?php echo $_smarty_tpl->tpl_vars['BASE_URL']->value;?>
auth/get_login" method="post">
					
                    <div class="row">
                        
                        <div class="formlogin-left">
                        	<img src="<?php echo $_smarty_tpl->tpl_vars['PATH_DIR_IMG']->value;?>
iconLogin.png" />
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
							<?php if (isset($_smarty_tpl->tpl_vars['smarty']->value['section']['group'])) unset($_smarty_tpl->tpl_vars['smarty']->value['section']['group']);
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['name'] = 'group';
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['loop'] = is_array($_loop=$_smarty_tpl->tpl_vars['group']->value) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['show'] = true;
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['max'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['loop'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['step'] = 1;
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['start'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['step'] > 0 ? 0 : $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['loop']-1;
if ($_smarty_tpl->tpl_vars['smarty']->value['section']['group']['show']) {
    $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['total'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['loop'];
    if ($_smarty_tpl->tpl_vars['smarty']->value['section']['group']['total'] == 0)
        $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['show'] = false;
} else
    $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['total'] = 0;
if ($_smarty_tpl->tpl_vars['smarty']->value['section']['group']['show']):

            for ($_smarty_tpl->tpl_vars['smarty']->value['section']['group']['index'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['start'], $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['iteration'] = 1;
                 $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['iteration'] <= $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['total'];
                 $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['index'] += $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['step'], $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['iteration']++):
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['rownum'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['iteration'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['index_prev'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['index'] - $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['step'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['index_next'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['index'] + $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['step'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['first']      = ($_smarty_tpl->tpl_vars['smarty']->value['section']['group']['iteration'] == 1);
$_smarty_tpl->tpl_vars['smarty']->value['section']['group']['last']       = ($_smarty_tpl->tpl_vars['smarty']->value['section']['group']['iteration'] == $_smarty_tpl->tpl_vars['smarty']->value['section']['group']['total']);
?>
                            	<option value="<?php echo $_smarty_tpl->tpl_vars['group']->value[$_smarty_tpl->getVariable('smarty')->value['section']['group']['index']]['group_id'];?>
"><?php echo mb_strtoupper($_smarty_tpl->tpl_vars['group']->value[$_smarty_tpl->getVariable('smarty')->value['section']['group']['index']]['group_name'], 'UTF-8');?>
</option>
							<?php endfor; endif; ?>
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