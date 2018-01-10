//@author jakubvacek
'use strict'
App.config(function ($stateProvider) {
    //Reservations state
    $stateProvider.state('reservations', {
        url: '/reservations',
        template: '<reservations reservations="$resolve.reservations" selected-user="$resolve.selectedUser" loged-user="$resolve.logedUser"></reservations>',
        component: 'reservations',
        //sending loged, selected user in paramaetrs
        params: {
            selectedUser: null,
            logedUser: null
        },
        //Geting list of reservations
        resolve: {
            reservations: function ($reservationService, $stateParams) {
                return $reservationService.getReservationsOfUser($stateParams.selectedUser)
            },
            selectedUser: function ($stateParams) {
                return $stateParams.selectedUser;
            },
            logedUser: function ($stateParams) {
                return $stateParams.logedUser;
            }
        },
        controllerAs: '$resolve'



    }).state('createReservation', {
        parent: 'reservations',
        url: '/createReservation',
        templateUrl: 'Template/Reservation/createReservation.html'
    });
});

angular.module('App').component('reservations', {
    bindings: {reservations: '=', selectedUser: '=', logedUser: '='},
    templateUrl: 'Template/Reservation/reservationTable.html',
    controller: function ($state, $timeService,$reservationService) {
        var self = this;
        this.getReservationDetail = function (id) {
            $reservationService.getReservation(id, true).then(function (response) {
                self.reservation = response;
                $("html, body").animate({scrollTop: 0}, "slow");
            });
        }
        //Deletes project
        this.deleteReservation = function (reservation) {
            $reservationService.deleteReservation(reservation.id).then(function (response) {
                //deleting on client
                for (var i = 0; i < self.reservations.length; i++)
                {
                    if (self.reservations[i].id === reservation.id)
                    {
                        self.reservations.splice(i, 1);
                    }
                }
                //$activityService.createActivity(l.id, self.logedUser.id, self.selectedUser.id, null, "deleting Task", null);
            });
        };

        //Creates new project, clears the form 
        this.createReservation = function () {
            var duration = $timeService.setDateTime(new Date(0), ($('#timePickerCreateReservation').val())).toISOString()
            var data = {"id": null, "userID": self.selectedUser.id, "date":  new Date($('#datePickerCreateReservation').val()).toISOString(), "duration": duration, "createdOn": null};
            $reservationService.createReservation(self.selectedUser, data).then(function (response) {
                $state.go('reservations', {}, {reload: true});
            });
            self.nameCreateProject = "";
            self.descriptionCreateProject = "";
            //$activityService.createActivity(null, self.logedUser.id, self.selectedUser.id, null, "Creating Task", null);
        };

    }
})