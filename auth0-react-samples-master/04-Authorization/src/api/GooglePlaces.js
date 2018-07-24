class GooglePlaces {
	constructor(){
		//TODO make switch to remove cors proxy when in prod
		this.url = "https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyABXWbTjAy-Ijr5GSrxR2YDPA1Y7mLoSgw&";
		this.key = "AIzaSyABXWbTjAy-Ijr5GSrxR2YDPA1Y7mLoSgw";
		this.options = {
			mode: 'no-cors',  
  			headers: {
    			"Content-Type": "application/json"
  			},
  		}
		// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=geocode&language=fr&key=AIzaSyABXWbTjAy-Ijr5GSrxR2YDPA1Y7mLoSgw
	}

	async citySearch(query){
		const result = await fetch(this.url + 'input=' + query + "&types=(cities)");
		return result.json();
	}

}

export default GooglePlaces;