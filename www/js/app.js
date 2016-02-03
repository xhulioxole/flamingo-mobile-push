angular.module('flamingoApp',
  [
    'ionic',
    'ionic-material',
    'ionMdInput'
  ]
)

.run(function($ionicPlatform, ParsePush) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    ParsePush.init();
  });
});
