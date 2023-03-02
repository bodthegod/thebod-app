import styles from "../src/App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LogInForm from "./pages/auth/LogInForm";
function App() {
  return (
    <div className={`${styles.App} psychic`}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/login" render={() => <LogInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
