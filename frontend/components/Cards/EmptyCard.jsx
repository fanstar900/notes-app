import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdNoteAdd } from "react-icons/md";

const EmptyCard = ({ setOpenAddEditModal }) => {
  return (
    <div
      className="card shadow-sm text-center d-flex align-items-center justify-content-center"
      style={{
        width: "300px",
        height: "200px",
        margin: "20px auto",
        border: "2px dashed #ccc",
        backgroundColor: "#f8f9fa",
        cursor: "pointer",
      }}
    >
      <MdNoteAdd size={48} color="#888" />
      <p className="mt-3 text-muted">No notes found</p>
      <div className="d-flex align-items-center justify-content-center text-primary">
        <IoMdAdd
          size={24}
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        />
        <span
          className="ms-2 fw-bold"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          Add your first note
        </span>
      </div>
    </div>
  );
};

export default EmptyCard;
