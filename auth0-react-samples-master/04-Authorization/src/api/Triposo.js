class Triposo {
	constructor() {
		this.url = "https://www.triposo.com/api/20181213/";
		this.auth = "&account=R78U5P00&token=k51rwb9fplgsj120rhnlq386dkbfgqzf";
		this.abbr = {
			"AL": "Alabama",
			"AK": "Alaska",
			"AS": "American Samoa",
			"AZ": "Arizona",
			"AR": "Arkansas",
			"CA": "California",
			"CO": "Colorado",
			"CT": "Connecticut",
			"DE": "Delaware",
			"DC": "District Of Columbia",
			"FM": "Federated States Of Micronesia",
			"FL": "Florida",
			"GA": "Georgia",
			"GU": "Guam",
			"HI": "Hawaii",
			"ID": "Idaho",
			"IL": "Illinois",
			"IN": "Indiana",
			"IA": "Iowa",
			"KS": "Kansas",
			"KY": "Kentucky",
			"LA": "Louisiana",
			"ME": "Maine",
			"MH": "Marshall Islands",
			"MD": "Maryland",
			"MA": "Massachusetts",
			"MI": "Michigan",
			"MN": "Minnesota",
			"MS": "Mississippi",
			"MO": "Missouri",
			"MT": "Montana",
			"NE": "Nebraska",
			"NV": "Nevada",
			"NH": "New Hampshire",
			"NJ": "New Jersey",
			"NM": "New Mexico",
			"NY": "New York",
			"NC": "North Carolina",
			"ND": "North Dakota",
			"MP": "Northern Mariana Islands",
			"OH": "Ohio",
			"OK": "Oklahoma",
			"OR": "Oregon",
			"PW": "Palau",
			"PA": "Pennsylvania",
			"PR": "Puerto Rico",
			"RI": "Rhode Island",
			"SC": "South Carolina",
			"SD": "South Dakota",
			"TN": "Tennessee",
			"TX": "Texas",
			"UT": "Utah",
			"VT": "Vermont",
			"VI": "Virgin Islands",
			"VA": "Virginia",
			"WA": "Washington",
			"WV": "West Virginia",
			"WI": "Wisconsin",
			"WY": "Wyoming"
		}
	}

	async getCities(count){
		const result = await fetch(this.url + 'location.json?type=city&count=' + count + this.auth);
		return result.json();
	}

	async getPOIs(location_id, count){
		const fields = '&fields=intro,google_place_id,images,structured_content,location_id,id,snippet,opening_hours,coordinates,content,score,facebook_id,tags,best_for,tag_labels,properties,price_tier,name,booking_info';
		const result = await fetch(this.url + 'poi.json?location_id=' + location_id + '&count=' + count + fields + this.auth);
		return result.json();
	}

	async getCitiesbyCat(cat){
		const result = await fetch(this.url + 'location.json?child_tag_labels=' + cat + '&' + cat +'_score=>4' +this.auth);
		return result.json();
	}

	async dayPlanner(params){
     	Object.keys(params).forEach((key) => (params[key] == null) && delete params[key]);
		  var request = Object.keys(params).map(key => key + '=' + params[key]).join('&');
	  	const result = await fetch(this.url +'day_planner.json?'+request + this.auth);
	 	return result.json();
	}
//+ '&order_by=-score' + '&fields' + fields
	async getPOIByID(ids=[],location_id, count = 20){
		const idstr = ids.join('|');
		const fields = '&fields=intro,images,location_id,id,snippet,opening_hours,coordinates,score,best_for,price_tier,name';
		const result = await fetch(this.url + 'poi.json?location_id='+location_id+ '&tag_labels=' + idstr + fields+ this.auth)
		return result.json();
	}

	/*async getHot(){
		const result = await fetch(this.url + 'local_highlights.json?tag_labels=drinks|dinner|food|wineries|eatingout|distilleries|museums|nightlife|musicandshows&latitude=42.3600825&longitude=-71.05888010000001'+ this.auth);
		return result.json();
	}*/

	async getHotel(){
		const result = await fetch(this.url + 'poi.json?bookable=1&location_id=Barcelona&tag_labels=hotels'+ this.auth);
		return result.json();
	}
}


