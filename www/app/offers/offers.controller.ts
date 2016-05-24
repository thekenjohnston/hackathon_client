/// <reference path="../../../typings/main.d.ts"/>
module app.offers {

  export interface IOffers {
    getOffers(): IOffer[];
  }

  export class OffersController implements IOffers {

    private offers: IOffer[];

    static $inject: any = ['$rootScope', '$ionicLoading', 'offersService', 'beaconService'];
    constructor(private $rootScope: any, private $ionicLoading: any, private offersService: app.offers.IOffersService,
                private beaconService: app.core.beacon.IBeaconService) {
      this.init();
    }

    getOffers(): IOffer[] {
      return this.offers;
    }

    private init():void {
      this.offers = [];

      this.$rootScope.$on('$cordovaBeacon:didEnterRegion', (event: any, pluginResult:any) => {
        this.offers = this.offersService.getOffers();

        this.$rootScope.$broadcast('itravel:offerCount', {count: this.offers.length});
      });

      this.$rootScope.$on('$cordovaBeacon:didExitRegion', (event: any, pluginResult:any) => {
        this.offers = [];
      });
    }

  }

  angular.module('app.offers').controller('app.offers.OffersController', OffersController);
}
