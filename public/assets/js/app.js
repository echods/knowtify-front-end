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

      // Click to blue
      $('.edit').click(this.editItem)

      // Add property buttons. showDiv what to show, height to animate
      $('.property-level1-btn').click({showDiv: '.level-1-row', height: '60px'}, this.itemRow);
      $('.property-level2-btn').click({showDiv: '.level-2-row', height: '60px'}, this.itemRow);
      $('.property-level3-btn').click({showDiv: '.level-3-row', height: '60px'}, this.itemRow);
      
      // Nested row
      $('.nested-row-btn').click(this.nestedRow);
      $('.advanced-select').click(this.nestedRow);

      // Cancel click button
      $('.cancel').click(this.cancelButton);
      $('.click-cancel').click(this.revertEdit);
    },

    showHoverIcons: function() {
      $(this).find('.left-icons a>i.left').show();
      $(this).find('.right-icons>i').show();
    },

    hideHoverIcons: function() {
      $(this).find('.left-icons a>i.left').hide();
      $(this).find('.right-icons>i').hide();
    },

    // Button to show/hide row
    itemRow: function(event, div, height, isCancel) {

      var div = (event) ? event.data.showDiv : div; // show div given else use event
      var height = (event) ? event.data.height : height; // height given else use event
      var showHide = (height) ? 'animateShowHeight' : 'animateHideHeight';  // if height not exist hide
      
      knowtify[showHide](div, height); // call hide or show

      // Adjust height on adding of row
      // var level = div.split('-')[1];
      // if(level > 1) knowtify.animateShowHeight('.nested', nestedHeight);

    },

    editItem: function(event) {
      knowtify.hideHoverIcons();
      var $this = $($(this).closest('li'));
      console.log($this);
      $this.addClass('blue-row');
      var leftIcons = $this.find('.left-icons'),
      title = $this.find('.title'),
      itemInfo = $this.find('.item-info'),
      itemForm = $this.find('.item-form'),
      rightIcons = $this.find('.right-icons');

      rightIcons.removeClass('right-icons').addClass('operations');

      leftIcons.html('');
      title.html('<input type="text" name="property_name" placeholder="property name" value="' + title.html() + '">');
      itemInfo.html('<input type="text" name="property_name" placeholder="property name" value="' + itemInfo.html() + '">');
      itemForm.html('<form><div class="item-select">\
        <select name="add-new"><option value="">data type</option>\
        <option value="lorem">Lorem</option>\
        <option value="ipsum">Ipsum</option>\
        <option value="dolor">Dolor</option>\
        </select>\
        </div></form>');
      rightIcons.html('<a href="#" class="click-cancel"><i class="icon icon-cancel"></i></a>\
            <a href="#" class="click-check"><i class="icon icon-check"></i></a>')
    },

    revertEdit: function() {
      console.log('revert back');
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
      nested = $this.closest('li').next(); // grab next listed list item

      if(isVisible) {
        $this.data('visible', false);
        knowtify.swapClasses($this.children(), 'icon-right-arrow', 'icon-down-arrow');
        knowtify.nestedToggle(nested, 'nested-hidden-height', 'nested-show-height');
      } else {
        $this.data('visible', true);
        knowtify.swapClasses($this.children(), 'icon-down-arrow', 'icon-right-arrow');
        knowtify.nestedToggle(nested, 'nested-show-height', 'nested-hidden-height');
      }
    },

    swapClasses: function(item, first, second) {
      item.removeClass(first).addClass(second);
    },

    nestedToggle: function(nested, class1, class2) {
      $(nested).switchClass( class1, class2, knowtify.slideSpeed, "easeInOutQuad" )
    }

    // nestedHideRow: function(nested, clas) {
    //   $(nested).switchClass( class1, class2, knowtify.slideSpeed, "easeInOutQuad" )
    // }

  };

  knowtify.init();

})();
