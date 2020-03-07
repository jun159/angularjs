(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;

    toBuyCtrl.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    toBuyCtrl.moveItemToAlreadyBought = function(itemIndex) {
      ShoppingListCheckOffService.moveItemToAlreadyBought(itemIndex);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;

    alreadyBoughtCtrl.itemsAlreadyBought = ShoppingListCheckOffService.getItemsAlreadyBought();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var itemsToBuy = [{
        name: "Cookies",
        quantity: "10"
      },
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "5"
      },
      {
        name: "Bread",
        quantity: "2"
      },
      {
        name: "Chocolate",
        quantity: "5"
      }
    ];
    var itemsAlreadyBought = [];

    service.moveItemToAlreadyBought = function(itemIndex) {
      var item = itemsToBuy.splice(itemIndex, 1)[0];
      itemsAlreadyBought.push(item);
    };

    service.getItemsToBuy = function() {
      return itemsToBuy;
    };

    service.getItemsAlreadyBought = function() {
      return itemsAlreadyBought;
    };
  }

})();
