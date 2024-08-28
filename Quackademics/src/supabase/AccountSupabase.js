import supabase from "../libs/supabaseAdmin";

export const addUser = async (username, email, password, profilePicture) => {
  const currentTS = new Date().toISOString().slice(0, 19).replace("T", " ");

  const { error } = await supabase.from("users").insert([
    {
      username: username,
      email: email,
      password_hash: password,
      profile_picture: profilePicture,
      verified: false,
      created_at: currentTS,
      last_login: currentTS,
    },
  ]);

  if (error) return error;
};
