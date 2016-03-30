angular.module('panel')



// get attribute strcture and load coressponding structure
.directive('module', function() {

	    return {

	        restrict: 'A',
	        scope: {},

	        //send value to template
	        link: function(scope, element, attrs) {	        

	           scope.TabsData = attrs.content.split(','); // contruct the array

	       },	

			templateUrl: function(elem, attrs){
			      return 'modules/'+attrs.structure+'/views/'+attrs.structure+'.html';
			}

	    }

})