import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { TopicsContextProvider } from './context/TopicsContext';
import { PostsContextProvider } from './context/PostsContext';
import { UsersContextProvider } from './context/UsersContext';
import { ChatContextProvider } from './context/ChatContext';
import { NotifiesContextProvider } from './context/NotifiesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<NotifiesContextProvider>
				<ChatContextProvider>
					<UsersContextProvider>
						<TopicsContextProvider>
							<PostsContextProvider>
								<BrowserRouter>
									<App />
								</BrowserRouter>
							</PostsContextProvider>
						</TopicsContextProvider>
					</UsersContextProvider>
				</ChatContextProvider>
			</NotifiesContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
