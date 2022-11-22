export const getItemIDB = async (dbName:string, ver:number, storeName:string, key:string) => {
    try{
        return new Promise((res, rej)=>{
            if(window.indexedDB){
                //let results:any = []
                const request = indexedDB.open(dbName, ver);
                request.onsuccess = (event) => {
                    console.log('getItemIDB onsuccess', event);
                    const db = request.result;
                    const transaction = db.transaction([storeName], 'readonly');
                    transaction.oncomplete = (event) => {
                        console.log('getItemTransaction oncomplete', event)
                        //console.log('results', results)
                    }
                    const objectStore = transaction.objectStore(storeName);
                    const idbRequest = objectStore.get(key);
                    idbRequest.onsuccess = (evt:any) => {
                        res(evt?.target?.result||{})
                    }
                }
                request.onerror = (event) => {
                    console.log('getItemIDB onerror', event)
                }
                request.onblocked  = (event) => {
                    console.log('getItemIDB onblocked');
                }
                request.onupgradeneeded = (event) => {
                    console.log('getItemIDB onupgradeneeded', event);
                }
            }else{
                alert('Your browser does not support IndexedDB. Use another browser!')
            }
        })
        
    }catch(e){
        alert('error in creating new database')
    }    
}

export const getAllItemIDB = async (dbName:string, ver:number, storeName:string) => {
    try{
        return new Promise((res, rej)=>{
            if(window.indexedDB){
                //let results:any = []
                const request = indexedDB.open(dbName, ver);
                request.onsuccess = (event) => {
                    console.log('getItemIDB onsuccess', event);
                    const db = request.result;
                    const transaction = db.transaction([storeName], 'readonly');
                    transaction.oncomplete = (event) => {
                        console.log('getItemTransaction oncomplete', event)
                        //console.log('results', results)
                    }
                    const objectStore = transaction.objectStore(storeName);
                    const idbRequest = objectStore.getAll();
                    console.log('idbRequest', idbRequest)
                    idbRequest.onsuccess = (evt:any) => {
                        res(evt?.target?.result||[])
                    }
                    
                }
                request.onerror = (event) => {
                    console.log('getItemIDB onerror', event)
                }
                request.onblocked  = (event) => {
                    console.log('getItemIDB onblocked');
                }
                request.onupgradeneeded = (event) => {
                    console.log('getItemIDB onupgradeneeded', event);
                }
            }else{
                alert('Your browser does not support IndexedDB. Use another browser!')
            }
        }
            
        )
        
    }catch(e){
        alert('error in creating new database')
    }    
}