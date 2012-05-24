<?PHP
class Education_model extends CI_Model{
	
	private	$_table			= 't_pendidikan';
	private	$_table_other	= 't_pendidikan_asal';
	private	$_table_other1	= 't_karyawan';
	private	$_table_other2	= 't_pendidikan';
	
    public function __construct() {
        parent::__construct();
    }
    
	/**	TABLE PENDIDIKAN **/
	public function get_all(){
		$sql	 = 'SELECT * FROM '.$this->_table.' ORDER BY pendidikan_id ASC';
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	
	public function get_all_by($data){
		$sql	 = '';
		$sql 	.= 'SELECT  a.*,
						    b.nama,
							c.pendidikan
						    FROM '.$this->_table_other.' a
						    LEFT OUTER JOIN '.$this->_table_other1.' b ON a.nip = b.nip
							LEFT OUTER JOIN '.$this->_table_other2.' c ON a.pendidikan_id = c.pendidikan_id
						    WHERE a.nip = "'.$data['id'].'" ORDER BY a.pendidikan_asal_id DESC limit 20';
							
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	
	/**	TABLE PENDIDIKAN ASAL **/
	public function insert_pendidikan_asal($data){
		$sql = 'INSERT INTO '.$this->_table_other.' SET	pendidikan_id		= "'.$data['pendidikan_id'].'",
														nip					= "'.$data['nip'].'",
														nama_instansi		= "'.$data['nama_instansi'].'",
														jurusan				= "'.$data['jurusan'].'",
														thn_lulus			= "'.$data['thn_lulus'].'"
														';
	
		return $this->db->query($sql);
	}
	
	public function update_pendidikan_asal($data){
		$sql = 'UPDATE '.$this->_table_other.' SET	nip					= "'.$data['nip'].'",
												periode_awal		= "'.$data['periode_awal'].'",
												periode_akhir		= "'.$data['periode_akhir'].'",
												nama_instansi		= "'.$data['nama_instansi'].'",
												posisi				= "'.$data['posisi'].'",
												detail				= "'.$data['detail'].'"
												WHERE pengalaman_id = "'.$data['pengalaman_id'].'"
												';
	
		return $this->db->query($sql);
	}
	
	
	public function desc_pendidikan_asal($data){
		$sql 	= 'SELECT * FROM '.$this->_table_other.' WHERE pengalaman_id = "'.$data['pengalaman_id'].'" AND nip="'.$data['id'].'" ';			
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row_array();
		else
			return null;	
	}
	
	public function delete_pendidikan_asal($data) {
		$sql = 'DELETE FROM '.$this->_table_other.' WHERE pendidikan_asal_id = "'.$data['pendidikan_asal_id'].'" ';
		return $this->db->query($sql);
	}
	
}
?>