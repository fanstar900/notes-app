import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoMdAdd } from "react-icons/io";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";
const Home = () => {
  const [isSearch, setIsSearch] = useState(false);

  const onEdit = (note) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: note });
  };
  const onDelete = async (note) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${note._id}`);
      if (response.data && response.data.message) {
        showToastMessage(response.data.message, "success");
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred while deleting note", error);
      showToastMessage("Failed to delete note", "error");
    }
  };

  const onSearchNote = async(query)=>{
    try{
      const response = await axiosInstance.post("/search-notes", {
        query: query,
      });
      if(response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }                 
    }catch(error){
      console.log("An unexpected error occurred while searching notes", error);
      showToastMessage("Failed to search notes", "error");
    }
  }
  const onClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  const onPinNote = async (note) => {
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + note._id,
        {
          isPinned: !note.isPinned,
        }
      );

      if (response.data && response.data.message) {
        showToastMessage(response.data.message, "success");
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred while pinning note", error);
      showToastMessage("Failed to pin note", "error");
    }
  };

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });
  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, type: type, message: message });
    setTimeout(() => {
      setShowToastMsg({ isShown: false, type: "add", message: "" });
    }, 3000);
  };
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();
  //getUser Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred while fetching notes", error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} onClearSearch={onClearSearch}/>
      <div className="d-flex flex-wrap justify-content-start">
      {allNotes.length > 0 ? allNotes.map((note) => {
        return (
            
            <NoteCard
              key={note._id}
              title={note.title}
              date={moment(note.createdAt).format("DD MMM YYYY")}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => onEdit(note)}
              onDelete={() => onDelete(note)}
              onPinNote={() => onPinNote(note)}
            />
          
        );
        
      }
      
      ) : <EmptyCard setOpenAddEditModal={setOpenAddEditModal}/>}
      </div>
      {!openAddEditModal.isShown && (
        <IoMdAdd
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
          size={48}
          style={{
            color: "white",
            backgroundColor: "#1055b5",
            borderRadius: "50%",
            position: "fixed",
            bottom: "40px",
            right: "40px",
            zIndex: 1000,
            cursor: "pointer",
          }}
        />
      )}

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0 , 0 , 0 , 0.2)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
        contentLabel=""
      >
        {console.log(openAddEditModal.data)};
        <AddEditNotes
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={() => {
          setShowToastMsg({ isShown: false, type: "add", message: "" });
        }}
      ></Toast>
    </>
  );
};
export default Home;
