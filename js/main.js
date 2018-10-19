angular.module('News', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('results', {
                    url: '/results/{id}',
                    templateUrl: '/results.html',
                    controller: 'ResultsCtrl'
                });
            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('postFactory', [function() {
        var o = {
            choices: []
        };
        return o;
    }])
    .factory('choicesBox', [function() {
        var o = {
            choices: [
                [{ title: "have rainy weather?", image: "Some Image Here", fun: -1 }, { title: "have sunny weather?", image: "Some other image", fun: 1 }],
                [{ title: "eat Skittles?", image: "Some Image Here", fun: 1 }, { title: "eat fancy chocolate?", image: "Some other image", fun: -1 }],
                [{ title: "own a nice cabin?", image: "Some Image Here", fun: 1 }, { title: "own a nice house?", image: "Some other image", fun: -1 }],
                [{ title: "go on a hike?", image: "Some Image Here", fun: -1 }, { title: "go to the beach?", image: "Some other image", fun: 1 }],
                [{ title: "shop for sunglasses?", image: "Some Image Here", fun: 1 }, { title: "shop for watches?", image: "Some other image", fun: -1 }],
                [{ title: "go to a concert?", image: "Some Image Here", fun: 1 }, { title: "go to a play?", image: "Some other image", fun: -1 }],
                [{ title: "go to a party?", image: "Some Image Here", fun: 1 }, { title: "go to a classy restaurant?", image: "Some other image", fun: -1 }],
                [{ title: "go out with friends?", image: "Some Image Here", fun: 1 }, { title: "stay in with friends?", image: "Some other image", fun: -1 }],
                [{ title: "drink water?", image: "Some Image Here", fun: -1 }, { title: "drink soda?", image: "Some other image", fun: 1 }],
                [{ title: "carve a pumpkin?", image: "Some Image Here", fun: -1 }, { title: "make a gingerbread house?", image: "Some other image", fun: 1 }],
                [{ title: "go on a sleigh ride?", image: "Some Image Here", fun: 1 }, { title: "go on a hay ride?", image: "Some other image", fun: -1 }],
                [{ title: "watch a football game?", image: "Some Image Here", fun: -1 }, { title: "play in a football game?", image: "Some other image", fun: 1 }],
            ]
        };
        return o;
    }])
    .factory('funVal', [function() {
        var o = {
            characterValue : 5
        };
        return o;
    }])
    .controller('MainCtrl', [
        '$scope',
        'postFactory',
        'choicesBox',
        'funVal',
        function($scope, postFactory, choicesBox, funVal) {
            $scope.posts = postFactory.choices;
            $scope.choices = choicesBox.choices;
            $scope.fun = funVal.characterValue;
            $scope.showResults = '';
            $scope.start = function() {
                var len = $scope.choices.length
                if (len == 0) {
                    $scope.showResults = "Show Results";
                }
                var index = Math.floor(Math.random() * len);
                $scope.posts.push({
                    title: $scope.choices[index][0].title,
                    image: $scope.choices[index][0].image,
                    fun: $scope.choices[index][0].fun
                });
                $scope.posts.push({
                    title: $scope.choices[index][1].title,
                    image: $scope.choices[index][1].image,
                    fun: $scope.choices[index][1].fun
                });
                $scope.title = '';
                choicesBox.choices.splice(index,1);
                
            };
            $scope.selectChoice = function(post) {
                $scope.fun += post.fun;
                $scope.start();
            };
        }
    ])
    .controller('PostCtrl', [
        '$scope',
        '$stateParams',
        'postFactory',
        function($scope, $stateParams, postFactory) {
            $scope.post = postFactory.posts[$stateParams.id];
            $scope.addComment = function() {
                alert("here");
                if ($scope.body === '') { return; }
                $scope.post.comments.push({
                    body: $scope.body,
                    upvotes: 0
                });
                $scope.body = '';
            };
            $scope.incrementUpvotes = function(comment) {
                comment.upvotes += 1;
            };
        }
    ]);
