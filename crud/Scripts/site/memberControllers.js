var memberControllers = angular.module('memberControllers', []);
memberControllers.controller('memberListCtrl', function ($scope, $modal, members) {
    members.list(function (members) {       
        (localStorage.getItem('memberOrders') == null) ? localStorage.setItem('memberOrders', JSON.stringify(members)) : null;
        $scope.members = JSON.parse(localStorage.getItem('memberOrders') || '[]');
    });    
    $scope.sortField = 'lastName';
    $scope.reverse = false;
    $scope.deleteMember = function (id) {
        var modalInstance = $modal.open({
            templateUrl: 'confirmationModal.cshtml',
            controller: 'ModalInstanceCtrl',
            resolve: {
                id: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function (id) {
            //delete member and orders
            var memberOrders = JSON.parse(localStorage.getItem('memberOrders') || '[]');
            for (var i = 0; i < memberOrders.length; i++) {
                if (memberOrders[i].id === id) {
                    memberOrders.splice(i, 1);
                    break;
                }
            }           
            localStorage.setItem('memberOrders', JSON.stringify(memberOrders));
            $scope.members = JSON.parse(localStorage.getItem('memberOrders') || '[]');
        });
    };
});

memberControllers.controller('memberDetailCtrl', function ($scope, $location, $routeParams, members, states) {
    $scope.title = ($routeParams.memberId > 0) ? 'Edit' : 'Add Member';
    $scope.buttonText = ($routeParams.memberId > 0) ? 'Update' : 'Add';
    members.find($routeParams.memberId, function (memberDetail) {
        $scope.memberDetail = memberDetail;
    });
    states.list(function (states) {
        $scope.states = states;
    });
    $scope.updateMember = function (memberDetail) {
        var memberOrders = JSON.parse(localStorage.getItem('memberOrders') || '[]');
        if ($scope.memberDetailForm.$valid) {
            if ($routeParams.memberId > 0) {
                for (var i = 0; i < memberOrders.length; i++) {
                    if (memberOrders[i].id === memberDetail.id) {
                        memberOrders[i].firstName = memberDetail.firstName;
                        memberOrders[i].lastName = memberDetail.lastName;
                        memberOrders[i].email = memberDetail.email;
                        memberOrders[i].address = memberDetail.address;
                        memberOrders[i].city = memberDetail.city;
                        memberOrders[i].stateId = memberDetail.stateId;
                        for (var j = 0; j < $scope.states.length; j++) {
                            var state = $scope.states[j];
                            if (memberDetail.stateId === state.id) {
                                memberOrders[i].state = $scope.states[j];
                                break;
                            }
                        }
                        memberOrders[i].zip = memberDetail.zip;
                        memberOrders[i].gender = memberDetail.gender;
                        break;
                    }
                }
            }
            else {
                var newMemberOrder = {};
                newMemberOrder.id = memberOrders.length + 100;
                newMemberOrder.firstName = memberDetail.firstName;
                newMemberOrder.lastName = memberDetail.lastName;
                newMemberOrder.email = memberDetail.email;
                newMemberOrder.address = memberDetail.address;
                newMemberOrder.city = memberDetail.city;
                newMemberOrder.stateId = memberDetail.stateId;
                for (var m = 0; m < $scope.states.length; m++) {
                    var state = $scope.states[m];
                    if (memberDetail.stateId === state.id) {
                        newMemberOrder.state = $scope.states[m];
                        break;
                    }
                }
                newMemberOrder.zip = memberDetail.zip;
                newMemberOrder.gender = memberDetail.gender;
                memberOrders.push(newMemberOrder);
            }
            localStorage.setItem('memberOrders', JSON.stringify(memberOrders));
            $location.path('/members');
        }
    };
    $scope.showMembers = function () {
        $location.path('/members');
    }
});

memberControllers.controller('memberOrderCtrl', function ($scope, $routeParams, members) {
    members.find($routeParams.memberId, function (memberDetail) {
        $scope.memberDetail = memberDetail;
        var total = 0.00;
        for (var i = 0; i < memberDetail.orders.length; i++) {
            var order = memberDetail.orders[i];
            var orderTotal = order.price * order.quantity;
            total += orderTotal;
            order.total = orderTotal;
        }
        memberDetail.ordersTotal = total;
    });
    $scope.sortField = 'date';
    $scope.reverse = false;
});

memberControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, id) {
    $scope.delete = function () {
        $modalInstance.close(id);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});