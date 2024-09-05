import supabase from "../libs/supabaseAdmin";
import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

const getCurrentTimestamp = () => {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
};

export const getUsername = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("user_id", userId);
  return data[0].username.toString();
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

export const reloadProfile = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("user_id", userId);
  if (error !== null) return null;
  if (data.length !== 0) {
    const user = data[0];
    return {
      bio: user.biography,
      study: user.study,
      start_year: user.start_year,
      graduation_year: user.graduation_year,
    };
  } else {
    return null;
  }
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
    if (result === true) {
      const { errorLogin } = await supabase
        .from("users")
        .update({ last_login: getCurrentTimestamp() })
        .eq("user_id", user.user_id);
      return {
        uid: user.user_id,
        username: user.username,
        profile_picture: user.profile_picture,
        bio: user.biography,
        study: user.study,
        start_year: user.start_year,
        graduation_year: user.graduation_year,
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
};
