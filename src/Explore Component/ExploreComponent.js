import React, { Component } from 'react';
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from 'react-grid-gallery';
import ProTypes from 'prop-types';
import api from '../api';
import './ExploreComponent.css'
import { Link } from 'react-router-dom';


class Explorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            images: [],
            hasMoreItems: true,
            nextHref: null,
            page_pos: 1
        }
    }

    loadItems(page) {
        let self = this;
        let url = api.baseUrl + '?method=flickr.interestingness.getList&api_key=' + api.api_key + '&date=2018-10-21' + '&per_page=20&page=' + self.state.page_pos + '&format=json&nojsoncallback=1';
        if (this.state.nextHref) {
            url = this.state.nextHref;
        }
        Axios.get(url)
            .then(res => {
                if (res) {
                    const photos_api = res.data.photos.photo;
                    let photos = self.state.photos;
                    photos_api.map((image) => {
                        photos.push(image);

                    })
                    if (url) {
                        self.setState({
                            photos: photos,
                            nextHref: res.next_href,
                            page_pos: self.state.page_pos + 1
                        })
                    } else {
                        self.setState({
                            hasMoreItems: false
                        });
                    }
                }
            });
    }

    render() {
        var items = [];
        this.state.photos.map((photo, i) => {
            items.push(
                <Link to={'/photos/'+photo.id}>
                    <div className="photo-view" key={i}>
                        <img className="image" src={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'} />
                        <div className="interaction-bar">
                            <div className="title">{photo.title}</div>
                        </div>
                    </div>
                </Link>

            );
        })
        return (
            <div className="explore-background">
                <div className="container ">
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={this.state.hasMoreItems}
                        initialLoad={true}
                        loader={<div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                        loadMore={this.loadItems.bind(this)}>
                        <div>
                            {items}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}
export default Explorer;