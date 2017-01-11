/**
 * Created by nam.tran on 11-Jan-17.
 */
$(document).ready( function () {
    $('#submit').on('click', function () {

        var chat = $('#chat').val();

        $.ajax({
            url: '/chat',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                chat: chat
            }),
            contentType: "application/json; charset=utf-8",
            complete: function (xhr, status) {
                console.log(status);
            },
            success: function (data) {
                console.log(data);
            },
            error: function (err) {
                console.log(err);
            }
        })
    });
} );