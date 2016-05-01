var IDBOpenDBRequest_AdatKapcs = window.indexedDB.open("Penztarolo", 1);
IDBOpenDBRequest_AdatKapcs.onsuccess = function () {
    console.log("OnSuccess");
    var IDBDatabase_db = this.result;
    var IDBTransaction_Tr1 = IDBDatabase_db.transaction("Kategoriak", "readonly");
    IDBTransaction_Tr1.oncomplete = function () {
        console.log("Sikerrel be lett járva az ObejctStore, vége tranzakciónak :-)");
        IDBDatabase_db.close();
    };

    var IDBObjectStore_KategoriakTr = IDBTransaction_Tr1.objectStore("Kategoriak");
    var IDBIndex_Index1 = IDBObjectStore_KategoriakTr.index("Kategoria");
    var IDBRequest_Kreq1 = IDBIndex_Index1.openCursor();

    IDBRequest_Kreq1.onsuccess = function (evt) {
        var IDBCursorWithValue_cursor = evt.target.result;
        var lista = document.getElementById("Kateg_Lista");
        if (IDBCursorWithValue_cursor) {
            var li = document.createElement("li");
            li.innerHTML = "<a href='#'><p class='" + IDBCursorWithValue_cursor.value.Kategoria + " (" + IDBCursorWithValue_cursor.value.Szorzo + ")'>" + IDBCursorWithValue_cursor.value.Kategoria + "</p><p class='" + IDBCursorWithValue_cursor.value.Kategoria + " (" + IDBCursorWithValue_cursor.value.Szorzo + ")'>" + IDBCursorWithValue_cursor.value.Szorzo + "</p></a>";
            lista.appendChild(li);
            IDBCursorWithValue_cursor.continue();
        } else {
            console.log("Végetért a kilistázás!");
        }
    };

    IDBRequest_Kreq1.onerror = function () {
        console.log("Hiba történt a kurzor megnyitásakor :-(");
    };

};

IDBOpenDBRequest_AdatKapcs.onerror = function () {
    console.log("Hiba történt az adatbázis megnyitásakor :-(");

};

window.addEventListener("click", function (evt) {
    if (evt.target.className != "") {
        window.sessionStorage.setItem("Kategoria", evt.target.className);
        window.location.href = "index.html";
    } else {
        console.log("Nem jó helyre kattintottunk");
    }
});
