<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Utilities extends CI_Controller {
	private	$dir_template;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('templates');
		$this->load->helper('file');
		$this->load->helper('download');
		$this->load->dbutil();
		
		$this->smarty->assign('title', TITLE_BAR);
	}
	
	public function index(){
		$type		= $this->input->get('type');
		$current	= $this->input->get('current');
	}
	
	public function backup_mysql(){
		//$pathFiles	= 'data/backup_mysql/';
		$pathFiles	= 'D:/WEBSERVER/';
		
		$dbname 	= 'isipe';
	
		if ($this->dbutil->database_exists($dbname)){
			
			$this->use_database('localhost','root','',$dbname);
			$backup	= $this->dbutil->backup();
			
			$fileName	= $pathFiles.date("Ym").'_'.$dbname.'.gz';
			write_file($fileName,$backup);
		}

	}
	
	public function backup_all_mysql(){
		$pathFiles	= 'data/backup_mysql/';
		
		$dbs = $this->dbutil->list_databases();
	
		foreach ($dbs as $db){
			if($db == 'information_schema' || $db == 'mysql' || $db == 'test'){}else{
				if ($this->dbutil->database_exists($db)){
					
					$this->use_database('localhost','root','',$db);
					$backup	= $this->dbutil->backup();
					
					$fileName	= $pathFiles.date("Ym").'_'.$db.'.gz';
					write_file($fileName,$backup);
				}
			}
		}

	}
	
	public function use_database($host=NULL,$user=NULL,$pass=NULL,$dbname=''){
		
		$db['hostname'] = $host;
		$db['username'] = $user;
		$db['password'] = $pass;
		$db['database'] = $dbname;
		$db['dbdriver'] = 'mysql';
		$db['dbprefix'] = '';
		$db['pconnect'] = TRUE;
		$db['db_debug'] = TRUE;
		$db['cache_on'] = FALSE;
		$db['cachedir'] = '';
		$db['char_set'] = 'utf8';
		$db['dbcollat'] = 'utf8_general_ci';

        $this->db = $this->load->database($db, TRUE);

    }
	
	
}

?>