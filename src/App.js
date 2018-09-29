import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
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
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link icon-custom"><FontAwesomeIcon icon="cloud-upload-alt" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link icon-custom"><FontAwesomeIcon icon="bell" /></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

        )
    }
}

class Page extends Component {


    render() {
        return (
            <div>
                <Header />
            </div>
        )
    }

}

export default Page;
