
class Promise{
    constructor(executor){

        this.value;
        this.reason;
        this.status = 'pending';
        
        let resolve = (value)=>{
            if(this.status === 'pending'){
                this.status = 'fulfilled';
                this.value = value;
            }
        }
        let reject = (reason)=>{
            if(this.status === 'pending'){
                this.status = 'rejected';
                this.reason = reason;
            }
        }

        try{
            executor(resolve,reject);
        }catch(e){
            reject(e)
        }

    }

    then(onFulfilled,onRejected){
        if(this.status === 'fulfilled'){
            onFulfilled(this.value)
        }
        if(this.status === 'rejected'){
            onRejected(this.reason)
        }

    }
}

module.exports=Promise;

