<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Skill extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');

		$this->load->model(PATH_DIR_1.'skill_model');
		
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

		$data['skill_id']				= $this->security->sanitize_filename($this->input->post('skill_id'));
		$data['nip']					= $this->security->sanitize_filename($this->input->post('nip'));
		$data['title']					= $this->security->sanitize_filename($this->input->post('title'));
		$data['detail']					= $this->security->sanitize_filename($this->input->post('detail_skill'));
		
		if($data['title'] != ''){
			if($this->input->post('act') and $this->input->post('act') == 'Add'){
				$this->skill_model->insert($data);
				echo '<div class="their">Insert data success</div>';
			}
			
			if($this->input->post('act') and $this->input->post('act') == 'Update'){
				$this->skill_model->update($data);
				echo '<div class="their">Update data success</div>';
			}
		}
		

	}
	
	public function del() {
		if($this->uri->segment(4)){
			$data['skill_id']	= $this->uri->segment(4);
			$this->skill_model->delete($data);
		}
		
		
	}
	
}


?>