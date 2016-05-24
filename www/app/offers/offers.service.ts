/// <reference path="../../../typings/main.d.ts"/>
module app.offers {
  'use strict';

  export interface IOffersService {
    getOffers(): IOffer[];
  }

  export class OffersService implements IOffersService {

    static $inject = ["$http"];
    constructor(private $http: angular.IHttpService) {

    }

    getOffers(): IOffer[] {
      var offers:IOffer[] = [];

      offers.push({id: 1, name: 'Starbucks Coffee', description: 'Checkout the latest offers from starbucks', icon: 'coffee'});
      offers.push({id: 2, name: 'McDonalds', description: 'Great offers for McDonalds available now', icon: 'android-restaurant'});
      offers.push({id: 3, name: 'Duty Free', description: 'Ask in store for details', icon: 'pricetags'});
      offers.push({id: 4, name: 'Business Lounge Access', description: 'Please ask for details', icon: 'briefcase'});

      return offers;
    }
  }

  angular.module("app.offers").service("offersService", OffersService);
}
