class GooglePlaces {
	constructor() {
		this.url = "https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/autocomplete/json?&";
		this.urlPOI = "https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/details/json?fields=address_component,opening_hours,permanently_closed,photo,place_id,price_level,rating,reviews,website&";
		this.urlI = "https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/photo?&";
		this.urlS = "https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/textsearch/json?fields=opening_hours,photos,rating&";
		this.key = "AIzaSyCb-9HOKDBFQEkgP4zrBR39ZJWsqd4kieY";
		const options = {
			mode: 'no-cors',  
  			headers: {
    			"Content-Type": "application/json"
  			},
		};
	}

	
	async urlSearch(query){
		const result = await fetch(this.urlS + 'query=' + query + '&key=' + this.key,this.options);
		return result.json();
	}

	async citySearch(query){
		const result = await fetch(this.url + 'input=' + query + "&types=(cities)");
		return result.json();
	}

	imgSearch(photoRef,maxHeight){
	//	const options = {
	//		method:'GET',
  	//		headers: {
    //			"Content-Type": "image/jpeg"
  	//		},
	//	};
		//https://maps.googleapis.com/maps/api/place/photo?parameters
		const result = (this.urlI + 'maxwidth=' + maxHeight+'&photoreference='+photoRef +'&key=' + this.key);
		return result;
	}

	async poiSearch(place_id){
		const result = await fetch(this.urlPOI + 'placeid=' + place_id  +'&key=' + this.key,this.options);
		return result.json();
	}
	//https://maps.googleapis.com/maps/api/place/details/json?fields=address_component,opening_hours,permanently_closed,photo,place_id,price_level,rating,reviews[],website
}

export default GooglePlaces;