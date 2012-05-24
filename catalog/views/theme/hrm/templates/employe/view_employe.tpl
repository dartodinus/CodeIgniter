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
					<a href="{$BASE_URL}employe/add"  class="btn ui-state-default"><span class="ui-icon ui-icon-circle-plus"></span>Add New</a>
				</div>
                
				<div class="clearfix"></div>
                
                <div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all form-container">
					<div class="portlet-header ui-widget-header">Data Karyawan</div>
					<div class="portlet-content">
                        <div class="hastable">
                        	
                            <form name="myform" method="post" action="">
                                <table> 
                                    <thead> 
                                        <tr>
                                            <th>
                                                <!--<input type="checkbox" value="check_none" 
                                                onclick="this.value=check(this.form.list)" class="submit"/>-->
                                                No
                                            </th>
                                            <th>NIP</th> 
                                            <th>Nama</th>
                                            <th>Department</th> 
                                            <th>Jabatan</th> 
                                            <th>Email</th>
                                            <th>Status Karyawan</th>
                                            <th>Tanggal Masuk</th>
                                            <th>Status</th>
                                            <th style="width:132px">Options</th> 
                                        </tr> 
                                    </thead> 
                                    
                                    
                                    <tbody> 
                                    
                                        {section name=data loop=$data}
                                        
                                        {if $data[data].status == 'A'}
                                            {assign var='row_color' value=''}
                                        {else}
                                            {assign var='row_color' value='#FDEEF4'}
                                        {/if}
                                        
                                        <tr bgcolor="{$row_color}">
                                            <td class="center" {$td_font}>
                                            <!--<input type="checkbox" value="1" name="list" class="checkbox"/>
                                            {$smarty.section.data.iteration}
                                            {math equation="(x * y) + z" x=$number y=10 z=$smarty.section.data.iteration}
                                            -->
                                            
                                            {math equation="((20 - (20 - x)) + z) - 1" x=$number y=10 z=$smarty.section.data.iteration}
                                            </td> 
                                            
                                            <td>{$data[data].nip}</td> 
                                            <td>{$data[data].nama}</td> 
                                            <td>{$data[data].divisi_name}</td> 
                                            <td>{$data[data].jabatan}</td> 
                                            <td>{$data[data].email}</td> 
                                            <td>{$data[data].jns_karyawan}</td>
                                            <td>{$data[data].tgl_masuk}</td>
                                            
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
                                                href="{$BASE_URL}employe/activate/{$data[data].nip}/I">
                                                    <span class="ui-icon ui-icon-check"></span>
                                                </a>
                                                {else}
                                                <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" title="Click to activate" 
                                                href="{$BASE_URL}employe/activate/{$data[data].nip}/A">
                                                    <span class="ui-icon ui-icon-cancel"></span>
                                                </a>
                                                {/if}
                                                
                                                <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" 
                                                title="Edit" href="{$BASE_URL}employe/edit/{$data[data].nip}">
                                                    <span class="ui-icon ui-icon-wrench"></span>
                                                </a>
                                                <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" 
                                                title="Delete" href="{$BASE_URL}employe/del/{$data[data].nip}"
                                                onclick="return deleteConfirm()">
                                                    <span class="ui-icon ui-icon-trash"></span>
                                                </a>
                                            </td>
                                        </tr> 
                                        {/section}
                                        
                                    </tbody>
                                </table>
                                
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