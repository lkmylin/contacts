DatatableModule.service 'datatableProvider', ['datatableFilterProvider', 'datatablePagerProvider', (filterProvider, pagerProvider) ->
  @Datatable = (columns, rows, tableID, pageSize = 10, updateCallback = null) ->
    pager = new pagerProvider.Pager([], pageSize, tableID, updateCallback)
    pager.Update rows
    Columns: columns
    Rows: rows
    Filter: new filterProvider.Filter(pager, rows, columns)
    Pager: pager
    TableID: tableID
  @
]