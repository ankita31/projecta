angular.module('employee', []).
    value('version', '0.1').
    value('localStorage', window.localStorage).
    service('contacts', function (localStorage, $rootScope) {
        var self = this;

        self.save = function (contact) {
            if (!contact.hasOwnProperty('id')) {
                var highest = 1;
                for (var i = 0; i < self.contacts.length; i++) {
                    if (self.contacts[i].id > highest) highest = self.contacts[i].id;
                }
                contact.id = ++highest;
            }
            self.contacts.push(contact);
            return contact.id;
        };
         });