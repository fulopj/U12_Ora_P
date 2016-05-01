document.querySelector("div[role='main']").style.height = (screen.height - 80) + "px";

/*screen.addEventListener ("mozorientationchange", function () {
 console.log ("Tájolás: " + screen.mozOrientation);
 console.log ("Képernyő magasság: " + screen.height);
 console.log ("Képernyő szélesség: " + screen.width);
 
 document.querySelector ("div[role='main']").style.height = (screen.width-50) + "px";
 
 }, true);*/

document.getElementById("Kitolt").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(showCurrentPosition, errorPosition, {enableHighAccuracy: true});

    function showCurrentPosition(position) {
        console.log("Szélesség: " + position.coords.latitude);
        console.log("Hosszúság: " + position.coords.longitude);

        var IDBOpenDBRequest_Adat_Kapcs = window.indexedDB.open("Penztarolo", 1);
        IDBOpenDBRequest_Adat_Kapcs.onsuccess = function () {
            var IDBDatabase_DB = this.result;

            var IDBTransaction_Tr1 = IDBDatabase_DB.transaction("Holok", "readonly");
            IDBTransaction_Tr1.oncomplete = function () {
                console.log("A tranzakció végetért :-)");
                IDBDatabase_DB.close();
            };

            var IDBObjectStore_HolokTr = IDBTransaction_Tr1.objectStore("Holok");
            var IDBIndex_Index1 = IDBObjectStore_HolokTr.index("Szel_Hossz");

            var IDBRequest_Kreq1 = IDBIndex_Index1.openCursor(IDBKeyRange.only([position.coords.latitude.toString(), position.coords.longitude.toString()]));

            IDBRequest_Kreq1.onsuccess = function (evt) {
                var IDBCursorWithValue_Cursor = evt.target.result;

                if (IDBCursorWithValue_Cursor) {
                    document.getElementById("Kategoria").value = IDBCursorWithValue_Cursor.value.Kategoria;
                    document.getElementById("AlKategoria").value = IDBCursorWithValue_Cursor.value.AlKategoria;
                    document.getElementById("Hol").value = IDBCursorWithValue_Cursor.value.Hol;
                } else {
                    console.log("Nincs több rekord a Cursorban :-)");
                }

            };

            IDBRequest_Kreq1.onerror = function () {
                console.log("Sikertelen a Cursor megnyitása");
            };

        };

        IDBOpenDBRequest_Adat_Kapcs.onerror = function () {
            console.log("Hiba az Adatbázis megnyitásakor :-(");

        };

    }

    function errorPosition(error) {
        console.log("Hiba történt: Hibakód: " + error.code + "Hibaüzenet: " + error.message);
    }

});

function mentes() {
    window.sessionStorage.setItem("Datum", document.getElementById("Datum").value + "");
    window.sessionStorage.setItem("Ido", document.getElementById("Ido").value + "");
    window.sessionStorage.setItem("Osszeg", document.getElementById("Osszeg").value + "");
    window.sessionStorage.setItem("Koltseg", document.getElementById("Koltseg").value + "");
    window.sessionStorage.setItem("Kategoria", document.getElementById("Kategoria").value + "");
    window.sessionStorage.setItem("AlKategoria", document.getElementById("AlKategoria").value + "");
    window.sessionStorage.setItem("Hol", document.getElementById("Hol").value + "");
    window.sessionStorage.setItem("Honnan", document.getElementById("Honnan").value + "");
}

document.getElementById("Kategoria_Hozzaadas").addEventListener("click", function () {
    mentes();
    console.log("Mentes");
    window.location.href = "Kategoria_Hozzaadas.html";
});

document.getElementById("AlKategoria_Hozzaadas").addEventListener("click", function () {
    mentes();
    console.log("Mentes");
    window.location.href = "AlKategoria_Hozzaadas.html";
});

document.getElementById("Hol_Hozzaadas").addEventListener("click", function () {
    mentes();
    console.log("Mentes");
    window.location.href = "Hol_Hozzaadas.html";
});

document.getElementById("Honnan_Hozzaadas").addEventListener("click", function () {
    mentes();
    console.log("Mentes");
    window.location.href = "Honnan_Hozzaadas.html";
});

document.getElementById("Adatok_Exportalasa").addEventListener("click", function () {
    mentes();
    console.log("Mentes");
    window.location.href = "Adatok_Exportalasa.html";
});


window.onload = function () {
    document.getElementById("Datum").value = window.sessionStorage.getItem("Datum") == null ? "" : window.sessionStorage.getItem("Datum");
    document.getElementById("Ido").value = window.sessionStorage.getItem("Ido") == null ? "" : window.sessionStorage.getItem("Ido");
    document.getElementById("Osszeg").value = window.sessionStorage.getItem("Osszeg") == null ? "" : window.sessionStorage.getItem("Osszeg");
    document.getElementById("Koltseg").value = window.sessionStorage.getItem("Koltseg") == null ? "" : window.sessionStorage.getItem("Koltseg");
    document.getElementById("Kategoria").value = window.sessionStorage.getItem("Kategoria") == null ? "" : window.sessionStorage.getItem("Kategoria");
    document.getElementById("AlKategoria").value = window.sessionStorage.getItem("AlKategoria") == null ? "" : window.sessionStorage.getItem("AlKategoria");
    document.getElementById("Hol").value = window.sessionStorage.getItem("Hol") == null ? "" : window.sessionStorage.getItem("Hol");
    document.getElementById("Honnan").value = window.sessionStorage.getItem("Honnan") == null ? "" : window.sessionStorage.getItem("Honnan");
};

