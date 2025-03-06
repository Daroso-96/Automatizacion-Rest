import test, { APIRequestContext, APIResponse } from "@playwright/test";

export class CreateNewPet{
 private request:APIRequestContext
    constructor(request:APIRequestContext){
        this.request = request;
    }

    public async withInfo(newPetRequest:newPetRequestModel): Promise<APIResponse>{
            
      return await test.step(`creating a new pet ${JSON.stringify(newPetRequest)}`, async()=> {

         return await this.request.post('/pets',{
            data: newPetRequest,
            headers:{
               'Content-Type': ' application/json',
               'User-Agent' : 'PostmanRuntime/7.43.0'
            }
        
    })

      })

     
}
}