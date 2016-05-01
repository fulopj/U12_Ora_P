var IDBOpenDBRequest_AdatKapcs = window.indexedDB.open("Penztarolo", 1);

IDBOpenDBRequest_AdatKapcs.onupgradeneeded = function (evt) {
    console.log("OnUpgradeNeeded");
    var IDBDatabase_db = evt.currentTarget.result;
    var IDBObjectStore_Kategoriak = IDBDatabase_db.createObjectStore("Kategoriak", {keyPath: "Id", autoIncrement: true});
    var IDBIndex_KatIndex1 = IDBObjectStore_Kategoriak.createIndex("Kategoria", "Kategoria", {unique: false});

    var IDBObjectStore_AlKategoriak = IDBDatabase_db.createObjectStore("AlKategoriak", {keyPath: "Id", autoIncrement: true});
    var IDBIndex_AlKategIndex1 = IDBObjectStore_AlKategoriak.createIndex("Kat", "Kategoria", {unique: false});
    var IDBIndex_AlKategIndex2 = IDBObjectStore_AlKategoriak.createIndex("Kat_AlKat", ["Kategoria", "AlKategoria"], {unique: false});

    var IDBObjectStore_Holok = IDBDatabase_db.createObjectStore("Holok", {keyPath: "Id", autoIncrement: true});
    var IDBIndex_HolIndex1 = IDBObjectStore_Holok.createIndex("Kat_AlKat", ["Kategoria", "AlKategoria"], {unique: false});
    var IDBIndex_HolIndex2 = IDBObjectStore_Holok.createIndex("Szel_Hossz", ["Latitude", "Longitude"], {unique: true});

    var IDBObjectStore_Honnanok = IDBDatabase_db.createObjectStore("Honnanok", {keyPath: "Honnan"});
    var IDBIndex_HonnanIndex1 = IDBObjectStore_Honnanok.createIndex("Honnan", "Honnan", {unique: true});

    var IDBObjectStore_Tetelek = IDBDatabase_db.createObjectStore("Tetelek", {keyPath: "Id", autoIncrement: true});
    var IDBIndex_TetelIndex1 = IDBObjectStore_Tetelek.createIndex("Dat_Ido", ["Datum", "Ido"], {unique: true});
    var IDBIndex_TetelIndex2 = IDBObjectStore_Tetelek.createIndex("Kat_AlKat_Hol", ["Kategoria", "AlKategoria", "Hol"], {unique: false});
};

IDBOpenDBRequest_AdatKapcs.onsuccess = function () {
    window.location.href = "index.html";
};
