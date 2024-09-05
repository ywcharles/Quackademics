import supabase from "../libs/supabaseAdmin";

export const editProfile = async (
  bio,
  study,
  startYear,
  graduationYear,
  uid,
) => {
  const { error } = await supabase
    .from("users")
    .update({
      bio: bio,
      study: study,
      start_year: startYear,
      graduation_year: graduationYear,
    })
    .eq("user_id", uid);

  if (error) return error;
};
