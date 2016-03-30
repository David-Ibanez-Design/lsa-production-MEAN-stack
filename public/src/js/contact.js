
function initConatcForm(){

/* Traitement du formulaire */  

  $('#envoyer').click(function(){

    var ok=true;  
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;    
    $('#form_erreur,#form_sucess').css('display','none');
    $('#captcha_code').animate({ borderColor: "red" }, '3000'); 
    
    
    
    /* Liste déroulante */  
    if($('#sujet').val() == '')
    {      
        $('#form_erreur').fadeIn('1000');
        $('#sujet').animate({ borderColor: "red" }, '3000');
        $('#sujet').prev().children('.icon_status').animate({ color: "#b30818" }, '3000');
        $('#sujet').prev().children().fadeIn('100000')          
        ok=false;        
    }
    else
    {
        $('#sujet').animate({ borderColor: "green" }, '3000');
        $('#sujet').prev().children('.icon_status').animate({ color: "green" }, '3000');
    }
    
    
    
    /* Email */
    if($("#email").length != 0)
    {
        if(!emailReg.test($("#email").val()) || $("#email").val()=='')
        {               
            $('#form_erreur').fadeIn('1000');
            $('#email').animate({ borderColor: "red" }, '3000');
            $('#email').prev().children('.icon_status').animate({ color: "#b30818" }, '3000');           
            ok=false;
        }
        else
        {
            $('#email').animate({ borderColor: "green" }, '3000');
            $('#email').prev().children('.icon_status').animate({ color: 'green' }, '3000');
        }       

    };
    
    
    
    /* Message */
    if($("#message").val()=='' )
    {
        $('#form_erreur').fadeIn('1000');
        $('#message').animate({ borderColor: "red" }, '3000');
        $('#message').prev().children('.icon_status').animate({ color: "#b30818" }, '3000');
        $('#message').prev().children('.bande').animate({ borderRightColor: "#e13232" }, '3000');
        ok=false;   
    }
    else
    {
        $('#message').animate({ borderColor: "green" }, '3000');
        $('#message').prev().children('.icon_status').animate({ color: 'green' }, '3000');
        $('#message').prev().children('.bande').animate({ borderRightColor: "#27ae37" }, '3000');
     }  
    
    
    
    /* Si la variable est true ont envoi le requête qui vérifie les champ côté serveur*/
    
    if (ok)
    {
        var formData = $('#formulaire_contact').serialize();
        
         $.ajax({
        
            type:'POST',
            url: 'validationForm.php',       
            data: formData,  
            dataType: 'text',       
            success: function(response){
            
            
            
                if(response=="error")
                {
                     $('#form_erreur,#form_sucess').css('display','none');$('#form_erreur').fadeIn('1000');
                }
                
                else
                {
                     $('#form_erreur,#form_sucess').css('display','none');$('#form_sucess').fadeIn('1000');
                     $('#captcha_code').animate({ borderColor: "green" }, '3000');                                       
                }
                  

                                       },
                            
              error: function(response){
            
            
                
                  // Make sure that the formMessages div has the 'error' class.
                 $('#form_erreur,#form_sucess').css('display','none');
                 $('#form_erreur').css('display','block');

                // Set the message text.
                if (response.responseText !== '') {
                    $('#form_erreur').text(response.responseText);
                 } else {
                    $('#form_erreur').text('An error occured and your message could not be sent.');                 
                 }              
                 
                                        }                   
        }); 
        
        return false
        
    }
    else
    {
        return false    
    }


    })/* Fin du traitement du formulaire */
    

}

  