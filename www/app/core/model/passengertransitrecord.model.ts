/// <reference path="../../../../typings/main.d.ts"/>

module app.core.model {
    'use strict';

    export interface IPassengerTransitRecord {
        profileId: string;
        reservationId: string;
        transitStatus: TransitStatus;
        transitStartTime: Date;
        scheduledDepartureTime: Date;
        scheduledArrivalTime: Date;
        flightDuration: number;
        actualDepartureTime: Date;
        estimateArrivalTime: Date;
        mode: string, []
        securityWaitTime: number;
        currentAirport: string;
        currentFlightNumber: string;
        airlineCode: string;
        departureLocation: string;
        arrivalLocation: string;
        associateCompany: string;
        businessMissionGroup: [],
        lastKnownLocation: string;
        synchronized: boolean;
        tripStage: [OUTBOUND, INBOUND],
        basket: {
        }
    }
    
    export interface IBasket {
        
    }
    
    export class TransitStatus {
        NOT_STARTED: string = '';
        TO_AIRPORT: string = '';
        AT_AIRPORT: string = '';
        AIRPORT_CHECKIN: string = '';
        AIRPORT_SECURITY: string = '';
        AIRPORT_COMMERICAL: string = '';
        AIRPORT_DEPARTURE_GATE: string = '';
        IN_AIR: string = '';
        FROM_AIRPORT: string = '';
    }
    
    export class TransitMode {
        EXPRESS: string = '';
        RELAXED: string = '';
    }
}