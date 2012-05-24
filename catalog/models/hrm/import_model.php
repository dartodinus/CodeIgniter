<?PHP
class Import_model extends CI_Model{
	
	private	$_table			= 't_karyawan';
	private	$_table_other	= 't_divisi';
	private	$_table_other1	= 't_jabatan';
	private	$_table_other2	= 't_status_karyawan';
	private $_table_other3	= 't_agama';
	private	$_table_other4	= 't_pendidikan';
	private	$_table_other5	= 't_pendidikan_asal';
	private	$_table_other6	= 't_pengalaman_kerja';
	private	$_table_other7	= 't_npwp';
	
    public function __construct() {
        parent::__construct();
    }
	
	public function insert_data_karyawan($data){
		$sql = 'INSERT INTO '.$this->_table.' SET	nip					= "'.$data['nip'].'",
													username			= "'.$data['username'].'",
													password			= "'.md5($data['password']).'",
													perusahaan_id		= "'.$data['perusahaan_id'].'",
													id_card				= "'.$data['id_card'].'",
													no_ktp				= "'.$data['no_ktp'].'",
													no_jamsostek		= "'.$data['no_jamsostek'].'",
													no_kunci			= "'.$data['no_kunci'].'",
													divisi_id			= "'.$data['divisi_id'].'",
													jabatan_id			= "'.$data['jabatan_id'].'",
													status_karyawan_id	= "'.$data['status_karyawan_id'].'",
													nama				= "'.$data['nama'].'",
													tmpt_lahir			= "'.$data['tmpt_lahir'].'",
													tgl_lahir			= "'.$data['tgl_lahir'].'", 
													jns_kelamin			= "'.$data['jns_kelamin'].'", 
													warga_negara		= "'.$data['warga_negara'].'", 
													agama_id			= "'.$data['agama_id'].'", 
													pendidikan_id		= "'.$data['pendidikan_id'].'", 
													alamat_asal			= "'.$data['alamat'].'",
													telp				= "'.$data['telp'].'", 
													tgl_masuk			= "'.$data['tgl_masuk'].'"
													';
													
		return $this->db->query($sql);
		//return $sql;
	}
    
	public function insert_pendidikan_asal($data){
		$sql = 'INSERT INTO '.$this->_table_other5.' SET	pendidikan_id	= "'.$data['pendidikan_id'].'",
															nip				= "'.$data['nip'].'",
															nama_instansi	= "'.$data['nama_instansi'].'",
															jurusan 		= "'.$data['jurusan'].'",
															thn_lulus		= "'.$data['thn_lulus'].'"
															';
													
		return $this->db->query($sql);
		//return $sql;
	}
	
	public function insert_pengalaman_kerja($data){
		$sql = 'INSERT INTO '.$this->_table_other6.' SET	nip				= "'.$data['nip'].'",
															nama_instansi	= "'.$data['nama_instansi'].'",
															posisi 			= "'.$data['posisi'].'"
															';
													
		return $this->db->query($sql);
		//return $sql;
	}
	
	public function insert_data_npwp($data){
		$sql = 'INSERT INTO '.$this->_table_other7.' SET	npwp			= "'.$data['npwp'].'",
															nip				= "'.$data['nip'].'"
															';
													
		return $this->db->query($sql);
		//return $sql;
	}
	
	/**	SEARCH DATA*/
	public function check_nip($data){
		$sql			= 'SELECT COUNT(nip) AS jml FROM '.$this->_table.' WHERE nip = "'.$data['nip'].'" ';
		$qry 			= $this->db->query($sql);
		return $qry->row()->jml;
	}
	
	
	public function get_nip_karyawan_desc(){
		$sql	 = 'SELECT nip FROM '.$this->_table.' ORDER BY nip DESC';
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row()->nip;
		else
			return null;
			
	}
	
	public function get_record_divisi($like){
		$sql	= 'SELECT divisi_id FROM '.$this->_table_other.' WHERE 1=1 
					AND nama LIKE "%'.$like.'%"  ORDER BY divisi_id limit 1';
		$qry	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row()->divisi_id;
		else
			return null;
			
	}
	
	public function get_record_jabatan($like){
		$sql	= 'SELECT jabatan_id FROM '.$this->_table_other1.' WHERE 1=1 
					AND jabatan LIKE "%'.$like.'%"  ORDER BY jabatan_id limit 1';
		$qry	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row()->jabatan_id;
		else
			return null;
			
	}
	
	public function get_record_status_karyawan($like){
		$sql	= 'SELECT status_karyawan_id FROM '.$this->_table_other2.' WHERE 1=1 
					AND jns_karyawan LIKE "%'.$like.'%"  ORDER BY status_karyawan_id limit 1';
		$qry	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row()->status_karyawan_id;
		else
			return null;
			
	}
	
	public function get_record_agama($like){
		$sql	= 'SELECT agama_id FROM '.$this->_table_other3.' WHERE 1=1 
					AND agama LIKE "%'.$like.'%"  ORDER BY agama_id limit 1';
		$qry	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row()->agama_id;
		else
			return null;
			
	}
	
	public function get_record_pendidikan($like){
		$sql	= 'SELECT pendidikan_id FROM '.$this->_table_other4.' WHERE 1=1 
					AND pendidikan LIKE "%'.$like.'%"  ORDER BY pendidikan_id limit 1';
		$qry	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row()->pendidikan_id;
		else
			return null;
			
	}
	
}
?>