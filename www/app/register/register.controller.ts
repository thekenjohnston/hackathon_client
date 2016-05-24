/// <reference path="../../../typings/main.d.ts"/>

module app.register {
	'use strict';

    export class RegisterController {

        private linkedInBaseUrl: string = 'https://api.linkedin.com/v1/';
        private registrationState: {
            redirectInProgress: boolean;
        };
        private linkedInAPIKey: string = '77uxmexwc4wycy'; // poc hack - bad
        private linkedInAPISecrectKey: string = '3SDqQtXL9iuXbhEm'; // poc hack - bad
        private linkedInProfileRequestedFields: string[] = [
            'id',
            'email-address',
            'first-name',
            'last-name',
            'headline',
            'summary',
            'location',
            'industry',
            'positions',
            'specialties',
            'picture-url',
            'public-profile-url'
        ];
        public profile: app.core.model.IProfile;
        
        static $inject: string[] = ['$window', '$timeout', '$location', '$ionicScrollDelegate', '$cordovaOauth', '$http'];

        constructor(
                private $window: angular.IWindowService,
                private $timeout: angular.ITimeoutService,
                private $location: angular.ILocationService,
                private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate,
                private $cordovaOauth: any, // no typing support
                private $http: angular.IHttpService) {
            this.profile = <app.core.model.IProfile> {};
            this.init();
		}
        
        init(): void {
            var registrationState = sessionStorage.getItem('registrationState');
            if (registrationState === undefined || registrationState === null) {
                this.registrationState = {
                    redirectInProgress: false
                };
                sessionStorage.setItem('registrationState', JSON.stringify(this.registrationState));
            } else {
                // bug alert - presuming we're coming back from auth redirect ... but really could be any re-navigation to this page.
                this.registrationState = JSON.parse(registrationState);
                this.scrollToLocation('finish-section');
            }
        }

        // ----------------------------------------------------------------------------------------
        handleCreateAcccount(): void {
           this.scrollToLocation('linkedin-section');
        }
        
        handleConnectWithLinkedIn(): void {
            if (this.isMobileDevice()) {
                this.connectWithLinkedInUsingMobileMode();
            } else {
                this.connectWithLinkedInUsingBrowerMode();
            }
        }
        
        handleSubmit(): void {
            // pull from the web backend cache 
            sessionStorage.removeItem('registrationState');
        }
        
        // ----------------------------------------------------------------------------------------
        protected isMobileDevice(): boolean {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                return true;
            } else {
               return false;
            }
        }
        
        protected connectWithLinkedInUsingMobileMode(): void {
            var requiredLinkedInFields: string[] = [];
            
            this.$cordovaOauth.linkedin(this.linkedInAPIKey, this.linkedInAPISecrectKey, requiredLinkedInFields, "CSRF_TOKEN")
                .then((result) => {
                    this.profile.linkedInAccessToken = result.access_token;
                    this.profile.linkedInAccessExpiryDate = result.expires_in;

                    // retrieve profile
                    var linkedInRequestUrl: string = 
                        this.linkedInBaseUrl + 
                        'people/~:(' + this.linkedInProfileRequestedFields+ ')' +
                        '?format=json&oauth2_access_token=' + this.profile.linkedInAccessToken;

                    return this.$http.get(linkedInRequestUrl);                       
                }).then((result) => {
                    this.profile.linkedInResponse = result.data;
                    console.log('profile = ' + JSON.stringify(this.profile));                 
                }).catch((error) => {
                    console.log('error = ' + JSON.stringify(error));
                }).finally(() => {
                    this.scrollToLocation('finish-section');
                });  
        }
                
        protected connectWithLinkedInUsingBrowerMode(): void {                      
            if (this.registrationState.redirectInProgress === true) {
                console.error('Unexpected actions - ignoring request'); // scrolling around the page?
                // probably should kill this session.
                return;
            }
            sessionStorage.setItem('registrationState', JSON.stringify(this.registrationState));
            this.$window.location.href = '/auth/linkedin';
        }

        protected scrollToLocation(anchor: string) {
            this.$location.hash(anchor);
            var handle = this.$ionicScrollDelegate.$getByHandle('content');
            
            // add the scroll to the callback queue.
            this.$timeout().then(() => {
                handle.anchorScroll();
            });
        }
    }

    angular.module('app.register')
        .controller('app.register.RegisterController', RegisterController);
}
