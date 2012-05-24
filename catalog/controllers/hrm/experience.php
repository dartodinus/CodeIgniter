<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Experience extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');

		$this->load->model(PATH_DIR_1.'experience_model');
		
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

		$data['pengalaman_id']			= $this->security->sanitize_filename($this->input->post('pengalaman_id'));
		$data['nip']					= $this->security->sanitize_filename($this->input->post('nip'));
		$data['periode_awal']			= $this->security->sanitize_filename($this->input->post('periode_awal'));
		$data['periode_akhir']			= $this->security->sanitize_filename($this->input->post('periode_akhir'));
		$data['nama_instansi']			= $this->security->sanitize_filename($this->input->post('nama_instansi'));
		$data['posisi']					= $this->security->sanitize_filename($this->input->post('posisi'));
		$data['detail']					= $this->security->sanitize_filename($this->input->post('detail_exp'));
		
		if($data['nama_instansi'] != '' AND $data['posisi'] != ''){
			if($this->input->post('act') and $this->input->post('act') == 'Add'){
				$this->experience_model->insert($data);
				echo '<div class="their">Insert data success</div>';
			}
			
			if($this->input->post('act') and $this->input->post('act') == 'Update'){
				$this->experience_model->update($data);
				echo '<div class="their">Update data success</div>';
			}
		}

	}
	
	public function del() {
		if($this->uri->segment(4)){
			$data['pengalaman_id']	= $this->uri->segment(4);
			$this->experience_model->delete($data);
		}
		
		
	}
	
}


?>