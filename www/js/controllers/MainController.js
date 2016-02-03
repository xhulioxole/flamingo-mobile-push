/**
 * Author: Xhulio
 * Created Date: 2016-02-03 15:58.MD
 * This code is copyright (c) 2016 Prius Solution
 */

angular.module("flamingoApp").controller("MainCtrl", ['$scope', 'ionicMaterialInk', 'ionicMaterialMotion', '$ionicLoading', '$timeout',
  function ($scope, ionicMaterialInk, ionicMaterialMotion, $ionicLoading, $timeout) {
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.fadeSlideInRight();
    $scope.hasSubscribed = false;

    /**
     * Subscribe
     */
    $scope.subscribe = function () {
      showLoading();
      $timeout(function () {
        hidePopup();
        showMessage("Subscribed!");
        $timeout(function () {
          hidePopup();
          $scope.hasSubscribed = true;
        }, 1000);
      }, 1000);
    };

    /**
     * UnSubscribe
     */
    $scope.unSubscribe = function () {
      showLoading();
      $timeout(function () {
        hidePopup();
        showMessage("Subscribed!");
        $timeout(function () {
          hidePopup();
          $scope.hasSubscribed = false;
        }, 1000);
      }, 1000);
    };

    function showMessage(message) {
      $ionicLoading.show({
        template: '<div class="loader message-container">' +  message + '</div>',
        class: 'message-container'
      })
    }

    /**
     * Show loading
     */
    function showLoading() {
      $ionicLoading.show({
        template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" ' +
        'r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg></div>'
      })
    }

      /**
       * Hide loading
       */
    function hidePopup() {
        $ionicLoading.hide();
      }
}]);
