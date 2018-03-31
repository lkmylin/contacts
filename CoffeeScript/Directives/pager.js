(function() {
  DatatableModule.directive('datatablePager', function() {
    return {
      restrict: 'E',
      scope: {
        Pager: '=pager'
      },
      templateUrl: 'Templates/pager.html'
    };
  });

}).call(this);
