<?PHP
class Divisi_model extends CI_Model{
	
	private	$_table			= 't_divisi';
	private	$_table_other	= '';
	private	$_table_other1	= '';
	private	$_table_other2	= '';
	
    public function __construct() {
        parent::__construct();
    }
    
	public function get_all(){
		$sql	 = 'SELECT * FROM '.$this->_table.' ORDER BY nama_divisi ASC';
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	
}
?>