
function deleteHouse(id){
	$.ajax({
		url: '/houses/' + id,
		type: 'DELETE',
		success: function(results){
			window.location.reload(true);
		}
	})
}