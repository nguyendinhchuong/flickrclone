import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from 'react-grid-gallery';
import ProTypes from 'prop-types'
library.add(faStroopwafel)

const api = {
    baseUrl: 'https://api.flickr.com/services/rest/',
    api_key: '97625b576d0b7a36de0e967ba2ebb146'
}

class Header extends Component {

    render() {
        return (
            <div className="navbar-dark">
                <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand brand-custom" ><b>flick</b>clone</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link link-custom droplnk" >Bạn</a>
                                    <div className="dropdown-content">
                                        <a >Giới thiệu</a>
                                        <a >Kho ảnh</a>
                                        <a >Album</a>
                                        <a >Yêu thích</a>
                                        <a >Thư viện</a>
                                        <a >Nhóm</a>
                                        <a >Cuộn Camera</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link link-custom droplnk" >Khám phá</a>
                                    <div className="dropdown-content">
                                        <a >Ảnh gần đây</a>
                                        <a >Xu hướng</a>
                                        <a >Flickrclone VR</a>
                                        <a >The Commons</a>
                                        <a >Thư viện</a>
                                        <a >Bản đồ thế giới</a>
                                        <a >Tìm máy ảnh</a>
                                    </div>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="" type="search" placeholder="Ảnh, mọi người hoặc nhóm" aria-label="Search" />
                            </form>
                            <ul className="navbar-nav view">
                                <li className="nav-item">
                                    <a className="nav-link icon-custom"><FontAwesomeIcon icon={faCloudUploadAlt} /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link icon-custom notif"><FontAwesomeIcon icon={faBell} /></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

        )
    }
}

class Content extends Component {
    // state = {
    //     photos: [],
    //     isHovering: false
    // }
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
    getSize(photo_id) {
        let images = this.state.images;
        this.state.photos.map((photo)=>{
            let url = api.baseUrl + '?method=flickr.photos.getSizes&api_key=' + api.api_key + '&photo_id=' + photo.id + '&format=json&nojsoncallback=1';
            Axios.get(url)
            .then(res => {
                if (res) {
                    let image = {};
                    const size_arr = res.data.size;
                    console.log(size_arr);
                    const length = size_arr.length;
                    image.src = res.data.size[length];
                    image.thumbnail = res.data.size[4];
                    image.thumbnailWidth = Number(res.data.size[4].width);
                    image.thumbnailHeight = Number(res.data.size[4].height);
                    images.push(image);
                }
            })
        })
        this.setState({
            images:images
        })
    }
    loadItems(page) {
        let self = this;
        let url = api.baseUrl + '?method=flickr.interestingness.getList&api_key=' + api.api_key + '&per_page=20&page=' + self.state.page_pos + '&format=json&nojsoncallback=1';
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
                        //images.push(this.getSize(image.id));

                        // let url_image_size = api.baseUrl + '?method=flickr.photos.getSizes&api_key=' + api.api_key + '&photo_id=' + image.id + '&format=json&nojsoncallback=1';
                        // Axios.get(url_image_size)
                        //     .then(res_size => {
                        //         if (res_size) {
                        //             const size_arr = res_size.data.size;
                        //             const length = size_arr.length;
                        //             image_size.src = res_size.data.size[length - 1];
                        //             image_size.thumbnail = res_size.data.size[4];
                        //             image_size.thumbnailWidth = Number(res_size.data.size[4].width);
                        //             image_size.thumbnailHeight = Number(res_size.data.size[4].height);

                        //             images.push(image_size);
                        //         }
                        //     })

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
    // componentDidMount() {
    //     Axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=4dd2479d98c250c84c6075528a3292ca&per_page=20&page=1&format=json&nojsoncallback=1`)
    //         .then(res => {
    //             const photos = res.data.photos.photo;
    //             this.setState({ photos });
    //         })

    // }
    // getOwnerName(ownerid) {
    //     Axios.get(`https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=4dd2479d98c250c84c6075528a3292ca&user_id=` + ownerid + `&format=json&nojsoncallback=1`)
    //         .then(res => {
    //             return res.data.person;
    //         })
    // }

    render() {
        // let photo_list = this.state.photos.map((photo)=>{
        //     return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
        // })
        var items = [];
        this.state.photos.map((photo, i) => {
            items.push(
                <div className="photo-view" key={i}>
                    <img className="image" src={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'} />
                    <div className="interaction-bar">
                        <div className="title">{photo.title}</div>
                    </div>
                </div>
            );
        })
        return (
            <div className="container">
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

        )
    }

}

// Content.propTypes = {
//     images: ProTypes.arrayOf(
//         ProTypes.shape({
//             src: PropTypes.string.isRequired,
//             thumbnail: PropTypes.string.isRequired,
//             srcset: PropTypes.array,
//             caption: PropTypes.string,
//             thumbnailWidth: PropTypes.number.isRequired,
//             thumbnailHeight: PropTypes.number.isRequired
//         })
//     ).isRequired
// }
// Content.defaultProps = {
//     images: shuffleArray()
// }
class Page extends Component {


    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }

}

export default Page;
//<img src={'https://farm' + {photo.farm} + '.staticflickr.com/' + {photo.server} + '/' + {photo.id} + '_' + {photo.secret} + '.jpg'} className="img-responsive" alt="" />