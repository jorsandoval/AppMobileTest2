import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  getDoc,
  DocumentReference,
  updateDoc,
} from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app: any;
  private db: any;

  private firebaseConfig = {
    apiKey: 'AIzaSyAKqsWkDbe29hShoJitjyrVk6Yb6Xo8uRg',
    authDomain: 'movil-b034a.firebaseapp.com',
    projectId: 'movil-b034a',
    storageBucket: 'movil-b034a.appspot.com',
    messagingSenderId: '729069190906',
    appId: '1:729069190906:web:1509d687047f9450e35343',
  };

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async getUserByName(username) {
    const userColl = collection(this.db, 'users');
    const userQuery = query(userColl, where('username', '==', username));
    const userDocs = await getDocs(userQuery);
    const userList = userDocs.docs.map(async (document) => {
      const docs = document.data();

      docs.documentId = document.id;
      return docs;
    })[0];
    return userList;
  }

  async getUserByID(userID) {
    const docRef = doc(this.db, 'users', userID);
    const docDB = await getDoc(docRef);

    const data = docDB.data();
    console.log(data);
    return data;
  }

  async getFavoriteCharacterByUserName(username: string) {
    const userColl = collection(this.db, 'characters');
    const userQuery = query(userColl, where('username', '==', username));
    const userDocs = await getDocs(userQuery);
    const userList = userDocs.docs.map((document) => document.data())[0];
    return userList;
  }

  async getFavoriteCharacters(userID) {
    const userColl = collection(this.db, 'characters');
    const userQuery = query(userColl, where('idUsers', '==', userID));
    const userDocs = await getDocs(userQuery);
    const userList = userDocs.docs.map((document) => document.data());
    return userList;
  }

  async getFavoriteCharactersById(id, userID) {
    const userColl = collection(this.db, 'characters');
    const userQuery = query(
      userColl,
      where('id', '==', id),
      where('idUsers', '==', userID)
    );
    const userDocs = await getDocs(userQuery);
    const userList = userDocs.docs.map((document) => {
      const docs = document.data();
      docs.documentId = document.id;
      return docs;
    });
    return userList;
  }

  async insertFavoriteCharacter(payload) {
    try {
      const docDb = await this.getFavoriteCharactersById(
        payload.id,
        localStorage.getItem('UserID')
      );
      if (docDb.length > 0) {
        await deleteDoc(doc(this.db, 'characters', docDb[0].documentId));
      } else {
        const docRef = await doc(collection(this.db, 'characters'));
        await setDoc(docRef, payload);
      }
      return true;
    } catch {
      return false;
    }
  }

  async updateUser({ username, apellido, documentId, universe }) {
    const documentRef = doc(this.db, 'users', documentId);
    await updateDoc(documentRef, { name, universe, apellido });
  }
}
