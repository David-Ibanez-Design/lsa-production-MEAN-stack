
function scollbar(){

       /*CUSTON SCrOLL BARS */
    $(".ficheClientInfoContenu").mCustomScrollbar({
        theme:"light-thin",
        scrollButtons:{ enable:0 }, 
        scrollInertia: 0,
        mouseWheel:{ preventDefault: true }
    });


    $(".tab-content, .litseProduit-Wrapper, .panier-listeWrapper, .tab-conteneurModif").mCustomScrollbar({
        theme:"dark-thin",
        scrollButtons:{ enable:1 },
        scrollInertia: 0,
        mouseWheel:{ preventDefault: true } 
    });

    /* tri tab animation */
}

function initElems(){

 
    if($(window).width()>1021)
        {
            $('.l-menu').height($('.l-contenu').outerHeight());
            $('.m-aplat').height($('.l-contenu').outerHeight());
        }
        else
        {
            $('.l-menu').css('height','60px');
        }
    $( window ).resize(function() {

         if($(window).width()>1021)
         {
            $('.l-menu').height($('.l-contenu').outerHeight());
            $('.m-aplat').height($('.l-contenu').outerHeight());
         }
         else
        {
             $('.l-menu').css('height','60px');
        }
    });


}


function loginForget(){

	$('.login-forget a').click(function(){
            
            $('.aplat, .m-aplat').fadeIn(1000);

            $('.l-contenu').addClass('wbepage-blur');
            $('.m-popupMdp').css('display','block'); 
            $('.m-popupMdp').delay(500).animate({opacity: 1,top: "50%",}, 600);            
    });

    $('.popupMdp-btnClose, .aplat').click(function(){

        $('.aplat').fadeOut(1000);  
        $('.l-contenu').removeClass('wbepage-blur');        
        $('.m-popupMdp').animate({opacity: 0,top: "40%",}, 600,function(){$('.m-popupMdp, .m-infoSup').css('display','none');$('.m-popupMdp, .m-infoSup').css('top','60%')});
    });
}


function showPopUp(id_popUp){

	var $popUp = $('#'+id_popUp+'').find('.m-infoSup')
    /* form pass  */
    $('.js-popUp').click(function(){

        $('.aplat, .m-aplat').fadeIn(1000);
        $popUp.css('display','block')
        $popUp.animate({opacity: 1,top: "50%",}, 600); 


    });

    $('.infoSupFermer').click(function(){

        $('.aplat, .m-aplat').fadeOut(1000);          
        $popUp.animate({opacity: 0,top: "40%",}, 600,function(){$popUp.css('display','none');$popUp.css('top','60%')});

    });

}


function orderRslt(){   

    /* tri tab animation */
    $('.tab-triWrapper').click(function(){

            if(!$(this).hasClass('clicked'))
                {
                    $(this).children('.tab-tri').transition({ rotate: '-90deg' });
                    $(this).addClass('clicked');   
                }
                else
                {
                    $(this).children('.tab-tri').transition({ rotate: '90deg' });
                    $(this).removeClass('clicked');    
                }
     })

}


function editFicheClient(){ 

    /* Editer fiche client */
    $('.ficheClient-EditerFiche').click(function(){

            $('.ficheClientInfoValider').css('display','block');
            $('.ficheClientInfoDetails').addClass('ficheClient-infoEdit');
            $('.ficheClientInfoDetails').removeAttr('disabled');
        
    });


    $('.ficheClientInfoValider').click(function(){
        
            $('.ficheClientInfoValider').css('display','none');
            $('.ficheClientInfoDetails').removeClass('ficheClient-infoEdit');
            $('.ficheClientInfoDetails').addClass('disabled');
       });


    $('.editerMp').click(function(){

            $(this).css('display','none');
            $('.ficheClient-identifiantValider').css('display','block');
            $('.ficheClient-identifiantMdp').addClass('ficheClient-infoEdit');
            $('.ficheClient-identifiantMdp').attr('type','text');
            $('.ficheClient-identifiantMdp').removeAttr('disabled');
        
    });


    $('.ficheClient-identifiantValider').click(function(){
            
            $('.editerMp').css('display','block');
            $('.ficheClient-identifiantValider').css('display','none');
            $('.ficheClient-identifiantMdp').removeClass('ficheClient-infoEdit');
            $('.ficheClient-identifiantMdp').attr('type','password');
            $('.ficheClient-identifiantMdp').addClass('disabled');
       });

}

function btnModifQte(){ 


    /* Ajout quantites */

    $(".btnModifQte").on("click", function() {

      var $button = $(this);
      var oldValue = $button.parent().parent().find("input").val();

      if ($button.text() == "+")
       {
          var newVal = parseFloat(oldValue) + 1;
        } 
        else 
        {
           // Don't allow decrementing below zero
            if (oldValue > 0) 
            {
              var newVal = parseFloat(oldValue) - 1;
            } 
            else 
            {
              newVal = 0;
            }
        }

      $button.parent().parent().find("input").val(newVal);

    });
    

}

  