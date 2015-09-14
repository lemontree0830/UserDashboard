var memberApp = angular.module('memberApp', [   
    'ngRoute',
    'memberControllers',
    'orderControllers',
    'factory',
    'ui.bootstrap'
]);

memberApp.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'memberList.cshtml',
            controller: 'memberListCtrl'
        }).
        when('/members', {
            templateUrl: 'memberList.cshtml',
            controller: 'memberListCtrl'
        }).
        when('/orders', {
            templateUrl: 'orderList.cshtml',
            controller: 'orderListCtrl'
        }).
        when('/members/:memberId', {
            templateUrl: 'memberDetail.cshtml',
            controller: 'memberDetailCtrl'
        }).
        when('/memberOrders/:memberId', {
            templateUrl: 'memberOrder.cshtml',
            controller: 'memberOrderCtrl'
        }).
        otherwise({redirectTo: '/'});
});