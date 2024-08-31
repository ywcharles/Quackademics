import supabase from "../libs/supabaseAdmin";

const getCurrentTimestamp = () => {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
};

export const addUser = async (username, email, password, profilePicture) => {
  const { error } = await supabase.from("users").insert([
    {
      username: username,
      email: email,
      password_hash: password,
      profile_picture: profilePicture,
      verified: false,
      created_at: getCurrentTimestamp,
      last_login: getCurrentTimestamp,
    },
  ]);

  if (error) return error;
};

export const signInUser = async (user_id, password) => {
  const { error } = await supabase.from("users").update({ user_id: user_id });
};
