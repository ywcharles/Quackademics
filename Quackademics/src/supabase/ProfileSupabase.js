import supabase from "../libs/supabaseAdmin";

export const editProfile = async (
  bio,
  study,
  startYear,
  graduationYear,
  userId,
) => {
  const { error } = await supabase
    .from("users")
    .update({
      biography: bio,
      study: study,
      start_year: startYear,
      graduation_year: graduationYear,
    })
    .eq("user_id", userId);

  console.log("error", error);
  if (error) return error;
};

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("user_id", userId);

  if (error) return error;

  const user = data[0];

  return {
    bio: user.bio,
    study: user.study,
    start_year: user.start_year,
    graduation_year: user.graduation_year,
  };
};
