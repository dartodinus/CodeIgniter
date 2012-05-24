<?PHP if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Upload extends CI_Controller {
	function __construct()
	{
		parent::__construct();
		$this->load->helper(array('form', 'url'));
	}
	function index()
	{
		$this->load->view('upload_file', array('error' => ' ' ));
	}
	function file_upload()
	{
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'zip';
		$config['max_size']	= '100';
		$this->load->library('upload', $config);
		if ( ! $this->upload->do_upload())
		{
			
		}
		else
		{
			$data = array('upload_data' => $this->upload->data());
			$zip = new ZipArchive;
			$file = $data['upload_data']['full_path'];
			chmod($file,0777);
			if ($zip->open($file) === TRUE) {
    				$zip->extractTo('./uploads/');
    				$zip->close();
    				echo 'ok';
			} else {
    				echo 'failed';
			}
			$this->load->view('upload_success', $data);
		}
	}
}

?>