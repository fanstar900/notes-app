require("dotenv").config();
const config = require("./config");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString).then(() => {
  console.log("MongoDB Connected Successfully !");
});
const User = require("./models/user.model");
const Note = require("./models/note.modal");

const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

// Enhanced CORS for localStorage/Header-based auth
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  'https://notes-app-frontend-whi1.onrender.com', // Your new Render frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password is required",
    });
  }
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exists with this email",
    });
  }
  const user = new User({
    fullName,
    email,
    password,
  });
  await user.save();
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration successful",
  });
});
// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password is required",
    });
  }
  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }
  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});
// Get-User-Info
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });
  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    error: false,
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "User info fetched successfully",
  });
});

// Add-Notes
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  if (!title) {
    return res.status(400).json({
      error: true,
      message: "Title is required",
    });
  }

  if (!content) {
    return res.status(400).json({
      error: true,
      message: "Content is required",
    });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
// Edit-Notes
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No changes provided",
    });
  }
  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });
    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    // if (isPinned) note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
// Get-All-Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({
      isPinned: -1,
      createdAt: -1,
    });
    return res.json({
      error: false,
      notes,
      message: "Notes fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
// Delete-Notes
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;

  const { user } = req.user;

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });
    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }
    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
// update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });
    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note pinned status updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
// Search Notes
app.post("/search-notes", authenticateToken, async (req, res) => {
  const { query } = req.body;
  const { user } = req.user;
  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }
  try {
    const matchingNotes = await Note.find({
      // not known if this is correct
      userId: user._id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });
    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;

