import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const notify = () => toast('Search field cannot be empty');

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const searchTerm = form.elements.query.value;
    if (searchTerm.trim() === '') {
      notify();
      return;
    }
    onSearch(searchTerm);
  };

  return (
    <form className={css.searchContainer} onSubmit={handleSubmit}>
      <input
        className={css.searchInput}
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search movie by query"
      />

      <button className={css.searchBtn} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;

SearchBar.proptypes = {
  onSearch: PropTypes.func.isRequired,
};
