import React, { Component } from 'react';
import Axios from 'axios';
import api from '../api';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state={
            search:''
        }
    }
    
    render() {
        return (
            <div>
                <form className="form-inline my-2 my-lg-0">
                    <input id="search-tag" name="search" className="" type="search" placeholder="Ảnh, mọi người hoặc nhóm" aria-label="Search" />
                </form>
            </div>
        );
    }
}

export default SearchBar;