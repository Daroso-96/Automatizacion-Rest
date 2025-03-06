import test, { APIRequestContext, APIResponse, expect } from "@playwright/test";
import Logger from "../../utils/Logger";

export class CheckPetWasCreated{
    private expectedPet:any
    constructor(expectedPet:any){
        this.expectedPet = expectedPet
      
    }

    public async withInfo(newPetResponse:APIResponse): Promise<void>{

        return await test.step('Checking the pet was created', async () => {
            
        console.log(JSON.stringify(await newPetResponse.json()));
        expect(newPetResponse.status()).toBe(201)
        const newPetJsonResponse = await newPetResponse.json();

        const NewPetResponseModel = newPetJsonResponse as NewPetResponseModel

        const headers = newPetResponse.headersArray()
        headers.forEach(cabecera => console.log(`name:${cabecera.name} value:${cabecera.value}`));
        const keepAliveHeader = headers.filter(header => header.name === 'Keep-Alive')[0].value
        console.log(keepAliveHeader)

        expect(newPetJsonResponse.status).toBe("success")
        expect(newPetJsonResponse.message).toBe("Pet created")



        
        expect(NewPetResponseModel.data.name).toBe(this.expectedPet.name)
        expect(NewPetResponseModel.data.type).toBe(this.expectedPet.type)
        expect(NewPetResponseModel.data.id).toBeTruthy()
        console.log("status:", NewPetResponseModel.status);
        console.log("Id:", NewPetResponseModel.data.id);
        console.log("message:", NewPetResponseModel.message);
        console.log("type:", NewPetResponseModel.data.type);

        Logger.info("Pet was created successfully")
  
            
        }) 

    
}
}