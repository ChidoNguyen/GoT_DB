function deleteAppearance(eid,cid){
	$.ajax({
		url: '/appearances/' + eid +'/'+ cid,
		type: 'DELETE',
		success: function(results){
			window.location.reload(true);
		}
	})
}