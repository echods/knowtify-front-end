(function() {

  "use strict";

  var knowtify = {

    slideSpeed: 300,

    init: function() {
      this.listeners();
    },

    listeners: function() {

      // Item hover behavior
      $('.data-items>li:not(.nested)').hover(this.showHoverIcons);
      $('.data-items>li').mouseleave(this.hideHoverIcons);

      // Add property buttons. showDiv what to show, height to animate
      $('.property-btn').click({showDiv: '.level-1-row', height: '60px'}, this.itemRow);
      $('.nested-property-btn').click({showDiv: '.level-2-row', height: '60px'}, this.itemRow);
      
      // Nested row
      $('.nested-row-btn').click(this.nestedRow);

      // Cancel click button
      $('.cancel').click(this.cancelButton);
    },

    showHoverIcons: function() {
      $(this).find('.left-icons>i.left').show();
      $(this).find('.right-icons>i').show();
    },

    hideHoverIcons: function() {
      $(this).find('.left-icons>i.left').hide();
      $(this).find('.right-icons>i').hide();
    },

    // Button to show/hide row
    itemRow: function(event, div, height) {

      var div = (event) ? event.data.showDiv : div; // show div given else use event
      var height = (event) ? event.data.height : height; // height given else use event
      var showHide = (height) ? 'animateShowHeight' : 'animateHideHeight';  // if height not exist hide
      
      knowtify[showHide](div, height); // call hide or show

      // Adjust height on adding of row
      var level = div.split('-')[1];
      var nestedHeight = $('.data-nested-container').height() + 110;
      if(level > 1) knowtify.animateShowHeight('.nested', nestedHeight);

    },

    // Animate height
    animateShowHeight: function(className, height) {
      $(className).show().animate({
        opacity: 1,
        height: height
      }, knowtify.slideSpeed);
    },

    // Animate height
    animateHideHeight: function(className) {
      $(className).animate({
        opacity: 0,
        height: '0px',
      }, knowtify.slideSpeed, function() {
        $(this).hide();
      });
    },

    // x icon cancel button
    cancelButton: function(event) {
      event.preventDefault();
      
      var div = $(this).closest('.new-row'),
      classes = div.attr('class').split(' '),
      whichClass = classes[1];
      
      knowtify.itemRow(null, '.' + whichClass);
    },

    nestedRow: function() {
      var isVisible = $(this).data('visible');

      if(isVisible) {
        $(this).data('visible', false);
        knowtify.swapClasses($(this).children(), 'icon-right-arrow', 'icon-down-arrow');
        knowtify.nestedShowRow();
      } else {
        $(this).data('visible', true);
        knowtify.swapClasses($(this).children(), 'icon-down-arrow', 'icon-right-arrow');
        knowtify.nestedHideRow();
      }
    },

    nestedShowRow: function() {
      $('.nested').fadeIn('fast');
      var nestedHeight = $('.data-nested-container').height() + 50;

      knowtify.animateShowHeight('.nested', nestedHeight);
    },

    nestedHideRow: function() {
      knowtify.animateHideHeight('.nested');
      $('.nested').fadeOut('fast');
    },

    swapClasses: function(item, first, second) {
      item.removeClass(first).addClass(second);
    }

  };

  knowtify.init();

})();
