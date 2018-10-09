import React, { Component } from 'react';
import Axios from 'axios';
import api from '../api';
import './TagPhoto.css';



const TagPhoto = ({ match }) => {
    // console.log("ok");
    // let url = api.baseUrl + '?method=flickr.tags.getClusterPhotos&api_key=' + api.api_key + '&tag=' + match.params.tagname + '&cluster_id=&format=json&nojsoncallback=1';
    // Axios.get(url)
    //     .then(res => {
    //         if (res) {
    //             console.log(res.data.photos);
    //             res.data.photos.map((photo,i)=>{
    //                 return (
    //                     <div className="photo-view" key={i}>
    //                         <img className="image" src={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'} />
    //                         <div className="interaction-bar">
    //                             <div className="title">{photo.title}</div>
    //                         </div>
    //                     </div>
    //                 )
    //             })
    //         }
    //     })
    
    return(
        <div>
            <h3>{match.params.tagname}</h3>
        </div>
    )
}


export default TagPhoto;