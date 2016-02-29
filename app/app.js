'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version', 'ui.bootstrap','ngMaterial','ngMessages','ui-notification','ngDraggable'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .controller('MainCtrl', ['$scope','$location','$rootScope',function($scope,$location,$rootScope) {
        window.scrollTo(0, 0);

        $scope.isloggedIn = false;

        this.logout = function(){
            $scope.isloggedIn = false;
            $location.url('/home');
        };

        $rootScope.$on('loggedin',function(res,data){
            $scope.isloggedIn = true;
            $scope.user_logged_in = data;
        });
    }]);
