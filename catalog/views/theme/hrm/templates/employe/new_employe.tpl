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
                        <div class="portlet-header ui-widget-header"><a href="{$BASE_URL}employe">Form Data Karyawan</a></div>
                        <div class="portlet-content">
                        
                            <!-- TABS -->
                            <div id="tabs">
                            
                                <!-- SINGGLE TABS -->
                                <div class="singgle-tabs">
                                    <form id="formAdd" method="post" action="{$BASE_URL}employe/save">
                                        <ul class="width_full float_left">
                                            <h1>INSTANSI</h1>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li>
                                                <label  class="desc">
                                                    Perusahaan / Kantor Cabang <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div class="styled-select">
                                                    <select name="perusahaan_id" id="perusahaan_id">
                                                        <option value=""> SELECT </option>
                                                        {section name=perusahaan loop=$perusahaan}
                                                        <option value="{$perusahaan[perusahaan].perusahaan_id}">
                                                        {$perusahaan[perusahaan].nama|upper}
                                                        </option>
                                                        {/section}
                                                        
                                                    </select>
                                                </div>
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <br>
                                            <h1>PERSONAL 1</h1>
                                        </ul>
                                        
                                        <ul class="width_medium float_left">
                                            
                                            <li>
                                                <label  class="desc">
                                                    Nama <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nama" id="nama"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tempat Lahir <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="tmpt_lahir" id="tmpt_lahir"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tanggal Lahir <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div>
                                                    <input type="text" name="tgl_lahir" id="tgl_lahir"
                                                    class="field text" style="width:115px"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Jenis Kelamin
                                                </label>
                                                <div>
                                                    <input type="radio"  name="jns_kelamin" id="jns_kelamin" value="L" checked="checked" />Laki-laki
                                                    <input type="radio"  name="jns_kelamin" id="jns_kelamin" value="P" />Perempuan
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Agama <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div class="styled-select">
                                                    <select name="agama_id" id="agama_id">
                                                        <option value=""> SELECT </option>
                                                        {section name=agama loop=$agama}
                                                        <option value="{$agama[agama].agama_id}">
                                                        {$agama[agama].agama|upper}
                                                        </option>
                                                        {/section}
                                                    </select>
                                                </div>
                                            </li>
            
                                            <li>
                                                <label  class="desc">
                                                    Alamat
                                                </label>
                                                <div>
                                                    <textarea tabindex="2" cols="50" rows="5" name="alamat_asal" id="alamat_asal"
                                                    class="field textarea small" /></textarea>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Alamat Sekarang
                                                </label>
                                                <div>
                                                    <textarea tabindex="2" cols="50" rows="5" name="alamat_sekarang" id="alamat_sekarang"
                                                    class="field textarea small" /></textarea>
                                                </div>
                                                
                                            </li>
            
                                        </ul>
                                        
                                        <ul class="width_medium float_left">
                                            
                                            <li>
                                                <label  class="desc">
                                                    Kewarganegaraan
                                                </label>
                                                <div>
                                                    <input type="radio"  name="warga_negara" id="warga_negara" value="WNI" checked="checked" />WNI
                                                    <input type="radio"  name="warga_negara" id="warga_negara" value="WNA" />WNA
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. KTP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="no_ktp" id="no_ktp"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. Telp
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="telp" id="telp"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. HP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="hp" id="hp"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    E-mail
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="email" id="email"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                            </li>
            								
                                            <li>
                                                <label  class="desc">
                                                    Pendidikan Terakhir <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div class="styled-select">
                                                    <select name="pendidikan_id" id="pendidikan_id">
                                                        <option value=""> SELECT </option>
                                                        {section name=pendidikan loop=$pendidikan}
                                                        <option value="{$pendidikan[pendidikan].pendidikan_id}">
                                                        {$pendidikan[pendidikan].pendidikan|upper}
                                                        </option>
                                                        {/section}
                                                    </select>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Status Pernikahan <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div class="styled-select">
                                                    <select name="status_nikah_id" id="status_nikah_id">
                                                        <option value=""> SELECT </option>
                                                        {section name=pernikahan loop=$pernikahan}
                                                        <option value="{$pernikahan[pernikahan].status_nikah_id}">
                                                        {$pernikahan[pernikahan].status|upper}
                                                        </option>
                                                        {/section}
                                                       
                                                    </select>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <br />
                                            <h1>PERSONAL 2</h1>
                                            
                                        </ul>
                                        
                                        <ul class="width_medium float_left">
                                            
                                            <li>
                                                <label  class="desc">
                                                    NPWP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="npwp" id="npwp"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                   Alamat NPWP
                                                </label>
                                                <div>
                                                    <textarea tabindex="2" cols="50" rows="5" name="alamat_npwp" id="alamat_npwp"
                                                    class="field textarea small" /></textarea>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. Jamsostek
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="no_jamsostek" id="no_jamsostek"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    ID CARD
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="id_card" id="id_card"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. Locker
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="no_kunci" id="no_kunci"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            

                                        </ul>
                                        
                                        <ul class="width_medium float_left">
                                        	<li>
                                                <label  class="desc">
                                                    Divisi <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div class="styled-select">
                                                    <select name="divisi_id" id="divisi_id">
                                                        <option value=""> SELECT </option>
                                                        {section name=divisi loop=$divisi}
                                                        <option value="{$divisi[divisi].divisi_id}">
                                                        {$divisi[divisi].nama_divisi|upper}
                                                        </option>
                                                        {/section}
                                                        
                                                    </select>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Jabatan <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div class="styled-select">
                                                    <select name="jabatan_id" id="jabatan_id">
                                                        <option value=""> SELECT </option>
                                                        {section name=jabatan loop=$jabatan}
                                                        <option value="{$jabatan[jabatan].jabatan_id}">
                                                        {$jabatan[jabatan].jabatan|upper}
                                                        </option>
                                                        {/section}
                                                       
                                                    </select>
                                                </div>
                                                
                                            </li>
                                            <li>
                                                <label  class="desc">
                                                    Status Karyawan <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div class="styled-select">
                                                    <select name="status_karyawan_id" id="status_karyawan_id">
                                                        <option value=""> SELECT </option>
                                                        {section name=status_karyawan loop=$status_karyawan}
                                                        <option value="{$status_karyawan[status_karyawan].status_karyawan_id}">
                                                        {$status_karyawan[status_karyawan].jns_karyawan|upper}
                                                        </option>
                                                        {/section}
                                                       
                                                    </select>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tanggal Masuk <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div>
                                                    <input type="text" name="tgl_masuk" id="tgl_masuk"
                                                    class="field text" style="width:115px"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tanggal Keluar
                                                </label>
                                                <div>
                                                    <input type="text" name="tgl_keluar" id="tgl_keluar"
                                                    class="field text" style="width:115px"/>
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