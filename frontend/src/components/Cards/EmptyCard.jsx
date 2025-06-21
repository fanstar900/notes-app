import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdNoteAdd } from "react-icons/md";

const EmptyCard = ({ setOpenAddEditModal }) => {
  return (
    <div
      className="card shadow-sm text-center d-flex align-items-center justify-content-center h-100"
      style={{
        minHeight: "150px",
        border: "2px dashed #ccc",
        backgroundColor: "#f8f9fa",
        cursor: "pointer",
      }}
      onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null });
      }}
    >
      <MdNoteAdd size={48} color="#888" />
      <p className="mt-3 text-muted">No notes in your sphere.</p>
      <div className="d-flex align-items-center justify-content-center text-primary">
        <IoMdAdd size={24} />
        <span className="ms-2 fw-bold">Add a note to NoteSphere</span>
      </div>
    </div>
  );
};

export default EmptyCard;
