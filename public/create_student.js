$(document).ready(function () {
    $('#createStudentBtn').click( function(){
        var payload = {
            name: $('#name').val(),
            major: $('#major').val(),
            location: $('#location').val()
        };

        $.ajax({
            url: $("#create_user_form").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                $('#output').html(data.responseText);
                $('#output').show();
            }
        });
    });
});