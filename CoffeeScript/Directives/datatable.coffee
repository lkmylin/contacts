DatatableModule.directive 'datatable', ->
  restrict: 'E'
  scope:
    TableData: '=tableData'
  templateUrl: 'Templates/datatable.html'