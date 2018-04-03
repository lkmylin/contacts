DatatableModule.service 'datatableFilterProvider', ->
  @Filter = (parent, rows, columns) ->
    Parent: parent
    AllRecords: rows
    Input: parent.StateManager.GetValue parent.TableID, parent.StateManager.CachedProperties.FilterInput, ''
    Columns: columns
    SelectedColumn: columns.filter((column) -> column.ColumnID is parent.StateManager.GetValue(parent.TableID, parent.StateManager.CachedProperties.FilterColumnID, columns[0].ColumnID))[0]
    FilterData: ->
      context = @
      context.Parent.StateManager.SetValue context.Parent.TableID, @Parent.StateManager.CachedProperties.FilterColumnID, context.SelectedColumn.ColumnID
      context.Parent.StateManager.SetValue context.Parent.TableID, @Parent.StateManager.CachedProperties.FilterInput, context.Input
      input = context.Input.toLowerCase()
      filteredData = if context.Input.length > 2 then context.AllRecords.filter((item) -> item[context.SelectedColumn.ColumnID].toLowerCase().search(input) > -1) else context.AllRecords
      context.Parent.Pager.Update filteredData
    SelectedColumnChanged: ->
      context = @
      context.Parent.StateManager.SetValue context.Parent.TableID, @Parent.StateManager.CachedProperties.FilterColumnID, context.SelectedColumn.ColumnID
      context.FilterData() if context.Input.length > 2
  @