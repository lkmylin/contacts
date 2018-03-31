(function() {
  DatatableModule.service('datatableProvider', [
    'datatableFilterProvider', 'datatablePagerProvider', function(filterProvider, pagerProvider) {
      this.Datatable = function(columns, rows, tableID, pageSize, updateCallback) {
        var pager;
        if (pageSize == null) {
          pageSize = 10;
        }
        if (updateCallback == null) {
          updateCallback = null;
        }
        pager = new pagerProvider.Pager([], pageSize, tableID, updateCallback);
        pager.Update(rows);
        return {
          Columns: columns,
          Rows: rows,
          Filter: new filterProvider.Filter(pager, rows, columns),
          Pager: pager,
          TableID: tableID
        };
      };
      return this;
    }
  ]);

}).call(this);
