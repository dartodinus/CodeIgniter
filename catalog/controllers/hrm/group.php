<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Group extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');

		$this->load->model(PATH_DIR_1.'group_model');
		$this->load->model(PATH_DIR_1.'role_model');
		$this->load->model(PATH_DIR_1.'module_model');
		
		/**	SET DIR THEMES*/
		$this->dir_template		= PATH_DIR_THEMES .'group/';
		
		/**	AUTHENTICATION LOGIN */
		if(!$this->privilege->loggedIn())redirect(INDEX_PAGE.'auth');
		
		/**	USER PROFILE */
		$this->user_profiles	= $this->privilege->loggedIn();
		
		/**	CALL FUNCTION */
		$this->get_modul();
		
		/**	INCLUDE STYLES */
		$load_js	= array(array('js' => 'inline.js'),
							array('js' => 'validate_group.js'),
							array('js' => 'check_all.js'),
							array('js' => 'confirm_del.js')
							);
		
		$this->smarty->assign('load_js', $load_js);	
		$this->smarty->assign('user_profiles', $this->privilege->loggedIn());
		$this->smarty->assign('title', TITLE_BAR);	
	}
	 
	public function index() {
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_PRIVILEDGE, LIHAT)) 
			$this->privilege->no_akses();
		
		/**	PAGINATION*/
		if(!( (int) $this->uri->segment(4))){
			$page 	= 1;
		}else{
			$page 	= $this->uri->segment(4);
		}
		
		$res 		= $this->group_model->get_perpage($page);
		$jrx 		= $this->group_model->count_data();
		
		$maxhal	 	= $jrx / 20;
		$jsisa 		= $jrx % 20;
		
		if($jsisa > 0){
			$maxhal = ceil($maxhal);
		}
		
		$n 	= ($page - 1)*20;
		$no = $n + 1;
		
		$page_url = base_url().INDEX_PAGE.'group/index/';
		
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
		
		$this->smarty->view( $this->dir_template.'view_group.tpl', $var_template );
		
	}
	
	public function add(){
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_PRIVILEDGE, TAMBAH)) 
			$this->privilege->no_akses();
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data'					=> ''
			  					);

		$this->smarty->view( $this->dir_template.'new_group.tpl', $var_template );
	}
	
	public function edit(){  
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_PRIVILEDGE, EDIT)) 
			$this->privilege->no_akses();
		
		$data['group_id']		= $this->uri->segment(4);
		$detail					= $this->group_model->desc($data);
		
		$detail_role			= $this->role_model->desc($data);
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('detail'		=> $detail,
								'detail_modul'	=> $detail_role
			  					);
		
		$this->smarty->view( $this->dir_template.'detail_view_group.tpl', $var_template );
    }
	
	public function save() {
		
		$data['group_id']			= $this->input->post('group_id');
		$data['group_name']			= $this->input->post('group_name');
		$data['group_desc']			= $this->input->post('group_desc');
		
		if($this->input->post('act') and $this->input->post('act') == 'Add'){
			$this->group_model->insert($data);
			
			$get_group_id			= $this->group_model->get_by_desc();
			$this->save_role($get_group_id);
		}
		
		if($this->input->post('act') and $this->input->post('act') == 'Update'){
			$this->group_model->update($data);
			$this->save_role($data['group_id'],'update');
		}

		redirect(INDEX_PAGE.'group');

	}
	
	public function del() {
		if(!$this->privilege->check($this->security->sanitize_filename($this->user_profiles['group_id']),
									INPUT_DATA_PRIVILEDGE, HAPUS)) 
			$this->privilege->no_akses();
		
		if($this->uri->segment(4)){
			$id		= $this->uri->segment(4);
			$this->group_model->delete($id);
			$this->role_model->delete($id);
		}
	
		redirect(INDEX_PAGE.'group');
	}
	
	
	public function activate(){
		
		$data['user_id']	= $this->uri->segment(4);
		$data['status']		= $this->uri->segment(5);
		
		if( ($data['status'] == 'A')  || $data['status'] == 'I' ){
			$this->group_model->activate($data);
		}
		
		redirect(INDEX_PAGE.'group');
	}
	
	public function save_role($group_id,$action='add'){
		$modul_id				= $this->input->post('modul_id');
		
		for($ii=0; $ii< count($modul_id); $ii++){
			$data['modul_id']		= $modul_id[$ii];
			$data['group_id']		= $group_id;
			$data['tambah']			= (int) $this->input->post('tambah_'.$modul_id[$ii]);
			$data['lihat']			= (int) $this->input->post('lihat_'.$modul_id[$ii]);
			$data['ubah']			= (int) $this->input->post('ubah_'.$modul_id[$ii]);
			$data['hapus']			= (int) $this->input->post('hapus_'.$modul_id[$ii]);
		
			($action == 'add' ? $this->role_model->insert($data) : $this->role_model->update($data));
			
		}
		
		
	}
	
	public function check_group() {
		$data['group_name']	= trim($_REQUEST['group_name']);
		$pattern 			= "/^[0-9a-zA-Z_]{3,}$/";
		$valid				= 'true';
		
		if(!preg_match($pattern,$data['group_name'])){
			$valid	= 'false';
		}
		
		
		$result	= $this->group_model->check_group($data);
		if($result['count'] > 0){
			$valid	= 'false';
		}
		echo $valid;
	}
	
	/** FUNGSI MODUL */
	public function get_modul(){
		$data	= $this->module_model->get_all();
		$this->smarty->assign('modul', $data);
	}
	
}


?>