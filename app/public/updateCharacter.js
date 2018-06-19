function updateCharacter(id) {
    console.log('inside updateCharacter()');
    $.ajax({
        url: '/characters/' + id,
        type: 'PUT',
        data: $('#update-character').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}