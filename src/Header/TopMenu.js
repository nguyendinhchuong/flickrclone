import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TopMenu.css';
class TopMenu extends Component {
    render() {
        return (
            <div className="top-menu">
                <div className="container">
                    <ul className="center-list">
                        <li><Link to="/explorer"><span>Khám phá</span></Link></li>
                        <li><Link to="/tags"><span>Xu hướng</span></Link></li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default TopMenu;