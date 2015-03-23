(function() {

  var knowtify = {

    slideDownSpeed: 'slow',

    init: function() {
      this.tableRowHover();
      this.addTableRow();
    },

    tableRowHover: function() {

      $('.data-table tr').hover(function() {
        $(this).find('.left-icons i.left').show();
        $(this).find('.right-icons i').show();
      });

      $('.data-table tr').mouseleave(function() {
        $(this).find('.left-icons i.left').hide();
        $(this).find('.right-icons i').hide();
      });
    },

    addTableRow: function() {
      $('#add-property').click(function() {
        $('.new-row').slideDown(knowtify.slideDownSpeed);
      });
    }

  };

  knowtify.init();

})();
