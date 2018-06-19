function deleteLocation(id){
	$.ajax({
		url: '/locations/' + id,
		type: 'DELETE',
		success: function(results){
			window.location.reload(true);
		}
	})
}