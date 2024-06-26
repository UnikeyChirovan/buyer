// // var db = 'js292';
// var objStore = 'mobile';
// var objStores = ['mobile', 'tivi', 'food', 'store'];
// var dbPromise;

// Tao_Co_so_Du_lieu_indexedDB = () => {
//     dbPromise = idb.openDB(db, 1, {
//         upgrade(db, oldVersion, newVersion, transaction) {
//             objStores.forEach(item => {
//                 if (!db.objectStoreNames.contains(item)) {
//                     db.createObjectStore(item);
//                 }
//             });
//         }
//     });
// };

// Xoa_Co_so_Du_lieu_indexedDB = () => {
//     const req = indexedDB.deleteDatabase(db);
//     req.onsuccess = () => {
//         console.log('Database deleted successfully');
//     };
//     req.onerror = (event) => {
//         console.error('Error deleting database:', event.target.error);
//     };
// };

// Tao_Du_lieu_indexedDB = (Du_lieu) => {
//     Du_lieu.forEach(item => {
//         idbObjStore.set(item.Ma_so, item, 'mobile');
//     });
// };

// const idbObjStore = {
//     get(key, objStoreName) {
//         return dbPromise.then(db => {
//             return db.transaction(objStoreName)
//                 .objectStore(objStoreName).get(key);
//         });
//     },
//     set(key, val, objStoreName) {
//         return dbPromise.then(db => {
//             const tx = db.transaction(objStoreName, 'readwrite');
//             tx.objectStore(objStoreName).put(val, key);
//             return tx.done;
//         });
//     },
//     delete(key, objStoreName) {
//         return dbPromise.then(db => {
//             const tx = db.transaction(objStoreName, 'readwrite');
//             tx.objectStore(objStoreName).delete(key);
//             return tx.done;
//         });
//     },
//     clear(objStoreName) {
//         return dbPromise.then(db => {
//             const tx = db.transaction(objStoreName, 'readwrite');
//             tx.objectStore(objStoreName).clear();
//             return tx.done;
//         });
//     },
//     keys(objStoreName) {
//         return dbPromise.then(db => {
//             const tx = db.transaction(objStoreName);
//             const keys = [];
//             const store = tx.objectStore(objStoreName);
//             (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
//                 if (!cursor) return;
//                 keys.push(cursor.key);
//                 cursor.continue();
//             });

//             return tx.done.then(() => keys);
//         });
//     },
//     getAll(objStoreName) {
//         return dbPromise.then(db => {
//             var tx = db.transaction(objStoreName, 'readonly');
//             var store = tx.objectStore(objStoreName);
//             return store.getAll();
//         });
//     }
// };
var db = "js292";
var objStore = "mobile";
var objStores = ["mobile", "tivi", "food", "store"];
var dbPromise;

Tao_Co_so_Du_lieu_indexedDB = () => {
  dbPromise = idb.openDB(db, 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      objStores.forEach((item) => {
        if (!db.objectStoreNames.contains(item)) {
          db.createObjectStore(item);
        }
      });
    },
  });
};

Xoa_Co_so_Du_lieu_indexedDB = () => {
  const req = indexedDB.deleteDatabase(db);
  req.onsuccess = () => {
    console.log("Database deleted successfully");
  };
  req.onerror = (event) => {
    console.error("Error deleting database:", event.target.error);
  };
};

Tao_Du_lieu_indexedDB = (Du_lieu) => {
  Du_lieu.forEach((item) => {
    idbObjStore.set(item.Ma_so, item, "mobile");
  });
};

const idbObjStore = {
  get(key, objStoreName) {
    return dbPromise.then((db) => {
      return db.transaction(objStoreName).objectStore(objStoreName).get(key);
    });
  },
  set(key, val, objStoreName) {
    return dbPromise.then((db) => {
      const tx = db.transaction(objStoreName, "readwrite");
      tx.objectStore(objStoreName).put(val, key);
      return tx.done;
    });
  },
  delete(key, objStoreName) {
    return dbPromise.then((db) => {
      const tx = db.transaction(objStoreName, "readwrite");
      tx.objectStore(objStoreName).delete(key);
      return tx.done;
    });
  },
  clear(objStoreName) {
    return dbPromise.then((db) => {
      const tx = db.transaction(objStoreName, "readwrite");
      tx.objectStore(objStoreName).clear();
      return tx.done;
    });
  },
  keys(objStoreName) {
    return dbPromise.then((db) => {
      const tx = db.transaction(objStoreName);
      const keys = [];
      const store = tx.objectStore(objStoreName);
      (store.iterateKeyCursor || store.iterateCursor).call(store, (cursor) => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.done.then(() => keys);
    });
  },
  getAll(objStoreName) {
    return dbPromise.then((db) => {
      var tx = db.transaction(objStoreName, "readonly");
      var store = tx.objectStore(objStoreName);
      return store.getAll();
    });
  },
};
