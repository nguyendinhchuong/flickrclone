import React, { Component } from 'react';

const Photo = ({match})=>{
    console.log('ok');
    return(
        <div>
            <h1>{match.params.photo}</h1>
        </div>
    )
}

export default Photo;