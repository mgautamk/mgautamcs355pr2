/**
 * Created by mgautam on 5/9/2015.
 */
$(document).ready(function () {
    $('#editDealerBtn').click( function(event){
        event.preventDefault();
        var payload = {
            DealerID: $('#DealerID').val(),
            DealerName: $('#DealerName').val()
        };

        $.ajax({
            url: $("#edit_dealer_form").attr("action"),
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

