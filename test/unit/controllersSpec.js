'use strict';

/* jasmine specs for controllers go here */

describe('PhoneCat controllers', function() {
 
  describe('EmployeeCtrl', function(){
 
    it(' ', function() {
      var scope = {},
          ctrl = new EmployeeCtrl(scope);
 
      expect(scope.employees.length).toBe(3);
    });
  });
});
