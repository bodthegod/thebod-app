import React from "react";
import { Route, Switch } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import "./api/axiosDefaults";

import styles from "../src/App.module.css";

import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import LogInForm from "./pages/auth/LogInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import GeneralPostsPage from "./pages/posts/GeneralPostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import PageNotFound from "./components/PageNotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={`${styles.App} psychic`}>
      <NavBar />
      <Container className={styles.Main}>
        {!currentUser ? (
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/login" render={() => <LogInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route render={() => <HomePage />} />
          </Switch>
        ) : (
          <Switch>
            {/* General posts home route */}
            <Route
              exact
              path="/"
              render={() => (
                <GeneralPostsPage message="No results found, try another keyword or tag?" />
              )}
            />
            {/* Feed route */}
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
            {/* Liked posts route */}
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

            <Route
              exact
              path="/posts/create"
              render={() => <PostCreateForm />}
            />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route
              exact
              path="/posts/:id/edit"
              render={() => <PostEditForm />}
            />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route
              exact
              path="/profiles/:id/edit/password"
              render={() => <UserPasswordForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit"
              render={() => <ProfileEditForm />}
            />
            <Route render={() => <PageNotFound />} />
          </Switch>
        )}
      </Container>
    </div>
  );
}

export default App;
