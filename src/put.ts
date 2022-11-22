export const putItemIDB = async (dbName:string, ver:number, storeName:string, datasToAdd:object[]) => {
    try{
        return new Promise((res, rej)=>{
            if(window.indexedDB){
                const request = indexedDB.open(dbName, ver);
                request.onsuccess = (event) => {
                    //console.log('putItemIDB onsuccess', event);
                    const db = request.result;
                    const transaction = db.transaction([storeName], 'readwrite');
                    transaction.oncomplete = (event) => {
                        //console.log('putItemIDBTransaction oncomplete', event)
                        res(event)
                    }
                    transaction.onerror = (event) => {
                        //console.log('putItemIDBTransaction onerror', event)
                        rej(event)
                    }
                    const objectStore = transaction.objectStore(storeName)
                    for(let data of datasToAdd){
                        const result = objectStore.put(data);
                        result.onsuccess = (event) => {
                            //console.log('putItemIDB onsuccess', event)
                        }
                    }
                }
                request.onerror = (event) => {
                    console.log('putItemIDB onerror', event)
                }
                request.onblocked  = (event) => {
                    console.log('putItemIDB onblocked');
                }
                request.onupgradeneeded = (event) => {
                    console.log('putItemIDB onupgradeneeded', event);
                }
            }else{
                let errorMsg = "Your browser does not support IndexedDB. Use another browser!";
                alert(errorMsg);
                rej(errorMsg);
            }
        })
    }catch(e){
        let errMsg = 'error in creating new database';
        alert(errMsg)
        
    }  
}