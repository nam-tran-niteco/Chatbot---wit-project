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

                        console.log(data);
                        
                        if ( isGetResponseSuccess ) {
                            // got the response, replace text and focus the input box
                            if (data.response) {
                                // var entities = data.entities;
                                // if (entities.intent) {
                                //     var intent = entities.intent[0].value;
                                //     if (intent == 'request') {
                                //         var message = 'Có phải bạn muốn ' + entities.request_action[0].value
                                //                     + entities.request_object[0].value + '? ';
                                //         message += 'Hãy cho tôi thêm nhiều yêu cầu nữa';
                                //         $('.waiting').text(message);
                                //     }
                                // }
                                var message = data.response.text;
                                $('.waiting').text(message);
                            }
                            else $('.waiting').text('Tôi chưa hiểu bạn muốn nói gì. Hãy thử câu lệnh khác');
                        }
                        else {
                            $('.waiting').text('Đã có vấn đề xảy ra với server. Thử lại trong ít phút');
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
                chatContent.append('<p class="bot-chat waiting">' + 'Bot đang nhập ...' + '</p>');
                chatBox.prop('disabled', true);
                chatContent.scrollTop($('.chat-content').height());

            }
        }
    } );

} );