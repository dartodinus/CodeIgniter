$(document).ready(function() {
	
	var geturl 			= location.href;
	var baseLocalUrl 	= geturl.substring(0, geturl.indexOf('/', 14))+'/jsm/';
	
	var validator = $("#formAdd").validate({ 
		rules: { 
			perusahaan_id: {
				required: true
			},
			nama: {
				required: true
			},
			tmpt_lahir: {
				required: true
			},
			tgl_lahir: {
				required: true,
				date: true
			},
			agama_id: {
				required: true
			},
			telp: {
				number: true,
				minlength: 10,
				maxlength: 15
			},
			hp: {
				number: true,
				minlength: 10,
				maxlength: 15
			},
			email: {
				email: true
			},
			pendidikan_id: {
				required: true
			},
			status_nikah_id: {
				required: true
			},
			divisi_id: {
				required: true
			},
			jabatan_id: {
				required: true
			},
			status_karyawan_id: {
				required: true
			},
			tgl_masuk: {
				required: true,
				date: true
			},
			tgl_keluar: {
				date: true
			}
		}, 
		
		messages: { 		
			perusahaan_id: {
				required: "Perusahaan belum di pilih"
			},
			nama: {
				required: "Nama harus diisi"
			},
			tmpt_lahir: {
				required: "Tempat lahir harus diisi"
			},
			tgl_lahir: {
				required: "Tanggal lahir harus diisi",
				date: "Format tanggal salah"
			},
			agama_id: {
				required: "Agama belum di pilih"
			},
			telp: {
				number: "Format telp salah",
				minlength: "Format telp salah",
				maxlength: "Format telp salah"
			},
			hp: {
				number: "Format telp salah",
				minlength: "Format telp salah",
				maxlength: "Format telp salah"
			},
			email: {
				email: "Format email salah"
			},
			pendidikan_id: {
				required: "Pendidikan belum di pilih"
			},
			status_nikah_id: {
				required: "Status pernikahan belum di pilih"
			},
			divisi_id: {
				required: "Divisi belum di pilih"
			},
			jabatan_id: {
				required: "Jabatan belum di pilih"
			},
			status_karyawan_id: {
				required: "Status karyawan belum di pilih"
			},
			tgl_masuk: {
				required: "Tanggal masuk harus diisi",
				date: "Format tanggal salah"
			},
			tgl_keluar: {
				date: "Format tanggal salah"
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	}); 
	
	
	var validator = $("#formExp").validate({ 
		rules: { 
			nama_instansi: {
				required: true
			},
			posisi: {
				required: true
			}
		}, 
		
		messages: { 		
			nama_instansi: {
				required: "Please insert instansi"
			},
			posisi: {
				required: "Please insert potition or job"
			}
		}, 
		
		success: function(label) { 
			label.html("&nbsp;").addClass("valid_small"); 
		} 
	}); 
	
});