var orderControllers = angular.module('orderControllers', []);

orderControllers.controller('orderListCtrl', function ($scope) {  
    $scope.memberOrders = JSON.parse(localStorage.getItem('memberOrders') || '[]');
    angular.forEach($scope.memberOrders, function (memberOrder) {
        var total = 0.00;
        for (var i = 0; i < memberOrder.orders.length; i++) {
            var order = memberOrder.orders[i];
            var orderTotal = order.price * order.quantity;
            total += orderTotal;
            order.total = orderTotal;
        }
        memberOrder.ordersTotal = total;           
    });            
    $scope.sortField = 'date';
    $scope.reverse = false;
});