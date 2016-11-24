var angular = require('angular');
//var angular_route = ;
var appp = angular.module('app', [require('angular-route')]);



appp.controller('FirstController', ['$scope', function($scope, $http) {
  $scope.greeting = 'Hola!';

}]);

appp.controller('bodyController', ['$scope', function($scope) {

}]);
appp.controller('jsonController', ['$scope','$http', function($scope, $http) {
  $scope.greetings = 'Holat!';

  $( "#datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd',
 onSelect: function(dateText, inst) {
    var dateAsString = dateText; //the first parameter of this function
    var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
    $scope.from = dateAsString;
 }
});
$( "#datepicker1" ).datepicker(
{
  dateFormat: 'yy-mm-dd',
onSelect: function(dateText, inst) {
  var dateAsString = dateText; //the first parameter of this function
  var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
  $scope.to = dateAsString;
}
}
);


  var data;
  $scope.checkboxModel = {
         value1 : true,
         value2 : true,
         value3 : true
  };

  $scope.options = [
      {id:0, name:'TIF'},
      {id:1, name:'CSCO'},
      {id:2, name:'YHOO'}
  ];

  $scope.se = function (index) {
    switch (index) {
      case 1:

        if( $scope.checkboxModel.value1 == true){

          $(".bar").css("display", "block");
        }else {

          $(".bar").css("display", "none");
        }

        break;
      case 2:
      if( $scope.checkboxModel.value2 == true){

        $(".barcsco").css("display", "block");
      }else {

        $(".barcsco").css("display", "none");
      }
        break;
      case 3:
      if( $scope.checkboxModel.value3 == true){

        $(".baryhoo").css("display", "block");
      }else {

        $(".baryhoo").css("display", "none");
      }
        break;

    }

  }

  $scope.change = function() {
    //

    $('svg').remove();
      $scope.selected_name = $scope.options[$scope.selected_id].name
      $scope.drawChart($scope.selected_name, 'select')
  }
  $scope.drawChart = function (symbol, mix) {

  //  alert($scope.from);
    if($scope.selected_name == undefined){
      $scope.selected_name = 'TIF'
    }
    var format = "&format=json",
     symbol = symbol;
     var query = "select+%2A+from+yahoo.finance.historicaldata+where+symbol+in+%28%27"+symbol+"%27%29+and+startDate+%3D+%272016-01-20%27+and+endDate+%3D+%272016-07-20%27"
     $http.get("http://query.yahooapis.com/v1/public/yql?q="+query+"&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
     .then(function(response) {
       var dateFrom;
      $scope.queryResult = response.data.query.results.quote;
      var  data = $scope.queryResult;
        ($scope.from == undefined) ? dateFrom = data[data.length - 1].Date : dateFrom = $scope.from;
        ($scope.to == undefined) ? dateTo = data[0].Date : dateTo = $scope.to;
         var margin = {top: 40, right: 40, bottom: 40, left:40},
          width = 16000,
          height = 500;

          var x = d3.time.scale()
          .domain([new Date(dateTo), d3.time.day.offset(new Date(dateFrom), 1)])
          .range([0, width ]);

        var y = d3.scale.linear()
          .domain([0, 70])
          .range([height - margin.top - margin.bottom, 0]);



        var svg = d3.select('.right').append('svg')
          .attr('class', 'chart')
          .attr('width', width)
          .attr('height', height)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');


        svg.selectAll('.chart')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(new Date(d.Date)); })
          .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.Close)) })
          .attr('width', 10)
          .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.Close) });

