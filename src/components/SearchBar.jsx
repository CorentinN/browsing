import React, { Component } from 'react';
import { Link } from'react-router-dom';
import axios from 'axios';
import '../styles/Normalize.css';
import '../styles/base/settings.scss';
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search:[],
            cursor:0,
            isHovered:false
        };
    }

    handleKeyDown(e){
        const { cursor } = this.state
        if (e.key === 'ArrowUp' && cursor > 0) {
            this.setState( prevState => ({
                cursor : prevState.cursor - 1
            }))
        } if (e.key === 'ArrowDown' && this.state.cursor < this.state.search.length -1 ) {
            this.setState( prevState => ({
                cursor : prevState.cursor + 1
            }))
        } else if (e.key === 'Enter'){
            if(e.target.value !== '' || this.state.search.length !== 0 ){
                // let activeEl = document.getElementsByClassName('active > a[href]')[0];
                let activeEl = document.querySelectorAll('.active a')[0];
                let activeid = activeEl.getAttribute('dataid')
                this.handleSubmitId(activeid,e);
            }
            // this.setState({
            //     redirect: true,
            // })
        }
    }


    handleSubmit(e){
        e.preventDefault();
    }
    
    handleSubmitId(id,e){
        e.preventDefault();
        this.props.handleSubmitId(id);
        document.getElementById('searchForm').value = '';
        this.setState({search:[]})//refresh the search state to make the search resulst disapear on click
        this.setState({cursor:0});//reset cursor to top after selection
    }
    handleGohome(){
        this.props.loadMore();
    }

    handleSearch(e){
        e.preventDefault();
        let search;
        if (e.target.value !== ""){
          search = e.target.value;
        };
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=e303177ca8412d17986e325b2b00a147&language=en-UK&query='+ search +'&page=1&include_adult=false')
        .then((response) => {
            let search = response.data.results;
            this.setState({search: search})
            this.setState({cursor: 0});
        }).catch((error)=>{
            console.log(error)
        })
    }
    hoverOn(){
        this.setState({isHovered: true})
    }
    hoverOff(){
        this.setState({isHovered: false})
    }
    
    // handleMouseOver(e){
    //     let elem = e.target
    //     // elem = String(elem);
    //     // let elemHovered = document.querySelector(`a[dataid= ${elem}]`);
    //     // console.log(elemHovered)
    //     // elem.toggle('active')
    //     elem.classList.toggle("active");
    // }
    onHoverCursor(index){
        this.setState({cursor: index})
    }

    
    render() { 
        const { cursor } = this.state;
        return ( 
            <div className="header">
                <div className="header__bar">
                    <div className="title-wrapper">
                        <Link to="/" href="/"
                        onClick={this.handleGohome.bind(this)}
                        >
                            <i className="fa fa-film"></i>
                            <h1 className="title-header">movieBrowser</h1>
                        </Link>
                    </div>
                    <form 
                    className="form-search" 
                    onSubmit={this.handleSubmit.bind(this)} 
                    onKeyDown={this.handleKeyDown.bind(this)}>
                        <i className="fa fa-search"></i>
                        <input 
                            className="search-bar"
                            id="searchForm"
                            autoComplete="off" 
                            placeholder="Search for any movie"
                            type="text"  
                            onChange={this.handleSearch.bind(this)}
                        />
                    </form>
                </div>

                {this.state.search.length !== 0 && 
                    <div className="searchWrapper">
                        <ul>
                            {this.state.search.map((results,index) => { 
                                return (
                                    <li  
                                        key={index-1}
                                        className={`${cursor === index ? 'search-film active' : 'search-film'}`}
                                        // className={ this.state.isHovered  ? 'search-film active' : 'search-film'}
                                        // onMouseEnter={this.hoverOn.bind(this)} 
                                        // onMouseLeave={this.hoverOff.bind(this)}
                                        // onMouseOver={this.handleMouseOver.bind(this)}
                                        onMouseEnter={this.onHoverCursor.bind(this, index)}
                                    >
                                        <a
                                            key={index -1}
                                            href={results.title}
                                            dataid={results.id}
                                            onClick={this.handleSubmitId.bind(this, results.id)}
                                            >
                                            {results.title}
                                        </a>
                                    </li> 
                                )})}
                        </ul>
                    </div>
                }
                
            </div>

         )
    }
}
 
export default SearchBar;