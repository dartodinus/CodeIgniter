<?PHP
class Salary_model extends CI_Model{
	
	private	$_table			= 't_gaji';
	private	$_table_other	= 't_karyawan';
	private	$_table_other1	= 't_divisi';
	private	$_table_other2	= 't_jabatan';
	private $_table_other3	= 't_status_karyawan';
	
    public function __construct() {
        parent::__construct();
    }
    
	public function get_salary_perpage($page,$where_clausa=NULL) {
		
		$p = ($page - 1) * 20;
		$sql	 = '';
		$sql 	.= 'SELECT  a.*,
							b.nip, b.nama,
						    c.divisi_id, c.nama_divisi,
						    d.jabatan_id, d.jabatan,
						    e.status_karyawan_id, e.jns_karyawan
						    FROM '.$this->_table.' a
						    LEFT OUTER JOIN '.$this->_table_other.' b ON a.nip = b.nip
						    LEFT OUTER JOIN '.$this->_table_other1.' c ON b.divisi_id = c.divisi_id
							LEFT OUTER JOIN '.$this->_table_other2.' d ON b.jabatan_id = d.jabatan_id
						    LEFT OUTER JOIN '.$this->_table_other3.' e ON b.status_karyawan_id = e.status_karyawan_id
						    WHERE 1 = 1 ';
						   
		if($where_clausa != NULL || $where_clausa != ''){
		$sql	.= $where_clausa;
		}
		
		$sql	.= ' ORDER BY b.nip DESC, b.nama DESC limit '.$p.' ,20';
		
		$qry	 = $this->db->query($sql);	
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
		

    }
	
	public function count_salary($where_clausa=NULL){
		
		$sql	 = '';
		$sql 	.= 'SELECT 	COUNT(a.nip) AS jml 
							FROM '.$this->_table.' a
						   	LEFT OUTER JOIN '.$this->_table_other.' b ON a.nip = b.nip
						    LEFT OUTER JOIN '.$this->_table_other1.' c ON b.divisi_id = c.divisi_id
							LEFT OUTER JOIN '.$this->_table_other2.' d ON b.jabatan_id = d.jabatan_id
						    LEFT OUTER JOIN '.$this->_table_other3.' e ON b.status_karyawan_id = e.status_karyawan_id
						    WHERE 1 = 1 ';
		
		if($where_clausa != NULL || $where_clausa != ''){
		$sql	.= $where_clausa;
		}
		
		$qry 			= $this->db->query($sql);
		
		return $qry->row()->jml;

	}
	
	public function insert($data){
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
													status_nikah_id		= "'.$data['status_nikah_id'].'", 
													alamat_asal			= "'.$data['alamat_asal'].'",
													alamat_sekarang		= "'.$data['alamat_sekarang'].'",
													email				= "'.$data['email'].'",
													hp					= "'.$data['hp'].'",
													telp				= "'.$data['telp'].'", 
													tgl_masuk			= "'.$data['tgl_masuk'].'",
													tgl_keluar			= "'.$data['tgl_keluar'].'"
													';
	
		return $this->db->query($sql);
	}
	
	public function update($data){
		$sql = 'UPDATE '.$this->_table.' SET	perusahaan_id		= "'.$data['perusahaan_id'].'",
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
												status_nikah_id		= "'.$data['status_nikah_id'].'", 
												alamat_asal			= "'.$data['alamat_asal'].'",
												alamat_sekarang		= "'.$data['alamat_sekarang'].'",
												email				= "'.$data['email'].'",
												hp					= "'.$data['hp'].'",
												telp				= "'.$data['telp'].'", 
												tgl_masuk			= "'.$data['tgl_masuk'].'",
												tgl_keluar			= "'.$data['tgl_keluar'].'"
												WHERE nip 			= "'.$data['nip'].'"
												';
	
		return $this->db->query($sql);
	}
	
	public function desc($data){
		$sql 	= 'SELECT  a.*,
						    b.npwp, b.nip, (b.alamat) AS alamat_npwp
						    FROM '.$this->_table.' a
						    LEFT OUTER JOIN '.$this->_table_other4.' b ON a.nip = b.nip
						    WHERE a.nip="'.$data['id'].'" ';
							
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row_array();
		else
			return null;	
	}
	
	public function activate($data){
		$sql = 'UPDATE '.$this->_table.' SET	status		= "'.$data['status'].'"
												WHERE nip 	= "'.$data['nip'].'" ';
		return $this->db->query($sql);
	}
	
	public function get_status_karyawan(){
		$sql	 = 'SELECT * FROM '.$this->_table_other2.' ORDER BY jns_karyawan ASC';
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->result_array();
		else
			return null;
	}
	
	/**	SEARCH DATA*/
	public function get_nip_karyawan_desc(){
		$sql	 = 'SELECT nip FROM '.$this->_table.' ORDER BY nip DESC';
		$qry 	= $this->db->query($sql);
		
		if($qry->num_rows() > 0)
			return $qry->row()->nip;
		else
			return null;
			
	}
	
	/** DELETE */
	public function delete($data) {
		$sql = 'DELETE FROM '.$this->_table.' WHERE nip = "'.$data['id'].'" ';
		
		$this->delete_asuransi($data);
		$this->delete_gaji($data);
		$this->delete_lembur($data);
		$this->delete_npwp($data);
		$this->delete_pendidikan_asal($data);
		$this->delete_pengalaman_kerja($data);
		$this->delete_pinjaman($data);
		$this->delete_potongan($data);
		$this->delete_tunjangan($data);
		
		return $this->db->query($sql);
	}
	
	public function delete_asuransi($data) {
		$sql = 'DELETE FROM t_asuransi WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	
	public function delete_gaji($data) {
		$sql = 'DELETE FROM t_gaji WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	
	public function delete_lembur($data) {
		$sql = 'DELETE FROM t_lembur WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	
	public function delete_npwp($data) {
		$sql = 'DELETE FROM t_npwp WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	
	public function delete_pendidikan_asal($data) {
		$sql = 'DELETE FROM t_pendidikan_asal WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	
	public function delete_pengalaman_kerja($data) {
		$sql = 'DELETE FROM t_pengalaman_kerja WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	
	public function delete_pinjaman($data) {
		$sql = 'DELETE FROM t_pinjaman WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	
	public function delete_potongan($data) {
		$sql = 'DELETE FROM t_potongan WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	
	public function delete_tunjangan($data) {
		$sql = 'DELETE FROM t_tunjangan WHERE nip = "'.$data['id'].'" ';
		return $this->db->query($sql);
	}
	/** END DELETE */
	
}
?>