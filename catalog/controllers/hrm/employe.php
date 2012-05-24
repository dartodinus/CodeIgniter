<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Employe extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');
		$this->load->helper('url');
		$this->load->helper('ckeditor');
		$this->load->model(PATH_DIR_1.'employe_model');
		$this->load->model(PATH_DIR_1.'company_model');
		$this->load->model(PATH_DIR_1.'religion_model');
		$this->load->model(PATH_DIR_1.'education_model');
		$this->load->model(PATH_DIR_1.'marital_model');
		$this->load->model(PATH_DIR_1.'divisi_model');
		$this->load->model(PATH_DIR_1.'position_model');
		$this->load->model(PATH_DIR_1.'experience_model');
		$this->load->model(PATH_DIR_1.'skill_model');
		$this->load->model(PATH_DIR_1.'npwp_model');
		
		/**	SET DIR THEMES*/
		$this->dir_template	= PATH_DIR_THEMES .'employe/';
		
		/**	AUTHENTICATION LOGIN */
		if(!$this->privilege->loggedIn())redirect(INDEX_PAGE.'auth');
		
		/**	USER PROFILE */
		$this->user_profiles	= $this->privilege->loggedIn();
		
		/**	CALL FUNCTION */
		$this->get_status_karyawan();
		$this->get_all_perusahaan();
		$this->get_all_agama();
		$this->get_all_pendidikan();
		$this->get_all_pernikahan();
		$this->get_all_divisi();
		$this->get_all_jabatan();
		$this->tanggal();
		
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
		
		$res 		= $this->employe_model->get_karyawan_perpage($page);
		$jrx 		= $this->employe_model->count_karyawan();
		
		$maxhal	 	= $jrx / 20;
		$jsisa 		= $jrx % 20;
		
		if($jsisa > 0){
			$maxhal = ceil($maxhal);
		}
		
		
		$n 	= ($page - 1)*20;
		$no = $n + 1;
		
		$page_url = base_url().INDEX_PAGE.'employe/index/';
		
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
		
		$this->smarty->view( $this->dir_template.'view_employe.tpl', $var_template );
		
	}
	
	public function add(){
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_KARYAWAN, TAMBAH)) 
			$this->privilege->no_akses();
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('ckeditor'					=> ''
			  					);

		$this->smarty->view( $this->dir_template.'new_employe.tpl', $var_template );
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
	
	public function get_status_karyawan(){
		$data   = $this->employe_model->get_status_karyawan();
        $this->smarty->assign('status_karyawan', $data);
	}
	
	public function get_all_perusahaan(){
		$data   = $this->company_model->get_all();
        $this->smarty->assign('perusahaan', $data);
	}
	
	public function get_all_agama(){
		$data   = $this->religion_model->get_all();
        $this->smarty->assign('agama', $data);
	}
	
	public function get_all_pendidikan(){
		$data   = $this->education_model->get_all();
        $this->smarty->assign('pendidikan', $data);
	}
	
	public function get_all_pernikahan(){
		$data   = $this->marital_model->get_all();
        $this->smarty->assign('pernikahan', $data);
	}
	
	public function get_all_divisi(){
		$data   = $this->divisi_model->get_all();
        $this->smarty->assign('divisi', $data);
	}
	
	public function get_all_jabatan(){
		$data   = $this->position_model->get_all();
        $this->smarty->assign('jabatan', $data);
	}
	
	
	public function tanggal(){
		
		$date_th	= array();
		$start_date	= date("Y")-50;
		$end_date	= date("Y");
		
		$num = 0;
		for($ii=$start_date; $ii<=$end_date; $ii++){
			$date_th[$num]['th']	= $ii;
			$num++;
		}
		
		$this->smarty->assign('tahun', $date_th);
	}
	
	public function ck_editor($ckeditor='ckeditor', $id='content'){
		
		$data 	= 	array();
		
		//Ckeditor's configuration
		$data[$ckeditor] = array('id'		=> $id,
								  'path'	=> 'third_party/ckeditor',
								  'config'	=> array('toolbar' 	=> "Full", //Using the Full toolbar
													 'width' 	=> '90%',//Setting a custom width
													 'height' 	=> '300px',//Setting a custom height
 															),
								  'styles' 	=> array('style 1'	=> array('name'		=> 'Blue Title',
													 					 'element' 	=> 'h2',
													 					 'styles' 	=> array('color'		=> 'Blue',
													 										 'font-weight'	=> 'bold')
													 					),
													 'style 2' 	=> array('name'		=> 'Red Title',
																		 'element' 	=> 	'h2',
																		 'styles' => array('color'			=> 'Red',
																						   'font-weight'	=> 'bold',
																						   'text-decoration'=> 'underline')
																		)				
													)
								 );
		
		
		return display_ckeditor($data[$ckeditor]);
 
	}
	
}


?>