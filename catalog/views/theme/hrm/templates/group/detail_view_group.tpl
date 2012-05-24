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
                                                    maxlength="255" class="field text small" value="{$detail['group_name']}"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
													Deskripsi
												</label>
                                                
                                                <div>
                                                    <textarea tabindex="2" cols="50" rows="5" 
                                                    class="field textarea small" name="group_desc" 
                                                    id="group_desc">{$detail['group_desc']}</textarea>
                                                </div>
                                            </li>
                                        </ul>
                                        
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                                <input type="hidden" name="act" id="act" value="Update" />
                                                <input type="hidden" name="group_id" id="group_id" value="{$detail['group_id']}" />
                                                <button type="submit" value="Submit" class="ui-state-default ui-corner-all" 
                                                id="saveForm">Update</button>
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
                                                        {math assign="cols" equation="x-1" x=$smarty.section.modul.iteration}
                                                        
														<!-- CEK MODUL DAN ROLE TAMBAH -->
                                                        {if $detail_modul[$cols]['modul_id'] == $modul[modul].modul_id AND 
                                                        	$detail_modul[$cols]['tambah'] == 1} 
                                                      		{assign var='sell_tambah' value='checked'}
                                                        {else}
                                                        	{assign var='sell_tambah' value=''}
                                                        {/if}
                                                        
                                                        <!-- CEK MODUL DAN ROLE LIHAT -->
                                                        {if $detail_modul[$cols]['modul_id'] == $modul[modul].modul_id AND 
                                                        	$detail_modul[$cols]['lihat'] == 1} 
                                                      		{assign var='sell_lihat' value='checked'}
                                                        {else}
                                                        	{assign var='sell_lihat' value=''}
                                                        {/if}
                                                        
                                                        <!-- CEK MODUL DAN ROLE UBAH -->
                                                        {if $detail_modul[$cols]['modul_id'] == $modul[modul].modul_id AND 
                                                        	$detail_modul[$cols]['ubah'] == 1} 
                                                      		{assign var='sell_ubah' value='checked'}
                                                        {else}
                                                        	{assign var='sell_ubah' value=''}
                                                        {/if}
                                                        
                                                        <!-- CEK MODUL DAN ROLE HAPUS -->
                                                        {if $detail_modul[$cols]['modul_id'] == $modul[modul].modul_id AND 
                                                        	$detail_modul[$cols]['hapus'] == 1} 
                                                      		{assign var='sell_hapus' value='checked'}
                                                        {else}
                                                        	{assign var='sell_hapus' value=''}
                                                        {/if}
                                                         
                                                        <tr>
                                                            <td>
                                                            	{$modul[modul].modul_name}
                                                                <input type="hidden" name="modul_id[]" id="modul_id" 
                                                                value="{$modul[modul].modul_id}" />
                                                            </td>
                                                            <td>
                                                            	<input type="checkbox" value="1" name="tambah_{$modul[modul].modul_id}" 
                                                                id="tambah_{$modul[modul].modul_id}" 
                                                                class="checkbox" {$sell_tambah}/>
                                                            </td>
                                                            
                                                            <td>
                                                            	<input type="checkbox" value="1" name="lihat_{$modul[modul].modul_id}" 
                                                                id="lihat_{$modul[modul].modul_id}" 
                                                                class="checkbox" {$sell_lihat}/>
                                                            </td>
                                                            
                                                            <td>
                                                            	<input type="checkbox" value="1" name="ubah_{$modul[modul].modul_id}" 
                                                                id="ubah_{$modul[modul].modul_id}" 
                                                                class="checkbox" {$sell_ubah}/>
                                                            </td>
                                                            
                                                            <td>
                                                            	<input type="checkbox" value="1" name="hapus_{$modul[modul].modul_id}" 
                                                                id="hapus_{$modul[modul].modul_id}" 
                                                                class="checkbox" {$sell_hapus}/>
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