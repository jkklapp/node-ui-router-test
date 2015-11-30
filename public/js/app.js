
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router', 'ui.bootstrap'])

// configuring our routes
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('book', {
            url: '/book',
            templateUrl: 'book.html',
            controller: 'bookController',
        })

        .state('book.search', {
            url: '/search',
            templateUrl: 'book-search.html',
        })

        .state('book.dates', {
            url: '/dates',
            templateUrl: 'book-dates.html',
            controller: function($scope) {
              //Assigns a random price on the second step.
              $scope.formData.price = Math.floor(Math.random() * 6) + 10;
            }
        })

        .state('book.profile', {
            url: '/profile',
            templateUrl: 'book-profile.html',
        })

        .state('book.payment', {
            url: '/payment',
            templateUrl: 'book-payment.html',
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/book/search');
})

// our controller for the form
// =============================================================================
.controller('bookController', ['$scope', function($scope) {

  //Dummy list of destinations, only for development
  $scope.destinations = [
    "Rome",
    "Milan",
    "Madrid",
    "New York",
    "London",
    "Dublin"
  ];

  $scope.formData = {};

  $scope.selectDestination = function(d) {
    $scope.formData.destination = d;
  };

}])
.controller('datepickerController', function($scope) {
  self = this;
  self.someProp = 'Look for the best price!'
  self.opened = {};

  self.open = function($event) {

    $event.preventDefault();
    $event.stopPropagation();

    self.opened = {};
    self.opened[$event.target.id] = true;

    // log this to check if its setting the log
    console.log(self.opened);

  };
  self.format = 'dd-MM-yyyy'
});
