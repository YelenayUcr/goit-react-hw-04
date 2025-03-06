import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.icon} onClick={handleSubmit} />
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            placeholder="Search"
            value={query}
            onChange={handleChange}
          />
        </div>
      </form>
    </header>
  );
}

export default SearchBar;
