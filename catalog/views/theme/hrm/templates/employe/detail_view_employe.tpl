{include file="{$PATH_DIR_THEMES}header.tpl"}
{if $act_experience == 'Update'}
	{assign var='req_experience' value='Update'}
{else}
	{assign var='req_experience' value='Add'}
{/if} 

{if $act_education == 'Update'}
	{assign var='req_education' value='Update'}
{else}
	{assign var='req_education' value='Add'}
{/if}

{if $act_sallary == 'Update'}
	{assign var='req_sallary' value='Update'}
{else}
	{assign var='req_sallary' value='Add'}
{/if}

{if $act_skill == 'Update'}
	{assign var='req_skill' value='Update'}
{else}
	{assign var='req_skill' value='Add'}
{/if}

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
                                <ul>
                                    <li><a href="#personal">Data Personal</a></li>
                                    <li><a href="#experience">Riwayat Pekerjaan</a></li>
                                    <li><a href="#education">Riwayat Pendidikan</a></li>
                                    <li><a href="#sallary">Gaji</a></li>
                                    <li><a href="#skill">Ketrampilan</a></li>
                                    <!--<li><a href="#keluarga">Keluarga</a></li>-->
                                </ul>
                                
                                <!-- TABS PERSONAL -->
                                <div id="personal">
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
                                                        
                                                        {if $detail['perusahaan_id'] == $perusahaan[perusahaan].perusahaan_id}
                                                            {assign var='sell_perusahaan' value='selected'}
                                                        {else}
                                                            {assign var='sell_perusahaan' value=''}
                                                        {/if}
                                                        
                                                        <option value="{$perusahaan[perusahaan].perusahaan_id}" {$sell_perusahaan}>
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
                                                    NIP 
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nip" id="nip"
                                                    maxlength="255" class="field text medium" disabled="disabled" value="{$detail['nip']}"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Nama <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nama" id="nama"
                                                    maxlength="255" class="field text medium" value="{$detail['nama']}"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tempat Lahir <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="tmpt_lahir" id="tmpt_lahir"
                                                    maxlength="255" class="field text medium" value="{$detail['tmpt_lahir']}"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tanggal Lahir <span class="teks_color">(&lowast;)</span>
                                                </label>
                                                <div>
                                                    <input type="text" name="tgl_lahir" id="tgl_lahir"
                                                    class="field text" style="width:115px" value="{$detail['tgl_lahir']}"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Jenis Kelamin
                                                </label>
                                                <div>
                                                	{if $detail['jns_kelamin'] == 'L'}
                                                    	{assign var='sell_jns_laki' value='checked'}
                                                    {else}
                                                    	{assign var='sell_jns_laki' value=''}
                                                    {/if}
                                                    
                                                    {if $detail['jns_kelamin'] == 'P'}
                                                    	{assign var='sell_jns_wanita' value='checked'}
                                                    {else}
                                                    	{assign var='sell_jns_wanita' value=''}
                                                    {/if}
                                                    
                                                    <input type="radio"  name="jns_kelamin" 
                                                    id="jns_kelamin" value="L" {$sell_jns_laki} />Laki-laki
                                                    <input type="radio"  name="jns_kelamin" 
                                                    id="jns_kelamin" value="P" {$sell_jns_wanita}/>Perempuan
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
                                                        {if $detail['agama_id'] == $agama[agama].agama_id}
                                                            {assign var='sell_agama' value='selected'}
                                                        {else}
                                                            {assign var='sell_agama' value=''}
                                                        {/if}
                                                        
                                                        <option value="{$agama[agama].agama_id}" {$sell_agama}>
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
                                                    class="field textarea small" />{$detail['alamat_asal']}</textarea>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Alamat Sekarang
                                                </label>
                                                <div>
                                                    <textarea tabindex="2" cols="50" rows="5" name="alamat_sekarang" id="alamat_sekarang"
                                                    class="field textarea small" />{$detail['alamat_sekarang']}</textarea>
                                                </div>
                                                
                                            </li>
            
                                        </ul>
                                        
                                        <ul class="width_medium float_left">
                                            
                                            <li>
                                                <label  class="desc">
                                                    Kewarganegaraan
                                                </label>
                                                <div>
                                                	{if $detail['warga_negara'] == 'WNA'}
                                                    	{assign var='sell_wna' value='checked'}
                                                    {else}
                                                    	{assign var='sell_wna' value=''}
                                                    {/if}
                                                    
                                                    {if $detail['warga_negara'] == 'WNI'}
                                                    	{assign var='sell_wni' value='checked'}
                                                    {else}
                                                    	{assign var='sell_wni' value=''}
                                                    {/if}
                                                    
                                                    <input type="radio"  name="warga_negara" id="warga_negara" value="WNI" {$sell_wni} />WNI
                                                    <input type="radio"  name="warga_negara" id="warga_negara" value="WNA" {$sell_wna}/>WNA
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. KTP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="no_ktp" id="no_ktp"
                                                    maxlength="255" class="field text medium" value="{$detail['no_ktp']}"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. Telp
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="telp" id="telp"
                                                    maxlength="255" class="field text medium" value="{$detail['telp']}"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. HP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="hp" id="hp"
                                                    maxlength="255" class="field text medium" value="{$detail['hp']}"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    E-mail
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="email" id="email"
                                                    maxlength="255" class="field text medium" value="{$detail['email']}"/>
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
                                                        {if $detail['pendidikan_id'] == $pendidikan[pendidikan].pendidikan_id}
                                                            {assign var='sell_pendidikan' value='selected'}
                                                        {else}
                                                            {assign var='sell_pendidikan' value=''}
                                                        {/if}
                                                        
                                                        <option value="{$pendidikan[pendidikan].pendidikan_id}" {$sell_pendidikan}>
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
                                                        {if $detail['status_nikah_id'] == $pernikahan[pernikahan].status_nikah_id}
                                                            {assign var='sell_nikah' value='selected'}
                                                        {else}
                                                            {assign var='sell_nikah' value=''}
                                                        {/if}
                                                        
                                                        <option value="{$pernikahan[pernikahan].status_nikah_id}" {$sell_nikah}>
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
                                                    maxlength="255" class="field text medium" value="{$detail['npwp']}"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                   Alamat NPWP
                                                </label>
                                                <div>
                                                    <textarea tabindex="2" cols="50" rows="5" name="alamat_npwp" id="alamat_npwp"
                                                    class="field textarea small" />{$detail['alamat_npwp']}</textarea>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. Jamsostek
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="no_jamsostek" id="no_jamsostek"
                                                    maxlength="255" class="field text medium" value="{$detail['no_jamsostek']}"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    ID CARD
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="id_card" id="id_card"
                                                    maxlength="255" class="field text medium" value="{$detail['id_card']}"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    No. Locker
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="no_kunci" id="no_kunci"
                                                    maxlength="255" class="field text medium" value="{$detail['no_kunci']}"/>
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
                                                        {if $detail['divisi_id'] == $divisi[divisi].divisi_id}
                                                            {assign var='sell_divisi' value='selected'}
                                                        {else}
                                                            {assign var='sell_divisi' value=''}
                                                        {/if}
                                                        
                                                        <option value="{$divisi[divisi].divisi_id}" {$sell_divisi}>
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
                                                        {if $detail['jabatan_id'] == $jabatan[jabatan].jabatan_id}
                                                            {assign var='sell_jabatan' value='selected'}
                                                        {else}
                                                            {assign var='sell_jabatan' value=''}
                                                        {/if}
                                                        <option value="{$jabatan[jabatan].jabatan_id}" {$sell_jabatan}>
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
                                                        {if $detail['status_karyawan_id'] == $status_karyawan[status_karyawan].status_karyawan_id}
                                                            {assign var='sell_status_karyawan' value='selected'}
                                                        {else}
                                                            {assign var='sell_status_karyawan' value=''}
                                                        {/if}
                                                        
                                                        <option value="{$status_karyawan[status_karyawan].status_karyawan_id}" {$sell_status_karyawan}>
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
                                                    class="field text" style="width:115px" value="{$detail['tgl_masuk']}"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tanggal Keluar
                                                </label>
                                                <div>
                                                	{if $detail['tgl_keluar'] != '0000-00-00'}
                                                    <input type="text" name="tgl_keluar" id="tgl_keluar"
                                                    class="field text" style="width:115px" value="{$detail['tgl_keluar']}"/>
                                                    {else}
                                                    <input type="text" name="tgl_keluar" id="tgl_keluar"
                                                    class="field text" style="width:115px"/>
                                                    {/if}
                                                </div>
                                                
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                            	<input type="hidden" name="nip" id="nip" value="{$detail['nip']}" />
                                                <input type="hidden" name="act" id="act" value="Update" />
                                                <button type="submit" value="Submit" class="ui-state-default ui-corner-all" 
                                                id="saveForm">Update</button>
                                            </li>
                                        </ul>
                                    </form>	
                                </div>
                                <!-- END TABS PERSONAL -->
                                
                                <!-- TABS RIWAYAT PEKERJAAN -->
                                <div id="experience">
                                	<!--
                                	<div id="load" align="center">
                                    <img src="{$PATH_DIR_IMG}loading.gif" width="28" height="28" align="absmiddle"/> Loading...
                                    </div>
                                    -->
                                    
                                    <form class="form_submit" method="post" action="{$BASE_URL}experience/save">
                                    	<div id="result"></div>
                                        <ul class="width_full float_left">
                                            <br>
                                            <h1>RIWAYAT PEKERJAAN</h1>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li>
                                                <label  class="desc">
                                                    NIP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nip" id="nip"
                                                    maxlength="255" class="field text small" disabled="disabled" value="{$detail['nip']}"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Periode
                                                </label>
                                                <div class="styled-select">
                                                    <select name="periode_awal" id="periode_awal">
                                                        {section name=tahun loop=$tahun}
                                                        {if $detail_exp['periode_awal'] == $tahun[tahun].th}
                                                            {assign var='sell_periode_awal' value='selected'}
                                                        {else}
                                                            {assign var='sell_periode_awal' value=''}
                                                        {/if}
                                                        
                                                        <option value="{$tahun[tahun].th}" {$sell_periode_awal}>{$tahun[tahun].th}</option>
                                                        {/section}
                                                    </select>
                                                    s/d
                                                    <select name="periode_akhir" id="periode_akhir">
                                                        {section name=tahun loop=$tahun}
                                                        {if $detail_exp['periode_akhir'] == $tahun[tahun].th}
                                                            {assign var='sell_periode_akhir' value='selected'}
                                                        {else}
                                                            {assign var='sell_periode_akhir' value=''}
                                                        {/if}
                                                        
                                                        <option value="{$tahun[tahun].th}" {$sell_periode_akhir}>{$tahun[tahun].th}</option>
                                                        {/section}
                                                    </select>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Nama Instansi
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nama_instansi" id="nama_instansi"
                                                    maxlength="255" class="field text small" value="{$detail_exp['nama_instansi']}" />
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Posisi / Jabatan
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="posisi" id="posisi"
                                                    maxlength="255" class="field text small" value="{$detail_exp['posisi']}"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Dekripsi Pekerjaan
                                                </label>
                                                <div>
                                                    <textarea tabindex="2" cols="50" rows="5" class="field textarea small" 
                                                    name="detail_exp" id="detail_exp" >{$detail_exp['detail']}</textarea>
                                                    {$ckeditor}
                                                </div>
                                                
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                            	<input type="hidden" name="pengalaman_id" 
                                                id="pengalaman_id" value="{$data_exp[data_exp].pengalaman_id}" />
                                                <input type="hidden" name="nip" id="nip" value="{$detail['nip']}" />
                                                <input type="hidden" name="act" id="act" value="{$req_experience}" />
                                                <button type="submit" value="Submit" class="ui-state-default ui-corner-all" 
                                                id="saveForm">{$req_experience}</button>
                                            </li>
                                        </ul>
                                    </form>
                                    
                                    <!-- box-form-full -->
                                    <div class="box-form-full">
                                    
                                        <!-- HOSTABLE -->
                                        <div class="hastable">
                                        	<div class="scroll">
                                            <table style="width:1500px;"> 
                                                <thead> 
                                                    <tr>
                                                        <th>NIP</th> 
                                                        <th>Nama</th>
                                                        <th>Periode</th> 
                                                        <th>Instansi</th> 
                                                        <th>Posisi / Jabatan</th> 
                                                        <th>Deskripsi Pekerjaan</th>
                                                        <th style="width:132px">Options</th> 
                                                    </tr> 
                                                </thead> 
                                                
                                                <tbody> 
                                                	{section name=data_exp loop=$data_exp}
                                                    <tr>
                                                        <td>{$data_exp[data_exp].nip}</td>
                                                        <td>{$data_exp[data_exp].nama}</td>
                                                        <td>
                                                        	{$data_exp[data_exp].periode_awal} 
                                                            -
                                                            {$data_exp[data_exp].periode_akhir}
                                                        </td>
                                                        <td>{$data_exp[data_exp].nama_instansi}</td>
                                                        <td>{$data_exp[data_exp].posisi}</td>
                                                        <td>{$data_exp[data_exp].detail}</td>
                                                        <td width="70">
                                                            <a class="btn_no_text btn ui-state-default ui-corner-all tooltip edit" 
                                                            title="Edit" href="{$BASE_URL}employe/edit/{$detail['nip']}/experience/{$data_exp[data_exp].pengalaman_id}">
                                                                <span class="ui-icon ui-icon-wrench"></span>
                                                            </a>
                                                            
                                                            <a class="btn_no_text btn ui-state-default ui-corner-all tooltip delete"
                                                            title="Delete" href="{$BASE_URL}experience/del/{$data_exp[data_exp].pengalaman_id}">
                                                                <span class="ui-icon ui-icon-trash"></span>
                                                            </a>
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
                                    
                                </div>
                                <!-- END TABS RIWAYAT PEKERJAAN -->
                                 
                                <!-- TABS RIWAYAT PENDIDIKAN -->
                                <div id="education">
                                    <form class="form_submit" method="post" action="{$BASE_URL}education/save">
                                    	<div id="result"></div>
                                        <ul class="width_full float_left">
                                            <br>
                                            <h1>PENDIDIKAN FORMAL</h1>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                        	<li>
                                                <label  class="desc">
                                                    NIP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nip" id="nip"
                                                    maxlength="255" class="field text small" disabled="disabled" value="{$detail['nip']}"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tingkat Pendidikan
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
                                                    Nama Sekolah
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nama_instansi" id="nama_instansi"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Jurusan
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="jurusan" id="jurusan"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                                
                                            </li>
            
                                            <li>
                                                <label  class="desc">
                                                    Tahun Lulus
                                                </label>
                                                <div class="styled-select">
                                                    <select name="thn_lulus" id="thn_lulus">
                                                        <option value=""> SELECT </option>
                                                        {section name=tahun loop=$tahun}
                                                        <option value="{$tahun[tahun].th}">{$tahun[tahun].th}</option>
                                                        {/section}
                                                    </select>
                                                </div>
                                                
                                            </li>
            
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                            	<input type="hidden" name="pendidikan_asal_id" 
                                                id="pendidikan_asal_id" value="{$data_edu[data_edu].pendidikan_asal_id}" />
                                                <input type="hidden" name="nip" id="nip" value="{$detail['nip']}" />
                                                <input type="hidden" name="act" id="act" value="{$req_education}" />
                                                <button type="submit" value="Submit" class="ui-state-default ui-corner-all" 
                                                id="saveForm">{$req_education}</button>
                                            </li>
                                        </ul>
                                    
                                    </form>
                                    
                                    <!-- box-form-full -->
                                    <div class="box-form-full">
                                    
                                        <!-- HOSTABLE -->
                                        <div class="hastable">
                                        	<div class="scroll">
                                            <table> 
                                                <thead> 
                                                    <tr>
                                                        <th>NIP</th> 
                                                        <th>Nama</th>
                                                        <th>Pendidikan</th> 
                                                        <th>Nama Instansi</th> 
                                                        <th>Jurusan</th>
                                                        <th>Tahun Kelulusan</th>
                                                         <th style="width:132px">Options</th> 
                                                    </tr> 
                                                </thead> 
                                                
                                                <tbody> 
                                                	{section name=data_edu loop=$data_edu}
                                                    <tr>
                                                        <td>{$data_edu[data_edu].nip}</td>
                                                        <td>{$data_edu[data_edu].nama}</td>
                                                        <td>{$data_edu[data_edu].pendidikan}</td>
                                                        <td>{$data_edu[data_edu].nama_instansi}</td>
                                                        <td>{$data_edu[data_edu].jurusan}</td>
                                                        <td>{$data_edu[data_edu].thn_lulus}</td>
                                                        <td width="70">
                                                            <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" 
                                                            title="Edit" 
                                                            href="{$BASE_URL}employe/edit/{$data_edu[data_edu].nip}/pendidikan/{$data_edu[data_edu].pendidikan_asal_id}#riwayat_pendidikan">
                                                                <span class="ui-icon ui-icon-wrench"></span>
                                                            </a>
                                                            
                                                            <a class="btn_no_text btn ui-state-default ui-corner-all tooltip delete"
                                                            title="Delete" 
                                                            href="{$BASE_URL}education/del/{$data_edu[data_edu].pendidikan_asal_id}">
                                                                <span class="ui-icon ui-icon-trash"></span>
                                                            </a>
                                                            
                                                            
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
                                
                                </div>
                                <!-- END TABS RIWAYAT PENDIDIKAN -->
                                
                                <!-- TABS GAJI -->	
                                <div id="sallary">
                                    <form id="formAdd" method="post" action="{$BASE_URL}#">
                                        <ul class="width_full float_left">
                                            <h1>REKENING</h1>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li>
                                                <label  class="desc">
                                                    Bank / Rekening
                                                </label>
                                                <div class="styled-select">
                                                    <select name="perusahaan_id" id="perusahaan_id">
                                                        <option value=""> SELECT </option>
                                                        <option>BCA</option>
                                                        
                                                    </select>
                                                    
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Atas Nama
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                                
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <br>
                                            <h1>NOMINAL GAJI</h1>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                        	<li>
                                                <label  class="desc">
                                                    NIP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nip" id="nip"
                                                    maxlength="255" class="field text small" disabled="disabled" value="{$detail['nip']}"/>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <br>
                                            <h1>TUNJANGAN</h1>
                                        </ul>
                                        
                                        <ul class="width_medium float_left">
                                            
                                            <li>
                                                <label  class="desc">
                                                    Gaji Insentif
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tunjangan Jabatan
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tunjangan Transport
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_medium float_left">
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tunjangan Harian
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tunjangan Lembur
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Tunjangan Lain2
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="username" id="username"
                                                    maxlength="255" class="field text medium"/>
                                                </div>
                                                
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                                <input type="hidden" name="act" id="act" value="{$req_sallary}" />
                                                <button type="submit" value="Submit" class="ui-state-default ui-corner-all" 
                                                id="saveForm">{$req_sallary}</button>
                                            </li>
                                        </ul>
                                    </form>
                                    
                                    
                                    
                                </div>	
                                <!-- END TABS GAJI -->
                                
                                <!-- TABS KETERAMPILAN -->
                                <div id="skill">
                                   <form class="form_submit" method="post" action="{$BASE_URL}skill/save">
                                    	<div id="result"></div>
                                        <ul class="width_full float_left">
                                            <h1>KETRAMPILAN / KEAHLIAN</h1>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                        	<li>
                                                <label  class="desc">
                                                    NIP
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="nip" id="nip"
                                                    maxlength="255" class="field text small" disabled="disabled" value="{$detail['nip']}"/>
                                                </div>
                                            </li>
                                            <li>
                                                <label  class="desc">
                                                    Title
                                                </label>
                                                <div>
                                                    <input type="text" tabindex="1" name="title" id="title"
                                                    maxlength="255" class="field text small"/>
                                                </div>
                                                
                                            </li>
                                            
                                            <li>
                                                <label  class="desc">
                                                    Dekripsi
                                                </label>
                                                <div>
                                                    <textarea class="form-field medium" name="detail_skill" id="detail_skill"></textarea>
                                                    {$ckeditor2}
                                                </div>
                                                
                                            </li>
                                        </ul>
                                        
                                        <ul class="width_full float_left">
                                            <li class="buttons">
                                            	<input type="hidden" name="skill_id" 
                                                id="skill_id" value="{$data_skill[data_skill].skill_id}" />
                                                <input type="hidden" name="nip" id="nip" value="{$detail['nip']}" />
                                               
                                                <input type="hidden" name="act" id="act" value="{$req_skill}" />
                                                <button type="submit" value="Submit" class="ui-state-default ui-corner-all" 
                                                id="saveForm">{$req_skill}</button>
                                            </li>
                                        </ul>
                                    </form>
                                    
                                    <!-- box-form-full -->
                                    <div class="box-form-full">
                                    
                                        <!-- HOSTABLE -->
                                        <div class="hastable">
                                        	<div class="scroll">
                                            <table> 
                                                <thead> 
                                                    <tr>
                                                        <th>NIP</th> 
                                                        <th>Nama</th>
                                                        <th>Title</th> 
                                                        <th>Deskripsi</th>
                                                         <th style="width:132px">Options</th> 
                                                    </tr> 
                                                </thead> 
                                                
                                                <tbody> 
                                                	{section name=data_skill loop=$data_skill}
                                                    <tr>
                                                        <td>{$data_skill[data_skill].nip}</td>
                                                        <td>{$data_skill[data_skill].nama}</td>
                                                        <td>{$data_skill[data_skill].title}</td>
                                                        <td>{$data_skill[data_skill].detail}</td>
                                                        <td width="70">
                                                            <a class="btn_no_text btn ui-state-default ui-corner-all tooltip" 
                                                            title="Edit" href="{$BASE_URL}employe/edit/edit_account/{$data[data].username}">
                                                                <span class="ui-icon ui-icon-wrench"></span>
                                                            </a>
                                                            
                                                            <a class="btn_no_text btn ui-state-default ui-corner-all tooltip delete"
                                                            title="Delete" 
                                                            href="{$BASE_URL}skill/del/{$data_skill[data_skill].skill_id}">
                                                                <span class="ui-icon ui-icon-trash"></span>
                                                            </a>
                                                            
                                                            
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
                                </div>	
                                <!-- END TABS KETERAMPILAN -->
           
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