import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './search.css';
import {
  clearSearchTerm,
  selectSearchTerm,
  setSearchTerm,
} from "./searchSlice";
import { data } from '../../data/data';

const searchIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/search.svg';
const clearIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/clear.svg';


export const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const navigate = useNavigate();

  const onSearchChangeHandler = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const onSearchTermClearHandler = () => {
    dispatch(clearSearchTerm());
  };

  const searchHandler = () => {
    Object.keys(data).forEach(name => {
      if (name === searchTerm.toLowerCase()) {
        navigate(`/${name}`);
      }
    })
  }
  
  return (
    <div id="search-container">
      <button
        onClick={searchHandler}
        type="button"
        id="search-button"
      >
        <img id="search-icon" alt="" src={searchIconUrl} /> 
      </button>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={onSearchChangeHandler}
        placeholder="Search chain"
        list='chains'
      />
      <datalist id='chains'>
        {
            Object.keys(data).map((chain) => {
              return (
                <option value={chain} />
              )
            })
        }
      </datalist>
      {searchTerm.length > 0 && (
        <button
          onClick={onSearchTermClearHandler}
          type="button"
          id="search-clear-button"
        >
          <img src={clearIconUrl} alt="" />
        </button>
      )}
    </div>
  );
};

