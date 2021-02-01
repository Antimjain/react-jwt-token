import logo from './logo.svg';
import './App.css';
import './css/_global.scss';
import { store} from './store';
import { Provider } from 'react-redux';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;