/// <reference path="../../../../typings/main.d.ts"/>
module app.core.beacon {
  'use strict';

  export interface IBeaconService {

  }

  export class BeaconService implements IBeaconService {

    static $inject = ['$log', '$rootScope', '$ionicPlatform', '$cordovaBeacon', '$http'];

    constructor(private $log:angular.ILogService, private $rootScope:angular.IRootScopeService,
                private $ionicPlatform: ionic.platform.IonicPlatformService,
                private $cordovaBeacon: any, private $http: angular.IHttpService) {
      $log.debug(`BeaconService initialised...`);
      $ionicPlatform.ready(()=> {
        try {
          $log.info('enabling bluetooth');
          $cordovaBeacon.enableBluetooth().then(() => {
            for(var beacon of this.getBeacons()) {

              var beaconRegion = $cordovaBeacon.createBeaconRegion(beacon.id, beacon.uuid, beacon.major, beacon.minor, true);
              $cordovaBeacon.startMonitoringForRegion(beaconRegion);
            }
          });
        } catch (error) {
          $log.error(`error thrown using $cordovaBeacon.. ${error.message}`);
        }
      });


      $rootScope.$on('$cordovaBeacon:didEnterRegion', (event: any, pluginResult:any) => {
        $log.info('entered a beacon region');
      });

      $rootScope.$on('$cordovaBeacon:didExitRegion', (event: any, pluginResult:any) => {
        $log.info('exited a beacon region');
      });
    }

    private getBeacons():app.core.beacon.IBeacon[] {
      //TODO call to server that will query the sita beacon registry
      var beacons:IBeacon[] = [];

      beacons.push({id: 'a1001', uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d', major: 39277, minor: 19340});

      return beacons;
    }
  }

  angular.module('app.core.beacon').service('beaconService', BeaconService);
}
