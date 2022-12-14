const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc
} = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyCZfylZ6VRE17gNmFybNFyinaDk9hkLxw8",
    authDomain: "learning-docker-6f896.firebaseapp.com",
    projectId: "learning-docker-6f896",
    storageBucket: "learning-docker-6f896.appspot.com",
    messagingSenderId: "315634099939",
    appId: "1:315634099939:web:4daa87e0aa1950c88f87d6"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function save(tablename, id, data) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, tablename, id), data);
        const savedData = {
            ...data,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, tablename), data);
        const savedData = {
            ...data,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(tablename) {
    const TableRef = collection(db, tablename);

    const q = query(TableRef);

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

async function getById(tablename, id) {
    const docRef = doc(db, tablename, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error("404 - not found");
    }

}

async function remove(tablename, id) {
    const dado = await deleteDoc(doc(db, tablename, id));
    return {
        message: `${id} deleted`
    }
}

async function getWithFilter(tablename, property, operator, value) {
    const TableRef = collection(db, tablename);

    const q = query(TableRef, where(property, operator, value));

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

async function update(tablename, id, data) {
    const referenceEntity = await setDoc(doc(db, tablename, id), data);
    const savedData = {
        ...data,
        id: id
    }
    return savedData;
}




module.exports = {
    save,
    get,
    getById,
    remove,
    getWithFilter,
    update
}