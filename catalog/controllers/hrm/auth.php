<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller {
	private	$dir_template;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('encrypt');
		$this->load->library('privilege');
		$this->load->model(PATH_DIR_1.'auth_model');
		
		/**	SET DIR THEMES*/
		$this->dir_template	= PATH_DIR_THEMES .'auth/';
		
		/**	CALL FUNCTION */
		$this->get_group();
		
		/**	INCLUDE STYLES */
		$load_js	= array(array('js' => '')
							);
		
		$this->smarty->assign('title', TITLE_BAR);
		$this->smarty->assign('load_js', $load_js);
	}
	 
	public function index() {
		
		if($this->privilege->loggedIn())redirect(INDEX_PAGE.'home');

		$data['this'] = $this;  
		$status = str_replace('&nbsp;','',$this->uri->segment(4,0));
		if ($status == 'error'){
			$data['status'] = 0;
			$data['error'] 	= 'Login Failed !';
		}else{
			$data['status'] = 1;
			$data['error'] 	= '';
		}
	
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data'					=> $data
			  					);

		$this->smarty->view( $this->dir_template.'auth.tpl', $var_template );
	}
	
	public function get_login(){  
		$data['username']	= $this->security->sanitize_filename($this->input->post('username'));
		$data['password']	= $this->security->sanitize_filename($this->input->post('password'));
		$data['group_id']	= $this->security->sanitize_filename($this->input->post('group_id'));
		
		$logged_in 	= $this->auth_model->get_login($data);

		if($logged_in){
      		$sess_array = array();

      		foreach($logged_in as $row){
        		$sess_array = array('user_id' 		=> $row->user_id,
									'username' 		=> $row->username,
									'name'			=> $row->name,
									'group_id'		=> $row->group_id,
									'email'			=> $row->email,
									'last_login'	=> $row->last_login,
									'last_address'	=> $row->last_address,
									'secret_key'	=> $row->secret_key
        							);
				
        		$this->session->set_userdata('logged_in_'.$this->uri->segment(1), $sess_array);
      		}
			
      		redirect(INDEX_PAGE.'home');
    	}else{
      		redirect(INDEX_PAGE.'auth/index/error');
    	}
			
    }
    
    public function get_group(){
    	
    	$data   = $this->auth_model->get_group();
        $this->smarty->assign('group', $data);
    }
	
	public function no_akses(){
		echo '
		<script type="text/javascript">
			alert("Administrator Area | Access Denied");
			window.history.go(-1);
  		</script>
    	';
	}
	
	public function logout() {
		if(!$this->privilege->loggedIn())redirect(INDEX_PAGE.'auth');
		$user_profiles	= $this->privilege->loggedIn();
	
		$data['user_id']	= $this->security->sanitize_filename($user_profile['user_id']);
		$this->auth_model->get_logout($data);
		
		$this->session->set_userdata('logged_in_'.$this->uri->segment(1), false); 
		
		$this->session->sess_destroy();
		
	
		redirect(INDEX_PAGE.'auth');
		
	}
	

}

?>