<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Import extends CI_Controller {
	private	$dir_template;
	private $user_profiles;
	
	public function __construct() {
		parent::__construct();
		
		/**	LOAD CLASS */
		$this->load->library('themes');
		$this->load->library('privilege');
		
		$this->load->helper('file');
		
		$this->load->model(PATH_DIR_1.'import_model');
		
		/**	SET DIR THEMES*/
		$this->dir_template		= PATH_DIR_THEMES .'import/';
		
		/**	AUTHENTICATION LOGIN */
		if(!$this->privilege->loggedIn())redirect(INDEX_PAGE.'auth');
		
		/**	USER PROFILE */
		$this->user_profiles	= $this->privilege->loggedIn();
		
		/**	CALL FUNCTION */
		
		/**	INCLUDE STYLES */
		$load_js	= array(array('js' => 'inline.js'),
							array('js' => 'validate_import.js')
							);
		
		$this->smarty->assign('load_js', $load_js);	
		$this->smarty->assign('user_profiles', $this->privilege->loggedIn());
		$this->smarty->assign('title', TITLE_BAR);	
	}
	
	public function index() {
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('request'	=> $this->uri->segment(4)
			  					);

		$this->smarty->view( $this->dir_template.'new_import.tpl', $var_template );
		
	}
	
	public function excel(){

		if($this->input->post('act') and $this->input->post('act') == 'Import'){
			if($this->input->post('files_type') and $this->input->post('files_type') == 'karyawan'){
				$this->read_excel_karyawan();
			}
			
			if($this->input->post('files_type') and $this->input->post('files_type') == 'gaji'){
				$this->read_excel_gaji();
			}
			
		}elseif($this->input->post('act') and $this->input->post('act') == 'Save'){
			if($this->input->post('files_type') and $this->input->post('files_type') == 'karyawan'){
				$this->insert_data_karyawan();
			}
			
			if($this->input->post('files_type') and $this->input->post('files_type') == 'gaji'){
				//$this->insert_data_karyawan();
			}
			
		}else{
			redirect(INDEX_PAGE.'import/index');
		}
		
		
	}
	
	public function insert_data_karyawan(){
		$path_file_karyawan		= FCPATH.'temp/logs/'.$this->security->sanitize_filename($this->input->post('filename_karyawan'));
		$data_karyawan			= read_file($path_file_karyawan);
		$expl_data_karyawan		= explode('--',$data_karyawan);
		
		$path_file_pendidikan	= FCPATH.'temp/logs/'.$this->security->sanitize_filename($this->input->post('filename_pendidikan'));
		$data_pendidikan		= read_file($path_file_pendidikan);
		$expl_data_pendidikan	= explode('--',$data_pendidikan);
		
		$path_file_pengalaman	= FCPATH.'temp/logs/'.$this->security->sanitize_filename($this->input->post('filename_pengalaman'));
		$data_pengalaman		= read_file($path_file_pengalaman);
		$expl_data_pengalaman	= explode('--',$data_pengalaman);
		
		$ii =0;
		foreach($expl_data_karyawan as $key_karyawan){
			if($key_karyawan != ""){
				
				$expl_key_karyawan					= explode("|", $key_karyawan);
				
				$karyawan['perusahaan_id']			= 1;
				$karyawan['divisi_id']				= $this->import_model->get_record_divisi($expl_key_karyawan[0]);
				$karyawan['no_kunci']				= $expl_key_karyawan[1];
				$karyawan['nip']					= $expl_key_karyawan[2];
				$karyawan['id_card']				= $expl_key_karyawan[3];
				$karyawan['username']				= $expl_key_karyawan[4];
				$karyawan['password']				= $expl_key_karyawan[5];
				
				$karyawan['status_karyawan_id']		= $this->import_model->get_record_status_karyawan($expl_key_karyawan[6]);
				$karyawan['jabatan_id']				= $this->import_model->get_record_jabatan($expl_key_karyawan[7]);
				$karyawan['nama']					= $expl_key_karyawan[8];
				$karyawan['jns_kelamin']			= $expl_key_karyawan[9];
				$karyawan['warga_negara']			= $expl_key_karyawan[10];
				$karyawan['agama_id']				= $this->import_model->get_record_agama($expl_key_karyawan[11]);
				$karyawan['no_ktp']					= $expl_key_karyawan[12];
				
				$karyawan['npwp']					= $expl_key_karyawan[13];
				$karyawan['no_jamsostek']			= $expl_key_karyawan[14];
				
				$karyawan['tmpt_lahir']				= $expl_key_karyawan[15];
				$karyawan['tgl_lahir']				= $expl_key_karyawan[16];
				$karyawan['alamat']					= $expl_key_karyawan[17].', '.$expl_key_karyawan[18];
				$karyawan['telp']					= $expl_key_karyawan[19];
				$karyawan['pendidikan_id']			= $this->import_model->get_record_pendidikan($expl_key_karyawan[20]);

				$karyawan['tgl_masuk']				= $expl_key_karyawan[21];
				
				$this->import_model->insert_data_karyawan($karyawan);
				
				if($karyawan['npwp'] != ""){
					$this->import_model->insert_data_npwp($karyawan);
				}
			}
			
			$ii++;
		}
		
		unlink($path_file_karyawan);
		
		
		foreach($expl_data_pendidikan as $key_pendidikan){
			if($key_pendidikan != ""){
				
				$expl_key_pendidikan				= explode("|", $key_pendidikan);
				
				$pendidikan['pendidikan_id']		= $this->import_model->get_record_pendidikan($expl_key_pendidikan[0]);
				$pendidikan['nip']					= $expl_key_pendidikan[1];
				$pendidikan['thn_lulus']			= $expl_key_pendidikan[2];
				$pendidikan['nama_instansi']		= $expl_key_pendidikan[3];
				$pendidikan['jurusan']				= $expl_key_pendidikan[4];
				
				$this->import_model->insert_pendidikan_asal($pendidikan);
			}
			
			$ii++;
		}
		
		unlink($path_file_pendidikan);
		
		foreach($expl_data_pengalaman as $key_pengalaman){
			if($key_pengalaman != ""){
				
				$expl_key_pengalaman				= explode("|", $key_pengalaman);
				
				if($expl_key_pengalaman[1] != ""){
					$pengalaman['nip']					= $expl_key_pengalaman[0];
					$pengalaman['nama_instansi']		= $expl_key_pengalaman[1];
					$pengalaman['posisi']				= $expl_key_pengalaman[2];
					
					$this->import_model->insert_pengalaman_kerja($pengalaman);
				}
			}
			
			$ii++;
		}
		
		unlink($path_file_pengalaman);
		
		redirect(INDEX_PAGE.'import/index/success');
	}
	
	public function read_excel_karyawan(){
		require_once( APPPATH.'third_party/excel_reader2.php' );
		
		$data				= array();
		$file_name			= date("Ymd_his");
		$path_files			= FCPATH.'temp/logs/'.$file_name;
		$tmp_files  		= pathinfo($_FILES['userfile']['name']);
		$excel_file 		= $_FILES['userfile']['tmp_name'];
		
		if( $tmp_files['extension'] != 'xls'){
			redirect(INDEX_PAGE.'import/index/error_files');
		}
		
		if($excel_file){
			$sheet 		= new Spreadsheet_Excel_Reader($excel_file);
			$rows 		= $sheet->rowcount($sheet_index=0);
			
			$i			= 0;
			$nip		= '';
			for ($ix=2; $ix<=$rows; $ix++){
				$nip_akhir		= ($nip != "" ? $nip : $this->import_model->get_nip_karyawan_desc());
				$no_urut 		= "0000";
				$nomor 			= substr($nip_akhir, 6, 4);
				$nomor 			= (int)$nomor + 1;
				
				$originalDate 	= $sheet->val($ix, 42);
				$newDate 		= date("y-m-d", strtotime($originalDate));
				$exp_date		= explode('-', $newDate);
				$jns_karyawan	= strtolower($sheet->val($ix, 8));
		
				$nip			= $exp_date[0].$exp_date[1].($jns_karyawan == 'tetap'? '01':'00').
								  substr($no_urut, 0, 4 - strlen($nomor)) . $nomor;
								  
				if($nip <> ""){
					$data[$i]['nama_divisi'] 			= $sheet->val($ix, 2); 
					$data[$i]['no_kunci'] 				= $sheet->val($ix, 3); 
					$data[$i]['nip'] 					= $nip;
					$data[$i]['id_card'] 				= $sheet->val($ix, 5);
					$data[$i]['username'] 				= $nip;
					$data[$i]['password'] 				= 
					( $sheet->val($ix, 6) <> '' ? $sheet->val($ix, 6) : date("dmY", strtotime($sheet->val($ix, 17))) );
					
					$data[$i]['jns_karyawan'] 			= $sheet->val($ix, 8);
					$data[$i]['jabatan'] 				= $sheet->val($ix, 9);
					$data[$i]['nama'] 					= $sheet->val($ix, 10);
					$data[$i]['jns_kelamin'] 			= $sheet->val($ix, 11);
					$data[$i]['warga_negara'] 			= $sheet->val($ix, 12);
					$data[$i]['agama'] 					= $sheet->val($ix, 13);
					$data[$i]['no_ktp'] 				= $sheet->val($ix, 14);
					$data[$i]['npwp'] 					= $sheet->val($ix, 15);
					$data[$i]['no_jamsostek'] 			= $sheet->val($ix, 16);
					$data[$i]['tmpt_lahir'] 			= $sheet->val($ix, 17);
					$data[$i]['tgl_lahir'] 				= $sheet->val($ix, 18);
					$data[$i]['alamat'] 				= $sheet->val($ix, 19);
					$data[$i]['kota'] 					= $sheet->val($ix, 20);
					$data[$i]['telp'] 					= $sheet->val($ix, 21);
					$data[$i]['pendidikan'] 			= $sheet->val($ix, 22);
					
					$data[$i]['thn_lulus'] 				= $sheet->val($ix, 23);
					$data[$i]['nama_instansi'] 			= $sheet->val($ix, 24);
					$data[$i]['jurusan'] 				= $sheet->val($ix, 25);
					
					$data[$i]['tgl_masuk'] 				= $sheet->val($ix, 42);
					
					/**	PENGALAMAN KERJA */
					$data[$i]['pengalaman1'] 			= $sheet->val($ix, 28);
					$data[$i]['posisi1'] 				= $sheet->val($ix, 29);
					$data[$i]['pengalaman2'] 			= $sheet->val($ix, 30);
					$data[$i]['posisi2'] 				= $sheet->val($ix, 31);
					$data[$i]['pengalaman3'] 			= $sheet->val($ix, 32);
					$data[$i]['posisi3'] 				= $sheet->val($ix, 33);
					$data[$i]['pengalaman4'] 			= $sheet->val($ix, 34);
					$data[$i]['posisi4'] 				= $sheet->val($ix, 35);
					$data[$i]['pengalaman5'] 			= $sheet->val($ix, 36);
					$data[$i]['posisi5'] 				= $sheet->val($ix, 37);
					$data[$i]['pengalaman6'] 			= $sheet->val($ix, 38);
					$data[$i]['posisi6'] 				= $sheet->val($ix, 39);
					$data[$i]['pengalaman7'] 			= $sheet->val($ix, 40);
					$data[$i]['posisi7'] 				= $sheet->val($ix, 41);
					
					$logs_data_karyawan		= 	$sheet->val($ix, 2).'|'.
												$sheet->val($ix, 3).'|'.
												$nip.'|'.
												$sheet->val($ix, 5).'|'.
												$nip.'|'.
												($sheet->val($ix, 6) <> '' ? $sheet->val($ix, 6) : date("dmY", strtotime($sheet->val($ix, 17))) ).'|'.
												$sheet->val($ix, 8).'|'.
												$sheet->val($ix, 9).'|'.
												$sheet->val($ix, 10).'|'.
												$sheet->val($ix, 11).'|'.
												$sheet->val($ix, 12).'|'.
												$sheet->val($ix, 13).'|'.
												$sheet->val($ix, 14).'|'.
												$sheet->val($ix, 15).'|'.
												$sheet->val($ix, 16).'|'.
												$sheet->val($ix, 17).'|'.
												$sheet->val($ix, 18).'|'.
												$sheet->val($ix, 19).'|'.
												$sheet->val($ix, 20).'|'.
												$sheet->val($ix, 21).'|'.
												$sheet->val($ix, 22).'|'.
												
												$sheet->val($ix, 42);
					
					$logs_data_pendidikan	=	$sheet->val($ix, 22).'|'.
												$nip.'|'.
												$sheet->val($ix, 23).'|'.
												$sheet->val($ix, 24).'|'.
												$sheet->val($ix, 25);
					
					$logs_pengalaman_kerja	=	$nip.'|'.$sheet->val($ix, 28).'|'.$sheet->val($ix, 29).'--'.
												$nip.'|'.$sheet->val($ix, 30).'|'.$sheet->val($ix, 31).'--'.
												$nip.'|'.$sheet->val($ix, 32).'|'.$sheet->val($ix, 33).'--'.
												$nip.'|'.$sheet->val($ix, 34).'|'.$sheet->val($ix, 35).'--'.
												$nip.'|'.$sheet->val($ix, 36).'|'.$sheet->val($ix, 37).'--'.
												$nip.'|'.$sheet->val($ix, 38).'|'.$sheet->val($ix, 39).'--'.
												$nip.'|'.$sheet->val($ix, 40).'|'.$sheet->val($ix, 41);
					
					write_file($path_files.'_karyawan_log.txt',$logs_data_karyawan."--","a");
					write_file($path_files.'_pendidikan_log.txt',$logs_data_pendidikan."--","a");
					write_file($path_files.'_pengalaman_log.txt',$logs_pengalaman_kerja,"a");
				}

				$i++;
			}
		}
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data'					=> $data,
								'files_type'			=> $this->input->post('files_type'),
								'filename_karyawan'		=> $file_name.'_karyawan_log.txt',
								'filename_pendidikan'	=> $file_name.'_pendidikan_log.txt',
								'filename_pengalaman'	=> $file_name.'_pengalaman_log.txt'
			  					);

		$this->smarty->view( $this->dir_template.'list_import.tpl', $var_template );
		
	}
	
	public function read_excel_gaji(){
		require_once( APPPATH.'third_party/excel_reader2.php' );
		
		$data				= array();
		$file_name			= date("Ymd_his");
		$path_files			= FCPATH.'temp/logs/'.$file_name;
		$tmp_files  		= pathinfo($_FILES['userfile']['name']);
		$excel_file 		= $_FILES['userfile']['tmp_name'];
		
		if( $tmp_files['extension'] != 'xls'){
			redirect(INDEX_PAGE.'import/index/error_files');
		}
		
		if($excel_file){
			$sheet 		= new Spreadsheet_Excel_Reader($excel_file);
			$rows 		= $sheet->rowcount($sheet_index=0);
			
			$i	= 0;
			for ($ix=2; $ix<=$rows; $ix++){
				$nip['nip']	= $sheet->val($ix, 1);
				if($this->import_model->check_nip($nip) > 0){
					
					$data[$i]['nip'] 			= $sheet->val($ix, 1); 
					$data[$i]['nama'] 			= $sheet->val($ix, 2); 
					$data[$i]['divisi'] 		= $sheet->val($ix, 3); 
					$data[$i]['hari_kerja'] 	= $sheet->val($ix, 4); 
					$data[$i]['jabatan'] 		= $sheet->val($ix, 5);
				}
				
				$i++;
			}
			
			print_r($data);
			exit();
		}
		
		/**	VARIABLE FOR TEMPLATE */
		$var_template	= array('data'					=> $data,
								'files_type'			=> $this->input->post('files_type'),
								'filename_karyawan'		=> $file_name.'_karyawan_log.txt',
								'filename_pendidikan'	=> $file_name.'_pendidikan_log.txt',
								'filename_pengalaman'	=> $file_name.'_pengalaman_log.txt'
			  					);

		$this->smarty->view( $this->dir_template.'list_import.tpl', $var_template );
		
	}
	
	
}


?>