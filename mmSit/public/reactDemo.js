/*var names = ['a','b','xxx'];

ReactDOM.render(
	<div> 
	{
		names.map(function(a){
			
			return <div>Hello, {a}!</div>
			
			})
	}
	</div>,
	document.getElementById("demo1")
);
var arr = [
        <h1> Hello </h1>,	
        <h2>React is awesome</h2>,  
       ];
ReactDOM.render(
		<div>{arr}
			{
				names.map(function(a){
					return <div>Hello, {a}!</div>
				})
			}
		</div>,
		document.getElementById("demo2")
	);
var MyComponent = React.createClass({
	  handleClick: function() {
	    this.refs.myTextInput.focus();
	  },
	  render: function() {
	    return (
	      <div>
	        <input type="text" ref="myTextInput" />
	        <input type="button" value="Focus the text input" onClick={this.handleClick} />
	      </div>
	    );
	  }
	});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('demo3')
);

var LikeButton = React.createClass({
  getInitialState: function() {
    return {index: false};
  },
  handleClick: function(event) {
    this.setState({index: !this.state.index});
  },
  render: function() {
    var text = this.state.index ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this.Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('demo4')
);

var MyTitle = React.createClass({
	  getDefaultProps : function () {
	    return {
	      title : 'demo5'
	    };
	  },

	  render: function() {
	     return <h1> {this.props.title} </h1>;
	   }
	});

	ReactDOM.render(
	  <MyTitle />,
	  document.getElementById('demo5')
	);*/
	


import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('demo1')
);