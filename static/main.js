$(document).ready(function(){
    $('select').formSelect();
    let socket = io("http://localhost:1500"); //1
    
    socket.on('greeting', function (data) { //4
        $('#myForm').on('submit', function(e){
          e.preventDefault();
          let form_data = new FormData(document.getElementById('myForm'));
          let response = {};
          form_data.forEach(function(value, key){
            response[key] = value;
          });
          let json = JSON.stringify(response);
          socket.emit('posting_form', { msg: response });
        })
    });

    socket.on('random_number', function(data){
      $('#number').text(`Your lucky number emitted by the server is ${data.msg}`);
      $('#box').addClass('teal').addClass('lighten-3');
    })

    socket.on('updated_message', function(data){
      $('#info').text(`${data.msg}`);
    })

  });

