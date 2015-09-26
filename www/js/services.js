var app = angular.module('starter.services', []);
// initialize parse
app.value('PARSE_CREDENTIALS',{
    APP_ID: 'F9BqVIRG5hs1PPUktFM5FGrQ4gnJgGyHZKwTSjiY',
    REST_API_KEY:'Kna1JhHX4WpRonGOZIMPxQVFLV0ugDQgO4t4OK0D'
});

// Parse user account data
app.factory ('AccService', function(){

  var ParseUser = Parse.Object.extend('Users');
  var pfUser;
  return{
    setCurrentUser: function(pfuser){
      return this.pfUser = pfuser;
    },
    getCurrentUser: function(){
      return this.pfUser;
    },

    newUser: function(name, email, accessToken, id, birthday, gender){
      // Init values
      this.pfUser = new ParseUser();
      this.pfUser.set('username', name);
      this.pfUser.set('email', email);
      this.pfUser.set('fbToken', accessToken);
      this.pfUser.set('fbId', id);
      this.pfUser.set('birthdate', new Date(Date.parse(birthday)));
      this.pfUser.set('gender', gender);
      console.log("login success");
      return this.pfUser;
    },


    checkUser: function(pfuser,userid){
      var query = new Parse.Query(ParseUser);
      query.equalTo('fbId',userid);
      query.find({
              success: function(results) {


                /* User already exists and update them */
                if(results.length > 0) {
                  console.log('User already exists');
                  pfuser.set('objectId', results[0].id);
                  pfuser.save(null, {
                    success: function(pfuser) {
                      console.log("User updated");
                    },
                    error: function(pfuser, error) {
                    }
                  });
                } else {
                  pfuser.save(null, {
                    success: function(pfuser) {
                      console.log("New user saved");
                    },
                    error: function(pfuser, error) {
                    }
                  });
                }
              },
              error: function(error) {}
            });
        }

};
});


// REST API from parse organization 
app.factory ('OrgService', ['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){

  return{
    getAll: function(){
      return $http.get('https://api.parse.com/1/classes/Organizations',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });

    },
    getObject: function(){
      var ParseOrg = Parse.Object.extend('Organizations');
      var query = new Parse.Query(ParseOrg);
      query.equalTo('objectId','8JqpLbRUup');
      query.find({
        success: function(results){
            return results;
        },
        error: function(error){
            return error;
        }
      })

    }
    get: function(id){
      return $http.get('https://api.parse.com/1/classes/Organizations/' +id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
    },
    create: function(data){
       return $http.post('https://api.parse.com/1/classes/Organizations',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
    },
    edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/Organizations/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
    delete:function(id){
        return $http.delete('https://api.parse.com/1/classes/Organizations/'+id,{
            headers:{
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type':'application/json'
            }
        });
    }
  }



}]);


// local storage service 
app.factory('sessionService',['$http',function($http){
  return {
     set:function(key,value){
     return localStorage.setItem(key,JSON.stringify(value));
   },
   get:function(key){
     return JSON.parse(localStorage.getItem(key));
   },
   destroy:function(key){
     return localStorage.removeItem(key);
   },
 };
}]);


// REST API from Parse Events
app.factory ('EventFeed', ['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
  
  return{
    getAll: function(){
      return $http.get('https://api.parse.com/1/classes/Events',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });

    },
    get: function(id){
      return $http.get('https://api.parse.com/1/classes/Events/' +id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
    },
    create: function(data){
       return $http.post('https://api.parse.com/1/classes/Events',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
    },
    edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/Events/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
    delete:function(id){
        return $http.delete('https://api.parse.com/1/classes/Events/'+id,{
            headers:{
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                'Content-Type':'application/json'
            }
        });
    }
  }








}]);

  
      
    

app.factory('Events', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
 var events = [{
    id: 0,
    name: 'Mobi dev meeting',
    info: 'Write some code',
  }, {
    id: 1,
    name: 'Hackathon',
    info: 'Do nothing',
    
  }];

  return {
    all: function() {
      return events;
    },
    
    get: function(eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(chatId)) {
          return events[i];
        }
      }
      return null;
    }
  };
});

