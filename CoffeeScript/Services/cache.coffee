DatatableModule.service 'datatableCacheService', ['$window', ($window) ->
  @StateManager = ->
    CachedProperties:
      CurrentPage: 'CurrentPage'
      FirstDisplayedPageNumber: 'FirstDisplayedPageNumber'
      FilterInput: 'FilterInput'
      FilterColumnID: 'FilterColumnID'
      SortColumnID: 'SortColumnID'
      SortOrder: 'SortOrder'
    CurrentState: if $window.localStorage and $window.localStorage.DatatableCache then JSON.parse $window.localStorage.DatatableCache else {}
    SetValue: (controlID, property, value) ->
      @CurrentState[controlID] = {} if not @CurrentState[controlID]
      @CurrentState[controlID][property] = value
      $window.localStorage.DatatableCache = JSON.stringify @CurrentState if $window.localStorage
    GetValue: (controlID, property, defaultValue) ->
      @CurrentState[controlID] = {} if not @CurrentState[controlID]
      @CurrentState[controlID][property] or defaultValue
  @
]