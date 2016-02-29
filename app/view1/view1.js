'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .directive('resizer', function($document) {

        return function($scope, $element, $attrs) {
            var constant_y = 0;
            var constant_wh = 0;
            $element.on('mousedown', function(event) {
                event.preventDefault();
                constant_y = event.pageY;
                constant_wh = window.innerHeight;

                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {

                if ($attrs.resizer == 'vertical') {
                    // Handle vertical resizer
                    var x = event.pageX;

                    if ($attrs.resizerMax && x > $attrs.resizerMax) {
                        x = parseInt($attrs.resizerMax);
                    }

                    $element.css({
                        left: x + 'px'
                    });

                    $($attrs.resizerLeft).css({
                        width: x + 'px'
                    });
                    $($attrs.resizerRight).css({
                        left: (x + parseInt($attrs.resizerWidth)) + 'px'
                    });

                }
                else if($attrs.resizer == 'vertical_first'){
                    var y =  -(constant_y - event.pageY);
                    console.log(y +'  ' +constant_wh);
                    if(y>-60) {
                        $element.css({
                            height: y + 408 + 'px'
                        });
                    }
                }
                else if($attrs.resizer == 'vertical_second'){
                    var y =  -(constant_y - event.pageY);
                    console.log(y +'  ' +constant_wh);
                    if(y>0) {
                        $element.css({
                            height: y + 90 + 'px'
                        });
                    }
                }
                else if($attrs.resizer == 'vertical_third'){
                    var y =  -(constant_y - event.pageY);
                    console.log(y +'  ' +constant_wh);
                    if(y>0) {
                        $element.css({
                            height: y + 90 + 'px'
                        });
                    }
                }
                else {
                    // Handle horizontal resizer
                    var y =  (constant_y - event.pageY);
                    if(y<0){
                        $element.css({
                            bottom: y + 'px'
                        });
                    }
                }
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
            }
        };
    })

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'view1/home.html',
            controller: 'View1Ctrl'
        })
            .when('/register', {
                templateUrl: 'view1/register.html',
                controller: 'loggedCtrl'
            })
            .when('/know_it', {
                templateUrl: 'view1/know_it.html',
                controller: 'knowCtrl'
            })
            .when('/more_info', {
                templateUrl: 'view1/info.html',
                controller: 'infoCtrl'
            })
            .when('/build', {
                templateUrl: 'view1/build_own.html',
                controller: 'View1Ctrl'
            })
            .when('/feedback', {
                templateUrl: 'view1/feedback.html',
                controller: 'feedCtrl'
            })
            .when('/about_us', {
                templateUrl: 'view1/about_us.html',
                controller: 'aboutCtrl'
            })
            .when('/resources', {
                templateUrl: 'view1/resources.html',
                controller: 'resourceCtrl'
            })
            .when('/blogs', {
                templateUrl: 'view1/blogs.html',
                controller: 'blogCtrl'
            })
            .when('/contact', {
                templateUrl: 'view1/contact.html',
                controller: 'contactCtrl'
            })
            .when('/login', {
                templateUrl: 'view1/login.html',
                controller: 'loggedCtrl'
            })
    }])
    .controller('View1Ctrl', ['$scope','$routeParams','$http','Notification','$location','$rootScope','$log',function($scope,$routeParams, $http, Notification,$location, $rootScope, $log) {

        $(document).ready(function() {
            $('#myCarousel').carousel({
                interval: 10000
            })
        });

        window.scrollTo(0,0);
        $scope.myInterval = 5000;
        $scope.noWrapSlides = true;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//lorempixel.com/' + newWidth + '/300',
                text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                id: currIndex++
            });
        };

        $scope.randomize = function() {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }

        // Randomize logic below

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }
        var tabs = [
                { title: 'REC', content: "REC Content here.", fields:{
                    check :{text : 'Do you want to do this? Select one or more from below', list : ['abcd', 'efgh', 'hijk', 'lmno']},
                    radio :{text : 'Do you like to do this?', state : true},
                    drop :{text:'Do you like to do that?', list : ['abcd', 'efgh', 'hijk', 'lmno']}
                }},
                { title: 'TEC',content: "TEC Content here.", fields:{
                    check :{text : 'Do you want to do this? Select one or more from below', list : ['abcd', 'efgh', 'hijk', 'lmno']},
                    radio :{text : 'Do you like to do this?', state : true},
                    drop :{text:'Do you like to do that?', list :['abcd', 'efgh', 'hijk', 'lmno']}
                }},
                { title: 'NFR',content: "NFR Content here.", fields:{
                    check :{text : 'Do you want to do this? Select one or more from below', list : ['abcd', 'efgh', 'hijk', 'lmno']},
                    radio :{text : 'Do you like to do this?', state : true},
                    drop :{text:'Do you like to do that?', list :['abcd', 'efgh', 'hijk', 'lmno']}
                }},
                { title: 'Constraints', content: "Constraints Content here.", fields:{
                    check :{text : 'Do you want to do this? Select one or more from below', list : ['abcd', 'efgh', 'hijk', 'lmno']},
                    radio :{text : 'Do you like to do this?', state : true},
                    drop :{text:'Do you like to do that?', list :['abcd', 'efgh', 'hijk', 'lmno']}
                }},
                { title: 'Finalize', content: "If you remove a tab, it will try to select a new one.", fields:{
                    feedback_count : 2
                }}
            ],
            selected = null,
            previous = null;
        $scope.tabs = tabs;



        $scope.know_it_init  = function(){
            console.log('inside_know_it');
            $http.post('http://easetech.com/api/build',$scope.tabs,function(response,error,header){
                if(response.success){
                    console.log('response',response);
                }
                else{
                    console.log('error',error);
                }
            })
        };


        $scope.isAddTab = false;
        $scope.toggleAddTab = function(){
            $scope.isAddTab = !$scope.isAddTab;
        };
        $scope.selectedIndex = 0;

        $scope.nextTab = function(){
            $scope.selectedIndex = $scope.selectedIndex + 1;
        };

        $scope.previousTab = function(){
            $scope.selectedIndex = $scope.selectedIndex - 1;
        };

        $scope.gotoFinishTab  = function(){
            $scope.selectedIndex = 4;
        };

        $scope.$watch('selectedIndex', function(current, old){
            previous = selected;
            selected = tabs[current];
            if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
            if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
        });
        $scope.addTab = function (title, view) {
            if(title.toLowerCase() != 'finalize'){
                view = view || title + " Content View";
                tabs.push({ title: title, content: view, disabled: false, fields:{
                    check :{text : 'Do you want to do this? Select one or more from below', list : ['abcd', 'efgh', 'hijk', 'lmno']},
                    radio :{text : 'Do you like to do this?', state : true},
                    drop : {text:'Do you like to do that?', list : ['abcd', 'efgh', 'hijk', 'lmno']}
                }});
            }
            else{
                Notification.warning('Tab with name FINALIZE are not allowed to be added.')
            }
        };
        $scope.removeTab = function (tab) {
            var index = tabs.indexOf(tab);
            tabs.splice(index, 1);
        };



        var inArray = function(array, obj) {
            var index = array.indexOf(obj);
        }



        $scope.thing = {
            this :'',
            that :'',
            flexible :''
        } ;

    }])

    .controller('loggedCtrl', ['$scope','$routeParams','$http','Notification','$location','$rootScope','$log',function($scope,$routeParams, $http, Notification,$location, $rootScope, $log){
        $scope.user = {
            name: '',
            email: '',
            phone: '',
            password:''
        };


        $(document).ready(function() {
            $('#myCarousel').carousel({
                interval: 10000
            })
        });

        $scope.login_data = {

            email : '',
            password : ''

        };

        $scope.login_failed = true;

        $scope.login_user = function(){
            if(angular.isDefined($scope.login_data.email)){
                $location.url('/home');
                Notification.success({
                    message: '<b>Welcome ' + $scope.login_data.email + '.</b>',
                    title: 'Login successful',
                    delay: 5000
                });
                $http.post('/api/login', $scope.login_data)
                    .success(function(res){

                    })
                    .error(function(err){

                    });
                $rootScope.$emit('loggedin', $scope.login_data);

            }else{
                Notification.warning('Sorry. You need to correct the fields marked below before continuing.');
            }
        };

        $scope.register_user = function(){
            if(angular.isDefined($scope.user.name) && angular.isDefined($scope.user.email) && angular.isDefined($scope.user.password) && angular.isDefined($scope.user.phone)) {
                $location.url('/login');
                Notification.success({
                    message: '<b>Hi ' + $scope.user.name + '.</b>',
                    title: 'Registration was successful, login to proceed.',
                    delay: 5000
                });

                $http.post('/api/register', $scope.user)
                    .success(function(res){

                    })
                    .error(function(err){

                    });
            }else{
                Notification.warning('Sorry. You need to correct the fields marked below before continuing.');
            }
        };

        $scope.login_reset = function(){
            $scope.login_data.email = '';
            $scope.login_data.password = '';
        };
    }])


    .controller('knowCtrl', ['$scope','$routeParams','$http','Notification','$location','$rootScope','$log',function($scope,$routeParams, $http, Notification,$location, $rootScope, $log){

        $scope.thing = {
            this :'',
            that :'',
            flexible :''
        } ;

        $scope.getThing =function(){
            console.log($scope.thing);
            $scope.thing;
            $http.post('http://easetech.com/api/know',$scope.thing,function(response,error,header){
                if(response.success){
                    console.log('response',response);
                }
                else{
                    console.log('error',error);
                }
            })

        };

        $scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
        $scope.draggableObjects =
            [
                {
                    type: 'Type A',
                    value :[{name: 'Drag Me A0', type : 'A'}, {name: 'Drag Me A1', type : 'A'}]
                },
                {
                    type: 'Type B',
                    value :[{name: 'Drag Me B0', type : 'B'}, {name: 'Drag Me B1', type : 'B'}]
                },
                {
                    type: 'Type C',
                    value :[{name: 'Drag Me C0', type : 'C'}, {name: 'Drag Me C1', type : 'C'}]
                },
                {
                    type: 'Misc',
                    value :[{name: 'Drag Me M0', type : 'M'}, {name: 'Drag Me M1', type : 'M'}]
                }
            ];

        $scope.droppedObjectsA = [];
        $scope.droppedObjectsBC= [];
        $scope.droppedObjectsAll= [];

        $scope.droppedObjectsAllSide= [];

        $scope.onDropCompleteAllSide=function(data,evt){
            console.log(data);
            var index = $scope.droppedObjectsAllSide.indexOf(data);
            if (index == -1 && data != null)
                $scope.droppedObjectsAllSide.push(data);
        }
        $scope.onDragSuccessAllSide=function(data,evt){
            var index = $scope.droppedObjectsAllSide.indexOf(data);
            if (index > -1) {
                $scope.droppedObjectsAllSide.splice(index, 1);
            }
        }

        $scope.onDropCompleteAll=function(data,evt){
            var index = $scope.droppedObjectsAll.indexOf(data);
            if (index == -1 && data != null)
                $scope.droppedObjectsAll.push(data);
        }
        $scope.onDragSuccessAll=function(data,evt){
            var index = $scope.droppedObjectsAll.indexOf(data);
            if (index > -1) {
                $scope.droppedObjectsAll.splice(index, 1);
            }
        }

        $scope.onDropCompleteA=function(data,evt){
            var index = $scope.droppedObjectsA.indexOf(data);
            if (index == -1 && data.type == 'A' && data != null)
                $scope.droppedObjectsA.push(data);
        }

        $scope.onDragSuccessA=function(data,evt){
            var index = $scope.droppedObjectsA.indexOf(data);
            if (index > -1) {
                $scope.droppedObjectsA.splice(index, 1);
            }
        }

        $scope.onDragSuccessBC=function(data,evt){
            var index = $scope.droppedObjectsBC.indexOf(data);
            if (index > -1 && data.type != 'A' ) {
                $scope.droppedObjectsBC.splice(index, 1);
            }
        }

        $scope.onDropCompleteBC=function(data,evt){
            var index = $scope.droppedObjectsBC.indexOf(data);
            if (index == -1 && data.type != 'A' && data != null) {
                $scope.droppedObjectsBC.push(data);
            }
        }

        $scope.gotoMoreDetails = function(){

        };
    }])

    .controller('infoCtrl', ['$scope','$routeParams','$http','Notification','$location','$rootScope','$log',function($scope,$routeParams, $http, Notification,$location, $rootScope, $log){



        var inArray = function(array, obj) {
            var index = array.indexOf(obj);
        }

        var maintabs = [
                { title: 'Info',content: "Info Content here.", fields:{
                    check :{text : 'Do you want to do this? Select one or more from below', list : ['abcdefg', 'efghijk', 'hijklmn']},
                    radio :{text : 'Do you like to do this?', state : true},
                    drop :{text:'Do you like to do that?', list :['One', 'Two', 'Three', 'Four']}
                }},
                { title: 'Constraints', content: "Constraints Content here.", fields:{
                    check :{text : 'Do you want to do this? Select one or more from below', list : ['abcdefg', 'efghijk', 'hijklmn']},
                    radio :{text : 'Do you like to do this?', state : true},
                    drop :{text:'Do you like to do that?', list :['One', 'Two', 'Three', 'Four']}
                }},
                { title: 'Finalize', content: "If you remove a tab, it will try to select a new one.", fields:{
                    feedback_count : 2
                }}
            ],
            selected = null,
            previous = null;
        $scope.maintabs = maintabs;

        $scope.isAddTab = false;
        $scope.toggleAddTab = function(){
            $scope.isAddTab = !$scope.isAddTab;
        };
        $scope.selectedIndex = 0;

        $scope.nextTab = function(){
            $scope.selectedIndex = $scope.selectedIndex + 1;
        };

        $scope.previousTab = function(){
            $scope.selectedIndex = $scope.selectedIndex - 1;
        };

        $scope.gotoFinishTab  = function(){
            $scope.selectedIndex = 4;
        };

        $scope.know_it_init  = function(){
            console.log('inside_know_it');

            $http.post('http://easetech.com/api/info',$scope.maintabs, function(response,error,header){
                if(response.success){
                    console.log('response',response);
                }
                else{
                    console.log('error',error);
                }
            })
        };


    }])

    .controller('topbarCtrl', ['$scope','$routeParams','$http','Notification','$location','$rootScope','$log',function($scope,$routeParams, $http, Notification,$location, $rootScope, $log) {

        $(document).ready(function() {
            $('#myCarousel').carousel({
                interval: 10000
            })
        });

        window.scrollTo(0,0);
        $scope.myInterval = 5000;
        $scope.noWrapSlides = true;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//lorempixel.com/' + newWidth + '/300',
                text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                id: currIndex++
            });
        };

        $scope.randomize = function() {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }

        // Randomize logic below

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }

    }])

    .controller('feedCtrl', ['$scope','$http',function($scope, $http) {

        $scope.feedback = function(){

            $http.post('http://easetech.com/api/feed', function(response,error,header){
                if(response.success){
                    console.log('response',response);
                }
                else{
                    console.log('error',error);
                }
            })

        };

    }])

    .controller('aboutCtrl', ['$scope','$http',function($scope, $http) {

    }])

    .controller('resourceCtrl', ['$scope',function($scope) {

        $scope.resources = function(){

            $http.post('http://easetech.com/api/resource', function(response,error,header){
                if(response.success){
                    console.log('response',response);
                }
                else{
                    console.log('error',error);
                }
            })
        };
    }])

    .controller('blogCtrl', ['$scope','$http',function($scope, $http) {

        $scope.blog = function(){

            $http.post('http://easetech.com/api/blog', function(response,error,header){
                if(response.success){
                    console.log('response',response);
                }
                else{
                    console.log('error',error);
                }
            })
        };
    }])

    .controller('contactCtrl', ['$scope','$http',function($scope, $http) {

        $scope.user = {
            title : '',
            email : '',
            company : '',
            submissionDate : '',
            firstName : '',
            lastName : '',
            address : '',
            address2 : '',
            city : '',
            state : '',
            postalCode : '',
            biography : ''
        }


        $scope.contact = function(){

            $http.post('http://easetech.com/api/contact',$scope.user, function(response,error,header){
                if(response.success){
                    console.log('response',response);
                }
                else{
                    console.log('error',error);
                }
            })
        };

    }]);
