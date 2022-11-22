export const addItemIDB = async (dbName:string, ver:number, storeName:string, datasToAdd:object[]) => {
    try{
        return new Promise((res, rej)=>{
            if(window.indexedDB){
                const request = indexedDB.open(dbName, ver);
                request.onsuccess = (event) => {
                    //console.log('addItem onsuccess', event);
                    const db = request.result;
                    const transaction = db.transaction([storeName], 'readwrite');
                    transaction.oncomplete = (event) => {
                        //console.log('addItemTransaction oncomplete', event)
                        res(event)
                    }
                    transaction.onerror = (event) =>{
                        //console.log('addItemTransaction onerror', event)
                        rej(event)
                    }
                    const objectStore = transaction.objectStore(storeName)
                    for(let data of datasToAdd){
                        const result = objectStore.add(data);
                        result.onsuccess = (event) => {
                            console.log('addItem onsuccess', event)
                        }
                    }
                    
                }
                request.onerror = (event) => {
                    console.log('addItem onerror', event)
                }
                request.onblocked  = (event) => {
                    console.log('addItem onblocked');
                }
                request.onupgradeneeded = (event) => {
                    console.log('addItem onupgradeneeded', event);
                }
            }else{
                alert('Your browser does not support IndexedDB. Use another browser!')
            }
        })
    }catch(e){
        alert('error in creating new database')
    }  
}