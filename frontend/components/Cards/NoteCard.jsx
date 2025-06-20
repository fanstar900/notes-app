import React from "react";
import { MdOutlinePushPin, MdOutlineEdit, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags = [],
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div
      className="card shadow-sm mb-3"
      style={{ width: "540px", minWidth: "280px" , margin:"10px" }}
    >
      <div className="card-body">
        {/* Title + Pin */}
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-2">{title}</h5>
          <span
            style={{ cursor: "pointer" }}
            onClick={onPinNote}
            title={isPinned ? "Unpin" : "Pin"}
          >
            <MdOutlinePushPin size={24} color={isPinned ? "blue" : "gray"} />
          </span>
        </div>

        {/* Date */}
        <p className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
          {date}
        </p>

        {/* Content */}
        <p className="card-text">{content}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-2">
            {tags.map((tag, i) => (
              <span key={i} className="badge bg-primary me-1">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-3 mt-3">
          <MdOutlineEdit
            size={24}
            style={{ cursor: "pointer" }}
            title="Edit"
            onClick={onEdit}
          />
          <MdDelete
            size={24}
            style={{ cursor: "pointer" }}
            title="Delete"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
