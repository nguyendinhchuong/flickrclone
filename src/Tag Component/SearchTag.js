import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../api';
import './SearchTag.css';

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
    // getTags() {
    //     let self = this;
    //     let url = api.baseUrl + '?method=flickr.tags.getHotList&api_key=' + api.api_key + '&period=day&count=10&format=json&nojsoncallback=1';
    //     Axios.get(url)
    //         .then(res => {
    //             if (res) {
    //                 const tags_content = res.data.hottags.tag;
    //                 self.setState({ tags: tags_content });
    //             }
    //         })
    //         .then(() => {
    //             const background_urls = [];
    //             this.state.tags.map((tag) => {
    //                 let url_src = api.baseUrl + '?method=flickr.tags.getClusterPhotos&api_key=' + api.api_key + '&tag=' + tag._content + '&cluster_id=&format=json&nojsoncallback=1';
    //                 Axios.get(url_src)
    //                     .then(res => {
    //                         if (res.data.photos.photo.length>0) {
    //                             console.log(res);
    //                             const photo = res.data.photos.photo[0];
    //                             let src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg'
    //                             background_urls.push(src);
    //                         }
    //                     });

    //             })
    //             this.setState({ background_urls: background_urls });
    //         })
    // }
    // getBackground_url() {
    //     const background_urls = [];
    //     this.state.tags.map((tag) => {
    //         let url = api.baseUrl + '?method=flickr.tags.getClusterPhotos&api_key=' + api.api_key + '&tag=' + tag._content + '&cluster_id=&format=json&nojsoncallback=1';
    //         Axios.get(url)
    //             .then(res => {
    //                 if (res) {
    //                     console.log(res);
    //                     const photo = res.data.photos.photo[0];
    //                     let src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_s.jpg'
    //                     background_urls.push(src);
    //                 }
    //             });

    //     })
    //     this.setState({ background_urls: background_urls });
    // }

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
                            console.log(background_urls);
                        }
                    });

            })
            console.log(background_urls);
            setTimeout(() => { resolve(background_urls) }, 900);
        })
        promise.then(res => {
            this.setState({ background_urls: res });
        })

    }

    render() {

        console.log(this.state.background_urls);
        return (
            <div className="container">
                {this.state.tags.map((tag, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/phototag/${tag}`}>
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