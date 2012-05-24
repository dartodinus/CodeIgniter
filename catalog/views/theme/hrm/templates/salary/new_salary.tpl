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
                        <div class="portlet-header ui-widget-header">Form Salary</div>
                        <div class="portlet-content">
                        
                            <!-- TABS -->
                            <div id="tabs">
                                
                                <!-- SINGGLE TABS -->
                                <div class="singgle-tabs">
                                	<div id="result"></div>
                                    <form id="formAdd" class="post" method="post" action="{$BASE_URL}user/save">
                                       
                                       	<ul class="width_full float_left">
                                            <h1>DATA KARYAWAN</h1>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li>
                                                <label  class="desc">
													NIK <span class="teks_color">(&lowast;)</span>
												</label>
                                                
                                                <div>
                                                    <input type="text" tabindex="1" name="nip" id="nip" class="keylockup" maxlength="255" 
                                                    class="field text small" src="{$BASE_URL}salary/check_nip"/>
                                                    
                                                </div>
                                                
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_medium float_left">
                                        	<li>
												<label  class="desc">
													Divisi
												</label>
                                                <div>
                                                    <input type="text" tabindex="1" name="divisi_id" id="divisi_id"
                                                    maxlength="255" class="field text medium" value=""/>
                                                <div>
                                                
                                                <label  class="desc">
                                                    Jabatan</span>
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="jabatan_id" id="jabatan_id"
                                                    maxlength="255" class="field text medium" value=""/>
                                                <div>
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <br>
                                            <h1>GAJI KARYAWAN</h1>
                                        </ul>
                                        
										<ul class="width_medium float_left">
											<li>
                                                <label  class="desc">
                                                    Gaji Pokok <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nama" id="nama"
                                                    maxlength="255" class="field text medium" value="{$detail['nama']}"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Gaji Insentif </span>
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nama" id="nama"
                                                    maxlength="255" class="field text medium" value="{$detail['nama']}"/>
                                                </div>
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                                <input type="hidden" name="act" id="act" value="Add" />
                                                <button type="submit" value="Submit" class="ui-state-default ui-corner-all" id="saveForm">Save</button>
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
        
        {include file="{$PATH_DIR_THEMES}sidebar.tpl"}

	</div>
    <!-- END PAGE WRAPPER -->
    
	<div class="clearfix"></div>
    
	{include file="{$PATH_DIR_THEMES}footer.tpl"}
</body>
</html>