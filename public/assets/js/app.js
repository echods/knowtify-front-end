(function() {

  "use strict";

  var knowtify = {

    slideSpeed: 300,
    activeListItemHeight: '',

    init: function() {
      this.listeners();
    },

    listeners: function() {

      // Item hover behavior
      $('.data-items>li:not(.nested)').hover(this.showHoverIcons);
      $('.data-items>li').mouseleave(this.hideHoverIcons);

      // Add property buttons. showDiv what to show, height to animate
      $('.property-level1-btn').click({showDiv: '.level-1-row', height: '60px'}, this.itemRow);
      $('.property-level2-btn').click({showDiv: '.level-2-row', height: '60px'}, this.itemRow);
      $('.property-level3-btn').click({showDiv: '.level-3-row', height: '60px'}, this.itemRow);
      
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
    itemRow: function(event, div, height, isCancel) {

      var div = (event) ? event.data.showDiv : div; // show div given else use event
      var height = (event) ? event.data.height : height; // height given else use event
      var showHide = (height) ? 'animateShowHeight' : 'animateHideHeight';  // if height not exist hide
      
      knowtify[showHide](div, height); // call hide or show

      // Adjust height on adding of row
      var level = div.split('-')[1];
      // var nestedHeight = $('.data-nested-container').height() + 110; 
      // var nestedHeight = (isCancel) ? $('.data-nested-container').height() : $('.data-nested-container').height() + 110;
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

      console.log(whichClass);
      
      knowtify.itemRow(null, '.' + whichClass, null, true);

    },

    nestedRow: function(event) {
      event.preventDefault();

      var $this = $(this),
      isVisible = $this.data('visible'),
      nested = $this.closest('li').next(), // grab next listed list item
      nestedClassLevelName = '.' + nested.attr('class').split(' ')[1]; // get class level name

      if(isVisible) {
        $this.data('visible', false);
        knowtify.swapClasses($this.children(), 'icon-right-arrow', 'icon-down-arrow');
        knowtify.nestedShowRow(nestedClassLevelName);
      } else {
        $this.data('visible', true);
        knowtify.swapClasses($this.children(), 'icon-down-arrow', 'icon-right-arrow');
        knowtify.nestedHideRow(nestedClassLevelName);
      }
    },

    nestedShowRow: function(nested) {

      var $nested = $(nested);

      // Find nested container height to adjust add 50 to it
      $nested.fadeIn('fast');
      var nestedHeight = $nested.find('.data-nested-container').height();
      nestedHeight += 50;

      

      // Grab nested level number
      var level = nested.split('-')[2];
      if(level == 2) knowtify.activeListItemHeight = nestedHeight;

      console.log(nestedHeight);

      // Adjust height of list item
      knowtify.animateShowHeight(nested, nestedHeight);

      // Adjust parent height if need be
      knowtify.adjustParentClass(nested, nestedHeight);
      
    },

    nestedHideRow: function(nested) {
      var $nested = $(nested);

      // Adjust height on hide of list item
      knowtify.animateHideHeight(nested);
      $nested.fadeOut('fast');

      console.log(knowtify.activeListItemHeight);

      // Grab nested level number
      var level = nested.split('-')[2];
      // if(level > 2) knowtify.activeListItemHeight = nestedHeight;

      console.log($nested.closest('nested'));

      knowtify.animateShowHeight(nested, 50);

      // Adjust parent height if need be
      // knowtify.adjustParentClass(nested, knowt`ify.activeListItemHeight);

    },

    adjustParentClass: function(nested, nestedHeight) {
      var $nested = $(nested);

      // Grab nested level number
      var level = nested.split('-')[2];

      // Adjust parent class as well
      if(level > 2) {
        var nestedParentHeight = $nested.closest('.data-nested-container').height() + 50;
        knowtify.animateShowHeight('.nested-level-2', nestedHeight + nestedParentHeight);
      }
    },

    swapClasses: function(item, first, second) {
      item.removeClass(first).addClass(second);
    }

  };

  knowtify.init();

})();
