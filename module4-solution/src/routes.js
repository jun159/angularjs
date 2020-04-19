(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })

  // Category page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menu/templates/categorylist.template.html',
    controller: 'CategoryListController as categoryListCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getCategories();
      }]
    }
  })

  // Item page
  .state('items', {
    url: '/item-detail/{categoryShortName}',
    templateUrl: 'src/menu/templates/itemlist.template.html',
    controller: 'ItemListController as itemListCtrl',
    params: {
      categoryShortName: null
    },
    resolve: {
      items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
      }]
    }
  });

}

})();
