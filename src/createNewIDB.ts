export const createNewIDB = async (dbName:string, ver:number, objectStores:{name:string, key:string}[]) => {
    //check database and store. if not exist, create one. 
    try{
        if(window.indexedDB){
            const request = indexedDB.open(dbName, ver);
            request.onsuccess = (event) => {
                console.log('createNewDatabase onsuccess', event);
                //const db = request.result;
                //const store = db.createObjectStore(storeName, {keyPath:key})
            }
            request.onerror = (event) => {
                console.log('createNewDatabase onerror', event)
            }
            request.onblocked  = (event) => {
                console.log('createNewDatabase onblocked');
            }
            request.onupgradeneeded = (event) => {
                console.log('createNewDatabase onupgradeneeded', event);
                const db = request.result;
                for(let objectStore of objectStores){
                    db.createObjectStore(objectStore.name, {keyPath:objectStore.key})
                }
            }
        }else{
            alert('Your browser does not support IndexedDB. Use another browser!')
        }
    }catch(e){
        alert('error in creating new database')
    }    
}