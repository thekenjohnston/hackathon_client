/// <reference path="../../../typings/main.d.ts"/>

module app.home {
  'use strict';

  export class HomeController {

    /** Static injection of dependencies. */
    static $inject: string[] = [
      '$window', '$timeout', '$location', '$ionicScrollDelegate', '$cordovaOauth', '$http',
      'app.core.notification.NotificationService'];

    constructor(
        private $window: angular.IWindowService,
        private $timeout: angular.ITimeoutService,
        private $location: angular.ILocationService,
        private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate,
        private notificationService: app.core.notification.Notification) {
    }
    
    init(): void {
      if(this.isLoggedIn()) {
        // redirect to profile page.
        //this.$window.location.href = '';
      }
      this.notificationService.init();
    }
    
    isLoggedIn(): boolean {
      return false;
    }
    
    // this method is copied over app - bad
    protected scrollToLocation(anchor: string) {
        this.$location.hash(anchor);
        var handle = this.$ionicScrollDelegate.$getByHandle('content');
        
        // add the scroll to the callback queue.
        this.$timeout().then(() => {
            handle.anchorScroll();
        });
    }
  }

  angular.module('app.home')
    .controller('app.home.HomeController', HomeController);
}
