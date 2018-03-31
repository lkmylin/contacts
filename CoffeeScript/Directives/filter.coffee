DatatableModule.directive 'datatableFilter', ->
  restrict: 'E'
  scope:
    Filter: '=filter'
  templateUrl: 'Templates/filter.html'