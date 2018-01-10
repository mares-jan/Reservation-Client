//@author jakubvacek
'use strict';
App.service('$reservationService', ['$http', '$notifyService', function ($http, $notifyService) {
        return{
            getReservationsOfUser: function (user) {
                return $http.get('http://localhost:8080/reservations', {params: {userId: user.id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get reservations of ' + user.username, "danger");
                        });
            },deleteReservation: function (id) {
                alert(id)
                return $http.delete('http://localhost:8080/reservations', {params: {reservationId: id}})
                        .then(function (response) {
                            $notifyService.notify('Reservation deleted', "success");
                        }, function (response) {
                            $notifyService.notify('Unable to delete reservation', "danger");
                        });
            },createReservation: function (user, data) {
                return $http.post('http://localhost:8080/reservations', data, {params: {userId: user.id}})
                        .then(function (response) {
                            $notifyService.notify('Reservation created', "success");
                        }, function (response) {
                            $notifyService.notify('Unable to create reservation', "danger");
                        });
            },
            getReservation: function (id, fetchDetailInfo) {
                return $http.get('http://localhost:8080/reservations', {params: {reservationId: id, "fetchDetailInfo": fetchDetailInfo}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get reservation detail', "danger");
                        })
            }        }
    }]);

