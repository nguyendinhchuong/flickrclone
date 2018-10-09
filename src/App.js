import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header/Header';
import TopMenu from './Header/TopMenu';
import Explorer from './Explore Component/ExploreComponent'
import SearchTag from './Tag Component/SearchTag';
import Photo from './PhotoComponent/PhotoComponent';
import PhotoTag from './Tag Photo/TagPhoto';




class Page extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <TopMenu />
                    <Switch>
                        <Route exact path="/" render={()=>(
                            <Redirect to="/explorer" component={Explorer}/>
                        )}/>
                        <Route exact path="/explorer" component={Explorer} />
                        <Route exact path="/tags" component={SearchTag} />
                        <Route exact path="/photos/:photo" component={Photo} />
                        <Route exact path="tags/:tagname" component={PhotoTag} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }

}

export default Page;