document.getElementById("Kategoria").addEventListener("click", function () {
    mentes();
    window.location.href = "Kategoria_Lista.html";
});

document.getElementById("AlKategoria").addEventListener("click", function () {
    mentes();
    window.location.href = "AlKategoria_Lista.html";
});

document.getElementById("Hol").addEventListener("click", function () {
    mentes();
    window.location.href = "Hol_Lista.html";
});

document.getElementById("Honnan").addEventListener("click", function () {
    mentes();
    window.location.href = "Honnan_Lista.html";
});

document.getElementById("Bevitel").addEventListener("click", function () {
    var battery = navigator.battery;
    if (battery.level < 0.1) {
        window.alert("Az akku feszültsége alacsony!");
        window.close();
    } else {
        var IDBOpenDBRequest_AdatKapcs = window.indexedDB.open("Penztarolo", 1);

        IDBOpenDBRequest_AdatKapcs.onsuccess = function () {
            console.log("OnSuccess");
            var IDBDatabase_db = this.result;

            var IDBTransaction_Tr1 = IDBDatabase_db.transaction(["Tetelek", "Honnanok"], "readwrite");
            IDBTransaction_Tr1.oncomplete = function () {
                console.log("Sikerrel be lett szúrva az objektum, vége tranzakciónak :-)");
                IDBDatabase_db.close();
                navigator.vibrate(1000);
                //window.close ();
            };

            var IDBObjectStore_TetelekTr = IDBTransaction_Tr1.objectStore("Tetelek");
            var IDBRequest_Breq1 = IDBObjectStore_TetelekTr.add({Datum: document.getElementById("Datum").value, Ido: document.getElementById("Ido").value, Osszeg: document.getElementById("Osszeg").value, Koltseg: document.getElementById("Koltseg").value, Kategoria: document.getElementById("Kategoria").value, AlKategoria: document.getElementById("AlKategoria").value, Hol: document.getElementById("Hol").value, Honnan: document.getElementById("Honnan").value});
            IDBRequest_Breq1.onsuccess = function () {
                console.log("Sikerült a Tetel felvitele :-)");
            };

            IDBRequest_Breq1.onerror = function () {
                console.log("Sikertelen a Tetel felvitele :-(");
            };

            var IDBObjectStore_HonnanokTr = IDBTransaction_Tr1.objectStore("Honnanok");
            var IDBIndex_Index1 = IDBObjectStore_HonnanokTr.index("Honnan");
            var IDBRequest_Kreq1 = IDBIndex_Index1.openCursor(IDBKeyRange.only(document.getElementById("Honnan").value));
            IDBRequest_Kreq1.onsuccess = function (evt) {
                var IDBCursorWithValue_Cursor = evt.target.result;
                if (IDBCursorWithValue_Cursor) {
                    var Kategoria = new String(document.getElementById("Kategoria").value);
                    var Szorzo = Kategoria.charAt(Kategoria.length - 2);
                    console.log("Szorzó: " + Szorzo);
                    if (Szorzo == "+") {
                        var U_Egyenleg = parseInt(IDBCursorWithValue_Cursor.value.Egyenleg) + parseInt(document.getElementById("Osszeg").value) - parseInt(document.getElementById("Koltseg").value);
                        console.log("Új Egyenleg: " + U_Egyenleg);

                        var IDBRequest_BReq2 = IDBObjectStore_HonnanokTr.put({Honnan: IDBCursorWithValue_Cursor.value.Honnan, Egyenleg: U_Egyenleg.toString()});
                        IDBRequest_BReq2.onsuccess = function () {
                            console.log("Sikerült módosítani a Honnan Egyenlegét :-)");
                        };

                        IDBRequest_BReq2.onerror = function () {
                            console.log("Nem sikerült módosítani a Honnan Egyenlegét :-(");
                        };
                    } else {
                        var U_Egyenleg = parseInt(IDBCursorWithValue_Cursor.value.Egyenleg) - parseInt(document.getElementById("Osszeg").value) - parseInt(document.getElementById("Koltseg").value);
                        console.log("Új Egyenleg: " + U_Egyenleg);

                        var IDBRequest_BReq2 = IDBObjectStore_HonnanokTr.put({Honnan: IDBCursorWithValue_Cursor.value.Honnan, Egyenleg: U_Egyenleg.toString()});
                        IDBRequest_BReq2.onsuccess = function () {
                            console.log("Sikerült módosítani a Honnan Egyenlegét :-)");
                        };

                        IDBRequest_BReq2.onerror = function () {
                            console.log("Nem sikerült módosítani a Honnan Egyenlegét :-(");
                        };
                    }

                    IDBCursorWithValue_Cursor.continue();
                }

            };

            IDBRequest_Kreq1.onerror = function () {
                console.log("Nem járt sikerrel a Honnan megtalálása :-(");

            };

        };

        IDBOpenDBRequest_AdatKapcs.onerror = function () {
            console.log("Sikertelen az Adatbazis megnyitása :-(");
        };
    }
});
