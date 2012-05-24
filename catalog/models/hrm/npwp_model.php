<?PHP
class Npwp_model extends CI_Model{
	
	private	$_table			= 't_npwp';
	private	$_table_other	= '';
	private	$_table_other1	= '';
	private	$_table_other2	= '';
	
    public function __construct() {
        parent::__construct();
    }
    
	public function insert($data){
		$sql = 'INSERT INTO '.$this->_table.' SET	npwp				= "'.$data['npwp'].'",
													nip					= "'.$data['nip'].'",
													alamat				= "'.$data['alamat_npwp'].'"
													';
	
		return $this->db->query($sql);
	}
	
	public function update($data){
		$sql = 'UPDATE '.$this->_table.' SET	npwp				= "'.$data['npwp'].'",
												alamat				= "'.$data['alamat_npwp'].'"
												WHERE nip 			= "'.$data['nip'].'"
												';
	
		return $this->db->query($sql);
	}
	
	public function desc($id){
		$sql 	= 'SELECT * FROM '.$this->_table.' WHERE nip="'.$id.'" ';
		$qry 			= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row_array();
		else
			return null;	
	}
	
}
?>