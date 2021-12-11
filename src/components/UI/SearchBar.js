import "./SearchBar.css";
import "font-awesome/css/font-awesome.min.css";
import { useState } from "react";

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");

  const getValue = (event) => {
    event.preventDefault();
    setSearchText(event.target.value);
    console.log(event.target.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.getString(searchText);
  };

  return (
    <div className="container2">
      <form onSubmit={onSubmitHandler}>
        <div className="col-12 col-md-8 container">
          <input
            onChange={getValue}
            type="text"
            id="search-bar"
            placeholder="Search..."
          />
          <button className="fa fa-search" id="search-btn"></button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
