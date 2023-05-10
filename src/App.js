import { BrowserRouter as Router} from "react-router-dom";
import Pages from "./router/Pages";


function App() {
  return (
    <div className="App">
      <Router>
        <Pages />
      </Router>
    </div>
  );
}

export default App;
