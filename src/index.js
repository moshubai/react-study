import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { Provider } from 'react-redux';
import { Provider } from './react-redux/react-redux';
import 'antd/dist/antd.css';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root")
);
// react-redux 是一个react与redux的绑定库，背后原理就是Context