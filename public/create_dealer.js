/**
 * Created by mgautam on 5/9/2015.
 */
$(document).ready(function () {
    $('#createDealerBtn').click( function(event){
        event.preventDefault();
        var payload = {
            DealerName: $('#DealerName').val()
        };

        $.ajax({
            url: $("#create_dealer_form").attr("action"),
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

