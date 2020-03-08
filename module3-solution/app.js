(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'menu-list.html',
        scope: {
          items: '<',
          onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'ctrl',
        bindToController: true
      };

      return ddo;
    }

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;

    narrowCtrl.foundItems = MenuSearchService.getFoundItems();

    narrowCtrl.getMatchedMenuItems = function(searchTerm) {
      if(searchTerm) {
        MenuSearchService.getMatchedMenuItems(searchTerm);
      }
    }

    narrowCtrl.removeItem = function(index) {
      MenuSearchService.removeItem(index);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    var foundItems = [];

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(response) {
        foundItems = [];
        var menuItems = response.data.menu_items;
        menuItems.map(function(item) {
          if(item.description.includes(searchTerm)) {
            foundItems.push(item);
          }
        });

        return foundItems;
      });
    }

    service.getFoundItems = function() {
      return foundItems;
    }

    service.removeItem = function(index) {
      foundItems.splice(index, 1);
    }
  }

})();
