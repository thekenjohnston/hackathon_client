/// <reference path="../../../../typings/main.d.ts"/>

module app.core.model {
    'use strict';
    
    export interface IAirport {
        code: string;
        name: string;
        city: string;
        country: string;
        timezone: string;
        lat: number;
        lng: number;
        terminal: string;
        gate: string
    }
}