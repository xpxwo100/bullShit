/*$(document).ready(function(){
	$("#xpx").html("<div id='rrr'>zzaaazzzz</div>");
});*/
$("#xpx").html("<div id='rrr'>zza111aazzzz</div>");
var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope) {
    $scope.firstName = "John",
    $scope.lastName = "Doe"
    $scope.myVar = true;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    }
});