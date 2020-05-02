
jQuery(document).ready(function($) {  

svgConvert('.svgIcon');


$('.menuIcon').click(function() {
  $(this).toggleClass('close');
  $('.menuMain').toggleClass('menu-drawer');
  $('body').toggleClass('fixbody');
});

/* Custome tabing */
$('.tab').click(function() {
  $('.tab').removeClass('active');
    $(this).addClass('active');
  var tabId = $(this).data('tab');
  //alert(tabId);
  $('.tabBody').removeClass('tabActive');
  $('#'+tabId).addClass('tabActive');
  
}).eq(0).click();  



/*~~~~~~~ 02. Window Scroll  ~~~~~~~~*/

$('.scrollTop').click(function() {
    $('html, body').animate({scrollTop: 0}, 800);
    return false;
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.scrollTop').fadeIn();
    } else {
        $('.scrollTop').fadeOut();
    }
});


$(".only_number").keypress(function(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 8)
        return false;
    if (charCode == 46)
        return false;
    return true;
}); 

        

/* easy Responsive Tabs */
    $(".accoContain").before("<div class='resp-accordion tabing'></div>"); 
    $('.resp-accordion:first-child').addClass('current');
    var itemCount = 0;
    $('.resp-accordion').each(function() {
        var innertext = $('.tabing:eq(' + itemCount + ')').html();
        var dataTab = $('.tabing:eq(' + itemCount + ')').data('tab');
        $('.resp-accordion:eq(' + itemCount + ')').append(innertext);
        $('.resp-accordion:eq(' + itemCount + ')').attr('data-tab', dataTab);
        itemCount++;
    });

    $(".detailTab li").click(function() {
        var tabId = $(this).attr('data-tab');        
        $('.tabing').removeClass("current");
        //$(".accoContain").css('display', '');
        $(".accoContain").removeClass("current in");
        $('[data-tab = ' + tabId + ']').addClass("current");
        $("#" + tabId).addClass("current");
        setTimeout(function() {
            $("#" + tabId).addClass("in");
        }, 100);
    }).filter(':first').click();
    $(".resp-accordion").click(function() {
        var tabId = $(this).attr('data-tab');       
        if ($(this).hasClass("current")) {
            $('[data-tab = ' + tabId + ']').removeClass("current");
            $(".accoContain").removeClass("current in");
            $(this).next().slideUp();
        } else {
            $('.tabing').removeClass("current");
            $(".accoContain").removeClass("current in");
            $('[data-tab = ' + tabId + ']').addClass("current");
            $(".accoContain").slideUp();
            $(this).next().slideDown();
            $("#" + tabId).addClass("current");
            setTimeout(function() {
                $("#" + tabId).addClass("in");
                $("html,body").animate({
                    scrollTop: $('.resp-accordion.current').offset().top
                }, "slow");
            }, 600);
        }
    });



// Select all links with hashes

$('a[href*="#"]')

  // Remove links that don't actually link to anything

  .not('[href="#"]')

  .not('[href="#0"]')

  .click(function(event) {

    // On-page links

    if (

      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 

      && 

      location.hostname == this.hostname

    ) {

      // Figure out element to scroll to

      var target = $(this.hash);

      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      // Does a scroll target exist?

      if (target.length) {

        // Only prevent default if animation is actually gonna happen

        event.preventDefault();

        $('html, body').animate({

          scrollTop: target.offset().top

        }, 1000, function() {

          // Callback after animation

          // Must change focus!  

          var $target = $(target);

          $target.focus();

          if ($target.is(":focus")) { // Checking if the target was focused

            return false;

          } else {

            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable

            $target.focus(); // Set focus again

          };

        });

      }

    }

  });




});

/* ------| A. Svg Rendering In Browser |--------- */

function svgConvert(svgClass) {
    $(svgClass).each(function() {        
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
          /* Get the SVG tag, ignore the rest */
          var $svg = $(data).find('svg');
          /* Add replaced image's ID to the new SVG */
          if (typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          /* Add replaced image's classes to the new SVG */
          if (typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass + ' svgIcon');
          }
          $svg = $svg.attr('fill', 'currentColor');
          /* Remove any invalid XML tags as per http://validator.w3.org */
          $svg = $svg.removeAttr('xmlns:a');
          /* Replace image with new SVG*/
          $img.replaceWith($svg);
      }, 'xml');

    });

}
