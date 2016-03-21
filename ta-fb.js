	// this version of fb.js is for the main page
	
	var firstName='',surname='',uid=null;
	
	window.fbAsyncInit = function() {
  		FB.init({
    	appId      : 636022316513135, // App ID  - change for each app
    	channelUrl : 'channel.html', // Channel File
   		status     : true, // check login status
    	cookie     : true, // enable cookies to allow the server to access the session
    	xfbml      : true  // parse XFBML
  	});
 
	FB.getLoginStatus(function(response) {
			faceBookStatus(response);
	});
	
		
  };// end of load function //////////////////////////////////////////////////

  // Load the FBSDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
		
	///////////////// my calls to facebook ///////////////////
	
	
	function signIn(){
		if(!sessionStorage.uid){
			fbLogin();
			
		}
		else{
			//check if user already on Facebook
			uid=sessionStorage.uid;
			firstName=sessionStorage.firstname;
			surname=sessionStorage.surname;
			activateUser(uid,firstName,surname);
			
		}
	}
	
	function signOut(){
		 FB.logout(function(response) {
        		
    	});
	}
		
	function fbLogin()
	{
		FB.login(function(response) {
    		if (response.authResponse) {
       	 		// The person logged into your app
				if(response.status==='connected'){
					uid=response.authResponse.userID;
					sessionStorage["uid"]  = uid;
		 			sessionStorage["token"]= response.authResponse.accessToken;
					FB.api('/me', function(response) {
						firstName=response.first_name;
						surname=response.last_name;
						sessionStorage['firstname']=firstName;
						sessionStorage['surname']=surname;
						$('#welcome').text('Welcome, '+firstName);
						activateUser(uid,firstName,surname);
    				});
	
					$('#signIn').hide();
   	 		} 
   	 		
    	}
		}
		);
	}
	
	
	function faceBookStatus(response)
	{
		if(response.status==='connected')
		{
			uid=response.authResponse.userID;
			sessionStorage["uid"]  = uid;
		 	sessionStorage["token"]= response.authResponse.accessToken;
			appStatus(uid);
			getName();
		}
		else
		{
			sessionStorage.removeItem('uid');
			firstName='',lastName='',uid=null;
		}
	}
		
	function activateUser(u,f,s){
		var url="php/getData.php";
		var data={"user":u,"op":"activate","firstname":f,"surname":s};
		var dataType="text";
		
		$.ajax({
  			type: "POST",
  			url: url,
  			data: data,
  			success: function(r){
				if(r=="UP") alert("Thank you for signing up. You now have 5 tokens");
				//if(r=="IN") alert("Thank you. You are now signed in.");
				$('#signIn').hide();
			},
			error: function(e){
				alert(e.error);
			},
  			dataType: dataType
		});
		
	}
	
	function appStatus(u){
		var url="php/getData.php";
		var data={"user":u,"op":"signedUp"};
		var dataType="text";
		
		$.ajax({
  			type: "POST",
  			url: url,
  			data: data,
  			success: function(result){
				if(result=="Y") $('#signIn').hide();
			},
			error: function(e){
				alert(e.error);
			},
  			dataType: dataType
		});
		
	}
	
	var auth_status_change_callback = function(response) {
		sessionStorage.removeItem('uid');
		sessionStorage.removeItem('firstname');
		$('#signIn').show();
	}
	
	// store users name
	function getName()
	{
		FB.api('/me', function(response) {
			firstName=response.first_name;
			surname=response.last_name;
			sessionStorage['firstname']=firstName;
			sessionStorage['surname']=surname;
			$('#welcome').text('Welcome, '+firstName);
			
    	});
	
	}

	function changeTokens(n){
		var uid=sessionStorage.uid;
		var tokens=n;
		var url="../php/getData.php";
		var data={"user":uid,"op":"changetokens","notokens":tokens};
		var dataType="text";	
		$.ajax({
  			type: "POST",
  			url: url,
  			data: data,
  			success: function(r){
				tokens=r;
				sessionStorage.tokens=r;
				
			},
			error:function(r){
				alert(r);
			},
  			dataType: dataType
		});
	
	}
	
	function countTokens(){
		var uid=sessionStorage.uid;
		var tokens=0;
		var url="../php/getData.php";
		var data={"user":uid,"op":"tokens"};
		var dataType="text";
				
		$.ajax({
  			type: "POST",
  			url: url,
  			data: data,
  			success: function(r){
				tokens=r;
				
				var html='<h1>You have '+tokens+' tokens remaining. Please click on the button below to top-up.</h1><br>';
				$('#numberTokens').html(html); // display for main page
				$('#countTokens').text(tokens);
				html='<h1>Thank you for your purchase. You have '+tokens+' tokens remaining.</h1><br>';
				$('#purTokens').html(html); // display for purchase page
				
				sessionStorage.tokens=tokens;
			},
			error:function(r){
				alert(r);
			},
			
  			dataType: dataType
		});
			
	}		