// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appTitle: 'Berlin Mobility',
  appSubTitle: 'Nutzung von Daten für die urbane Mobilität von morgen',  firebaseConfig: {
    apiKey: 'AIzaSyD445cJu-u1sk0CCHaL4CmCehJtTb0gwcI',
    authDomain: 'berlin-mobility.firebaseapp.com',
    databaseURL: 'https://berlin-mobility.firebaseio.com',
    projectId: 'berlin-mobility',
    storageBucket: 'berlin-mobility.appspot.com',
    messagingSenderId: '1045600855402',
    appId: '1:1045600855402:web:0c87edd8f91061d3e9b113'
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZm9tLWJpZ2RhdGEiLCJhIjoiY2toZ2wyMnc5MGljdzJ5bWNub256bGJzaSJ9.LziC2dfr9nbShE1V-vRKkg'
  },
  github: {
    resultsUrl: 'https://raw.githubusercontent.com/fom-big-data/fom-big-data-consulting-berlin-mobility-model/master/results/'
  },
  results: []
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
