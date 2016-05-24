/// <reference path="../../../typings/main.d.ts"/>

module app.flightfinder {
    'use strict';

    export class FlightFinder {

        private baseAirportUrl: string = 'https://airport.api.aero/airport';
        private baseAirportFlightUrl: string = 'https://flifo-qa.api.aero/flifo/v3/flights/';
        private airportServiceApiKey: string = '3035d833bb6e531654a3cce03e6b1fde';
        private flightServiceApiKey: string = '2cfd0827f82ceaccae7882938b4b1627';
        private airportsCache: app.core.model.IAirport[];

        static $inject: string[] = ['$q','$http'];
        constructor(
            private $q: angular.IQService,
            private $http: angular.IHttpService) {
        }

        getAirports(): angular.IPromise<any> {
            if (this.isAirportsCached()) {
                return this.getAirportsFromCache();
            } else {
                return this.getAirportsFromExternal();
            }
        }

        getDepartingFlightByAirport(airportCode: string, carrierCode?: string): angular.IPromise<any> {
            var httpRequestUrl: string = this.baseAirportFlightUrl + airportCode + '/';
            if (carrierCode) {
                httpRequestUrl += carrierCode + '/';
            }
            httpRequestUrl += 'd';

            var httpRequestConfig: angular.IRequestShortcutConfig = {
                headers: {
                    'X-apiKey': this.flightServiceApiKey
                }
            };

            return this.$http.get(httpRequestUrl, httpRequestConfig)
                .then((httpResponse: angular.IHttpPromiseCallbackArg<any>) => {
                    var flights = httpResponse.data.flightRecord;
                    return flights.sort((a, b) => {
                        if (a.operatingCarrier.airline < b.operatingCarrier.airline)
                            return -1;
                        if (a.operatingCarrier.airline > b.operatingCarrier.airline)
                            return 1;
                        return 0;
                    });
                }).catch((error) => {
                    throw error;
                });
        }

        getArrivingFlightByAirport(airportCode: string, carrierCode?: string): angular.IPromise<any> {
            // D.R.Y. infridgement - duplicate code
            var httpRequestUrl: string = this.baseAirportFlightUrl + airportCode + '/';
            if (carrierCode) {
                httpRequestUrl += carrierCode + '/';
            }
            httpRequestUrl += 'a';

            var httpRequestConfig: angular.IRequestShortcutConfig = {
                headers: {
                    'X-apiKey': this.flightServiceApiKey
                }
            };

            return this.$http.get(httpRequestUrl, httpRequestConfig)
                .then((httpResponse: angular.IHttpPromiseCallbackArg<any>) => {
                    var flights = httpResponse.data.flightRecord;
                    return flights.sort((a, b) => {
                        if (a.operatingCarrier.airline < b.operatingCarrier.airline)
                            return -1;
                        if (a.operatingCarrier.airline > b.operatingCarrier.airline)
                            return 1;
                        return 0;
                    });
                }).catch((error) => {
                    throw error;
                });
        }
        
        // ----------------------------------------------------------------------------------------
        protected isAirportsCached(): boolean {
            return this.airportsCache !== undefined;
        }
        
        private getAirportsFromCache(): angular.IPromise<any> {           
            return this.$q.resolve(this.airportsCache);
        }
        
        protected getAirportsFromExternal(): angular.IPromise<any> {
            var httpRequestUrl: string = this.baseAirportUrl + '?callback=JSON_CALLBACK&user_key=' + this.airportServiceApiKey;
            var httpRequestConfig: angular.IRequestShortcutConfig = {
                headers: {
                    'Accept': 'application/json',
                }
            };

            // using jsonp to work across CORS issue with API.
            return this.$http.jsonp(httpRequestUrl, httpRequestConfig)
                .then((httpResponse: angular.IHttpPromiseCallbackArg<any>) => {
                    var airports = httpResponse.data.airports; // angular $http service can take care of caching requests (if it wants).
                    
                    return airports.sort((a, b) => {
                        if (a.name < b.name)
                            return -1;
                        if (a.name > b.name)
                            return 1;
                        return 0;
                    });
                }).catch((error: Error) => {
                    throw error; // angular framework can take care of the handling thrown errors as rejects.
                });
        }
    }

    angular.module('app.flightfinder')
        .service('app.flightfinder.FlightFinder', FlightFinder);
}
