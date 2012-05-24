{include file="{$PATH_DIR_THEMES}header.tpl"}
    
    <!-- PAGE WRAPPER -->
	<div id="page-wrapper">
    
    	<!-- MAIN WRAPPER -->
		<div id="main-wrapper">
        	
            <!-- MAIN CONTENT -->
			<div id="main-content">
            	
                <!-- COLOM FIXED -->
                <div class="column-fixed">
                    <div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all form-container">
                        <div class="portlet-header ui-widget-header">Form User Group</div>
                        <div class="portlet-content">
                        
                            <!-- TABS -->
                            <div id="tabs">
                                
                                <!-- SINGGLE TABS -->
                                <div class="singgle-tabs">
                                    <form id="formAdd" method="post" action="{$BASE_URL}group/save">
                                       
                                        <ul class="width_full float_left">
                                            <li>
                                                <label  class="desc">
													Group Name <span class="teks_color">(&lowast;)</span>
												</label>
                                                
                                                <div>
                                                    <input type="text" tabindex="1" name="group_name" id="group_name"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
													Deskripsi
												</label>
                                                
                                                <div>
                                                    <textarea tabindex="2" cols="50" rows="5" 
                                                    class="field textarea small" name="group_desc" id="group_desc"></textarea>
                                                </div>
                                            </li>
                                        </ul>
                                        
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                                <input type="hidden" name="act" id="act" value="Add" />
                                                <button type="submit" value="Submit" class="ui-state-default ui-corner-all" id="saveForm">Save</button>
                                            </li>
                                        </ul>
                                        
                                        
                                        <ul class="width_full float_left">
                                            <br />
                                            <h1>ROLE 
                                            <input type="checkbox" value="CheckAll" onclick="checkedAll();" /> Check All / Uncheck All
                                            </h1>
                                        </ul>
                                        
                                        <!-- box-form-full -->
                                        <div class="box-form-full">
                                        
                                            <!-- HOSTABLE -->
                                            <div class="hastable">
                                                <div class="scroll">
                                                <table> 
                                                    <thead> 
                                                        <tr>
                                                            <th style="text-align:left">MODULE</th> 
                                                            <th width="70" style="text-align:left; padding-left:4px;">
                                                                TAMBAH 
                                                            </th>
                                                            
                                                            <th width="70" style="text-align:left; padding-left:4px;">
                                                            	LIHAT
                                                            </th> 
                                                            
                                                            <th width="70" style="text-align:left; padding-left:4px;">
                                                            	UBAH
                                                            </th> 
                                                            
                                                            <th width="70" style="text-align:left; padding-left:4px;">
                                                            	HAPUS
                                                            </th>
                                                        </tr> 
                                                    </thead> 
                                                    
                                                    <tbody> 
                                                    	{section name=modul loop=$modul}
                                                        <tr>
                                                            <td>
                                                            	{$modul[modul].modul_name}
                                                                <input type="hidden" name="modul_id[]" id="modul_id" 
                                                                value="{$modul[modul].modul_id}" />
                                                            </td>
                                                            <td>
                                                            	<input type="checkbox" value="1" name="tambah_{$modul[modul].modul_id}" 
                                                                id="tambah_{$modul[modul].modul_id}" class="checkbox"/>
                                                            </td>
                                                            
                                                            <td>
                                                            	<input type="checkbox" value="1" name="lihat_{$modul[modul].modul_id}" 
                                                                id="lihat_{$modul[modul].modul_id}" class="checkbox"/>
                                                            </td>
                                                            
                                                            <td>
                                                            	<input type="checkbox" value="1" name="ubah_{$modul[modul].modul_id}" 
                                                                id="ubah_{$modul[modul].modul_id}" class="checkbox"/>
                                                            </td>
                                                            
                                                            <td>
                                                            	<input type="checkbox" value="1" name="hapus_{$modul[modul].modul_id}" 
                                                                id="hapus_{$modul[modul].modul_id}" class="checkbox"/>
                                                            </td>
                                                            
                                                        </tr>
                                                        {/section}
                                                    </tbody>
                                                </table>
                                                </div>
                                            </div>
                                            <!-- END HOSTABLE -->
                                            
                                        </div>
                                        <!-- END box-form-full -->
                                    </form>	
                                    
                                </div>
                                <!-- END SINGGLE TABS -->

                            </div>
                            <!--END TABS-->
                            
                        </div>
                    </div>
               		<div class="clearfix"></div>
				</div>	
				<!-- END COLOM FIXED -->
                
			</div>
            <!-- END MAIN CONTENT -->
            
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