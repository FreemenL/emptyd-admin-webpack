import React,{ Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route ,Switch ,Redirect} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { hot } from "react-hot-loader";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Test from './test';
import store,{ history } from './store';


// class Login extends Component{
// 	constructor(props){
// 		super(props)
// 	}
// 	render(){
// 		return(
// 			<div>a23dmin</div>
// 		)
// 	}
// }


const App = {
	run:function(Component){
	   render(
	    <Provider store={store}>
				<ConnectedRouter history={history}> 
					<LocaleProvider locale={zh_CN}>
			  		<Component/>
					</LocaleProvider>
		  	</ConnectedRouter>
		  </Provider>, 
		document.getElementById('root') as HTMLElement
	  )
	}
}

App.run(Test)

