DatatableModule.service 'datatableProvider', ['datatableCacheService', 'datatableFilterProvider', 'datatablePagerProvider', (cacheService, filterProvider, pagerProvider) ->
  @Datatable = (columns, rows, tableID, pageSize = 10, updateCallback = null) ->
    result =
      StateManager: new cacheService.StateManager()
      TableID: tableID
      Sort: (column, bSwitch = true) ->
        column.SortOrder = if bSwitch then -1 * column.SortOrder else column.SortOrder
        @Filter.AllRecords = @Filter.AllRecords.sort (x, y) -> if x[column.ColumnID].toLowerCase() > y[column.ColumnID].toLowerCase() then column.SortOrder else -1 * column.SortOrder
        @Filter.FilterData()
        @StateManager.SetValue @TableID, column.ColumnID + @StateManager.CachedProperties.SortOrder, column.SortOrder
        @StateManager.SetValue @TableID, @StateManager.CachedProperties.SortColumnID, column.ColumnID
    result.Filter = new filterProvider.Filter result, rows, columns
    result.Pager = new pagerProvider.Pager result, pageSize, updateCallback
    result.SortColumn = columns.filter((column) -> column.ColumnID is result.StateManager.GetValue(tableID, result.StateManager.CachedProperties.SortColumnID, columns[0].ColumnID))[0]
    c.SortOrder = result.StateManager.GetValue result.TableID, c.ColumnID + result.StateManager.CachedProperties.SortOrder, 1 for c in result.Filter.Columns
    result.Sort result.SortColumn, false
    result
  @
]