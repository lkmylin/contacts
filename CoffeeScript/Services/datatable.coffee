DatatableModule.service 'datatableProvider', ['datatableFilterProvider', 'datatablePagerProvider', (filterProvider, pagerProvider) ->
  @Datatable = (columns, rows, tableID, pageSize = 10, updateCallback = null) ->
    pager = new pagerProvider.Pager([], pageSize, tableID, updateCallback)
    pager.Update rows
    result =
      Columns: columns
      Rows: rows
      Filter: new filterProvider.Filter(pager, rows, columns)
      Pager: pager
      TableID: tableID
      Update: (rows) ->
        @Pager.Update rows
      Sort: (column) ->
        bit = if column.SortOrder is 0 then 1 else -1
        @Update @Rows.sort (x, y) -> if x[column.ColumnID].toLowerCase() > y[column.ColumnID].toLowerCase() then bit else -1 * bit
        column.SortOrder = if column.SortOrder is 0 then 1 else 0
    c.SortOrder = 0 for c in result.Columns
    result
  @
]