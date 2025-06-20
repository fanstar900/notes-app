import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control border-end-0"
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          className="btn btn-outline-secondary border-start-0 border-end-0"
          type="button"
          onClick={onClearSearch}
          style={{ border: "none" }}
        >
          <IoMdClose />
        </button>
      )}
      {(
        <button
          className="btn btn-outline-secondary border-start-0"
          type="button"
          onClick={handleSearch}
          style={{ border: "none" }}
        >
          <CiSearch />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
