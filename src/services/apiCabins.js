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

export async function createCabin(newCabin) {

  const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
  const imagePath=`${VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`

  // "https://zxrjcorrfilefpdsoypv.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"


  // 1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{...newCabin,image:imagePath}])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2. upload img
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

  return data;
}
