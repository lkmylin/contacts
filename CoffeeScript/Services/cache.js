(function() {
  DatatableModule.service('datatableCacheService', [
    '$window', function($window) {
      this.StateManager = function() {
        return {
          CurrentState: $window.localStorage.DatatableCache ? JSON.parse($window.localStorage.DatatableCache) : {},
          SetValue: function(controlID, property, value) {
            if (!this[controlID]) {
              this[controlID] = {};
            }
            this[controlID][property] = value;
            return $window.localStorage.DatatableCache = JSON.stringify(this);
          },
          GetValue: function(controlID, property, defaultValue) {
            if (!this[controlID]) {
              this[controlID] = {};
            }
            return this[controlID][property] || defaultValue;
          }
        };
      };
      return this;
    }
  ]);

}).call(this);
