document.getElementById("Felvitel").addEventListener("click", function () {
    var IDBOpenDBRequest_AdatKapcs = window.indexedDB.open("Penztarolo", 1);

    IDBOpenDBRequest_AdatKapcs.onsuccess = function () {
        console.log("OnSuccess");
        var IDBDatabase_db = this.result;
        var IDBTransaction_Tr1 = IDBDatabase_db.transaction("Kategoriak", "readwrite");
        IDBTransaction_Tr1.oncomplete = function () {
            console.log("Sikerrel be lett szúrva az objektum, vége tranzakciónak :-)");
            IDBDatabase_db.close();
        };

        var IDBObjectStore_KategoriakTr = IDBTransaction_Tr1.objectStore("Kategoriak");
        var IDBRequest_Breq1 = IDBObjectStore_KategoriakTr.add({Kategoria: document.getElementById("Kategoria").value, Szorzo: document.getElementById("Szorzo").value});
        IDBRequest_Breq1.onsuccess = function () {
            console.log("Sikerült a Kategória felvitele :-)");
        };

        IDBRequest_Breq1.onerror = function () {
            console.log("Sikertelen a Kategória felvitele :-(");
        };
    };

    IDBOpenDBRequest_AdatKapcs.onerror = function () {
        console.log("Sikertelen az Adatbazis megnyitása :-(");
    };
}

);
