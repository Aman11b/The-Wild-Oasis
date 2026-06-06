/* eslint-disable no-unused-vars */
import supabase from "./supabase";

export async function getCabin() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("CABIN COULD NOT BE LOADED");
  }

  return cabins;
}
