import test from "@playwright/test";

test('Should  delete a pet',async ({request}) => {
    const newPetRequest ={
      name: "Bingo",
      type: "Perro",
      age: 2
    };
    const newPetResponse  = await request.post('/pets',{
      data: newPetRequest
    })
    const newPetResponseJson = await newPetResponse.json()
    const petId = newPetResponseJson.data.id
    const updatePartiallyPetRequest ={
     
      age: 5
    };
    const deletePetResponse  = await request.delete('/pets/'+petId)
    console.log("satus:",deletePetResponse.status());
  
  
    
    
  })
  