export default Triposo;


// results: […]
// ​​
// 0: Object { name: "London", country_id: "United_Kingdom", snippet: "Europe's financial metropolis and the former heart of the British Empire, packed with all sorts of attractions from sports to museums and two millennia of history.", … }
// ​​
// 1: Object { name: "Paris", country_id: "France", snippet: "The \"City of Light\" and one of the most visited places on Earth: romance, cuisine, the Eiffel Tower and a surprising amount of green await you.", … }
// ​​
// 2: Object { name: "Rome", country_id: "Italy", snippet: "Called the \"Eternal City\", this modern capital of Italy was the seat of ancient Rome's power and remains the world headquarters of the Catholic Church.", … }
// ​​
// 3: Object { name: "Prague", country_id: "Czech_Republic", snippet: "Home of Kafka and castles and one of the centres of power of the medieval Holy Roman Empire, as well as seat of the oldest university north of the Alps, Prague today draws countless young tourists for its affordable and tasty beer.", … }
// ​​
// 4: Object { name: "New York City", country_id: "United_States", snippet: "Possibly the most well known and celebrated city in the world, New York is a city of towering skyscrapers, ethnic diversity, international corporations, and incomparable culture.", … }
// ​​
// 5: Object { name: "Sharm el-Sheikh", country_id: "Egypt", snippet: "Diving, Anadoul turkish bath, Al Sahaba Mosque.", … }
// ​​
// 6: Object { name: "Berlin", country_id: "Germany", snippet: "Scarred by four decades of division but experiencing an almost unprecedented boom, the capital of reunited Germany is one of Europe's most creative and innovative cities and still surprisingly affordable.", … }
// ​​
// 7: Object { name: "Barcelona", country_id: "Spain", snippet: "Capital of both the region and the entire Catalonia, Spain's second-largest city and one of Europe's most popular tourist destinations.", … }
// ​​
// 8: Object { name: "Madrid", country_id: "Spain", snippet: "Spain's imperialistic capital in the centre of the Spanish mainland.", … }
// ​​
// 9: Object { name: "Vienna", country_id: "Austria", snippet: "An imperial capital that seems somewhat oversized for a small state like modern Austria, it is also notably \"red\" and cosmopolitan in an otherwise conservative and at time xenophobic country.", … }
// ​​
// 10: Object { name: "Budapest", country_id: "Hungary", snippet: "Made up of old Buda and Pest on both sides of the Danube, this old Austro-Hungarian co-capital is famous for its thermal baths and was the second city in the world to get a metro.", … }
// ​​
// 11: Object { name: "Venice", country_id: "Italy", snippet: "With St. Mark's Square, the Great Lagoon, the gondolas on the Grand Canal, Venice's Carnival together with great architecture, artistic masterpieces, particular narrow streets, the Biennale, the Marine Republic, but Veneto is not only Venice.", … }
// ​​
// 12: Object { name: "San Francisco", country_id: "United_States", snippet: "The de facto center and the iconic city of the region, home to such landmarks as the Golden Gate Bridge, the hilly streets with their famous cable cars and Victorian houses, the infamous island prison of Alcatraz, and enough museums and intriguing neighborhoods to keep a traveler exploring for days.", … }
// ​​
// 13: Object { name: "Istanbul", country_id: "Turkey", snippet: "The heart of both the Ottoman and Byzantine Empire, this bi-continental city is a bridge between east and west and Europe's largest.", … }
// ​​
// 14: Object { name: "Washington, D.C.", country_id: "United_States", snippet: "Between Montgomery and Prince George's counties, and by far the smallest region on this list.", … }
// ​​
// 15: Object { name: "Amsterdam", country_id: "Netherlands", snippet: "Traveller magn