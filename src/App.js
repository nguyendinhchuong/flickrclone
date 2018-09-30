import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
library.add(faStroopwafel)
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
    state = {
        photos: [],
        isHovering: false
    }
    componentDidMount() {
        Axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=4dd2479d98c250c84c6075528a3292ca&per_page=20&page=1&format=json&nojsoncallback=1&auth_token=72157673983239418-41eb6db34763c6c4&api_sig=15f2914e1620a9d0d4f26cfaa936ffb1`)
            .then(res => {
                const photos = res.data.photos.photo;
                this.setState({ photos });
            })

    }
    getOwnerName(ownerid) {
        Axios.get(`https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=4dd2479d98c250c84c6075528a3292ca&user_id=` + ownerid + `&format=json&nojsoncallback=1`)
            .then(res => {
                return res.data.person;
            })
    }
    render() {
        // let photo_list = this.state.photos.map((photo)=>{
        //     return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
        // })
        return (
            <div className="container">
                <InfiniteScroll
                    pageStart={0}
                    hasMore={true}
                    element="div"
                    initialLoad={true}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                    loadMore={
                        this.componentDidMount()
                    }
                >
                    <div className="photo-list-view">
                        {this.state.photos.map(photo =>
                            <div className="">
                                <img src={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'} className="img-responsive" alt="" />
                                <div className="interation-bar">
                                    <div class="text">
                                        <a>{photo.title} </a>
                                        <a>by {this.getOwnerName(photo.owner)}</a>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </InfiniteScroll>
            </div>

        )
    }
}

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