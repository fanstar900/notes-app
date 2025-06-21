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
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        {/* Title, Pin, and Date */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">{title}</h5>
          <span
            style={{ cursor: "pointer" }}
            onClick={onPinNote}
            title={isPinned ? "Unpin" : "Pin"}
          >
            <MdOutlinePushPin size={24} color={isPinned ? "blue" : "gray"} />
          </span>
        </div>
        <p className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
          {date}
        </p>

        {/* Content */}
        <p className="card-text flex-grow-1">{content?.slice(0, 80)}</p>

        {/* Footer: Tags and Actions */}
        <div className="d-flex align-items-center justify-content-between mt-auto">
          <div className="d-flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <span key={i} className="badge bg-primary">
                #{tag}
              </span>
            ))}
          </div>
          <div className="d-flex gap-2">
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
    </div>
  );
};

export default NoteCard;
