/// <reference path="../../../../typings/main.d.ts"/>
module app.core.beacon {
    'use strict';

  export interface IBeacon {
    id: string;
    uuid: string;
    major: number;
    minor: number;
  }
}
