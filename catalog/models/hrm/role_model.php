<?PHP
class Role_model extends CI_Model{
	
	private	$_table			= 't_role';
	private	$_table_other	= 't_module';
	
    public function __construct() {
        parent::__construct();
    }
	
	/** FUNGSI UNTUK ROLE */
	public function insert($data) {
		$sql = 'INSERT INTO '.$this->_table.' SET modul_id	= "'.$data['modul_id'].'",
												  group_id	= "'.$data['group_id'].'",
												  tambah 	= "'.$data['tambah'].'",
												  lihat 	= "'.$data['lihat'].'",
												  ubah		= "'.$data['ubah'].'",
												  hapus  	= "'.$data['hapus'].'"
												  ';
													
		return $this->db->query($sql);

	}
	
	public function update($data) {
		
		if($this->count_data($data) > 0){
			$sql = 'UPDATE '.$this->_table.' SET tambah 		= "'.$data['tambah'].'",
												 lihat 			= "'.$data['lihat'].'",
												 ubah			= "'.$data['ubah'].'",
												 hapus  		= "'.$data['hapus'].'"
												 WHERE group_id = "'.$data['group_id'].'" AND
													   modul_id = "'.$data['modul_id'].'" ';
															
													
			return $this->db->query($sql);
		}else{
			$this->insert($data);
		}
		
	}
	
	public function count_data($data){
		$sql 	= 'SELECT COUNT(role_id) AS jml FROM '.$this->_table.' WHERE group_id = "'.$data['group_id'].'" AND
											 	   							 modul_id = "'.$data['modul_id'].'" ';
		$qry 	= $this->db->query($sql);
		
		return $qry->row()->jml;

	}
	
	public function desc($data){
		$sql 	= 'SELECT  a.*,
						   b.modul_id, b.modul_name
						   FROM '.$this->_table.' a
						   LEFT OUTER JOIN '.$this->_table_other.' b ON a.modul_id = b.modul_id
						   WHERE group_id ='.$data['group_id'];
						   
		$qry	= $this->db->query($sql);	
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
		
	}
	
	public function delete($id){
		$sql = 'DELETE FROM '.$this->_table.' WHERE group_id = "'.$id.'" ';
		return $this->db->query($sql);
	}
	

}
?>