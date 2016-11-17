import ReactDOM from 'react-dom'
import React,{Component} from 'react'
import loginCSS from 'ASSET/css/login.css'
import Person from 'ASSET/Person';
//import client from './client'

var p = new Person('张三', 20);
document.write(p.say());
for(let i in loginCSS) {
	document.write(i);
}

ReactDOM.render(
	( < div className = {
			loginCSS.login
		} >
		<
		h1 > Hello, ss1! < /h1> <
		h1 > Hello, saass adds! < /h1>  <
		/div>
	),
	document.getElementById('demo2')
);

class LikeButton extends React.Component {
	constructor() {
		super();
		this.state = {
			liked: false
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({
			liked: !this.state.liked
		});
	}
	render() {
		const text = this.state.liked ? 'liked' : 'haven\'t liked';
		return( <
			div onClick = {
				this.handleClick
			} >
			You {
				text
			}
			this.Click to toggle. <
			/div>
		);
	}
}

ReactDOM.render( <
	LikeButton / > ,
	document.getElementById('demo3')
);

let data = {
	data1: 'oooop',
	data2 : 'xxxxxp'
}

var Avatar = React.createClass({
	render: function() {
		return( <
			div >
			<
			PagePic pagename = {
				this.props.pagename
			}
			/> <
			PageLink pagename = {
				this.props.pagename
			}
			/> <
			/div>
		);
	}
});

var PagePic = React.createClass({
	render: function() {
		return( <
			img src = {
				'https://graph.facebook.com/' + this.props.pagename + '/picture'
			}
			/>
		);
	}
});

var PageLink = React.createClass({
	render: function() {
		return( <
			a href = {
				'https://www.facebook.com/' + this.props.pagename
			} > {
				this.props.pagename
			} <
			/a>
		);
	}
});
const props2 = { //定义一个对象
  name:'cqs',
  age:'25'
}
class MyComponent extends Component{

    render(){
      return(
        <div>
          <h1>{ this.props.pagename.name }</h1>
          <h1>{ this.props.pagename.age }</h1>
        </div>
      )

    }
}
ReactDOM.render( <
	MyComponent pagename = {props2}
	/>,
	document.getElementById('demo4')
);

ReactDOM.render( <
	Avatar pagename ='dasdasd'
	/>,
	document.getElementById('demo5')
);