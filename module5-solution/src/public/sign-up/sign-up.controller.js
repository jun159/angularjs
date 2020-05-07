(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'SignUpService'];
function SignUpController(MenuService, SignUpService) {
  var signUpCtrl = this;
  signUpCtrl.shortNameFlag = true;

  signUpCtrl.submit = function () {
    var data = MenuService.getShortName(signUpCtrl.user.shortname)
      .then(function (response) {
        signUpCtrl.shortNameFlag = true;
        signUpCtrl.completed = true;
        signUpCtrl.user.menuItem = response;
        SignUpService.saveUser(signUpCtrl.user);
      }).catch(function (error) {
        signUpCtrl.shortNameFlag = false;
        signUpCtrl.completed = false;
      });
  };
}

})();
