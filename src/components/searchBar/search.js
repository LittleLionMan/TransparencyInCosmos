import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './search.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
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
    <ButtonToolbar>
      <InputGroup>
        <InputGroup.Text>Chain: </InputGroup.Text>
      <Form.Select
        onChange={onSearchChangeHandler}
      >
        <option></option>
        {
            Object.keys(data).map((chain) => {
              counter++;
              return (
                <option value={chain} key={counter}>{chain}</option>
              )
            })
        }
      </Form.Select>
      </InputGroup>
      <Button
        variant="light"
        onClick={searchHandler}
        type="button"
        id="search-button"
      >
        <img id="search-icon" alt="" src={searchIconUrl} /> 
      </Button>
    </ButtonToolbar>
  );
};

/* <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={onSearchChangeHandler}
        placeholder="Search chain"
        list='chains'
      /> */