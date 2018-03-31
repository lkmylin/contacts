DatatableModule.service 'datatablePagerProvider', ['datatableFormattingService', 'datatableCacheService', (formattingService, cacheService) ->
  @Pager = (data, pageSize, controlID, updateCallback = null) ->
    stateManager = new cacheService.StateManager()
    ControlID: controlID
    StateManager: stateManager
    PageNumberDisplayCount: 10
    PageSize: pageSize
    CurrentPage: stateManager.GetValue controlID, 'CurrentPage', 1
    FirstDisplayedPageNumber: 1
    TotalRecordCount: 0
    PageCount: 0
    DisplayPages: []
    AllRecords: data
    DisplayRecords: []
    Information: null
    Update: (data) ->
      @AllRecords = data
      @TotalRecordCount = data.length
      if data.length > @PageSize
        @PageCount = parseInt data.length / @PageSize
        @PageCount++ if data.length % @PageSize isnt 0
      else @PageCount = 1
      if @CurrentPage > @PageCount
        @CurrentPage = @PageCount
        @FirstDisplayedPageNumber = if @CurrentPage - @PageNumberDisplayCount + 1 > 1 then @CurrentPage - @PageNumberDisplayCount + 1 else 1
      @DisplayPageNumbers = []
      (@DisplayPageNumbers[@DisplayPageNumbers.length] = i) for i in [@FirstDisplayedPageNumber..@PageCount] when @DisplayPageNumbers.length < @PageNumberDisplayCount
      @DisplayRecords = []
      startIndex = @PageSize * (@CurrentPage - 1)
      endIndex = @PageSize * @CurrentPage - 1
      endIndex = @TotalRecordCount - 1 if endIndex > @TotalRecordCount - 1
      (@DisplayRecords[@DisplayRecords.length] = data[i]) for i in [startIndex..endIndex] when i < data.length
      if @PageCount > 1
        if @CurrentPage is @PageCount and @DisplayRecords.length is 1
          @Information = "Displaying Record #{formattingService.FormatIntWithCommas(@TotalRecordCount)} of #{formattingService.FormatIntWithCommas(@TotalRecordCount)}"
        else @Information = "Displaying #{formattingService.FormatIntWithCommas(startIndex+1)}-#{formattingService.FormatIntWithCommas(endIndex+1)} of #{formattingService.FormatIntWithCommas(@TotalRecordCount)} Records"
      else if @TotalRecordCount is 0
        @Information = 'No Results'
      else if @TotalRecordCount is 1
        @Information = 'Displaying 1 Record'
      else @Information = "Displaying #{@TotalRecordCount} Records"
      updateCallback?()
    Go: (page) ->
      return if page < 1 or page > @PageCount
      @CurrentPage = page
      currentFirstDisplayedPageNumber = @DisplayPageNumbers[0]
      currentLastDisplayedPageNumber = @DisplayPageNumbers[@DisplayPageNumbers.length - 1]
      @FirstDisplayedPageNumber = @CurrentPage if @CurrentPage < currentFirstDisplayedPageNumber
      @FirstDisplayedPageNumber = @CurrentPage - @PageNumberDisplayCount + 1 if @CurrentPage > currentLastDisplayedPageNumber
      @StateManager.SetValue @ControlID, 'CurrentPage', @CurrentPage
      @Update @AllRecords
    Advance: (isFwd) ->
      return if @PageCount <= @PageNumberDisplayCount
      return if @CurrentPage is 1 and not isFwd
      return if @CurrentPage is @PageCount and isFwd
      currentFirstDisplayedPageNumber = @DisplayPageNumbers[0]
      currentLastDisplayedPageNumber = @DisplayPageNumbers[@DisplayPageNumbers.length - 1]
      return if currentFirstDisplayedPageNumber is 1 and not isFwd
      return if currentLastDisplayedPageNumber is @PageCount and isFwd
      lastPossibleFirstDisplayedPageNumber = @PageCount - @PageNumberDisplayCount + 1
      if isFwd
        target = currentFirstDisplayedPageNumber + @PageNumberDisplayCount
        @FirstDisplayedPageNumber = if target <= lastPossibleFirstDisplayedPageNumber then target else lastPossibleFirstDisplayedPageNumber
        @CurrentPage = @FirstDisplayedPageNumber
      else
        target = currentFirstDisplayedPageNumber - @PageNumberDisplayCount
        @FirstDisplayedPageNumber = if target > 1 then target else 1
        @CurrentPage = @FirstDisplayedPageNumber + @PageNumberDisplayCount - 1
      @StateManager.SetValue @ControlID, 'CurrentPage', @CurrentPage
      @Update @AllRecords
  @
]