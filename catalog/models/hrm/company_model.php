<?PHP
class Company_model extends CI_Model{
	
	private	$_table			= 't_perusahaan';
	private	$_table_other	= '';
	private	$_table_other1	= '';
	private	$_table_other2	= '';
	
    public function __construct() {
        parent::__construct();
    }

	public function get_all(){
		$sql	 = 'SELECT * FROM '.$this->_table.' ORDER BY nama ASC';
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	
	public function get_perusahaan_perpage($page,$where_clausa=NULL) {
		
		$p = ($page - 1) * 20;
		$sql	 = '';
		$sql 	.= 'SELECT * FORM '.$this->_table.' WHERE 1 = 1 ';
						   
		if($where_clausa != NULL || $where_clausa != ''){
		$sql	.= $where_clausa;
		}
		
		$sql	.= ' ORDER BY nama DESC limit '.$p.' ,20';
		
		$qry	 = $this->db->query($sql);	
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
		

    }
	
	public function count_perusahaan($where_clausa=NULL){
		
		$sql	 = '';
		$sql 	.= 'SELECT 	COUNT(perusahaan_id) AS jml 
							FROM '.$this->_table.' WHERE 1 = 1 ';
		
		if($where_clausa != NULL || $where_clausa != ''){
		$sql	.= $where_clausa;
		}
		
		$qry 			= $this->db->query($sql);
		
		return $qry->row()->jml;
		
	}
	
}
?>