function deleteEpisode(id){
	$.ajax({
		url: '/episodes/' + id,
		type: 'DELETE',
		success: function(results){
			window.location.reload(true);
		}
	})
}