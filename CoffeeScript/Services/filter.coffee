DatatableModule.service 'datatableFilterProvider', ->
  @Filter = (pager, data, columns) ->
    PagerInstance: pager
    Data: data
    Input: pager.StateManager.GetValue pager.ControlID, 'FilterInput', ''
    Columns: columns
    SelectedColumn: columns[pager.StateManager.GetValue pager.ControlID, 'FilterColumnIndex', 0]
    FilterData: ->
      context = @
      context.PagerInstance.StateManager.SetValue context.PagerInstance.ControlID, 'FilterColumnIndex', context.Columns.findIndex((x) -> x.ColumnID is context.SelectedColumn.ColumnID)
      context.PagerInstance.StateManager.SetValue context.PagerInstance.ControlID, 'FilterInput', context.Input
      input = context.Input.toLowerCase()
      filteredData = if context.Input.length > 2 then context.Data.filter((item) -> item[context.SelectedColumn.ColumnID].toLowerCase().search(input) > -1) else context.Data
      context.PagerInstance.Update filteredData
    SelectedColumnChanged: ->
      context = @
      context.PagerInstance.StateManager.SetValue context.PagerInstance.ControlID, 'FilterColumnIndex', context.Columns.findIndex((x) -> x.ColumnID is context.SelectedColumn.ColumnID)
      context.FilterData() if context.Input.length > 2
  @