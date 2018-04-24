import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import './styles/Normalize.css';
import './styles/App.css';

//components

import SearchBar from './components/SearchBar';
import Main from './components/Main';
import Movie from './components/Movie';
import Footer from'./components/Footer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            film:[],
            title: [],
            error: 'error',
            page:2,
            redirect:false,
            key:undefined
        };
    }

    componentDidMount(){
        console.log('I did mount');
        // check the url if we are looking for a specific film
        console.log(this.state.film !== []);
        let str = document.location.pathname;
        let rest = str.substring(0, str.lastIndexOf("/") + 1);
        let last = str.substring(str.lastIndexOf("/") + 1, str.length);
        if(rest === "/film/"){
            this.getMovie(parseInt(last,10));
        } else {
            this.getMoviePage();
        }
    }

    getMoviePage(){
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b265a169ff1b9a5a938891de07d65b29&language=en-US&page='+ this.state.page)
            .then( response => {
                let title = response.data.results;
                this.setState({
                   title: [...this.state.title, ...title],
                   page : this.state.page + 1
                });
            }).catch((error) =>{
                this.setState({error:error})
            })
    }

    // triggered on pushed of ' Load more ' button
    loadMore(){
        this.getMoviePage();
    }


    getMovie(id){
        console.log(!this.state.film === []);
        axios.get('https://api.themoviedb.org/3/movie/'+ id +'?api_key=b265a169ff1b9a5a938891de07d65b29&language=en-US&append_to_response=videos,images&include_image_language=en,null')
        .then( response => {
            this.movie = response.data;
            console.log('+img',this.movie)
            this.setState({film:response.data})
            // Tried to make it work with < Redirect /> but didn't manage to yet
            //*TO REFACTOR*
            let str = document.location.pathname;
            let rest = str.substring(0, str.lastIndexOf("/") + 1);
            if(rest !==  "/film/"){
                window.location = '/film/' + response.data.id;
            }else{
                window.history.pushState("", "", "/film/"+id)
            }
        }).catch((error) =>{
            this.setState({error:error})
        })
    }

    handleSubmitId(id){
        // this.props.history.push('/movie'); 
        console.log('history',this.props.match)
        console.log('aye')
        console.log('document.location.pathname',document.location.pathname)
        this.getMovie(id);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <SearchBar 
                        handleSubmitId={this.handleSubmitId.bind(this)}
                        loadMore={this.loadMore.bind(this)}
                    />
                    <Switch>
                        <Route  exact path="/">
                            <Main 
                            title={this.state.title}
                            // page={this.state.page}
                            handleSubmitId={this.handleSubmitId.bind(this)}
                            loadMore={this.loadMore.bind(this)}
                            />
                        </Route>
                        <Route exact path="/:id>">
                            <Main title={this.state.title}/>
                        </Route>
                        <Route exact path="/film/:id">
                            <Movie film={this.state.film}/>
                        </Route>
                    </Switch>    
                {/*<Footer />*/}
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
