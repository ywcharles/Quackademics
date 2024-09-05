import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import supabase from "../../libs/supabaseAdmin";
import { useUserSessionStore } from "../../stores/UserSessionStore";

import TagItem from "./TagItem";

export const SearchTags = () => {
  //const user = 42069;
  const user = useUserSessionStore((state) => state.userId);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [sessions, setSessions] = useState([]);

  const fetchTags = async () => {
    const { data, error } = await supabase
      .from("tags")
      .select()
      .eq("user_id", user);

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return data;
  };

  const fetchSessions = async (tagId) => {
    const { data, error } = await supabase
      .from("tags_mapping")
      .select()
      .eq("tag_id", tagId);

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return data;
  };

  const fetchSelectedTag = async (tagId) => {
    const { data, error } = await supabase
      .from("tags")
      .select()
      .eq("tag_id", tagId);

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return data;
  };

  useEffect(() => {
    const loadTags = async () => {
      const tagIds = await fetchTags();
      setTags(tagIds);
    };

    loadTags();
  }, []);

  const handleTagClick = async (e) => {
    const fetchedTag = await fetchSelectedTag(e.target.id);
    setSelectedTag(fetchedTag[0]);
    const tagSessions = await fetchSessions(e.target.id);
    setSessions(tagSessions);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h3">Tags</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {tags.map((t) => {
          if (t) {
            return (
              <Button
                id={t.tag_id}
                sx={{
                  backgroundColor: t.color,
                  borderRadius: 1,
                  padding: 0.5,
                  color: "white",
                }}
                onClick={handleTagClick}
              >
                {t.tag_name}
              </Button>
            );
          } else {
            return null;
          }
        })}
      </Box>
      {selectedTag && (
          <Box
            sx={{
              backgroundColor: selectedTag.color,
              borderRadius: 1,
              padding: 0.5,
            }}
          >
            {selectedTag.tag_name}
          </Box>
        )}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          padding: 3,
          width: "100vh",
          height: "50vh",
          gap: 1,
          overflowY: "scroll"
        }}
      >
        {sessions.map(
          (t) => {
            return <TagItem type={t.type} searchId={t.search_id}/>
          }
        )}
      </Box>
    </Box>
  );
};
