import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../api';
import './SearchTag.css';
//import PhotoTag from './Tag Photo/TagPhoto';
import PhotoTag from '../Tag Photo/TagPhoto'

class SearchTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: ['sunset', 'beach', 'water', 'sky', 'red', 'flower', 'nature', 'blue', 'night', 'white', 'cat', 'dog', 'tree', 'green', 'portrait'],
            background_urls: []
        }
        //this.getTags = this.getTags.bind(this);
        //this.getBackground_url = this.getBackground_url.bind(this);
    }


    componentDidMount() {
        var promise = new Promise((resolve, reject) => {
            let background_urls = [];
            this.state.tags.map((tag) => {
                let url = api.baseUrl + '?method=flickr.tags.getClusterPhotos&api_key=' + api.api_key + '&tag=' + tag + '&cluster_id=&format=json&nojsoncallback=1';
                Axios.get(url)
                    .then(res => {
                        if (res) {
                            const photo = res.data.photos.photo[0];
                            let src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg';
                            background_urls.push(src);
                        }
                    });

            })
            setTimeout(() => { resolve(background_urls) }, 900);
        })
        promise.then(res => {
            this.setState({ background_urls: res });
        })

    }

    render() {

        return (
            <div className="container">
                {this.state.tags.map((tag, i) => {
                    return (
                        <div key={i}>
                            <Link to={'/tags/' + tag}>
                                <img src={this.state.background_urls[i]} alt="" />
                                <div className="centered">
                                    <span>{tag}</span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default SearchTag;