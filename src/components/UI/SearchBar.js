import "./SearchBar.css";
import "font-awesome/css/font-awesome.min.css";

const SearchBar = (props) => {
  const getValue = (event) => {
    event.preventDefault();
    props.getString(event.target.value)
  };

  return (
    <div className="container2">
      <form>
        <div className="col-12 col-md-8 container">
          <input
            onChange={getValue}
            type="text"
            id="search-bar"
            placeholder="Search..."
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
