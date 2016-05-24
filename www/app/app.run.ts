/// <reference path="../../typings/main.d.ts"/>

module app {
    'use strict';

    angular.module('app')
        .run(bootstrapIonic)
        .run(bootstrapApp);
        
    bootstrapIonic.$inject['$window', '$ionicPlatform'];
    function bootstrapIonic(
            $window: angular.IWindowService,
            $ionicPlatform: ionic.platform.IonicPlatformService) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            
            if ($window['StatusBar']) {
                $window['StatusBar'].styleDefault();
            }
        });
    }
    
    bootstrapApp.$inject['$state'];
    function bootstrapApp($state: ng.ui.IState): void {       
        // empty
    }
}