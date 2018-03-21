/**
  * @ref https://medium.com/learning-new-stuff/building-your-second-react-js-app-d53b0c98dc
*/
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class Results extends Component{
    render(){
        var resultItems = this.props.searchResults.map(function(result) {
            return <ResultItem key={result.trackId} trackName={result.trackName} artworkUrl100={result.artworkUrl100}/>
        });
        return resultItems;        
    }
};


class ResultItem extends Component{    
    render(){
        return (
            <ul className="lists">
                <li>
                {this.props.trackName}
                <img src={this.props.artworkUrl100} alt="altworkpic"/></li>
            </ul>
        );
    }
};

class SearchBox extends Component{
    createAjax(){
       // console.log("createAjax hit");
        var query    = ReactDOM.findDOMNode(this.refs.query).value;
        var category = ReactDOM.findDOMNode(this.refs.category).value;
        var URL      = 'https://itunes.apple.com/search?term=' + query +'&country=us&entity=' + category;
       // console.log(query);
        this.props.search(URL);
    }

    render() {           
        return (
            <div>
                <input type="text" ref="query" placeholder="Movie name or Apps name"/>
                <select ref="category">
                    <option>Choose Flims or Apps</option>
                    <option value="software">Apps</option>
                    <option value="movie">Films</option>
                </select>
                <input type="submit" onClick={this.createAjax.bind(this)} />
            </div>
        );
    }
};

class FilmsApp extends Component {   
    constructor(props){
        super(props);
        this.state = {
            searchResults : []
        }
    }

    // getInitialState() {
    //     return {
    //         searchResults: []
    //     }
    // }

    componentDidMount(){
        $("select").css('color','#888');
        $("select option").css({'background': '#888','color':'#fff'})
        $("select").on("change",function(){
            $(this).css({
                color: '#333'
            })
        })
    }

    showResults(response){
        this.setState({
            searchResults: response.results            
        });
    }
    search (URL){
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: URL,
            success: function(response){
                this.showResults(response);
                console.log(response)                 
            }.bind(this)
        });
    }       
    render() {
          return(
              <div className="flimsApp">
                <h4 className="maintitle">Accessing API with Ajax in React Learning</h4>
                <b>How To Run</b>
                <ul className="howtorun">                    
                    <li>Type the Film name(e.g Who we are) OR App Name (e.g whatsapps) in search box.</li>
                    <li>Choose Corresponding Category at select dropdown related to your search</li>
                    <li>Then click Submit.</li>
                </ul><br/><br/>
                  <SearchBox search={this.search.bind(this)} />
                  <Results searchResults={this.state.searchResults} />
              </div>
          )
    }
};

export default FilmsApp;