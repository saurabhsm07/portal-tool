$(document).ready(function(){
 
$("#submit-ticket-form").click(function(){
  let ticket_object = {};
  ticket_object.id = $("#ticket-input-id").val();
  ticket_object.subject = $("#ticket-input-subject").val();
  ticket_object.priority = $("#ticket-input-priority").val();
  ticket_object.description = $("#ticket-input-description").val()
  ticket_object.requester =  $("#ticket-input-requester").val()

  $.ajax({url :'http://localhost:5000/api/ticket/',
          type:'POST',
          contentType : 'application/json',
          data : JSON.stringify({'ticket' :ticket_object}),
          success : function(){
              $('#ticket-creation-modal  .modal-body').empty().append('<h3> Ticket Successfully Created </h3>')
              setTimeout(() => {
                location.href =  'http://localhost:5000/api/ticket/id/'+ ticket_object.id;
            }, 2000)
          },
          failure : function(){
              console.log("failure")
          }
        })

})

$("#update-ticket-form").click(function(){
    let ticket_object = {};
    ticket_object.id = $("#ticket-update-id").val();
    ticket_object.subject = $("#ticket-update-subject").val();
    ticket_object.status = $("#ticket-update-status").val();

    ticket_object.priority = $("#ticket-update-priority").val();
    ticket_object.description = $("#ticket-update-description").val()
    ticket_object.requester =  $("#ticket-update-requester").val()
    ticket_object.organization =  $("#ticket-update-org").val()
    ticket_object.collaborator =  $("#ticket-update-collaborators").val()
    ticket_object.tags =  $("#ticket-update-tags").val()
  
    $.ajax({url :'http://localhost:5000/api/ticket/',
            type:'PUT',
            contentType : 'application/json',
            data : JSON.stringify({'ticket' :ticket_object}),
            success : function(){
                $('#update-ticket-modal  .modal-body').empty().append('<h3> Ticket Successfully Updated </h3>')
                setTimeout(() => {
                    location.href =  'http://localhost:5000/api/ticket/id/'+ ticket_object.id
                }, 2000)
                
            },
            failure : function(){
                console.log("failure")
            }
          })
  
  })

$("#delete-ticket-form").click(function(){
    $.ajax({url :'http://localhost:5000/api/ticket/id/'+ $("#ticket-id-val").html(),
    type:'DELETE',
    contentType : 'application/json',
    success : function(){
        $('#delete-ticket-modal  .modal-body').empty().append('<h3> Ticket Successfully Deleted </h3>')
        setTimeout(() => {
            location.href =  'http://localhost:5000/api/ticket/'
        }, 2000)
    },
    failure : function(){
        console.log("failure")
    }
  })
})

$("#search-ticket-form").click(function(){
    query = `status=${$("#ticket-search-status").val()}&priority=${$("#ticket-search-priority").val()}`
    console.log(query)
    location.href = 'http://localhost:5000/api/ticket/search?'+query
  })


$("#update-ticket-option").click(function(){
    const priority = $("#ticket-priority-val").html()
    $('#ticket-update-priority>select option:contains("'+priority+'")').prop('selected',true);
})

});