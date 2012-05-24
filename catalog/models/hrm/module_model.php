<?PHP
class Module_model extends CI_Model{
	
	private	$_table			= 't_module';
	private	$_table_other	= '';
	
    public function __construct() {
        parent::__construct();
    }
	
	public function get_all(){
		$sql	= 'SELECT * FROM '.$this->_table;
		$qry	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	

}
?>