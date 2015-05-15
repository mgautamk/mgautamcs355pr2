/**
 * Created by mgautam on 5/11/2015.
 */
$(document).ready(function () {
    $('#createCustomerBtn').click( function(event){
        event.preventDefault();
        var payload = {
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val()
        };

        $.ajax({
            url: $("#create_customer_form").attr("action"),
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
