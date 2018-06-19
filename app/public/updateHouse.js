function updateHouse(id) {
    console.log('inside updateHouse()');
    $.ajax({
        url: '/houses/' + id,
        type: 'PUT',
        data: $('#update-house').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}