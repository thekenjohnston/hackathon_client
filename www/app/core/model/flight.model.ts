/// <reference path="../../../../typings/main.d.ts"/>

module app.core.model {
    'use strict';

    export interface IFlight {
        airportCode: string,
        aircraft: string,
        status: string,
        statusText: string,
        operatingCarrier: {
            airlineCode: string,
            flightNumber: string,
            airline: string
        },
        scheduled: Date,
        estimated: Date,
        city: string,
        duration: number,
        terminal: string
    }
}
