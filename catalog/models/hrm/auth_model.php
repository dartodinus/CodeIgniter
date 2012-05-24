<?PHP
class Auth_model extends CI_Model{
	
	private	$_table			= 't_user';
	private	$_table_other	= 't_group';
	private	$_table_other1	= 't_role';
	
    public function __construct() {
        parent::__construct();
    }
    
    public function get_login($data){
					
		$sql	= 'SELECT	* FROM '.$this->_table.' WHERE username = "'.$data['username'].'"  AND
														 password = "'.md5($data['password']).'" AND
														 group_id = "'.$data['group_id'].'" AND
														 status	  = "A"
							';
		
		$qry	= $this->db->query($sql);
		$rec	= $qry->row();
		

		if($qry->num_rows() == 1){
			$this->db->update($this->_table, array('login_time'		=> date('Y-m-d h:i:s'),
											       'last_login' 	=> date('Y-m-d h:i:s'),
												   'host_addr'		=> $_SERVER['REMOTE_ADDR'], 
												   'last_address'	=> $_SERVER['REMOTE_ADDR']),
							  				 array('user_id'		=> $rec->user_id));
			return $qry->result();
			
		}else{
			return false;
		}


    }  
	
	public function get_logout($data){
		$this->db->update($this->_table, array('logout_time'	=> date('Y-m-d h:i:s'),
											   'last_login' 	=> date('Y-m-d h:i:s'),
											   'last_address'	=> $_SERVER['REMOTE_ADDR']),
										 array('user_id'		=> $data['user_id']));
	}
	
	public function get_group(){
		$sql	= 'SELECT group_id, group_name FROM '.$this->_table_other. ' WHERE status = "A" ';
		$qry	 = $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	
}
?>