import React, { Component } from 'react';
import tmdblogo from '../tmdb-logo.svg';

class Footer extends Component {
    render() { 
        return ( 
            <div>
                <img className ="tmdb-logo" src={tmdblogo} alt ="Logo of 'The movie Database'."/>
            </div>
         )
    }
}
 
export default Footer;