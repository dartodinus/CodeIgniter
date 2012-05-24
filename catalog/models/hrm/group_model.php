<?PHP
class Group_model extends CI_Model{
	
	private	$_table			= 't_group';
	private	$_table_other	= '';
	
    public function __construct() {
        parent::__construct();
    }
	
	/** FUNGSI UNTUK GROUP USER */
	public function get_all(){
		$sql 			= 'SELECT * FROM '.$this->_table;
		$qry 			= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	
	public function get_perpage($page) {
		$p = ($page - 1) * 20;
		
		$sql 	= 'SELECT  * FROM '.$this->_table.' ORDER BY group_name ASC limit '.$p.' ,20';
		$qry	= $this->db->query($sql);	
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
		
    }
	
	public function count_data(){
		$sql 	= 'SELECT COUNT(group_id) AS jml FROM '.$this->_table;
		$qry 			= $this->db->query($sql);
		
		return $qry->row()->jml;

	}
	
	public function desc($data){
		$sql 	= 'SELECT * FROM '.$this->_table.' WHERE group_id='.$data['group_id'];
		$qry 			= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row_array();
		else
			return null;	
	}
	
	public function check_group($data){
		$sql			= 'SELECT * FROM '.$this->_table.' WHERE group_name = "'.$data['group_name'].'" ';
		$qry 			= $this->db->query($sql);
		$ret['count'] 	= $qry->num_rows();
		return $ret;
	}
	
	public function get_by_desc(){
		$sql 			= 'SELECT * FROM '.$this->_table.' ORDER BY group_id DESC';
		$qry 			= $this->db->query($sql);
		return $qry->row()->group_id;
	}
	
	public function insert($data) {
		$sql = 'INSERT INTO '.$this->_table.' SET	group_name		= "'.$data['group_name'].'",
														group_desc 		= "'.$data['group_desc'].'"
														';
														
		return $this->db->query($sql);

	}
	
	public function update($data) {
		$sql = 'UPDATE '.$this->_table.' SET group_name		= "'.$data['group_name'].'",
											 group_desc 	= "'.$data['group_desc'].'"
											 WHERE group_id = "'.$data['group_id'].'"
											 ';
														
		return $this->db->query($sql);

	}
	
	public function delete($id){
		$sql = 'DELETE FROM '.$this->_table.' WHERE group_id = "'.$id.'" ';
		return $this->db->query($sql);
	}
	

}
?>