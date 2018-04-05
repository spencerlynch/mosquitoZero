$(window).on('load', function(){

	"use strict";
 
	
	
	/* ========================================================== */
	/*   Navigation Background Color                              */
	/* ========================================================== */
	
	$(window).on('scroll', function() {
		if($(this).scrollTop() > 100) {
			$('.navbar-fixed-top').addClass('opaque');
		} else {
			$('.navbar-fixed-top').removeClass('opaque');
		}
	});
 
	
	/* ========================================================== */
	/*   Hide Responsive Navigation On-Click                      */
	/* ========================================================== */
	
	  $(".navbar-nav li a").on('click', function(event) {
	    $(".navbar-collapse").collapse('hide');
	  });

	
	/* ========================================================== */
	/*   Navigation Color                                         */
	/* ========================================================== */
	
	$('#navbar-collapse-02').onePageNav({
		filter: ':not(.external)'
	});


	/* ========================================================== */
	/*   SmoothScroll                                             */
	/* ========================================================== */
	
	$(".nav li a, a.scrool").on('click', function(e) {
		
		var full_url = this.href;
		var parts = full_url.split("#");
		var trgt = parts[1];
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top;
		
		$('html,body').animate({scrollTop:target_top -70}, 1000);
			return false;
		
	});


	/* ========================================================== */
	/*   FUNFACTS                                              */
	/* ========================================================== */

	/* ========================================================== */
	/*   Register                                                 */
	/* ========================================================== */
	
	$('#register-form').each( function(){
		var form = $(this);
		//form.validate();
		form.submit(function(e) {
			if (!e.isDefaultPrevented()) {
				jQuery.post(this.action,{
					'names':$('input[name="register_names"]').val(),
					'phone':$('input[name="register_phone"]').val(),
					'email':$('input[name="register_email"]').val(),
					'ticket':$('select[name="register_ticket"]').val(),
				},function(data){
					form.fadeOut('fast', function() {
						$(this).siblings('p.register_success_box').show();
					});
				});
				e.preventDefault();
			}
		});
	})
	
	
	/* ========================================================== */
	/*   Contact                                                  */
	/* ========================================================== */
	$("#my_form").submit(function(event){
    event.preventDefault(); //prevent default action 
    var proceed = true;
    var form = this;
    
    //simple validation at client's end
    //loop through each field and we simply change border color to red for invalid fields       
    $(form).find(':required').each(function(){
        $(this).css('border-color',''); 
        if(!$.trim($(this).val())){ //if this field is empty 
            $(this).css('border-color','red'); //change border color to red   
            proceed = false; //set do not proceed flag
        }
        //check invalid email
        var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
        if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
            $(this).css('border-color','red'); //change border color to red   
            proceed = false; //set do not proceed flag              
        }   

    }).keyup(function() { //reset previously set border colors on .keyup()
        $(this).css('border-color',''); 
    }).change(function() {  //for select box
        $(this).css('border-color',''); 
    }); 
    
    if(proceed){ //everything looks good! proceed...
        //get input field values data to be sent to server
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serialize(); //Encode form elements for submission
        
        //Ajax post data to server
        $.ajax({
            url : post_url,
            type: request_method,
            dataType : 'json',
            data : form_data
        })
        .done(function(response){ 
            if(response.type == 'error'){ //load json data from server and output message     
                output = '<div class="error">'+response.text+'</div>';
            }else{
                $(form)[0].reset(); //reset this form upon success
                output = '<div class="success">'+response.text+'</div>';
            }
            $("#contact_form #contact_results").html(output);
        });

	/* ========================================================== */
	/*   Animated-Features                                        */
	/* ========================================================== */
 
 	$('.visage-feature .feature-icon .leaf').on('click',function()
 		{if($(this).parents('.visage-feature').hasClass('feature-show'))
 			{$(this).parents('.visage-feature').removeClass('feature-show')}
 		else {$(this).parents('.visage-feature').addClass('feature-show')}});

	/* ========================================================== */
	/*   FAQ Accordian                                            */
	/* ========================================================== */
    // Since there's no list-group/tab integration in Bootstrap
    $('.list-group-item').on('click',function(e){
     	var previous = $(this).closest(".list-group").children(".active");
     	previous.removeClass('active'); // previous list-item
     	$(e.target).addClass('active'); // activated list-item
   		});
