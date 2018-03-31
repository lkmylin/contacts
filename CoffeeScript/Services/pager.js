(function() {
  DatatableModule.service('datatablePagerProvider', [
    'datatableFormattingService', 'datatableCacheService', function(formattingService, cacheService) {
      this.Pager = function(data, pageSize, controlID, updateCallback) {
        var stateManager;
        if (updateCallback == null) {
          updateCallback = null;
        }
        stateManager = new cacheService.StateManager();
        return {
          ControlID: controlID,
          StateManager: stateManager,
          PageNumberDisplayCount: 10,
          PageSize: pageSize,
          CurrentPage: stateManager.GetValue(controlID, 'CurrentPage', 1),
          FirstDisplayedPageNumber: 1,
          TotalRecordCount: 0,
          PageCount: 0,
          DisplayPages: [],
          AllRecords: data,
          DisplayRecords: [],
          Information: null,
          Update: function(data) {
            var endIndex, i, j, k, ref, ref1, ref2, ref3, startIndex;
            this.AllRecords = data;
            this.TotalRecordCount = data.length;
            if (data.length > this.PageSize) {
              this.PageCount = parseInt(data.length / this.PageSize);
              if (data.length % this.PageSize !== 0) {
                this.PageCount++;
              }
            } else {
              this.PageCount = 1;
            }
            if (this.CurrentPage > this.PageCount) {
              this.CurrentPage = this.PageCount;
              this.FirstDisplayedPageNumber = this.CurrentPage - this.PageNumberDisplayCount + 1 > 1 ? this.CurrentPage - this.PageNumberDisplayCount + 1 : 1;
            }
            this.DisplayPageNumbers = [];
            for (i = j = ref = this.FirstDisplayedPageNumber, ref1 = this.PageCount; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
              if (this.DisplayPageNumbers.length < this.PageNumberDisplayCount) {
                this.DisplayPageNumbers[this.DisplayPageNumbers.length] = i;
              }
            }
            this.DisplayRecords = [];
            startIndex = this.PageSize * (this.CurrentPage - 1);
            endIndex = this.PageSize * this.CurrentPage - 1;
            if (endIndex > this.TotalRecordCount - 1) {
              endIndex = this.TotalRecordCount - 1;
            }
            for (i = k = ref2 = startIndex, ref3 = endIndex; ref2 <= ref3 ? k <= ref3 : k >= ref3; i = ref2 <= ref3 ? ++k : --k) {
              if (i < data.length) {
                this.DisplayRecords[this.DisplayRecords.length] = data[i];
              }
            }
            if (this.PageCount > 1) {
              if (this.CurrentPage === this.PageCount && this.DisplayRecords.length === 1) {
                this.Information = "Displaying Record " + (formattingService.FormatIntWithCommas(this.TotalRecordCount)) + " of " + (formattingService.FormatIntWithCommas(this.TotalRecordCount));
              } else {
                this.Information = "Displaying " + (formattingService.FormatIntWithCommas(startIndex + 1)) + "-" + (formattingService.FormatIntWithCommas(endIndex + 1)) + " of " + (formattingService.FormatIntWithCommas(this.TotalRecordCount)) + " Records";
              }
            } else if (this.TotalRecordCount === 0) {
              this.Information = 'No Results';
            } else if (this.TotalRecordCount === 1) {
              this.Information = 'Displaying 1 Record';
            } else {
              this.Information = "Displaying " + this.TotalRecordCount + " Records";
            }
            return typeof updateCallback === "function" ? updateCallback() : void 0;
          },
          Go: function(page) {
            var currentFirstDisplayedPageNumber, currentLastDisplayedPageNumber;
            if (page < 1 || page > this.PageCount) {
              return;
            }
            this.CurrentPage = page;
            currentFirstDisplayedPageNumber = this.DisplayPageNumbers[0];
            currentLastDisplayedPageNumber = this.DisplayPageNumbers[this.DisplayPageNumbers.length - 1];
            if (this.CurrentPage < currentFirstDisplayedPageNumber) {
              this.FirstDisplayedPageNumber = this.CurrentPage;
            }
            if (this.CurrentPage > currentLastDisplayedPageNumber) {
              this.FirstDisplayedPageNumber = this.CurrentPage - this.PageNumberDisplayCount + 1;
            }
            this.StateManager.SetValue(this.ControlID, 'CurrentPage', this.CurrentPage);
            return this.Update(this.AllRecords);
          },
          Advance: function(isFwd) {
            var currentFirstDisplayedPageNumber, currentLastDisplayedPageNumber, lastPossibleFirstDisplayedPageNumber, target;
            if (this.PageCount <= this.PageNumberDisplayCount) {
              return;
            }
            if (this.CurrentPage === 1 && !isFwd) {
              return;
            }
            if (this.CurrentPage === this.PageCount && isFwd) {
              return;
            }
            currentFirstDisplayedPageNumber = this.DisplayPageNumbers[0];
            currentLastDisplayedPageNumber = this.DisplayPageNumbers[this.DisplayPageNumbers.length - 1];
            if (currentFirstDisplayedPageNumber === 1 && !isFwd) {
              return;
            }
            if (currentLastDisplayedPageNumber === this.PageCount && isFwd) {
              return;
            }
            lastPossibleFirstDisplayedPageNumber = this.PageCount - this.PageNumberDisplayCount + 1;
            if (isFwd) {
              target = currentFirstDisplayedPageNumber + this.PageNumberDisplayCount;
              this.FirstDisplayedPageNumber = target <= lastPossibleFirstDisplayedPageNumber ? target : lastPossibleFirstDisplayedPageNumber;
              this.CurrentPage = this.FirstDisplayedPageNumber;
            } else {
              target = currentFirstDisplayedPageNumber - this.PageNumberDisplayCount;
              this.FirstDisplayedPageNumber = target > 1 ? target : 1;
              this.CurrentPage = this.FirstDisplayedPageNumber + this.PageNumberDisplayCount - 1;
            }
            this.StateManager.SetValue(this.ControlID, 'CurrentPage', this.CurrentPage);
            return this.Update(this.AllRecords);
          }
        };
      };
      return this;
    }
  ]);

}).call(this);
