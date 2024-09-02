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

  if (error !== null) return null;

  if (data.length !== 0) {
    const user = data[0];
    const result = await bcryptjs.compare(password, user.password_hash);
    // if (err) {
    //   return null;
    // }
    if (result === true) {
      console.log("found");
      return user.user_id;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
