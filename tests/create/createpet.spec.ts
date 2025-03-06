import { CheckPetWasCreated } from "../../task/create/checkPetWasCreated";
import { CreateNewPet } from "../../task/create/createNewPet";
import Logger from "../../utils/Logger";
import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'

/*test.beforeEach(async({request}) => {
    Logger.info("running before test")
})*/
/*
test.beforeAll('Setup',async({request}) => {
  Logger.info('Running before all')
})*/

test('Should create new pet',async ({request}) => {
  //await test.info().attach('trace', { path: 'trace.zip' });
    const newPetRequest:newPetRequestModel ={
      name: faker.animal.dog(),
      type: faker.animal.type(),
      age: 1
    };
    Logger.error("this is a error")
    Logger.info("Creating a new pet")
    
    const createdNewPet = new CreateNewPet(request)
    const newPetResponse = await createdNewPet.withInfo(newPetRequest)
    
     
     const checkPetWasCreated  = new CheckPetWasCreated(newPetRequest)
     await checkPetWasCreated.withInfo(newPetResponse)
  
  
  })
/*
  test.afterAll('Teardown',async({request}) => {
    Logger.info("running after all")
  })*/
 /*
  test.afterEach(async({request}) => {
    Logger.info("running after test")
  })*/