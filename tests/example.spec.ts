import { test, expect } from '@playwright/test';
import { log } from 'node:console';
import Logger from '../utils/Logger';
import { CreateNewPet } from '../task/create/createNewPet';
import { CheckPetWasCreated } from '../task/create/checkPetWasCreated';



test('Should update pet',async ({request}) => {
  const newPetRequest ={
    name: "Inoske",
    type: "Loro",
    age: 2
  };
  const newPetResponse  = await request.post('http://localhost:3000/pets',{
    data: newPetRequest
  })
  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id
  const updatePetRequest ={
    name: "Salem",
    type: "Gato",
    age: 2
  };
  const updatePetResponse  = await request.put('http://localhost:3000/pets/'+petId,{
    data: updatePetRequest
  })
  console.log(JSON.stringify(await updatePetResponse.json()));

  const updatePetJsonResponse = await updatePetResponse.json();
  
  
})
test('Should update partially a pet',async ({request}) => {
  const newPetRequest ={
    name: "Inoske",
    type: "Loro",
    age: 2
  };
  const newPetResponse  = await request.post('http://localhost:3000/pets',{
    data: newPetRequest
  })
  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id
  const updatePartiallyPetRequest ={
   
    age: 5
  };
  const updatePetResponse  = await request.patch('http://localhost:3000/pets/'+petId,{
    data: updatePartiallyPetRequest
  })
  console.log(JSON.stringify(await updatePetResponse.json()));

  const updatePetJsonResponse = await updatePetResponse.json();
  
  
})



test('Should  get a pet by id',async ({request}) => {
  const newPetRequest ={
    name: "Bingo",
    type: "Perro",
    age: 2
  };
  const newPetResponse  = await request.post('http://localhost:3000/pets',{
    data: newPetRequest
  })
  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id
  const updatePartiallyPetRequest ={
   
    age: 5
  };
  const getPetByIdResponse  = await request.get('http://localhost:3000/pets/'+petId)
  console.log("Response", await getPetByIdResponse.json());
})
test('Should  get all pets',async ({request}) => {
 
  const getPetsAllResponse  = await request.get('http://localhost:3000/pets')
  console.log("Response", await getPetsAllResponse.json());
})

test('Should do basic auth',async ({request}) => {
  const credentianlsBase64 = btoa('admin:password123')
  const basicAuthectionResponse  = await request.get('http://localhost:3000/protected-basic', {
    headers:{
      Authorization:`Basic ${credentianlsBase64}`
    }
  })
  console.log("Response status",basicAuthectionResponse.status());
  console.log("Response text", await basicAuthectionResponse.text());
})

test('Should do bearer auth',async ({request}) => {

  const authecticationTokenResponse  = await request.post('http://localhost:3000/login', {

    data: {
      
        "username": "automation"
    
    }
  })
  const jsontokenResponse = await authecticationTokenResponse.json()
  const token = jsontokenResponse.data.accessToken
  console.log(`Token:${token}`);
   
  const bearerResponse = await request.get('http://localhost:3000/protected-bearer', {
    headers:{
      'authorization':`Bearer ${ token}`
    }
  })
  expect(bearerResponse.status()).toBe(200)
  expect(await bearerResponse.text()).toBe('Hello automation, you have accessed a protected endpoint!')
})

