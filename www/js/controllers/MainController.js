/**
 * Author: Xhulio
 * Created Date: 2016-02-03 15:58.MD
 * This code is copyright (c) 2016 Prius Solution
 */

angular.module("flamingoApp").controller("MainCtrl", ['$scope', 'ionicMaterialInk', 'ionicMaterialMotion', '$ionicLoading', '$timeout', 'ParsePush',
  function ($scope, ionicMaterialInk, ionicMaterialMotion, $ionicLoading, $timeout, ParsePush) {
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.fadeSlideInRight();
    $scope.hasSubscribed = window.localStorage.hasSubscribed ? window.localStorage.hasSubscribed : false;

    /**
     * Subscribe
     */
    $scope.subscribe = function () {
      showLoading();
      ParsePush.subscribe(function (data) {
        hidePopup();
        if (data.error) {
          showMessage(data.error);
        } else {
          showMessage("Subscribed!");
          $scope.hasSubscribed = true;
          window.localStorage.hasSubscribed = true;
          hidePopupAfterTimeout();
        }
      });
    };

      /**
       * UnSubscribe
       */
    $scope.unSubscribe = function () {
      showLoading();
      ParsePush.unSubscribe(function (data) {
        hidePopup();
        if (data.error) {
          showMessage(data.error);
        } else {
          showMessage("UnSubscribed!");
          $scope.hasSubscribed = false;
          window.localStorage.hasSubscribed = false;
          hidePopupAfterTimeout();
        }
      });
    };

      /**
       * Show popup with message
       * @param message
       */
    function showMessage(message) {
      $ionicLoading.show({
        template: '<div class="loader message-container">' +  message + '</div>',
        class: 'message-container'
      })
    }

    /**
     * Show loading popup
     */
    function showLoading() {
      $ionicLoading.show({
        template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" ' +
        'r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg></div>'
      })
    }

    /**
    * Hides a popup after 1 sec
    */
    function hidePopupAfterTimeout() {
        $timeout(function () {
          hidePopup();
        }, 1000);
    }

      /**
       * Hide loading
       */
    function hidePopup() {
        $ionicLoading.hide();
    }
}]);
