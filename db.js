// Open database

let db;
let openRequest = indexedDB.open("myDataBase");
openRequest.addEventListener("success", (e) => {
    console.log("DB Success");
    db = openRequest.result;
})
openRequest.addEventListener("error", (E) => {
    console.log("DB Error");

})
openRequest.addEventListener("upgradeneeded", (E) => {
    console.log("DB Upgraded and also for initial DB creation");
    db = openRequest.result;

    // Create objectstore  (can be created/modify only in upgradeneeded event)
    db.createObjectStore("video", { keyPath: "id" });
    db.createObjectStore("image", { keyPath: "id" });

})




