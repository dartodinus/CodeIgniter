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
                        <div class="portlet-header ui-widget-header">List Import</div>
                        <div class="portlet-content">
                        
                            <!-- TABS -->
                            <div id="tabs">
                                
                                <!-- SINGGLE TABS -->
                                <div class="singgle-tabs">
                                    <form id="formAdd" method="post" action="{$BASE_URL}import/excel" enctype="multipart/form-data">
                                       
                                        <!-- box-form-full -->
                                        <div class="box-form-full">
                                        
                                            <!-- HOSTABLE -->
                                            <div class="hastable">
                                                <div class="scroll">
                                                <table style="width:4500px"> 
                                                    <thead> 
                                                        <tr>
                                                        	<th>No</th>
                                                            <th>Unit / Divisi</th> 
                                                            <th>No Kunci</th>
                                                            <th>NIK</th> 
                                                            <th>No.ID JSM</th>
                                                            <th>Username</th>
                                                            <th>Password</th>
                                                            <th>Status karyawan</th>
                                                            <th>Jabatan</th>
                                                            <th>Nama</th>
                                                            <th>Jns Kelamin</th>
                                                            <th>Kewarga Negaraan</th>
                                                            <th>Agama</th>
                                                            <th>No. KTP</th>
                                                            <th>No. NPWP</th>
                                                            <th>No. Jamsostek</th>
                                                            <th>Tmpt Lahir</th>
                                                            <th>Tgl Lahir</th>
                                                            <th>Alamat</th>
                                                            <th>Kota</th>
                                                            <th>No. Telp</th>
                                                            <th>Pendidikan</th>
                                                            <th>Thn Kelulusan</th>
                                                            <th>Nama Pendidikan</th>
                                                            <th>Jurusan</th>
                                                            <th>Tgl Masuk</th>
                                                            
                                                            <th>Pengalaman kerja 1</th>
                                                            <th>Posisi</th>
                                                            <th>Pengalaman kerja 2</th>
                                                            <th>Posisi</th>
                                                            <th>Pengalaman kerja 3</th>
                                                            <th>Posisi</th>
                                                            <th>Pengalaman kerja 4</th>
                                                            <th>Posisi</th>
                                                            <th>Pengalaman kerja 5</th>
                                                            <th>Posisi</th>
                                                            <th>Pengalaman kerja 6</th>
                                                            <th>Posisi</th>
                                                            <th>Pengalaman kerja 7</th>
                                                            <th>Posisi</th>
                                                        </tr> 
                                                    </thead> 
                                                    
                                                    <tbody> 
                                                    	{section name=data loop=$data}
                                                    	<tr>
                                                        	<td>{$smarty.section.data.iteration}</td>
                                                            <td>{$data[data].nama_divisi}</td>
                                                            <td>{$data[data].no_kunci}</td>
                                                            <td>{$data[data].nip}</td>
                                                            <td>{$data[data].id_card}</td>
                                                            <td>{$data[data].username}</td>
                                                            <td>{$data[data].password}</td>
                                                            <td>{$data[data].jns_karyawan}</td>
                                                            <td>{$data[data].jabatan}</td>
                                                            <td>{$data[data].nama}</td>
                                                            <td>{$data[data].jns_kelamin}</td>
                                                            <td>{$data[data].warga_negara}</td>
                                                            <td>{$data[data].agama}</td>
                                                            <td>{$data[data].no_ktp}</td>
                                                            <td>{$data[data].npwp}</td>
                                                            <td>{$data[data].no_jamsostek}</td>
                                                            <td>{$data[data].tmpt_lahir}</td>
                                                            <td>{$data[data].tgl_lahir}</td>
                                                            <td>{$data[data].alamat}</td>
                                                            <td>{$data[data].kota}</td>
                                                            <td>{$data[data].telp}</td>
                                                            <td>{$data[data].pendidikan}</td>
                                                            <td>{$data[data].thn_lulus}</td>
                                                            <td>{$data[data].nama_instansi}</td>
                                                            <td>{$data[data].jurusan}</td>
                                                            <td>{$data[data].tgl_masuk}</td>
                                                            
                                                            <td>{$data[data].pengalaman1}</td>
                                                            <td>{$data[data].posisi1}</td>
                                                            <td>{$data[data].pengalaman2}</td>
                                                            <td>{$data[data].posisi2}</td>
                                                            <td>{$data[data].pengalaman3}</td>
                                                            <td>{$data[data].posisi3}</td>
                                                            <td>{$data[data].pengalaman4}</td>
                                                            <td>{$data[data].posisi4}</td>
                                                            <td>{$data[data].pengalaman5}</td>
                                                            <td>{$data[data].posisi5}</td>
                                                            <td>{$data[data].pengalaman6}</td>
                                                            <td>{$data[data].posisi6}</td>
                                                            <td>{$data[data].pengalaman7}</td>
                                                            <td>{$data[data].posisi7}</td>
                                                    	</tr>
                                                        {/section}
                                                    </tbody>
                                                </table>
                                                </div>
                                            </div>
                                            <!-- END HOSTABLE -->
                                            
                                        </div>
                                        <!-- END box-form-full -->
										
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                            	<input type="hidden" name="files_type" id="files_type" 
                                                value="{$files_type}" />
                                            	<input type="hidden" name="filename_karyawan" id="filename_karyawan" 
                                                value="{$filename_karyawan}" />
                                                <input type="hidden" name="filename_pendidikan" id="filename_pendidikan" 
                                                value="{$filename_pendidikan}" />
                                                <input type="hidden" name="filename_pengalaman" id="filename_pengalaman" 
                                                value="{$filename_pengalaman}" />
                                                
                                                <input type="hidden" name="act" id="act" value="Save" />
                                                <button type="submit" value="Submit" 
                                                class="ui-state-default ui-corner-all" id="saveForm">Save</button>
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