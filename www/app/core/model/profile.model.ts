/// <reference path="../../../../typings/main.d.ts"/>

module app.core.model {
    'use strict';

    export interface IProfile {
        profileId: string;
        emailAddress: string;
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
        nationality: string;
        registrationDate: Date;
        company: ICompany;
        job: IJob;
        linkedInAuth: ILinkedInAuth;
        preferences: IPreferences;
    }

    export class ICompany {
        companyId: string;
        companyName: string;
        companyPerks: string[];
        rawLinkedInCompanyData: any;
    }

    export class IJob {
        position: string;
        rawLinkedInProfileData: any;
    }

    export class ILinkedInAuth {
        token: string;
        expiry: number;
        acquired: Date;
    }

    export class IPreferences {
        shareLocation: boolean;
        notifyFlightChange: boolean;
    }
}
