/* Services */

kanbanApp.factory('cardsServices', ['$http', '$q', function ($http, $q) {
    return {
        loadCardsByEntryId: function (cardsUrl) {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行

            // return a Promise object so that the caller can handle success/failure
            var cards = [];
            $http({
                method: 'GET',
                url: cardsUrl
            }).success(function (data, status, headers, config) {
                cards = data;
                deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
            }).error(function (data, status, headers, config) {
                deferred.reject(data);   // 声明执行失败，即服务器返回错误
            });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        create: function (_card, _entryCardsUrl) {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行

            $http({
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(_card),
                headers: {
                    'userId': '112'
                },
                url: _entryCardsUrl
            }).success(function (data, status, headers, config) {
                console.log(data);
                deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
            }).error(function (data, status, headers, config) {
                deferred.reject(data);   // 声明执行失败，即服务器返回错误
            });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        update: function (_card) {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行

            $http({
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(_card),
                headers: {
                    'userId': '112'
                },
                url: _card._links.self.href
            }).success(function (data, status, headers, config) {
                console.log(data);
                deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
            }).error(function (data, status, headers, config) {
                deferred.reject(data);   // 声明执行失败，即服务器返回错误
            });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        deleteByLink: function (_link) {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行

            $http({
                method: 'DELETE',
                contentType: 'application/json',
                headers: {
                    'userId': '112'
                },
                url: _link
            }).success(function (data, status, headers, config) {
                console.log(data);
                deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
            }).error(function (data, status, headers, config) {
                deferred.reject(data);   // 声明执行失败，即服务器返回错误
            });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        }
    };
}]);