(function () {
"use strict";

angular.module('common')
.service('SignUpService', SignUpService);


function SignUpService() {
  var service = this;

  service.saveUser = function(user) {
    service.user = user;
  }

  service.getUser = function() {
    return service.user;
  }
}

})();
