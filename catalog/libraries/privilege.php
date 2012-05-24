<?PHP  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class CI_Privilege extends CI_Controller{
	
	private	$_table			= 't_group';
	private	$_table_other	= 't_role';
	
	
    public function __construct(){
		
		$this->obj =& get_instance();
		
		$this->obj->load->helper('url');
		$this->obj->load->library('session');
		$this->obj->config->item('base_url');

	}
	
	public function loggedIn(){
		return $this->obj->session->userdata('logged_in_'.$this->obj->uri->segment(1));
	}
	
	public function check($group_id, $page_id, $do = null){
							
		$sql = "SELECT * FROM t_group a, t_role b 
				WHERE a.group_id = b.group_id AND 
				modul_id = '".$page_id."' AND 
				".$do." = '1' AND b.group_id = ".$group_id." ";
				
		$q = $this->obj->db->query($sql);
		if ($q->num_rows() > 0)
			return true;
		else 
			return false; 
	}
	
	public function no_akses() { 
		redirect(INDEX_PAGE.'auth/no_akses'); 
	}


}
?>