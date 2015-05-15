/**
 * Created by mgautam on 5/9/2015.
 */
$(document).ready(function () {
    $('#createDealerAddressBtn').click( function(event){
        event.preventDefault();
        var payload = {
            DealerID: $('#DealerID').val(),
            City: $('#City').val(),
            State: $('#State').val(),
            Zip: $('#Zip').val()
        };

        $.ajax({
            url: $("#create_dealeraddress_form").attr("action"),
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


