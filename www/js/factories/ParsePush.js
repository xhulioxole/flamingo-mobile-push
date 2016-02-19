/**
 * Author: Xhulio
 * Created Date: 2016-01-22 15:22.MD
 * This code is copyright (c) 2016 Prius Solution
 */

angular.module('flamingoApp').factory('ParsePush', ['$ionicLoading', '$timeout', function ($ionicLoading, $timeout) {
  var ParsePush = {};
  var constants = {
    APPLICATION_ID: "EeTw0sCimqaTb73PSqvtl942prQh0pPxDzOX0KXl",
    CLIENT_KEY: "GA3HZCyosVLAamPWsIDSHaCpbtR52x1Ay2oCJRu3",
    DEFAULT_CHANNEL: "flamingo"
  };
  var parseConfig = {
    appId: constants.APPLICATION_ID,
    clientKey: constants.CLIENT_KEY,
    ecb: "onNotification"
  };

  /**
   * Init
   */
  ParsePush.init = function() {
    ParsePushPlugin.register(parseConfig, function() {
      ParsePushPlugin.getInstallationId(function(id) {
      }, function(e) {
        console.log('Error getting installationId!');
      });
      handlePushNotification();
    }, function(e) {
      console.log('Error registering device: ' + e);
    });

    /**
    * Subscribe
    */
    ParsePush.subscribe = function (callback) {
      ParsePushPlugin.subscribe(constants.DEFAULT_CHANNEL, function () {
        callback({});
      }, function () {
        callback({error: "Failed to subscribe!"});
      })
    };

    /**
    * Unsubscribe
    */
    ParsePush.unSubscribe = function (callback) {
      ParsePushPlugin.unsubscribe(constants.DEFAULT_CHANNEL, function () {
        callback({});
      }, function () {
        callback({error: "Failed to unsubscribe!"});
      })
    };

    /**
     * Open view depending on data
     */
    function handlePushNotification() {
      ParsePushPlugin.received(function(data) {
        if (data.length > 0) {
          console.log(data);
          var response = JSON.parse(data);
          if (response.title && response.alert) {
            showPushMessage(response.title, response.alert);
            hidePopupAfterTimeout();
          }
        }
      }, function(e) {
        console.log('Error Obtaining Push Data: ' + e);
      });
    }
  };

  /**
   * Show popup
   * @param title
   * @param message
     */
  function showPushMessage(title, message) {
    $ionicLoading.show({
      template: '<div class="loader message-container"><h3>' +  title + '</h3><p>' +  message + '</p></div>',
      class: 'message-container'
    })
  }

  /**
   * Hides a popup after 3 sec
   */
  function hidePopupAfterTimeout() {
    $timeout(function () {
      $ionicLoading.hide();
    }, 6000);
  }

  return ParsePush;
}]);
