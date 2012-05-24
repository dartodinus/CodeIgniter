<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');
		$this->load->helper('language');
		$this->lang->load('dash', 'indonesia');

		/**	SET DIR THEMES*/
		$this->dir_template	= PATH_DIR_THEMES .'home/';
		
		/**	AUTHENTICATION LOGIN */
		if(!$this->privilege->loggedIn())redirect(INDEX_PAGE.'auth');
        
		/**	USER PROFILE */
		$this->user_profiles	= $this->privilege->loggedIn();
        
		/**	INCLUDE STYLES */
		$load_js	= array(array('js' => 'custom_highslide.js')
							);
		
		$this->smarty->assign('load_js', $load_js);
		$this->smarty->assign('user_profiles', $this->privilege->loggedIn());
		$this->smarty->assign('lang', $this->lang->language);
		$this->smarty->assign('title', TITLE_BAR);
	}
	
	public function index() {
		
		/**
		$data	= $this->privilege->loggedIn();
		echo $data['user_id'];
		*/
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data'					=> ''
			  					);

		$this->smarty->view( $this->dir_template.'home.tpl', $var_template );
	}


}


?>