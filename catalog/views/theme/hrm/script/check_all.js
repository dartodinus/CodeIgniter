
checked = false;
function checkedAll () {
    if (checked == false){checked = true}else{checked = false}
	for (var i = 0; i < document.getElementById('formAdd').elements.length; i++) {
	  document.getElementById('formAdd').elements[i].checked = checked;
	}
}
