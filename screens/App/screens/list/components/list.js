import React from 'react';
import ReactPaginate from 'react-paginate';
import SearchInput from 'react-search-input';
var app  = require("../../../../../config/app-config.js");

var AddList = React.createClass({
    getInitialState : function(){
        return {
            data : {Message:[]},
            userData : '',
            email : '',
            page : {Message:[]},
            pageNum: 0,
            limit : 5,
            searchTerm :"",
            isSearch : false
        };
    },
    getAllUsers : function(){
        var self = this;
        $.ajax({
          url : app.protocol +'://'+ app.server + ':' + app.port + '/taclassified/fetchAdds', 
          dataType: 'json',
          cache: false,
          async: false,
          contentType: "application/json", 
          success: function(data) {
            this.setState({data:data,page:data});
          }.bind(this),
          error : function() {
          }.bind(this)
        });
         
    },
    // limiting the list intially to 5 
    paginate: function(){
        var content={Message:[]};
        var count=this.state.limit;
        if(this.state.data.Message.length<this.state.limit)
            count=this.state.data.Message.length;
        for(var i=0;i<count;i++) {
            content.Message.push(this.state.data.Message[i]);
        }
        //total number of pages 
        var num=Math.ceil(this.state.data.Message.length/this.state.limit);
        this.setState({page:content,pageNum:num});
    },
    // handling the list on page change
    handlePageClick: function(data){
        var content = {Message:[]};
        var prev = this.state.limit * data.selected;
        var next = this.state.limit * (data.selected+1);

        // if next value is greater than total number of items
        if(next>this.state.data.Message.length-1)
           next = this.state.data.Message.length;

       // making a list of items for one page
        for(var x=prev ; x<next ; x++) {
            content.Message.push(this.state.data.Message[x]);
        }

        // setting the state to a list of items for one page
        this.setState({page:content});
    },   
    componentDidMount : function() {
      var minHeight = $(window).height()-$('#header').outerHeight()-$('#footer').outerHeight()-parseInt($('.app > div').css('margin-top'))-parseInt($('.app > div').css('margin-bottom'));
      $('.app > div').css('min-height',minHeight);
      this.paginate();
      
    },
    componentWillMount : function(){      
        this.getAllUsers();
        var email = localStorage.getItem('email');
        if(email){
            this.state.email = email;
        }

    },
    sortData :function(event) {
        var data=this.state.page;
        var key=event.target.value;
        if(key.split("-")[1]=="desc"){
          this.sortDataDsc(data,key.split("-")[0]);
        }
        else {
          this.sortDataAsc(data,key);
        }
    },
    sortDataAsc: function(data,key) {
        
        data.Message.sort(function(a, b) {
        if (a[key] < b[key]) {
          return -1;
        }

        if (a[key] > b[key]) {
          return 1;
        }

        return 0;

      });
      this.setState({page:data});

    },
    sortDataDsc: function(data,key) {      
        data.Message.sort(function(a, b) {
        if (a[key] < b[key]) {
          return 1;
        }

        if (a[key] > b[key]) {
          return -1;
        }

        return 0;

      });
      this.setState({page:data});

    },
        
    searchUpdated : function(term) {
      this.setState({searchTerm: term});
      if (term=="") {
        this.paginate();
      }
    },
    render : function(){   
    if (this.refs.Search && this.state.searchTerm!="") {
      var filters = ['name', 'description'];
      this.state.page.Message = this.state.data.Message.filter(this.refs.Search.filter(filters));
    }
        return (
            <div className="components-list-container">
              <h1>List of Posted Ads</h1>
              <SearchInput className="search-list" ref='Search' onChange={this.searchUpdated} />
                <div className="sort-by" >
                  <select onChange={this.sortData}>
                    <option>Sort By</option>
                    <option value="name">Name(asc)</option>
                    <option value="name-desc">Name(desc)</option>
                    <option value="Date">Date</option>
                    <option value="Amount">Amount</option>
                  </select>
                </div>
                <ul className="components-list-heading">
                    <li>
                      <div>Classified Title</div>
                      <div>Description</div> 
                      <div>Amount</div>

                    </li>
                    {this.state.page.Message.map(function(item, index) {
                      return (
                        <li>
                            <div><p><a href={window.location.pathname +'#/'+ item.classifiedID }>{item.name}</a></p>
                                 <p>By : {item.email}</p>
                                 <p>On : XX-XX-XXXX</p>
                            </div>
                            <div>
                                <ul className="component-desc-list">
                                    <li>{item.description}</li>
                                </ul>     
                            </div>
                            <div>{item.price}</div>
                        </li>
                      );
                    }, this)} 

                </ul>
                <ReactPaginate previousLabel={"prev"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
            </div>              
        );
    }
});

export default AddList;
