<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Education extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');

		$this->load->model(PATH_DIR_1.'education_model');
		
		/**	SET DIR THEMES*/
		$this->dir_template	= PATH_DIR_THEMES .'employe/';
		
		/**	AUTHENTICATION LOGIN */
		if(!$this->privilege->loggedIn())redirect(INDEX_PAGE.'auth');
		
		/**	USER PROFILE */
		$this->user_profiles	= $this->privilege->loggedIn();
		
		/**	CALL FUNCTION */
		
		
		/**	INCLUDE STYLES */
		$load_js	= array(array('js' => '')
							);
		
		$this->smarty->assign('load_js', $load_js);	
		$this->smarty->assign('user_profiles', $this->privilege->loggedIn());
		$this->smarty->assign('title', TITLE_BAR);	
	}
	 
	public function index() {
		redirect(INDEX_PAGE.'employe');
	}
	
	
	public function save() {

		$data['pendidikan_asal_id']		= $this->security->sanitize_filename($this->input->post('pendidikan_asal_id'));
		$data['nip']					= $this->security->sanitize_filename($this->input->post('nip'));
		$data['pendidikan_id']			= $this->security->sanitize_filename($this->input->post('pendidikan_id'));
		$data['nama_instansi']			= $this->security->sanitize_filename($this->input->post('nama_instansi'));
		$data['jurusan']				= $this->security->sanitize_filename($this->input->post('jurusan'));
		$data['thn_lulus']				= $this->security->sanitize_filename($this->input->post('thn_lulus'));
		
		if($data['pendidikan_id'] != '' AND $data['nama_instansi'] != ''){
			if($this->input->post('act') and $this->input->post('act') == 'Add'){
				$this->education_model->insert_pendidikan_asal($data);
				echo '<div class="their">Insert data success</div>';
			}
			
			if($this->input->post('act') and $this->input->post('act') == 'Update'){
				$this->education_model->update_pendidikan_asal($data);
				echo '<div class="their">Update data success</div>';
			}
		}
		
	}
	
	public function del() {
		if($this->uri->segment(4)){
			$data['pendidikan_asal_id']	= $this->uri->segment(4);
			$this->education_model->delete_pendidikan_asal($data);
		}
		
		
	}
	
}


?>