
/**
 * Created by Mahesh on 4/27/2015.
 */
$(document).ready(function () {
    $('#createTransactionBtn').click( function(){
        var payload = {
            VehicleID: $('#VehicleID').val(),
            CustomerID: $('#CustomerID').val()
        };
        $.ajax({
            url: $("#create_transaction_form").attr("action"),
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