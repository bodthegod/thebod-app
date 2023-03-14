import styles from "../src/App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LogInForm from "./pages/auth/LogInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import GeneralPostsPage from "./pages/posts/GeneralPostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={`${styles.App} psychic`}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <GeneralPostsPage message="No results found, try another keyword?" />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <GeneralPostsPage
                message="No results found, try another keyword or follow a blogger."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <GeneralPostsPage
                message="No results found, try another keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/login" render={() => <LogInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
