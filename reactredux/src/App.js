import logo from './logo.svg';
import './App.css';
import PizzaBox from './components/PizzaBox';
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <PizzaBox />
    </Provider>
  );
}

export default App;
