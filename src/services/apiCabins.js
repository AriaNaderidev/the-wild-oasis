import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image.split("/").pop()
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-img/${imageName}`;

  let query = supabase.from("cabins");

  if (id) {
    const { data: existingRow, error: fetchError } = await supabase
      .from("cabins")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !existingRow) {
      console.error("No cabin found with id:", id, fetchError);
      throw new Error("Cabin not found");
    }

    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  } else {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (!data || data.length === 0) {
    console.error("No data returned from update/insert");
    throw new Error("Operation succeeded but no data returned");
  }

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabins-img")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image not be uploaded and the cabin was not created",
      );
    }
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
