(function() {
  DatatableModule.service('datatableFormattingService', function() {
    this.FormatIntWithCommas = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return this;
  });

}).call(this);
