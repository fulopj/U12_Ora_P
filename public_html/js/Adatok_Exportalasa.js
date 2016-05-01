var KiTomb = ["Tetelek\n"];

document.getElementById("Export").addEventListener("click", function () {
    var IDBOpenDBRequest_AdatNyit = window.indexedDB.open("Penztarolo", 1);

    IDBOpenDBRequest_AdatNyit.onsuccess = function () {
        var IDBDatabase_Adatbazis = this.result;

        var IDBTransaction_Tr1 = IDBDatabase_Adatbazis.transaction("Tetelek", "readonly");
        IDBTransaction_Tr1.oncomplete = function () {
            console.log("Végetért a tranzakció :-)");
            IDBDatabase_Adatbazis.close();
        };

        var IDBObjectStore_TetelekTr = IDBTransaction_Tr1.objectStore("Tetelek");
        var IDBIndex_Index1 = IDBObjectStore_TetelekTr.index("Dat_Ido");

        var IDBRequest_Kreq1 = IDBIndex_Index1.openCursor();
        IDBRequest_Kreq1.onsuccess = function (evt) {
            var IDBCursorWithValue_Cursor = evt.target.result;
            if (IDBCursorWithValue_Cursor) {
                KiTomb.push(IDBCursorWithValue_Cursor.value.Datum + "--" + IDBCursorWithValue_Cursor.value.Ido + "--" + IDBCursorWithValue_Cursor.value.Osszeg + "--" + IDBCursorWithValue_Cursor.value.Koltseg + "--" + IDBCursorWithValue_Cursor.value.Kategoria + "--" + IDBCursorWithValue_Cursor.value.AlKategoria + "--" + IDBCursorWithValue_Cursor.value.Hol + "--" + IDBCursorWithValue_Cursor.value.Honnan + "\n");

                IDBCursorWithValue_Cursor.continue();
            } else {
                var sdcard = navigator.getDeviceStorage("sdcard");
                var file = new Blob(KiTomb, {type: "text/plain"});

                var Request_KReq2 = sdcard.add(file);
                Request_KReq2.onsuccess = function () {
                    console.log("Sikerült hozzáadni a fájlt az sd kártyához :-)");
                };

                Request_KReq2.onerror = function () {
                    console.log("Nem sikerült hozzáadni a fájlt az sd kártyához :-(");
                };
            }
        };

        IDBRequest_Kreq1.onerror = function () {
            console.log("Sikertelen listázás :-(");
        };
    };

    IDBOpenDBRequest_AdatNyit.onerror = function () {
        console.log("Nem sikerült megnyitni az Adatbázist");

    };

});
