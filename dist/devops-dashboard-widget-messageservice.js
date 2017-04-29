(function(window, undefined) {'use strict';


angular.module('DevopsDashboard.widget.messageservice', ['adf.provider', 'ui.select'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('messageservice', {
        title: 'Message Service',
        description: 'Send notifications and messages to the Dashboard users',
        authorizedGroups: ['root9B DevOps', 'root9b_all'],
        templateUrl: 'app/widgets/messageservice/src/view.html',
        edit: {
          templateUrl: 'app/widgets/messageservice/src/edit.html'
        }
      });
  }])
  .controller('MsgServiceCtrl', ["$scope", function($scope) {
    var vm = this;
    vm.disabled = undefined;

    var socket = io('/msgcenter');

    vm.msgType = {};
    vm.msgTypes = [
      {label: 'Message', value: 'm'},
      {label: 'Notification', value: 'n'}
    ];

    vm.recipient = {};
    vm.recipients = [
      {label: 'Option 1', value: 1},
      {label: 'Option 2', value: 2},
      {label: 'Option 3', value: 3},
      {label: 'Option 4', value: 4},
      {label: 'Option 5', value: 5},
      {label: 'Option 6', value: 6},
      {label: 'Option 7', value: 7},
      {label: 'Option 8', value: 8}
    ];

    vm.message = "Test";

    /*
    $scope.message = JSON.stringify({
      userId: 3,
      text: 'After you get up and running, you can place Font Awesome icons just about...',
      time: '1 min ago'
    });
    */

    vm.sendMsg = function() {
      console.log(vm.msgType.selected);
      console.log(vm.recipient.selected);
      console.log(vm.message);
      //socket.emit('msg', msg);
    };

  }]);


angular.module("DevopsDashboard.widget.messageservice").run(["$templateCache", function($templateCache) {$templateCache.put("app/widgets/messageservice/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("app/widgets/messageservice/src/view.html","<div class=ng-cloak ng-controller=\"MsgServiceCtrl as vm\"><div class=form-group><label>Message Type</label><ui-select ng-model=vm.msgType.selected class=\"btn-group bootstrap-select form-control\" ng-disabled=false append-to-body=true search-enabled=false><ui-select-match placeholder=\"Message Type\"><span>{{$select.selected.label}}</span></ui-select-match><ui-select-choices repeat=\"msgType in vm.msgTypes | filter: $select.search\"><span ng-bind-html=msgType.label></span></ui-select-choices></ui-select></div><div class=form-group><label>Recipients</label><ui-select multiple ng-model=vm.recipient.selected ng-disabled=false search-enabled=true append-to-body=true class=form-control><ui-select-match placeholder=Recipients>{{$item.label}}</ui-select-match><ui-select-choices repeat=\"recipient in vm.recipients | filter: $select.search\">{{recipient.label}}</ui-select-choices></ui-select></div><div class=form-group><label for=message>Message</label> <textarea placeholder=Message ng-model=vm.message class=form-control id=message></textarea></div><div class=form-group><div class=button-wrapper><button type=button class=\"btn btn-success\" ng-click=vm.sendMsg()>Send</button></div></div></div>");}]);})(window);