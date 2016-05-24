/// <reference path="../../../../typings/main.d.ts"/>
module app.core.settings {
  'use strict';

  export interface SettingsVm {
    url: string;
  }

  export class SettingsController implements SettingsVm {

    url:string;

    static $inject = ['settingsService'];
    constructor(private settingsService: ISettingsService) {
      this.url = this.settingsService.getSettings().url;
      console.log('url = ' + this.settingsService.getSettings().url);
    }
  }

  angular.module('app.core.settings').controller('app.core.settings.SettingsController', SettingsController);
}
