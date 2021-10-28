function (user, context, callback) {
  if (context.request.query.scope.includes('user_metadata')){
    //OIDC requires that the tokens have a fully qualified namespace
		if(user.user_metadata.first_name){
   		context.idToken['https://yourfullyqualifieddomain.com/first_name'] = user.user_metadata.first_name;
    }
  }
  return callback(null, user, context);
}
