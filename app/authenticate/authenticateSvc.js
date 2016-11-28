angular.module("authenticate")
.service("authenticateSvc",[function(){
    
    var usersList
    =[{"username":"kiran",
                 "password":"kiran",
                   "firstName":"Kiran",
                "lastName":"PVS",
                "role":"Admin"},
               {"username":"Aishwarya",
                 "password":"Aishwarya",
                   "firstName":"Aishwarya",
                "lastName":"B",
                "role":"consumer"},
                  {"username":"chiranjeevi",
                 "password":"chiranjeevi",
                   "firstName":"chiranjeevi",
                "lastName":"K",
                "role":"Seller"},
               ];
    //login
    //logout
    //registration.
    var userDetails={
        isLoggedIn:false,
        firstName:"",
        lastName:"",
        role:""
    };
    var resetUser=function(){
                 userDetails.isLoggedIn=false;
                userDetails.firstName = "";
                userDetails.lastName="";
                userDetails.role="";
    };
    
    var validateUser=function(user){
        
        var data = _.find(usersList,user);
            if(data){
                userDetails.isLoggedIn=true;
                userDetails.firstName = data.firstName;
                userDetails.lastName=data.lastName;
                userDetails.role=data.role;
            }
        else{
            resetUser();  
        }
        
    };
    
    this.login= function(user){
        validateUser(user);
        return userDetails;
    };
    
    this.logout=function(){
     resetUser();
    };
    this.register= function(data){
        
    };
}]);