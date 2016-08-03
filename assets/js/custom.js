$('.ui.accordion')
    .accordion()
;

$('.ui.checkbox')
    .checkbox()
;

$('#convert-btn').on('click', function (event) {

    var input = $('#input').val();

    if (input == '') {
        swal({
            title: "Hey!",
            text: "Provide some GPX input first!",
            type: "error",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Okay, okay...",
            closeOnConfirm: false
        });
        return false;
    }

    $.ajax({
        type: 'post',
        'url': '/index.php',
        'data': {
            'gpx': input,
            'speed': $('#speed').val(),
            'reverse': $('#reverse').is(':checked'),
        },
        'success': function (data) {
            if (data.status == 'success') {
                $('#output').val(data.gpx.trim());
            } else {
                swal({
                    title: "Hey!",
                    text: data.message,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Okay, okay...",
                    closeOnConfirm: false
                });
            }
        }
    });
});

$('#output').on('focus', function (e) {
    var $this = $(this);
    $this.select();

    // Work around Chrome's little problem
    $this.mouseup(function () {
        // Prevent further mouseup intervention
        $this.unbind("mouseup");
        return false;
    });
});