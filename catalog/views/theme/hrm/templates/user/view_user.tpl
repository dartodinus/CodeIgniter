{include file="{$PATH_DIR_THEMES}header.tpl"}
    
    <!-- PAGE WRAPPER -->
	<div id="page-wrapper">
    
    	<!-- MAIN WRAPPER -->
		<div id="main-wrapper">
        
			<div id="main-content">
                
                <div class="button float-left">
					<a href="{$BASE_URL}"  class="btn ui-state-default"><span class="ui-icon ui-icon-home"></span>Home</a>
				</div>
                
                <div class="button float-right">
					<a href="{$BASE_URL}user/add"  class="btn ui-state-default"><span class="ui-icon ui-icon-circle-plus"></span>Add New</a>
				</div>
                
				<div class="clearfix"></div>
                
                <div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all form-container">
					<div class="portlet-header ui-widget-header">User</div>
					<div class="portlet-content">
                        <div class="hastable">
                        	
                            <form name="myform" method="post" action="">
                            	<div class="scroll">
                                <table style="width:140%"> 
                                    <thead> 
                                        <tr>
                                            <th>
                                                <!--<input type="checkbox" value="check_none" 
                                                onclick="this.value=check(this.form.list)" class="submit"/>-->
                                                No
                                            </th>
                                            <th>Username</th> 
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Group</th>
                                            <th>Create By</th>
                                            <th>Create Date</th>
                                            <th>Modified By</th>
                                            <th>Modified Date</th>
                                            <th>Status</th>
                                            <th style="width:132px">Options</th> 
                                        </tr> 
                                    </thead> 
                                    
                                    
                                    <tbody> 
                                    
                                        {section name=data loop=$data}
                                        
                                        <tr>
                                            <td class="center">
                                            <!--<input type="checkbox" value="1" name="list" class="checkbox"/>
                                            {$smarty.section.data.iteration}
                                            {math equation="(x * y) + z" x=$number y=10 z=$smarty.section.data.iteration}
                                            -->
                                            
                                            {math equation="((20 - (20 - x)) + z) - 1" x=$number y=10 z=$smarty.section.data.iteration}
                                            </td> 
                                            
                                            <td>{$data[data].username}</td> 
                                            <td>{$data[data].name}</td>
                                            <td>{$data[data].email}</td> 
                                            <td>{$data[data].group_name}</td> 
                                            <td>{$data[data].created_by}</td> 
                                            <td>{$data[data].created_date}</td> 
                                            <td>{$data[data].modified_by}</td> 
                                            <td>{$data[data].modified_date}</td> 
                                            <td>
                                            	{if $data[data].status == 'A'}
                                                    <span style="color:#060; font-weight:bold">Active</span>
                                                {else}
                                                    <span style="color:#900; font-weight:bold">Inactive</span>
                                                {/if}
                                            </td> 
                                            
                                            <td>
                                                {if $data[data].status == 'A'}
                                                <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" title="Click to inactivate" 
                                                href="{$BASE_URL}user/activate/{$data[data].user_id}/I">
                                                    <span class="ui-icon ui-icon-check"></span>
                                                </a>
                                                {else}
                                                <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" title="Click to activate" 
                                                href="{$BASE_URL}user/activate/{$data[data].user_id}/A">
                                                    <span class="ui-icon ui-icon-cancel"></span>
                                                </a>
                                                {/if}
                                                
                                                <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" 
                                                title="Edit" href="{$BASE_URL}user/edit/{$data[data].user_id}">
                                                    <span class="ui-icon ui-icon-wrench"></span>
                                                </a>
                                                <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" 
                                                title="Delete" href="{$BASE_URL}user/del/{$data[data].user_id}"
                                                onclick="return deleteConfirm()">
                                                    <span class="ui-icon ui-icon-trash"></span>
                                                </a>
                                            </td>
                                        </tr> 
                                        {/section}
                                        
                                    </tbody>
                                </table>
                                </div>
                            </form>
                            <ul class="pagination">
                                {$Prev}
                                {section name=page loop=$pagenum}
                                    {$pagenum[page]}
                                {/section}
                                {$Next}
        
                            </ul>
						</div>
                    </div>
                </div>
                
				<div class="clearfix"></div>

			</div>
            
			<div class="clearfix"></div>
		</div>
        <!-- END MAIN WRAPPER -->
        
        {include file="{$PATH_DIR_THEMES}sidebar.tpl"}

	</div>
    <!-- END PAGE WRAPPER -->
    
	<div class="clearfix"></div>
    
	{include file="{$PATH_DIR_THEMES}footer.tpl"}
</body>
</html>