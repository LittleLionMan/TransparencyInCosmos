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

export const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const navigate = useNavigate();
  let counter = 0;

  const onSearchChangeHandler = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const searchHandler = () => {
    Object.keys(data).forEach(name => {
      if (name === searchTerm.toLowerCase()) {
        navigate(`/${name}`);
        dispatch(clearSearchTerm());
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
              counter++;
              return (
                <option value={chain} key={counter}  />
              )
            })
        }
      </datalist>
    </div>
  );
};

