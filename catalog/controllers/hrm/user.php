<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');
		$this->load->library('encrypt');
		
		$this->load->model(PATH_DIR_1.'user_model');
		$this->load->model(PATH_DIR_1.'group_model');
		
		/**	SET DIR THEMES*/
		$this->dir_template	= PATH_DIR_THEMES .'user/';
		
		/**	AUTHENTICATION LOGIN */
		if(!$this->privilege->loggedIn())redirect(INDEX_PAGE.'auth');
		
		/**	USER PROFILE */
		$this->user_profiles	= $this->privilege->loggedIn();
		
		/**	CALL FUNCTION */
		$this->get_group();
		
		/**	INCLUDE STYLES */
		$load_js	= array(array('js' => 'inline.js'),
							array('js' => 'validate_user.js'),
							array('js' => 'post_submit.js'),
							array('js' => 'confirm_del.js')
							);
		
		$this->smarty->assign('load_js', $load_js);	
		$this->smarty->assign('user_profiles', $this->privilege->loggedIn());
		$this->smarty->assign('title', TITLE_BAR);	
	}
	 
	public function index() {
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_ACCOUNT, LIHAT)) 
			$this->privilege->no_akses();
		
		/**	PAGINATION*/
		if(!( (int) $this->uri->segment(4))){
			$page 	= 1;
		}else{
			$page 	= $this->security->sanitize_filename($this->uri->segment(4));
		}
		
		$res 		= $this->user_model->get_perpage($page);
		$jrx 		= $this->user_model->count_data();
		
		$maxhal	 	= $jrx / 20;
		$jsisa 		= $jrx % 20;
		
		if($jsisa > 0){
			$maxhal = ceil($maxhal);
		}
		
		
		$n 	= ($page - 1)*20;
		$no = $n + 1;
		
		$page_url = base_url().INDEX_PAGE.'user/index/';
		
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
		
		$this->smarty->view( $this->dir_template.'view_user.tpl', $var_template );
		
	}
	
	public function add(){
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_ACCOUNT, TAMBAH)) 
			$this->privilege->no_akses();
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data'					=> ''
			  					);

		$this->smarty->view( $this->dir_template.'new_user.tpl', $var_template );
	}
	
	public function edit(){  
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_ACCOUNT, EDIT)) 
			$this->privilege->no_akses();
		
		$data['user_id']	= $this->security->sanitize_filename($this->uri->segment(4));
		$detail				= $this->user_model->desc($data);
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('detail'	=> $detail
			  					);
		
		$this->smarty->view( $this->dir_template.'detail_view_user.tpl', $var_template );
    }
	
	public function save() {
		$data['user_id']			= $this->security->sanitize_filename($this->input->post('user_id'));
		$data['name']				= $this->security->sanitize_filename($this->input->post('name'));
		$data['username']			= $this->security->sanitize_filename($this->input->post('username'));
		$data['password']			= $this->security->sanitize_filename($this->input->post('password1'));
		$data['group_id']			= $this->security->sanitize_filename($this->input->post('group_id'));
		$data['email']				= $this->security->sanitize_filename($this->input->post('email'));
		$data['created_by']			= $this->security->sanitize_filename($this->user_profiles['username']);
		$data['modified_by']		= $this->security->sanitize_filename($this->user_profiles['username']);
		$data['secret_key']			= $this->encrypt->encode(date("YmdHis").'-'.
															 $data['username'].'-'.
															 $data['password'].'-'.
															 $data['group_id']);

		if($this->input->post('act') and $this->input->post('act') == 'Add'){
			$this->user_model->insert($data);
			echo '<div class="their">Insert data success</div>';
		}
		
		if($this->input->post('act') and $this->input->post('act') == 'Update'){
			$this->user_model->update($data);
			echo '<div class="their">Update data success</div>';
		}

		//redirect(INDEX_PAGE.'user');

	}
	
	public function del() {
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_ACCOUNT, HAPUS)) 
			$this->privilege->no_akses();
		
		if($this->uri->segment(4)){
			$id		= $this->security->sanitize_filename($this->uri->segment(4));
			$this->user_model->delete($id);
		}
	
		redirect(INDEX_PAGE.'user');
	}
	
	public function change_password(){
		$data['user_id']	= $this->security->sanitize_filename($this->user_profiles['user_id']);
		$detail				= $this->user_model->desc($data);
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('detail'	=> $detail
			  					);
		
		$this->smarty->view( $this->dir_template.'change_password.tpl', $var_template );
	}
	
	public function update_change_password(){
		$data['user_id']			= $this->security->sanitize_filename($this->input->post('user_id'));
		$data['name']				= $this->security->sanitize_filename($this->input->post('name'));
		$data['password']			= $this->security->sanitize_filename($this->input->post('password1'));
		$data['email']				= $this->security->sanitize_filename($this->input->post('email'));
		$data['modified_by']		= $this->security->sanitize_filename($this->user_profiles['username']);
		$data['secret_key']			= $this->encrypt->encode(date("YmdHis").'-'.
															 $this->security->sanitize_filename($this->user_profiles['username']).'-'.
															 $data['password'].'-'.
															 $this->user_profiles['group_id']);
		
		$this->user_model->update_change_password($data);
		redirect(INDEX_PAGE.'auth/logout');
	}
	
	public function check_username() {
		$data['username']	= trim($_REQUEST['username']);
		$pattern 			= "/^[0-9a-zA-Z_]{3,}$/";
		$valid				= 'true';
		
		if(!preg_match($pattern,$data['username'])){
			$valid	= 'false';
		}
		
		
		$result	= $this->user_model->check_username($data);
		if($result['count'] > 0){
			$valid	= 'false';
		}
		echo $valid;
	}
	
	public function activate(){
		
		$data['user_id']	= $this->security->sanitize_filename($this->uri->segment(4));
		$data['status']		= $this->security->sanitize_filename($this->uri->segment(5));
		
		if( ($data['status'] == 'A')  || $data['status'] == 'I' ){
			$this->user_model->activate($data);
		}
		
		redirect(INDEX_PAGE.'user');
	}
	
	/** FUNGSI GROUP */
	public function get_group(){
		$data	= $this->group_model->get_all();
		$this->smarty->assign('group', $data);
	}
	
}


?>