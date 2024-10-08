import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";

import supabase from "../libs/supabaseAdmin";
import { useUserSessionStore } from "../stores/UserSessionStore";

const TagsContainer = (props) => {
  //TO DO - Fetch user
  const user = useUserSessionStore((state) => state.userId);
  const type = props.type;
  const activity = props.sessionId;

  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [sessionTags, setSessionTags] = useState([]);
  const [newTagColor, setNewTagColor] = useState("#aabbcc");
  const [newTagName, setNewTagName] = useState(null);

  const fetchSessionTagIds = async () => {
    const { data, error } = await supabase
      .from("tags_mapping")
      .select()
      .eq("type", type)
      .eq("search_id", activity);

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    const tagIds = data.map((tag) => tag.tag_id);
    return tagIds;
  };

  const fetchSessionTags = async () => {
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

  const addExistingTag = async (t_id) => {
    const { data, error } = await supabase
      .from("tags_mapping")
      .insert([
        {
          type: type,
          search_id: activity,
          tag_id: t_id,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error);
      return [];
    }

    return data;
  };

  const removeMappedTag = async (t_id) => {
    const { data, error } = await supabase
      .from("tags_mapping")
      .delete()
      .eq("tag_id", t_id)
      .eq("type", type)
      .eq("search_id", activity);

    if (error) {
      console.error("Error deleting data:", error);
    }
  };

  const createTag = async () => {
    const { data, error } = await supabase
      .from("tags")
      .insert([{ tag_name: newTagName, user_id: user, color: newTagColor }])
      .select();

    if (error) {
      console.error("Error deleting data:", error);
    }

    return data;
  };

  useEffect(() => {
    const loadTags = async () => {
      const tagIds = await fetchSessionTagIds();
      setSessionTags(tagIds);

      const tags = await fetchSessionTags(tagIds);
      setTags(tags);
    };

    loadTags();
  }, [activity]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTagClick = async (event) => {
    const id = event.target.id;
    if (!sessionTags.includes(id) && activity != 0) {
      const newTag = await addExistingTag(id);
      if (newTag) {
        // setSessionTags((prevSessionTags) => [...prevSessionTags, id]);
        const tagIds = await fetchSessionTagIds();
        setSessionTags(tagIds);

        const updatedTags = await fetchSessionTags();
        setTags(updatedTags);
      }
    }
  };

  const handleDeleteTagClick = async (event) => {
    const id = event.target.id;
    await removeMappedTag(id);
    const tagIds = await fetchSessionTagIds();
    setSessionTags(tagIds);

    const updatedTags = await fetchSessionTags();
    setTags(updatedTags);
  };

  const handleNewTagChange = (event) => {
    setNewTagName(event.target.value);
  };

  const handleAddNewTagClick = async () => {
    if (newTagName !== "") {
      const newTag = await createTag();

      const addedTag = await addExistingTag(newTag[0].tag_id);
      if (addedTag) {
        const tagIds = await fetchSessionTagIds();
        setSessionTags(tagIds);

        const updatedTags = await fetchSessionTags();
        setTags(updatedTags);
      }

      setNewTagColor("#aabbcc");
      setNewTagName("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "90%",
        height: "10%",
        justifyContent: "center",
        backgroundColor: "inherit",
        color: "black",
        // marginX: 2,
        // padding: 2,
        borderRadius: 2,
      }}
    >
      <Box onClick={handleClickOpen}>
        {(!sessionTags || sessionTags.length === 0) && (
          <Typography sx={{ color: "#A9A9A9" }}>Tags</Typography>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
            flexWrap: "wrap",
            overflowY: "auto",
          }}
        >
          {tags.map((t, index) => {
            if (sessionTags.includes(t.tag_id)) {
              return (
                <Box
                  key={`Displayed${index}`}
                  sx={{
                    backgroundColor: t.color,
                    borderRadius: 1,
                    padding: 0.5,
                  }}
                >
                  {t.tag_name}
                </Box>
              );
            } else {
              return null;
            }
          })}
        </Box>
      </Box>

      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "30%",
            height: "80%",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Tags</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              flexWrap: "wrap",
              overflowY: "auto",
            }}
          >
            {tags.map((t, index) => {
              if (sessionTags.includes(t.tag_id)) {
                return (
                  <Button
                    id={t.tag_id}
                    onClick={handleDeleteTagClick}
                    key={`Added${index}`}
                    sx={{
                      color: "black",
                      backgroundColor: t.color,
                      borderRadius: 1,
                      padding: 0.5,
                    }}
                  >
                    {t.tag_name}
                  </Button>
                );
              } else {
                return null;
              }
            })}
          </Box>
          <p>Add Tags</p>
          <Box
            sx={{ display: "flex", gap: 1, width: "100%", flexWrap: "wrap" }}
          >
            {tags.map((t, index) => {
              if (!sessionTags.includes(t.tag_id)) {
                return (
                  <Button
                    id={t.tag_id}
                    key={`Available${index}`}
                    onClick={handleAddTagClick}
                    sx={{
                      color: "black",
                      backgroundColor: t.color,
                      borderRadius: 1,
                      padding: 0.5,
                    }}
                  >
                    {t.tag_name}
                  </Button>
                );
              } else {
                return null;
              }
            })}
          </Box>
          <p>Create New Tag</p>
          <HexColorPicker color={newTagColor} onChange={setNewTagColor} />
          <Box sx={{ display: "flex" }}>
            <TextField
              autoFocus
              margin="dense"
              label="New Tag Name"
              value={newTagName}
              fullWidth
              variant="standard"
              onChange={handleNewTagChange}
            />
            <Button onClick={handleAddNewTagClick}>+</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TagsContainer;
