<?PHP
class Experience_model extends CI_Model{
	
	private	$_table			= 't_pengalaman_kerja';
	private	$_table_other	= 't_karyawan';
	private	$_table_other1	= '';
	private	$_table_other2	= '';
	
    public function __construct() {
        parent::__construct();
    }
	
	public function get_all_by($data){
		$sql	 = '';
		$sql 	.= 'SELECT  a.*,
						    b.nama
						    FROM '.$this->_table.' a
						    LEFT OUTER JOIN '.$this->_table_other.' b ON a.nip = b.nip
						    WHERE a.nip = "'.$data['id'].'" ORDER BY a.pengalaman_id DESC limit 20';
							
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	
	public function insert($data){
		$sql = 'INSERT INTO '.$this->_table.' SET	nip					= "'.$data['nip'].'",
													periode_awal		= "'.$data['periode_awal'].'",
													periode_akhir		= "'.$data['periode_akhir'].'",
													nama_instansi		= "'.$data['nama_instansi'].'",
													posisi				= "'.$data['posisi'].'",
													detail				= "'.$data['detail'].'"
													';
	
		return $this->db->query($sql);
	}
	
	public function update($data){
		$sql = 'UPDATE '.$this->_table.' SET	nip					= "'.$data['nip'].'",
												periode_awal		= "'.$data['periode_awal'].'",
												periode_akhir		= "'.$data['periode_akhir'].'",
												nama_instansi		= "'.$data['nama_instansi'].'",
												posisi				= "'.$data['posisi'].'",
												detail				= "'.$data['detail'].'"
												WHERE pengalaman_id = "'.$data['pengalaman_id'].'"
												';
	
		return $this->db->query($sql);
	}
	
	
	public function desc($data){
		$sql 	= 'SELECT * FROM '.$this->_table.' WHERE pengalaman_id = "'.$data['pengalaman_id'].'" AND nip="'.$data['id'].'" ';			
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row_array();
		else
			return null;	
	}
	
	public function delete($data) {
		$sql = 'DELETE FROM '.$this->_table.' WHERE pengalaman_id = "'.$data['pengalaman_id'].'" ';
		return $this->db->query($sql);
	}
	
}
?>