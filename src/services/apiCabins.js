/* eslint-disable no-unused-vars */
import supabase, { VITE_SUPABASE_URL } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("CABIN COULD NOT BE LOADED");
  }

  return cabins;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

/**
 * without file
 * image: "https://zxrjcorrfilefpdsoypv.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
 * 
 * --------------------------
 * 
 * with file
  image: FileList
  0: File
    lastModified: 1780589706784
    lastModifiedDate: Thu Jun 04 2026 21:45:06 GMT+0530 (India Standard Time) {}
    name: "Screenshot 2026-06-04 214506.png"
    size: 120864
    type: "image/png"
    webkitRelativePath:""
    [[Prototype]]: 
    File
    length: 1
*/

export async function createEditCabin(newCabin,id) {
  console.log("Incoming:", newCabin);

  // ✅ FIX 1: safe check (string only)
  const hasImagePath=newCabin.image.startsWith(VITE_SUPABASE_URL);

  console.log("has image path",hasImagePath);

  // ✅ FIX 2: prevent crash when image is string

  const imageName=hasImagePath? null :`${Math.random()}-${newCabin.image.name}`.replaceAll("/","");

  const imagePath=hasImagePath? newCabin.image: `${VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`

  console.log(imagePath);

  // "https://zxrjcorrfilefpdsoypv.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"


  // 1. create/edit cabin
  let query =supabase.from("cabins");

  // create
  if(!id)
    query = query.insert([{...newCabin,image:imagePath}]);

  // edit
  if(id) query = query.update({...newCabin,image:imagePath}).eq("id",id);

  const {data,error}=await query.select().single();


  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

   // ✅ FIX 4: upload only if new file
  // 2. upload img
  if(!hasImagePath){
    const {error:storageError}=await supabase
    .storage
    .from("cabin-images")
    .upload(imageName,newCabin.image);
    
    // 3. delete the cabin if error happened
    
    if(storageError){
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin could not be deleted");
  }

  }
  

  return data;
}
