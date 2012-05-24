<?PHP  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


define('FILE_READ_MODE', 0644);
define('FILE_WRITE_MODE', 0666);
define('DIR_READ_MODE', 0755);
define('DIR_WRITE_MODE', 0777);


define('FOPEN_READ',							'rb');
define('FOPEN_READ_WRITE',						'r+b');
define('FOPEN_WRITE_CREATE_DESTRUCTIVE',		'wb'); 
define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE',	'w+b');
define('FOPEN_WRITE_CREATE',					'ab');
define('FOPEN_READ_WRITE_CREATE',				'a+b');
define('FOPEN_WRITE_CREATE_STRICT',				'xb');
define('FOPEN_READ_WRITE_CREATE_STRICT',		'x+b');


define('TAMBAH', 'tambah');
define('LIHAT', 'lihat');
define('EDIT', 'ubah');
define('HAPUS', 'hapus');


define('INPUT_DATA_PRIVILEDGE', 1);
define('INPUT_DATA_ACCOUNT', 11);
define('INPUT_DATA_KARYAWAN', 2);
define('INPUT_DATA_DIVISI', 2);
define('INPUT_DATA_JABATAN', 2);


define('INDEX_PAGE', 'hrm/');
define('PATH_DIR_1', 'hrm/');
define('TITLE_BAR',	'HRM');
define('TITLE_BAR_PUBLIC',	'Welcome');
define('TITLE_BAR_ADMIN',	'HRM');
