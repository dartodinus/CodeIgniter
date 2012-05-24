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
					<a href="{$BASE_URL}salary/add"  class="btn ui-state-default"><span class="ui-icon ui-icon-circle-plus"></span>Add New</a>
				</div>
                
				<div class="clearfix"></div>
                
                <div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all form-container">
					<div class="portlet-header ui-widget-header">Salary</div>
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
                                            <th>NIK</th> 
                                            <th>Nama</th>
                                            <th>Department</th>
                                            <th>Jabatan</th>
                                            <th>Status Karyawan</th>
                                            <th>Gaji Pokok</th>
                                            <th>Gaji Insentif</th>
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
                                            
                                            <td>{$data[data].nip}</td> 
                                            <td>{$data[data].nama}</td>
                                            <td>{$data[data].nama_divisi}</td> 
                                            <td>{$data[data].jabatan}</td> 
                                            <td>{$data[data].jns_karyawan}</td> 
                                            <td>{$data[data].gaji_pokok}</td>
                                            <td>{$data[data].gaji_insentif}</td> 
                                            
                                            <td>
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