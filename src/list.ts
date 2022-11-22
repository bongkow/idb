export const listIdb = async () => {
    return new Promise((res, rej)=>{
        try{
            if(window.indexedDB){
                let databases = indexedDB.databases();
                databases.then(db=>res(db));
            }else{
                 alert('Your browser does not support IndexedDB. Use another browser!')
            }
        }catch(e){
            rej(e)
        }
    })
} 