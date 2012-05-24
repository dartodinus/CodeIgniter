{include file="{$PATH_DIR_THEMES}header_popup.tpl"}
    
    <!-- PAGE WRAPPER -->
	<div id="page-wrapper">
    
    	<!-- MAIN WRAPPER -->
		<div id="main-wrapper">
        	
            <!-- MAIN CONTENT -->
			<div id="main-content" style="margin:0; padding:0">
            	
                <!-- COLOM FIXED -->
                <div class="column-fixed">
                    <div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all form-container">
                        <div class="portlet-header ui-widget-header">Form Import Data</div>
                        <div class="portlet-content">
                        
                            <!-- TABS -->
                            <div id="tabs">
                                
                                <!-- SINGGLE TABS -->
                                <div class="singgle-tabs">
                                	{if $request == 'error_files'}
                                    	<div class="response-msg2 me ui-corner-all">
                                        	File type invalid please upload file xls
                                        </div>
									
                                    {elseif $request == 'success'}
                                    	<div class="response-msg2 their ui-corner-all">
                                        	Import files success
                                        </div>                                
                                    {/if}
                                    
                                    
                                    <form id="formAdd" method="post" action="{$BASE_URL}import/excel" enctype="multipart/form-data">
                                       
                                        <ul class="width_full float_left">
                                            <li>
                                                <label  class="desc">
                                                    Data
                                                </label>
                                                <div class="styled-select">
                                                    <select name="files_type" id="files_type">
                                                        <option value=""> SELECT </option>
                                                        <option value="karyawan">DATA KARYAWAN </option>
                                                        <!--<option value="gaji">DATA GAJI</option>-->
                                                    </select>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
													Files Excel
												</label>
                                                
                                                <div>
                                                    <input type="file" name="userfile" id="userfile"/>
                                                </div>
                                            </li>
                                        </ul>
                                        
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                                <input type="hidden" name="act" id="act" value="Import" />
                                                <button type="submit" value="Submit" 
                                                class="ui-state-default ui-corner-all" id="saveForm">Import</button>
                                            </li>
                                        </ul>
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


	</div>
    <!-- END PAGE WRAPPER -->
    
	<div class="clearfix"></div>

</body>
</html>