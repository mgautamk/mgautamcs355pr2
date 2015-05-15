/**
 * Created by mgautam on 5/11/2015.
 */
$(document).ready(function () {
    $('#createVehicleBtn').click( function(event){
        event.preventDefault();
        var payload = {
            Make: $('#Make').val(),
            Model: $('#Model').val(),
            YEAR: $('#YEAR').val(),
            PRICE: $('#PRICE').val()
        };

        $.ajax({
            url: $("#create_vehicle_form").attr("action"),
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

