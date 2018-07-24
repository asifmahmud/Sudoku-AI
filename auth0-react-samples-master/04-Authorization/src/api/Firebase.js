class Firebase {
	constructor(){
		const firebase = require("firebase");
		require("firebase/firestore");	
		try {
			firebase.initializeApp({
				apiKey: "AIzaSyBltLApyLYQ2ACUbrXE6YYpVrszKG2MUkM",
				authDomain: "plan-a-trip-1523237672094.firebaseapp.com",
				databaseURL: "https://plan-a-trip-1523237672094.firebaseio.com",
				projectId: "plan-a-trip-1523237672094",
				storageBucket: "plan-a-trip-1523237672094.appspot.com",
				messagingSenderId: "739707217195"
			});
			this.firebase = firebase;
			this.db = firebase.firestore();
			this.auth = firebase.auth();
			} catch (err) {
				if (!/already exists/.test(err.message)) {
					console.error('Firebase initialization error', err.stack)
			}
		}
		
	}

	async getInterests(){
		try{
		let result = [];
		const snapshot = await this.db.collection("interests").get();
		snapshot.forEach((doc) => { result.push(doc.data().name); });
		return result;
		} catch (err) {
			console.error('Firebase  get interests error', err.stack)
	}
	}

	async getUser(userID){
		try {
			
			let docRef = this.db.collection("Users").doc(userID);
			
					docRef.get().then(function(doc) {
						if (doc.exists) {
							console.log("Document data:", doc.data());
							return doc.data();
						} else {
							// doc.data() will be undefined in this case
							console.log("No such document!");
						}
					}).catch(function(error) {
						console.log("Error getting document:", error);
					});

			} catch (err) {
					console.error('Firebase get users exist error', err.stack)
			}
		}
	


	async createUser(){
		// this.db.collection("Users").add({
		//     age: 23,
		//     current_location: "Japan",
		//     email: "cat",
		//     first_name: "bat",
		//     last_name: "bat",
		//     password: "123",
		//     sex: "m",
		//     username: "casdfas",	
		//     sections: [{name: '1', rat: 33}, {name: '1', rat: 33}],
		//    	sections: [{name: '1'}, {name: '1'}],

		// })
		// .then(function(docRef) {
		//     console.log("Document written with ID: ", docRef.id);\
		// 		return docRef
		// })
		// .catch(function(error) {
		//     console.error("Error adding document: ", error);
		// });
		this.db.collection("Users").doc('zAaB9hXIVi0RvGmhOWRN').collection('sub').add({name: "cat"});
	}

	async addActivityToPlan(userID, planID, activityObj){
		try {
		return this.db.collection("Users").doc(userID).collection('plan').doc(planID).collection('activities').doc(activityObj.id).set(activityObj);
		}
		catch (err) {
			console.error('Firebase add activity error', err.stack)
	}
	}

	async getPlansByUser(userID){ //make not be needed if getUser pulls subcollection
		const snapshot = this.db.collection("Users").doc(userID).collection('plans').get();
	}

	auth(){
		return this.firebase.auth();
	}

}

export default Firebase;