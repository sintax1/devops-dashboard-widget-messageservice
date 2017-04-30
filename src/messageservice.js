'use strict';

angular.module('DevopsDashboard.widget.messageservice', ['adf.provider', 'ui.select'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('messageservice', {
        title: 'Message Service',
        description: 'Send notifications and messages to the Dashboard users',
        authorizedGroups: ['root9B DevOps'],
        templateUrl: 'app/widgets/messageservice/src/view.html',
        edit: {
          templateUrl: 'app/widgets/messageservice/src/edit.html'
        }
      });
  })
  .controller('MsgServiceCtrl', function($scope, $timeout) {
    var socket = io('/msgcenter');
    var vm = this;

    vm.disabled = undefined;
    vm.msgType = {};
    vm.msgTypes = [
      {label: 'Message', value: 'message'},
      {label: 'Notification', value: 'notification'}
    ];
    vm.recipient = {};
    vm.recipients = [];
    vm.message = "Your message here";

    vm.sendMsg = function() {
      var to = [];
      angular.forEach(vm.recipient.selected, function(uid) {
        to.push(uid.value);
      }); 

      var message = {
        to: to,
        text: vm.message
      };

      if (vm.msgType.selected.value === 'message') {
        socket.emit('addmessage', message);
      } else if (vm.msgType.selected.value === 'notification') {
        socket.emit('addnotification', message);
      }
    };

    socket.on('error', function(error) {
      console.error('Error:', error);
    });

    socket.on('users', function(data) {
      console.log('updating users', data.users);

      vm.recipients.length = 0;

      data.users.forEach(function(user) {
        vm.recipients.push({
          label: user,
          value: user
        });          
      });
      console.log(vm.recipients);
    });

  });
