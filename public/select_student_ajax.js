$(document).ready(function () {
    $('#studentid').change( function(){
        
        event.preventDefault();

        if($('#studentid').val() == "") {
            // the user selected the blank option, so hide the div and return
            $('#output').hide();
            return;
        }

        var payload = {
            studentid: $('#studentid').val()
        };

        console.log(payload);

        $.ajax({
            url: $("#ajax_form_example").attr("action"),
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
