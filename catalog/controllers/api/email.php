<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Email extends CI_Controller {
	private	$dir_template;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('templates');
		$this->load->helper('url');
		$this->load->library('email');

		/**	SET DIR THEMES*/
		$this->dir_template	= PATH_DIR_THEMES.'home/';

		
		$load_js	= array(array('js' => 'custom_according.menu.js')
							);
		
		$this->smarty->assign('load_js', $load_js);
		$this->smarty->assign('title', TITLE_BAR);
		
	}
	
	public function index(){
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data'					=> ''
			  					);
		
		$this->smarty->view( $this->dir_template.'home.tpl', $var_template );
	}
	
	public function send_smtp(){
		
		$config['protocol'] 	= 'mail';
		$config['smtp_host'] 	= 'smtp.gmail.com';
		$config['smtp_port'] 	= 465;
		$config['smtp_user'] 	= 'idetechnologies@gmail.com';
		$config['smtp_pass']	= 'kirimemail';
		$config['priority'] 	= 1;
		$config['mailtype'] 	= 'html';
		$config['charset'] 		= 'utf-8';
		$config['wordwrap'] 	= TRUE;
		
		$this->email->initialize($config);
		$this->email->from('dartodinus@gmail.com', 'Deka dari gmail');
		$this->email->to('darto@inzpire.net');
		//$this->email->cc('dartodinus@somemail.com');
		//$this->email->bcc('dartodinus@their-example.com');
	
		$this->email->subject('Email Test subject');
		$this->email->message('Testing the email class CodeIgniter <br> <u>Hallo</u>');
	
		$this->email->send();
		echo $this->email->print_debugger();
	}
	
	
}

?>