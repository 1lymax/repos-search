import React from 'react';
import {Provider} from "react-redux";

import App from "./components/App";
import ReactDOM from 'react-dom/client';
import {store} from "./reducers/reposReducer";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
