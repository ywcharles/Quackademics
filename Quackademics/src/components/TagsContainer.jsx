import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import supabase from "../libs/supabaseAdmin";

const TagsContainer = () => {
  //TO DO - Fetch user and session
  const user = 42069;
  const activity = 40;
  const type = 3;

  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);

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

  const fetchSessionTags = async (tagIds) => {
    const { data, error } = await supabase
      .from("tags")
      .select()
      .in("tag_id", tagIds);

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return data;
  };

  useEffect(() => {
    const loadTags = async () => {
      const tagIds = await fetchSessionTagIds();

      const tags = await fetchSessionTags(tagIds);
      setTags(tags);
    };

    loadTags();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "white",
        color: "black",
        marginX: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          width: "95%",
        }}
      >
        {tags.map((t) => (
          <Box sx={{ backgroundColor: t.color, borderRadius: 1, padding: 0.5 }}>
            {t.tag_name}
          </Box>
        ))}
      </Box>

      <Button sx={{ width: "5%" }} onClick={handleClickOpen}>
        +
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Tag</DialogTitle>
        <DialogContent>
          <Box>
            {tags.map((t) => (
              <Box
                sx={{ backgroundColor: t.color, borderRadius: 1, padding: 0.5 }}
              >
                {t.tag_name}
              </Box>
            ))}
          </Box>
          <TextField
            autoFocus
            margin="dense"
            label="New Tag"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add New Tag
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TagsContainer;
