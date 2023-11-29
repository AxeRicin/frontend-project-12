import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import App from './Components/App';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(<App />);
};

app();
