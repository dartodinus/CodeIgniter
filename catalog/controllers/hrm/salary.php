<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Salary extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');
		$this->load->helper('url');
		$this->load->model(PATH_DIR_1.'salary_model');
		
		/**	SET DIR THEMES*/
		$this->dir_template	= PATH_DIR_THEMES .'salary/';
		
		/**	AUTHENTICATION LOGIN */
		if(!$this->privilege->loggedIn())redirect(INDEX_PAGE.'auth');
		
		/**	USER PROFILE */
		$this->user_profiles	= $this->privilege->loggedIn();
		
		/**	CALL FUNCTION */

		
		/**	INCLUDE STYLES */
		$load_js	= array(array('js' => 'inline.js'),
							array('js' => 'validate_employe.js'),
							array('js' => 'ajax_form.js'),
							array('js' => 'confirm_del.js')
							);
		
		$this->smarty->assign('load_js', $load_js);	
		$this->smarty->assign('user_profiles', $this->privilege->loggedIn());
		$this->smarty->assign('title', TITLE_BAR);	
	}
	 
	public function index() {
 		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_KARYAWAN, LIHAT)) 
			$this->privilege->no_akses();
		
		/**	PAGINATION*/
		if(!( (int) $this->uri->segment(4))){
			$page 	= 1;
		}else{
			$page 	= $this->security->sanitize_filename($this->uri->segment(4));
		}
		
		$res 		= $this->salary_model->get_salary_perpage($page);
		$jrx 		= $this->salary_model->count_salary();
		
		$maxhal	 	= $jrx / 20;
		$jsisa 		= $jrx % 20;
		
		if($jsisa > 0){
			$maxhal = ceil($maxhal);
		}
		
		
		$n 	= ($page - 1)*20;
		$no = $n + 1;
		
		$page_url = base_url().INDEX_PAGE.'salary/index/';
		
		if($page == 1){
			$btn_prev	= '<li class="previous-off">&laquo;Previous</li>';
		}else{
			$pagemin 	= $page - 1;
			$btn_prev	= '<li><a href="'.$page_url.$pagemin.'">&laquo;Previous</a></li>';
		}
		
		if($page>=$maxhal){
			$btn_next = '<li class="next-off">Next &raquo;</li>';
		}else{
			$pageplus = $page + 1;
			$btn_next = '<li class="next"><a href="'.$page_url.$pageplus.'">Next &raquo;</a></li>';
		}
		
		$pagenum	= array();
		for($i=1; $i < $maxhal+1; $i++){					     
			if($i==$page){
				$pagenum[] = '<li class="active">'.$i.'</li>';
			}else{
				$pagenum[] = '<li><a href="'.$page_url.$i.'">'.$i.'</a></li>';
			}   
		}
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data'					=> $res,
								'Prev'					=> $btn_prev,
								'Next'					=> $btn_next,
								'pagenum'				=> $pagenum,
								'number'				=> $no
			  					);
		
		$this->smarty->view( $this->dir_template.'view_salary.tpl', $var_template );
		
	}
	
	public function add(){
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_KARYAWAN, TAMBAH)) 
			$this->privilege->no_akses();
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('ckeditor'					=> ''
			  					);

		$this->smarty->view( $this->dir_template.'new_salary.tpl', $var_template );
	}
	
	public function edit(){  
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_KARYAWAN, EDIT)) 
			$this->privilege->no_akses();
		
		$data['id']	= $this->security->sanitize_filename($this->uri->segment(4));
		$data_exp	= $this->experience_model->get_all_by($data);
		$data_edu	= $this->education_model->get_all_by($data);
		$data_skill	= $this->skill_model->get_all_by($data);
		
		if($this->uri->segment(5) == 'experience'){
			$act_experience 			= 'Update';
			$data['pengalaman_id']		= $this->security->sanitize_filename( $this->uri->segment(6));
		}else{
			$act_experience	 			= 'Add';
			$data['pengalaman_id']		= '';
		}
		
		if($this->uri->segment(5) == 'education'){
			$act_education 				= 'Update';
			$data['pendidikan_asal_id']	= $this->security->sanitize_filename($this->uri->segment(6));
		}else{
			$act_education 				= 'Add';
			$data['pendidikan_asal_id'] = '';
		}
		
		if($this->uri->segment(5) == 'sallary'){
			$act_sallary 				= 'Update';
			$sallary_id					= $this->security->sanitize_filename($this->uri->segment(6));
		}else{
			$act_sallary 				= 'Add';
			$sallary_id					= '';
		}
		
		if($this->uri->segment(5) == 'skill'){
			$act_skill 					= 'Update';
			$data['skill_id']			= $this->security->sanitize_filename($this->uri->segment(6));
		}else{
			$act_skill 					= 'Add';
			$data['skill_id']			= '';
		}
		
		$detail		= $this->employe_model->desc($data);
		$detail_exp	= $this->experience_model->desc($data);
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data_exp'				=> $data_exp,
								'data_edu'				=> $data_edu,
								'data_skill'			=> $data_skill,
								'act_experience'		=> $act_experience,
								'act_education'			=> $act_education,
								'act_sallary'			=> $act_sallary,
								'act_skill'				=> $act_skill,
								'detail'				=> $detail,
								'detail_exp'			=> $detail_exp,
								'ckeditor'				=> $this->ck_editor('detail_exp', 'detail_exp'),
								'ckeditor2'				=> $this->ck_editor('detail_skill', $id='detail_skill')
			  					);
		
		$this->smarty->view( $this->dir_template.'detail_view_employe.tpl', $var_template );
    }
	
	public function save() {

		$nip_akhir		= $this->employe_model->get_nip_karyawan_desc();
		$no_urut 		= "0000";
		$nomor 			= substr($nip_akhir, 6, 4);
		$nomor 			= (int)$nomor + 1;
		
		$jns_karyawan	= strtolower( $this->security->sanitize_filename($this->input->post('status_karyawan_id')) );
		$convertDate 	= date("y-m-d", strtotime($this->security->sanitize_filename($this->input->post('tgl_masuk'))));
		$exp_date		= explode('-', $convertDate);
		
		$nip			= $exp_date[0].$exp_date[1].'0'.$jns_karyawan.
						  substr($no_urut, 0, 4 - strlen($nomor)) . $nomor;

		$data['username']				= $nip;
		$data['password']				= date("dmY", strtotime($this->security->sanitize_filename($this->input->post('tgl_lahir'))));
		$data['perusahaan_id']			= $this->security->sanitize_filename($this->input->post('perusahaan_id'));
		$data['id_card']				= $this->security->sanitize_filename($this->input->post('id_card'));
		$data['no_ktp']					= $this->security->sanitize_filename($this->input->post('no_ktp'));
		$data['no_jamsostek']			= $this->security->sanitize_filename($this->input->post('no_jamsostek'));
		$data['no_kunci']				= $this->security->sanitize_filename($this->input->post('no_kunci'));
		$data['divisi_id']				= $this->security->sanitize_filename($this->input->post('divisi_id'));
		$data['jabatan_id']				= $this->security->sanitize_filename($this->input->post('jabatan_id'));
		$data['status_karyawan_id']		= $this->security->sanitize_filename($this->input->post('status_karyawan_id'));
		$data['nama']					= $this->security->sanitize_filename($this->input->post('nama'));
		$data['tmpt_lahir']				= $this->security->sanitize_filename($this->input->post('tmpt_lahir'));
		$data['tgl_lahir']				= $this->security->sanitize_filename($this->input->post('tgl_lahir'));
		$data['jns_kelamin']			= $this->security->sanitize_filename($this->input->post('jns_kelamin'));
		$data['warga_negara']			= $this->security->sanitize_filename($this->input->post('warga_negara'));
		$data['agama_id']				= $this->security->sanitize_filename($this->input->post('agama_id'));
		$data['pendidikan_id']			= $this->security->sanitize_filename($this->input->post('pendidikan_id'));
		$data['status_nikah_id']		= $this->security->sanitize_filename($this->input->post('status_nikah_id'));
		$data['alamat_asal']			= $this->security->sanitize_filename($this->input->post('alamat_asal'));
		$data['alamat_sekarang']		= $this->security->sanitize_filename($this->input->post('alamat_sekarang'));
		$data['email']					= $this->security->sanitize_filename($this->input->post('email'));
		$data['hp']						= $this->security->sanitize_filename($this->input->post('hp'));
		$data['telp']					= $this->security->sanitize_filename($this->input->post('telp'));
		$data['tgl_masuk']				= $this->security->sanitize_filename($this->input->post('tgl_masuk'));
		$data['tgl_keluar']				= $this->security->sanitize_filename($this->input->post('tgl_keluar'));
		
		/** NPWP */
		$data['npwp']					= $this->security->sanitize_filename($this->input->post('npwp'));
		$data['alamat_npwp']			= $this->security->sanitize_filename($this->input->post('alamat_npwp'));

		if($this->input->post('act') and $this->input->post('act') == 'Add'){
			$data['nip']				= $nip;
			$this->employe_model->insert($data);
			$this->npwp_model->insert($data);
		}
		
		if($this->input->post('act') and $this->input->post('act') == 'Update'){
			$data['nip']				= $this->security->sanitize_filename($this->input->post('nip'));
			$this->employe_model->update($data);
			$this->npwp_model->update($data);
			redirect(INDEX_PAGE.'employe/edit/'.$data['nip']);
		}

		redirect(INDEX_PAGE.'employe');

	}
	
	public function del() {
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_KARYAWAN, HAPUS)) 
			$this->privilege->no_akses();
		
		if($this->uri->segment(4)){
			$data['id']		= $this->uri->segment(4);
			$this->employe_model->delete($data);
		}
	
		redirect(INDEX_PAGE.'employe');
	}
	
	public function activate(){
		
		$data['nip']		= $this->security->sanitize_filename($this->uri->segment(4));
		$data['status']		= $this->security->sanitize_filename($this->uri->segment(5));
		
		if( ($data['status'] == 'A')  || $data['status'] == 'I' ){
			$this->employe_model->activate($data);
		}
		
		redirect(INDEX_PAGE.'employe');
	}
	
	public function check_nip(){
		$nip	= $this->security->sanitize_filename($this->input->post('nip'));
		
		
		echo '
		<li>
		<label  class="desc">
			Divisi <span class="teks_color">(&lowast;)</span>
		</label>
		<div>
			<input type="text" tabindex="1" name="nama" id="nama"
       		maxlength="255" class="field text medium" value=""/>
		<div>
		
		<label  class="desc">
			Jabatan <span class="teks_color">(&lowast;)</span>
		</label>
		<div>
			<input type="text" tabindex="1" name="nama" id="nama"
       		maxlength="255" class="field text medium" value=""/>
		<div>
		</li>
		';
	}
	
	
	
}


?>