import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDP8vzadpB3W-mGItMvyl9L84Rv7Qvyt74',
	authDomain: 'result-todo-list.firebaseapp.com',
	projectId: 'result-todo-list',
	storageBucket: 'result-todo-list.appspot.com',
	messagingSenderId: '676525903858',
	appId: '1:676525903858:web:7e080c41bc7b8e1655e56b',
	databaseURL:
		'https://result-todo-list-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
