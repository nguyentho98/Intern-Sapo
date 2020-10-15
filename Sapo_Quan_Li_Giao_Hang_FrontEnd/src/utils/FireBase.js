import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyAWkJbbtPgECZJfTqNwu6ilrCWJms7_akE',
  authDomain: 'quan-li-giao-hang.firebaseapp.com',
  databaseURL: 'https://quan-li-giao-hang.firebaseio.com',
  projectId: 'quan-li-giao-hang',
  storageBucket: 'quan-li-giao-hang.appspot.com',
  messagingSenderId: '555384085596',
  appId: '1:555384085596:web:efa9e1ee0a0eb8d76bda99',
  measurementId: 'G-Z3Q8089N1Y',
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
