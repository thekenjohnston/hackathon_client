/// <reference path="../../../../typings/main.d.ts"/>
module app.core.settings {
  'use strict';

  export interface ISettingsService {
    getSettings():ISettings;
  }

  export class SettingsService implements ISettingsService {

    static SETTINGS_KEY:string =  "settings";

    static DEFAULT_SETTINGS:ISettings = <ISettings> {url: "http://localhost:19702/"};

    constructor() {

      if(localStorage.getItem(SettingsService.SETTINGS_KEY) === undefined) {
        //populate with default settings..
        localStorage.setItem(SettingsService.SETTINGS_KEY, angular.toJson(SettingsService.DEFAULT_SETTINGS));
      }
    }

    public getSettings():ISettings {

      return angular.fromJson(localStorage.getItem(SettingsService.SETTINGS_KEY));
    }
  }

  angular.module('app.core.settings').service('settingsService', SettingsService);
}
