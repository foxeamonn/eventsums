function showObject(e){
	for(key in e)
	{
		v='key='+key+' value='+e[key];
		console.log(v);
	}
}

function dataFromLink(target,piece) // return data sent as part of a link
{
	if(!piece) piece=1;	
	var from=(target.context.baseURI);
	d=from.split('?');
	return(d[piece]);
}	
			
function testSystem(){
	if(window.location.hostname=="localhost") return true;
	return false;
}

function onLine(){
	return navigator.onLine;
}

function onFacebook(){
	if(sessionStorage.access) return true;
	return false;
}

function deviceType()
{
	var w=window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var h=window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;
	
	var device='mobile';
	if(w>480) device='tablet';
	if(w>1024) device='desktop';
 	
	return device;
}

function localStore(){
	try {  			sessionStorage.hasLocalStorage="Yes";				}
			catch (exception){	  			if (exception) return false;			}
	return true;
}
