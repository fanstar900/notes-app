import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, onClose, getAllNotes, showToastMessage }) => {
  const [title, setTitle] = useState(noteData ? noteData.title : "");
  const [content, setContent] = useState(noteData ? noteData.content : "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(noteData ? noteData.tags : []);
  const [error, setError] = useState(null);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleDeleteTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title: title,
        content: content,
        tags: tags,
      });
      if (response.data && response.data.note) {
        console.log("Note added successfully", response.data.note);
        showToastMessage("Note added successfully!", "success");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log("An unexpected error occurred while adding note", error);
      showToastMessage("Failed to add note", "error");
      setError("An unexpected error occurred while adding note");
    }
  };
  // Edit Note
  const editNote = async () => {
    try {
      const id = noteData._id;
      const response = await axiosInstance.put(`/edit-note/` + id, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        console.log("Note Edited successfully", response.data.note);
        showToastMessage("Note updated successfully!", "success");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log("An unexpected error occurred while editing note", error);
      showToastMessage("Failed to update note", "error");
      setError("An unexpected error occurred while editing note");
    }
  };

  const handleSubmit = async() => {
    // title or content not filled
    if (!title) {
      setError("Please enter a title");
      return;
    }
    if (!content) {
      setError("Please enter some Content");
      return;
    }
    {
      type == "add" ? await addNewNote() : await editNote();
    }
    setTitle("");
    setContent("");
    setTags([]);
    setTagInput("");
    setError(null);
  };

  return (
    <div className="p-3">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4 className="mb-3">{type == "add" ? "Add a New Note" : "Edit Note"}</h4>
        <IoMdClose
          onClick={onClose}
          style={{
            cursor: "pointer",
          }}
        />
      </div>

      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
      </div>

      {/* Content */}
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
        />
      </div>

      {/* Tags */}
      <div className="mb-3">
        <label className="form-label">Tags</label>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            placeholder="Type a tag"
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleAddTag}
          >
            <FaPlus />
          </button>
        </div>
        {/* Tag list */}
        <div className="mt-2 d-flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="badge bg-primary d-flex align-items-center"
              style={{ paddingRight: "0.5rem" }}
            >
              #{tag}
              <FaTimes
                size={12}
                style={{ marginLeft: "6px", cursor: "pointer" }}
                onClick={() => handleDeleteTag(tag)}
              />
            </span>
          ))}
        </div>
      </div>
      {/*error */}
      {error && <p style={{ color: "red", marginBottom: "5px" }}>{error}</p>}
      {/* Submit Button */}
      <button className="btn btn-primary w-100 mt-4" onClick={handleSubmit}>
        {type=="add" ? "Add Note" : "Update Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
