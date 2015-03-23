(function() {

  var app = {

    init: function() {
      this.tableRow();
    },

    tableRow: function() {

      $('.data-table tr').hover(function() {
        $(this).find('.left-icons i.left').show();
        $(this).find('.right-icons i').show();
      });

      $('.data-table tr').mouseleave(function() {
        $(this).find('.left-icons i.left').hide();
        $(this).find('.right-icons i').hide();
      });
    }

  };

  app.init();

})();
