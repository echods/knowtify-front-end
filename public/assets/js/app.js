(function() {

  var knowtify = {

    slideDownSpeed: 300,

    init: function() {
      this.tableRowHover();
      this.addTableRow('add-property', 'new-row');
      this.addTableRow('add-property-nested', 'sub-row');
      this.slideRow();
    },

    tableRowHover: function() {

      $('.data-items>li').hover(function() {
        $(this).find('.left-icons>i.left').show();
        $(this).find('.right-icons>i').show();
      });

      $('.data-items>li').mouseleave(function() {
        $(this).find('.left-icons>i.left').hide();
        $(this).find('.right-icons>i').hide();
      });
    },

    addTableRow: function(listener, showDiv) {
      $('.' + listener).click(function() {
        knowtify.slideRow('.' + showDiv);
      });
    },

    slideRow: function(className) {
      $(className).show().animate({
        opacity: 1,
        height: '60px'
      }, knowtify.slideDownSpeed);
    },

    slideRow: function() {

      $('.nested-row-button').click(function(){

        $(this).removeClass('nested-row-button').addClass('nested-activated');

        $(this).children().removeClass('icon-right-arrow').addClass('icon-down-arrow');

        $('.nested').fadeIn();

        var nestedHeight = $('.data-nested-container').height() + 50;

        $('.nested').animate({
          height: nestedHeight
        });
        
      });

      // $('.nested-activated').click(function(){

      //   $(this).addClass('nested-row-button').removeClass('nested-activated').;

      //   $(this).children().removeClass('icon-down-arrow').addClass('icon-right-arrow');

      //   $('.nested').animate({
      //     height: '0px'
      //   });
        
      //   $('.nested').fadeOut();

      // });


    }

  };

  knowtify.init();

})();
