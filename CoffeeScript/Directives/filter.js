(function() {
  DatatableModule.directive('datatableFilter', function() {
    return {
      restrict: 'E',
      scope: {
        Filter: '=filter'
      },
      templateUrl: 'Templates/filter.html'
    };
  });

}).call(this);