if(mix == "select"){
  svg.selectAll('.chart')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'low')
    .attr('x', function(d) { return x(new Date(d.Date)) + 10; })
    .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.Low)) })
    .attr('width', 10)
    .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.Low) });

    svg.selectAll('.chart')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'high')
      .attr('x', function(d) { return x(new Date(d.Date)) + 20; })
      .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.High)) })
      .attr('width', 10)
      .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.High) });



}

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(d3.time.days, 1)
            .tickFormat(d3.time.format('%B %d, %Y'))
            .tickSize(0)
            .tickPadding(2);

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .tickPadding(4);

        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
          .call(xAxis);

        svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);


        if(mix == 'checkBox'){



        var format = "&format=json",
         symbol = "CSCO";
         var query = "select+%2A+from+yahoo.finance.historicaldata+where+symbol+in+%28%27"+symbol+"%27%29+and+startDate+%3D+%272016-01-20%27+and+endDate+%3D+%272016-07-20%27"
         $http.get("http://query.yahooapis.com/v1/public/yql?q="+query+"&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
         .then(function(response) {
           $scope.queryResult = response.data.query.results.quote;
           var  data = $scope.queryResult;
           var margin = {top: 40, right: 40, bottom: 40, left:40},
            width = 16000,
            height = 500;
            ($scope.from == undefined) ? dateFrom = data[data.length - 1].Date : dateFrom = $scope.from;
            ($scope.to == undefined) ? dateTo = data[0].Date : dateTo = $scope.to;
          var x = d3.time.scale()
            .domain([new Date(dateTo), d3.time.day.offset(new Date(dateFrom), 1)])
            .range([0, width ]);

          var y = d3.scale.linear()
            .domain([0, 70])
            .range([height - margin.top - margin.bottom, 0]);
             svg = d3.select('svg')
             .attr('width', width)
             .attr('height', height)
             .append('g')
             .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');



          var bar = svg.selectAll('.chart')
               .data(data)
               .enter()
               .append('rect')
               .attr('class', 'barcsco')
               .attr('x', function(d) { return x(new Date(d.Date)) + 10; })
               .attr('y', function(d) { return (height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.Close))) })
               .attr('width', 10)
               .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.Close) });
               bar.append("text")
               .attr('x', 0)
               .attr('y', 0)
               .attr("dy", ".35em")
               .text('nbnbbm');

               var format = "&format=json",
                symbol = "YHOO";
                var query = "select+%2A+from+yahoo.finance.historicaldata+where+symbol+in+%28%27"+symbol+"%27%29+and+startDate+%3D+%272016-01-20%27+and+endDate+%3D+%272016-07-20%27"
                $http.get("http://query.yahooapis.com/v1/public/yql?q="+query+"&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
                .then(function(response) {
                  $scope.queryResult = response.data.query.results.quote;
                  var  data = $scope.queryResult;
                  var margin = {top: 40, right: 40, bottom: 40, left:40},
                   width = 16000,
                   height = 500;
                   ($scope.from == undefined) ? dateFrom = data[data.length - 1].Date : dateFrom = $scope.from;
                   ($scope.to == undefined) ? dateTo = data[0].Date : dateTo = $scope.to;
                   var x = d3.time.scale()
                   .domain([new Date(dateTo), d3.time.day.offset(new Date(dateFrom), 1)])
                   .range([0, width ]);

                 var y = d3.scale.linear()
                   .domain([0, 70])
                   .range([height - margin.top - margin.bottom, 0]);
                    svg = d3.select('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');



                    svg.selectAll('.chart')
                      .data(data)
                      .enter()
                      .append('rect')
                      .attr('class', 'baryhoo')
                      .attr('x', function(d) { return x(new Date(d.Date)) + 20; })
                      .attr('y', function(d) { return (height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.Close))) })
                      .attr('width', 10)
                      .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.Close) });



                })

         })
       }
        //-------------------------
     });
  }


}]);


appp.config(function($routeProvider) {

	$routeProvider.when('/price_graph', {
    templateUrl: 'view_price_graph.html',
    controller: "FirstController"
}).when('/stocks_day', {
			templateUrl: 'view_stocks_day.html',
      controller: "FirstController"

		})
		.otherwise({
			redirectTo: '/price_graph',
  controller: "FirstController"
});
});

