<?PHP
class User_model extends CI_Model{
	
	private	$_table			= 't_user';
	private	$_table_other	= 't_group';
	
    public function __construct() {
        parent::__construct();
    }
	
	/** FUNGSI UNTUK USER */
	public function get_perpage($page) {
		$p = ($page - 1) * 20;
		
		$sql 	= 'SELECT  a.*,
						   b.group_id, b.group_name,b.group_desc
						   FROM '.$this->_table.' a
						   LEFT OUTER JOIN '.$this->_table_other.' b ON a.group_id = b.group_id
						   ORDER BY a.username ASC limit '.$p.' ,20';
		
		$qry	= $this->db->query($sql);	
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
		
    }
	
	public function count_data(){
		
		$sql 	= 'SELECT 	COUNT(a.user_id) AS jml 
							FROM '.$this->_table.' a
							LEFT OUTER JOIN '.$this->_table_other.' b ON a.group_id = b.group_id
							WHERE a.group_id = b.group_id
							';
		
		$qry 	= $this->db->query($sql);
		
		return $qry->row()->jml;

	}
	
	public function desc($data){

		$sql 	= 'SELECT  a.*,
						   b.group_id, b.group_name,b.group_desc
						   FROM '.$this->_table.' a
						   LEFT OUTER JOIN '.$this->_table_other.' b ON a.group_id = b.group_id
						   WHERE a.user_id = "'.$data['user_id'].'" ORDER BY a.username ASC';
		
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row_array();
		else
			return null;
			

	}
	
	public function update_change_password($data){
		
		$sql = 'UPDATE '.$this->_table.' SET  ';
		
		if ($data['password'] != 'default'){
			$sql .= 'password	= "'.md5($data['password']).'", ';
		}
		
		$sql .= 'name 			= "'.$data['name'].'",
				 email			= "'.$data['email'].'",
				 modified_by  	= "'.$data['modified_by'].'",
				 modified_date	= "'.date("Y-m-d H:i:s").'",
				 secret_key 	= "'.$data['secret_key'].'"
				 WHERE user_id 	= "'.$data['user_id'].'" ';
											
		return $this->db->query($sql);
	}
	
	public function check_username($data){
		$sql			= 'SELECT * FROM '.$this->_table.' WHERE username = "'.$data['username'].'" ';
		$qry 			= $this->db->query($sql);
		$ret['count'] 	= $qry->num_rows();
		return $ret;
	}
	
	public function insert($data) {
		$sql = 'INSERT INTO '.$this->_table.' SET	name			= "'.$data['name'].'",
													username		= "'.$data['username'].'",
													password 		= "'.md5($data['password']).'",
													group_id 		= "'.$data['group_id'].'",
													email			= "'.$data['email'].'",
													created_by  	= "'.$data['created_by'].'",
													modified_by  	= "'.$data['modified_by'].'",
													created_date	= "'.date("Y-m-d H:i:s").'",
													modified_date	= "'.date("Y-m-d H:i:s").'",
													secret_key 		= "'.$data['secret_key'].'"
													';
													
		return $this->db->query($sql);

	}
	
	public function update($data) {
		$sql = 'UPDATE '.$this->_table.' SET ';
			
		if ($data['password'] != 'default'){
			$sql .= 'password	= "'.md5($data['password']).'", ';
		}
												
		$sql .= 'name 			= "'.$data['name'].'",
				 group_id 		= "'.$data['group_id'].'",
				 email			= "'.$data['email'].'",
				 modified_by  	= "'.$data['modified_by'].'",
				 modified_date	= "'.date("Y-m-d H:i:s").'",
				 secret_key 	= "'.$data['secret_key'].'"
				 
				 WHERE user_id 	= "'.$data['user_id'].'" ';
													
		return $this->db->query($sql);
		
	}
	
	public function activate($data){

		$sql = 'UPDATE '.$this->_table.' SET status			= "'.$data['status'].'"
											 WHERE user_id 	= "'.$data['user_id'].'" ';
											 
		return $this->db->query($sql);
	}
	
	public function delete($data) {
		$sql = 'DELETE FROM '.$this->_table.' WHERE user_id = "'.$data['user_id'].'" ';
		return $this->db->query($sql);
	}
	

}
?>