(function() {
  DatatableModule.service('datatableFilterProvider', function() {
    this.Filter = function(pager, data, columns) {
      return {
        PagerInstance: pager,
        Data: data,
        Input: pager.StateManager.GetValue(pager.ControlID, 'FilterInput', ''),
        Columns: columns,
        SelectedColumn: columns[pager.StateManager.GetValue(pager.ControlID, 'FilterColumnIndex', 0)],
        FilterData: function() {
          var context, filteredData, input;
          context = this;
          context.PagerInstance.StateManager.SetValue(context.PagerInstance.ControlID, 'FilterColumnIndex', context.Columns.findIndex(function(x) {
            return x.ColumnID === context.SelectedColumn.ColumnID;
          }));
          context.PagerInstance.StateManager.SetValue(context.PagerInstance.ControlID, 'FilterInput', context.Input);
          input = context.Input.toLowerCase();
          filteredData = context.Input.length > 2 ? context.Data.filter(function(item) {
            return item[context.SelectedColumn.ColumnID].toLowerCase().search(input) > -1;
          }) : context.Data;
          return context.PagerInstance.Update(filteredData);
        },
        SelectedColumnChanged: function() {
          var context;
          context = this;
          context.PagerInstance.StateManager.SetValue(context.PagerInstance.ControlID, 'FilterColumnIndex', context.Columns.findIndex(function(x) {
            return x.ColumnID === context.SelectedColumn.ColumnID;
          }));
          if (context.Input.length > 2) {
            return context.FilterData();
          }
        }
      };
    };
    return this;
  });

}).call(this);
