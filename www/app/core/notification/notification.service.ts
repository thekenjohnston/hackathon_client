/// <reference path="../../../../typings/main.d.ts"/>

module app.core.notification {
    'use strict';

    export class Notification {

        private notificationUrl: string = 'http://10.192.168.58:82/signalr';
        private serverHub: any;

        static $inject: string[] = ["Hub"];
        constructor(private Hub: any) {
            this.init();
        }

        init(): void {
            this.serverHub = new this.Hub("notificationHub", {
                rootPath: this.notificationUrl,
                listeners: {
                    'flightUpdate': function (userName, chatMessage) {
                        // callback code that server invokes on client
                        console.log("Calledback invoked by server: " + JSON.stringify(userName));
                    },
                    'groupUpdate': function () {
                        
                    }
                },
                methods: ['enableFlightNotifications'],
                errorHandler: function (error) {
                    console.error(error);
                },
                stateChanged: function(state){
                    var stateNames = {0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected'};
                    if(stateNames[state.newState] == 'disconnected'){
                        //Hub Disconnect logic here...
                    }
                },
                // transport: 'webSockets',
                logging: true,
                //jsonp: true
            });
        }
    }
    
    

    angular.module('app.core.notification')
        .service('app.core.notification.NotificationService', Notification);
}
