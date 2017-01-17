/**
 * Created by nam.tran on 11-Jan-17.
 */
$(document).ready( function () {

    var chatBox = $('#chat');
    var chatContent = $('.chat-content');

    // focus on input box
    chatBox.focus();

    chatBox.on( 'keypress', function (event) {
        if( event.keyCode == 13 ) {

            var chat = chatBox.val();

            // check user's input being empty or not
            if( chat ) {

                // append user's input to chatbox
                chatContent.append('<p class="user-chat">' + chat + '</p>');
                chatBox.val('');

                // call an ajax to node server and take response from wit
                $.ajax({
                    url: '/chat',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        chat: chat
                    }),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        
                        var isGetResponseSuccess = data.status;
                        
                        if( isGetResponseSuccess ) {
                            // got the response, replace text and focus the input box
                            $('.waiting').text(data.response.text);
                        }
                        else {
                            $('.waiting').text('Something went wrong with server');
                        }
                        $('.waiting').removeClass('waiting');

                        chatBox.prop('disabled', false);
                        chatContent.scrollTop($('.chat-content').height());
                        chatBox.focus();
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });

                // Bot is typing (wait response from the server)
                chatContent.append('<p class="bot-chat waiting">' + 'bot is typing...' + '</p>');
                chatBox.prop('disabled', true);
                chatContent.scrollTop($('.chat-content').height());

            }
        }
    } );

} );