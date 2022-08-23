$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        center: true,
        items:2,
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            600:{
                items:4
            }
        }
    });
    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
      })
    $('.droptab-arrow.btn').addClass('collapsed')
    // $('.droptabs .card:first-child').addClass('expanded-tab');
    // //$('.droptabs .expanded-tab .collapse').addClass('show');
    // $('.droptabs .card-header').click(function(){
    //     $('.droptabs').find('.card').removeClass('expanded-tab');
    //     $('.droptabs').find('.collapse').removeClass('show');
    //     $(this).parentsUntil('.droptabs').addClass('expanded-tab');
    //     $('.expanded-tab').find('.collapse').toggleClass('show');
    // });
    // $('.card-header').click(function(){
    //     $(this).parentsUntil('main').find('.collapse').removeClass('show');
    //    $(this).parent().find('.collapse').toggleClass('show');
    // });
    // $('.droptab-arrow').click(function(){
    //     $(this).parentsUntil('main').find('.collapse.show').toggleClass('show');
    //     $(this).addClass('dropped').parentsUntil('.droptabs').find('.collapse').toggleClass('show');
    // });

});