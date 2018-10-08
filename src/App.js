import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header/Header';
import TopMenu from './Header/TopMenu';
import Explorer from './Explore Component/ExploreComponent'
import SearchTag from './Tag Component/SearchTag';
import Photo from './PhotoComponent/PhotoComponent';

// class Content extends Component {
//     getSize(photo_id) {
//         let images = this.state.images;
//         this.state.photos.map((photo)=>{
//             let url = api.baseUrl + '?method=flickr.photos.getSizes&api_key=' + api.api_key + '&photo_id=' + photo.id + '&format=json&nojsoncallback=1';
//             Axios.get(url)
//             .then(res => {
//                 if (res) {
//                     let image = {};
//                     const size_arr = res.data.size;
//                     console.log(size_arr);
//                     const length = size_arr.length;
//                     image.src = res.data.size[length];
//                     image.thumbnail = res.data.size[4];
//                     image.thumbnailWidth = Number(res.data.size[4].width);
//                     image.thumbnailHeight = Number(res.data.size[4].height);
//                     images.push(image);
//                 }
//             })
//         })
//         this.setState({
//             images:images
//         })
//     }
// }


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
                        <Route path="/explorer" component={Explorer} />
                        <Route path="/tags" component={SearchTag} />
                        <Route path="/photos" component={Photo} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }

}

export default Page;