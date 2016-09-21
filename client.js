var stormpath = require('stormpath');

var apiKey = new stormpath.ApiKey(
    process.env['STORMPATH_CLIENT_APIKEY_ID'],
    process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);

var client = new stormpath.Client({apiKey:apiKey});

var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];

client.getApplication(applicationHref,function(error,application){
    console.log('Found Application: ',application.name);

//Crear un usuario
//*********************************************************//
var account = {
  givenName: 'Joan',
  surname: 'Stormtrooper',
  username: 'joan64',
  email: 'joan64@gmail.com',
  password: 'Albertino92',
  customData: {
    favoriteColor: 'blanco'
  }
};
/*
application.createAccount(account, function(err, createdAccount) {
  console.log('Created account: ', createdAccount);
});*/


//**********************************************************//
application.getAccounts({ username: 'joan64' }, function(err, accounts) {
  accounts.each(function(account, callback) {
    console.log('Found account:', account.customData.favoriteColor);
    callback();
  }, function(err) {
    console.log('Finished iterating over accounts.');
  });
});

//********************************************************///
//Authenticate an account

var authRequest = {
  username: 'joan64',
  password: 'Albertino92'
};

application.authenticateAccount(authRequest, function(err, result) {
  // If successful, the authentication result will have a method,
  // getAccount(), for getting the authenticated account.
   if(err) {console.log(err.userMessage);}
   
  result.getAccount(function(err, account) {
     console.log('Authentication successful for: ', account.email);
  });
   
});
//Application finished
});