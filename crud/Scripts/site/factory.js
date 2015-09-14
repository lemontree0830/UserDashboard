angular.module('factory', [])
    .factory('states', function ($http) {
        return {
            list: function (callback) {
                $http.get('json/states.json').success(callback);
            }
        };
    })
    .factory('members', function ($http) {
        return {
            list: function (callback) {
                $http.get('json/memberOrder.json').success(callback);
            },
            find: function (memberId, callback) {
                var data = JSON.parse(localStorage.getItem('memberOrders') || '[]');
                var memberDetail = data.filter(function (entry) {
                    return entry.id.toString() === memberId;
                })[0];
                callback(memberDetail);
            }
        };
    });
