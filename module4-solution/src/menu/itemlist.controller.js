(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);


ItemListController.$inject = ['MenuDataService', 'items'];
function ItemListController(MenuDataService, items) {
  var itemList = this;
  itemList.items = items.data.menu_items;
}

})();
