DatatableModule.service 'datatableCacheService', ['$window', ($window) ->
  @StateManager = ->
    CurrentState: if $window.localStorage.DatatableCache then JSON.parse $window.localStorage.DatatableCache else {}
    SetValue: (controlID, property, value) ->
      @[controlID] = {} if not @[controlID]
      @[controlID][property] = value
      $window.localStorage.DatatableCache = JSON.stringify @
    GetValue: (controlID, property, defaultValue) ->
      @[controlID] = {} if not @[controlID]
      @[controlID][property] or defaultValue
  @
]