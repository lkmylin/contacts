(function() {
  DatatableModule.directive('datatable', function() {
    return {
      restrict: 'E',
      scope: {
        TableData: '=tableData'
      },
      templateUrl: 'Templates/datatable.html'
    };
  });

}).call(this);
