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
                        <div class="portlet-header ui-widget-header">Form User</div>
                        <div class="portlet-content">
                        
                            <!-- TABS -->
                            <div id="tabs">
                                
                                <!-- SINGGLE TABS -->
                                <div class="singgle-tabs">
                                	<div id="result"></div>
                                    <form id="formAdd" class="post" method="post" action="{$BASE_URL}user/save">
                                       
                                        <ul class="width_full float_left">
                                            <li>
                                                <label  class="desc">
													Username <span class="teks_color">(&lowast;)</span>
												</label>
                                                
                                                <div>
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
													Password <span class="teks_color">(&lowast;)</span>
												</label>
                                                
                                                <div>
                                                    <input type="password" tabindex="1" name="password1" id="password1"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
													Konfirmasi Password <span class="teks_color">(&lowast;)</span>
												</label>
                                                
                                                <div>
                                                    <input type="password" tabindex="1" name="password2" id="password2"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
													Nama <span class="teks_color">(&lowast;)</span>
												</label>
                                                
                                                <div>
                                                    <input type="text" tabindex="1" name="name" id="name"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
													E-mail <span class="teks_color">(&lowast;)</span>
												</label>
                                                
                                                <div>
                                                    <input type="text" tabindex="1" name="email" id="email"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
													Group <span class="teks_color">(&lowast;)</span>
												</label>
                                                
                                                <div class="styled-select">
                                                    <select name="group_id" id="group_id">
                                                        <option value=""> SELECT </option>
                                                        {section name=group loop=$group}
                                                        <option value="{$group[group].group_id}">{$group[group].group_name|upper}</option>
                                                        {/section}
                                                    </select>
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