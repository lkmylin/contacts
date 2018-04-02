(function() {
  DatatableModule.service('datatableProvider', [
    'datatableFilterProvider', 'datatablePagerProvider', function(filterProvider, pagerProvider) {
      this.Datatable = function(columns, rows, tableID, pageSize, updateCallback) {
        var c, i, len, pager, ref, result;
        if (pageSize == null) {
          pageSize = 10;
        }
        if (updateCallback == null) {
          updateCallback = null;
        }
        pager = new pagerProvider.Pager([], pageSize, tableID, updateCallback);
        pager.Update(rows);
        result = {
          Columns: columns,
          Rows: rows,
          Filter: new filterProvider.Filter(pager, rows, columns),
          Pager: pager,
          TableID: tableID,
          Update: function(rows) {
            return this.Pager.Update(rows);
          },
          Sort: function(column) {
            var bit;
            bit = column.SortOrder === 0 ? 1 : -1;
            this.Update(this.Rows.sort(function(x, y) {
              if (x[column.ColumnID].toLowerCase() > y[column.ColumnID].toLowerCase()) {
                return bit;
              } else {
                return -1 * bit;
              }
            }));
            return column.SortOrder = column.SortOrder === 0 ? 1 : 0;
          }
        };
        ref = result.Columns;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          c.SortOrder = 0;
        }
        return result;
      };
      return this;
    }
  ]);

}).call(this);
