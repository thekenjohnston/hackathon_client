/// <reference path="../../../typings/main.d.ts"/>

module app.flightfinder {
  'use strict';

  export class FlightFinderController {

    private errors: string[] = [];
    private warnings: string[] = [];
    public airports: app.core.model.IAirport[];
    public selectedAirport: app.core.model.IAirport;
    public selectedFlight: app.core.model.IFlight;
    public departingFlightsForAirport: app.core.model.IFlight[];
    public arrivingFlightsForAirport: app.core.model.IFlight[];

    static $inject: string[] = [
      '$location',
      '$ionicScrollDelegate',
      '$ionicLoading',
      'app.flightfinder.FlightFinder'
    ];

    constructor(
        private $location: angular.ILocationService,
        private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate,
        private $ionicLoading: ionic.loading.IonicLoadingService,
        private flighFinder: app.flightfinder.FlightFinder) {
      this.init(); // this should be called from somewhere else ... but
    }

    init(): void {
      this.getDepartureLocations();
    }

    getDepartureLocations(): void {
      this.showLoadingIndicator();
      this.flighFinder.getAirports()
        .then((airportLocations: app.core.model.IAirport[]) => {
          this.airports = airportLocations;
        }).catch((error) => {
          this.errors.push('AirportRequestFailed');
        }).finally(() => {
          this.hideLoadingIndicator();
        });
    }

    getFlightByDepaureLocation(): void {
      this.showLoadingIndicator();
      this.flighFinder.getDepartingFlightByAirport(this.selectedAirport.code)
        .then((flights) => {
          this.departingFlightsForAirport = flights;
        }).catch((error) => {
          this.errors.push('DepartureFlightRequestFailed');
        }).finally(() => {
          this.hideLoadingIndicator();
        });
    }

    getFlightByArriveLocation(): void {
      this.showLoadingIndicator();
      this.flighFinder.getDepartingFlightByAirport('HAM')
        .then((flights) => {
          this.arrivingFlightsForAirport = flights;
        }).catch((error) => {
          this.errors.push('ArrivalFlightRequestFailed');
        }).finally(() => {
          this.hideLoadingIndicator();
        });
    }

    goToMenuOptions(): void {
      this.scrollToLocation('flight-finder-options-section'); // ui coupling - bad
    }

    goToScanBoardingPass(): void {
      this.scrollToLocation('flight-finder-scan-section');
    }

    goToCheckin(): void {
      this.scrollToLocation('flight-finder-checkin-section');
    }

    goToManualInput(): void {
      this.scrollToLocation('flight-finder-manual-section');
    }
 
    isFlightSelected(): boolean {
      return this.selectedFlight !== undefined;
    }
    
    createDisplayFlightOption(flight: app.core.model.IFlight): string {
      return flight.operatingCarrier.airline + " - " + flight.operatingCarrier.airlineCode + flight.operatingCarrier.flightNumber;
    }
    
    createDisplayAirportOption(airport: app.core.model.IAirport): string {
      return airport.name + '-' + airport.code + '-' + airport.city + '-' + airport.country;
    }

    // --------------------------------------------------------------------------------------------
    protected scrollToLocation(anchor: string) {
      this.$location.hash(anchor);
      var handle = this.$ionicScrollDelegate.$getByHandle('content');
      handle.anchorScroll();
    }

    protected showLoadingIndicator(): void {
      this.$ionicLoading.show();
    }

    protected hideLoadingIndicator(): void {
      this.$ionicLoading.hide();
    }
  }

  angular.module('app.flightfinder')
    .controller('app.flightfinder.FlightFinderController', FlightFinderController);
}
