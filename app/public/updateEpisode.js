function updateEpisode(id) {
    console.log('inside updateEpisode()');
    $.ajax({
        url: '/episodes/' + id,
        type: 'PUT',
        data: $('#update-episode').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}