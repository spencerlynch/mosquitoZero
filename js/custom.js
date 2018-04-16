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
    
});