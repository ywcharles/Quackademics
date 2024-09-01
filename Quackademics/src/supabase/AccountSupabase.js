import supabase from "../libs/supabaseAdmin";
import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

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

export const signInUser = async (username, password) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("username", username);

  if (error) return false;

  if (data.length === 1) {
    if (data.password_hash === hashPassword(password)) {
      return data.user_id;
    }
  }

  return false;
};
