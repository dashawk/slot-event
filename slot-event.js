(function () {
    'use strict';

    angular
        .module('jmp.slotEvent', [])
        .directive('slotEvent', slotEvent);
    
    /* @ngInject */
    function slotEvent($compile) {
        return {
            restrict: 'E',
            replace: false,
            
            scope: {
                config: '='
            },

            template: '<div class="slot-event-wrapper"></div>',

            /* @ngInject */
            controller: function ($scope) {
                var options = {
                    interval: 10
                };

                $scope.options = angular.extend(options, $scope.config);
            },

            link: function (scope, element, attrs) {
                var wrapper = '<div class="table-responsive"></div>';
                var table = '<table class="table table-bordered table-hover table-condensed">';

                table += '<thead><tr>';

                var result = 60 / parseInt(scope.options.interval);
                var percent = 100 / result;

                for (var i = 0; i < 60; i += scope.options.interval) {
                    table += [
                        '<th style="width: ' + percent + '%">',
                        padDigits(getHour(scope.options.start), 2) + ':' + padDigits(i, 2) + ' ' + getAmPm(scope.options.start),
                        '</th>'
                    ].join('');
                }

                table += '</tr></thead>';
            }
        };

        function padDigits(number, digits) {
            return [Math.max(digits - String(number).length + 1, 0)].join(0) + number;
        }
        function getAmPm(val) {
            if(val >= 12) {
                return 'PM';
            }
            return 'AM';
        }
        function getHour(val) {
            var result = val;
            switch(val) {
                case 13:
                    result = 1;
                    break;
                case 14:
                    result = 2;
                    break;
                case 15:
                    result = 3;
                    break;
                case 16:
                    result = 4;
                    break;
                case 17:
                    result = 5;
                    break;
                default:
                    break;
            }
            return result;
        }
    }
});