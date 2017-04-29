'use strict';

angular.module('DevopsDashboard.widget.messageservice', ['adf.provider', 'ui.select'])
  .config(function(dashboardProvider){
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
  })
  .controller('MsgServiceCtrl', function($scope) {
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

  });

