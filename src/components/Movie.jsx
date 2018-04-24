import React from 'react';
import '../styles/Normalize.css';
import ModalVideo from 'react-modal-video';

// {film.genres.map((genre) => {
//  return (<span>{genre.name}</span>)
//                         })}
// {console.log(typeof(film.genres.names))}
// expected output: "123"

class Movie extends React.Component {
    constructor (props) {
    super(props)
        this.state = {
        isOpen: false,
        lightboxIsOpen: false,
        width: window.innerWidth,
    };
        this.openModal = this.openModal.bind(this)
    }
    

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    openModal () {
        this.setState({isOpen: true})
    }

    render() { 
        // const { film } = this.props.film;
        const isMobile = this.state.width <= 710;
        let film = this.props.film;
        console.log(film)
        return ( 
            film.genres ?  // check if the props exist before rendering it ( the condition has to acces the object one lvl deep if I want to acces any lvl deep parameters ( for some reasons.. ))
            <div className="movie__wrap">
                <div className="movie">    
                   { isMobile ?   
                        <img 
                            alt={film.title} 
                            className="movie__img"
                            src=
                            {film.poster_path !== null || undefined ? "https://image.tmdb.org/t/p/w780" + film.backdrop_path : "http://www.rsoilfield.com/wp-content/uploads/image-unavailable.jpg"} 
                        />
                    :
                    <img 
                        alt={film.title} 
                        className="movie__img"
                        src=
                        {film.poster_path !== null || undefined ? "https://image.tmdb.org/t/p/w500" + film.poster_path : "http://www.rsoilfield.com/wp-content/uploads/image-unavailable.jpg"} 
                        />
                    }
                    <div className="info__wrap">
                        {<h2 className ="movie__title">{film.title}</h2>}

                        <div className="genre__average__wrapper">
                            {   
                                <div className="average__wrapper">
                                    <span >Movie score:</span>
                                    <span className="movie__average"> {film.vote_average}</span>
                                </div>
                            }
                            {film.genres ?
                                <ul className="movie__genres__wrapper">
                                    {film.genres.map(( genres ) => {
                                        return (
                                            <li className="movie__genres" key={genres.id}>{genres.name}</li>
                                        )})}
                                </ul>
                                : null
                        }
                        </div>

                        {<p className="movie__released">{film.status} on {film.release_date}</p>}
                        {film.overview !== null ? <p className="movie__overview">{film.overview}</p> : <p className="movie__overview">"No overview available."</p>}

                        {
                        this.props.film.videos.results.length !== 0 ?
                            <div>
                                <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.props.film.videos.results[0].key} onClose={() => this.setState({isOpen: false})} />
                                <div className="btn__trailer" onClick={this.openModal}>Watch trailer</div>
                            </div>
                            : null
                        }

                    </div>
                </div>
            </div> 
            : <div className="loading__movie">Loading ..</div> // fallback to div if !props
            // TODO Add loading animation
         )
    }
}

export default Movie