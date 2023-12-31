import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"

import { AuthProvider } from './context/AuthContext'
import Nav from './components/Nav'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import NotFound from './components/NotFound'

// Blog

import BlogList from './components/Blog/BlogList'
import BlogDetail from './components/Blog/BlogDetail'
import BlogCategory from './components/Blog/BlogCategory'
import CategoryList from './components/Blog/CategoryList'
import BlogTag from './components/Blog/BlogTag'

// Accounts
import SignIn from './components/Accounts/SignIn'
import SignUp from './components/Accounts/SignUp'
// import Dashboard from './components/Accounts/Dashboard'
import AuthorSignUp from './components/Accounts/AuthorSignUp'
import Dashboard from './components/Dashboard/Dashboard'
import AuthorBlogs from './components/Dashboard/AuthorBlogs'
import AuthorCreateBlogs from './components/Dashboard/AuthorCreateBlogs'
import AuthorEditBlogs from './components/Dashboard/AuthorEditBlogs'


function App() {
  return (
    <Router>
      <AuthProvider>
        < Nav/>
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={AuthorBlogs} path="/dashboard/author/blog" exact />
          <PrivateRoute component={AuthorCreateBlogs} path="/dashboard/author/blog/create" exact />
          <PrivateRoute component={AuthorEditBlogs} path="/dashboard/author/edit-blog/:postId" exact />
          {/* <Route path="/edit-blog/:postId" component={EditBlog} /> */}


          <Route component={SignIn} path="/login" />
          <Route component={SignUp} path="/register" exact />
          <Route component={AuthorSignUp} path="/author/register" exact />


          <Route component={BlogList} path="/bloglist" exact />
          <Route component={CategoryList } path="/categories"  exact />
          <Route component={BlogTag } path="/blogs/:tag"  exact />

          <PrivateRoute component={BlogDetail}    path="/blog/:product_slug/:product_id" exact />
					<Route component={BlogCategory}  path="/category/:category_slug/:category_id"  exact />

          <Route component={Home} path="/" exact />
          <Route component={About} path="/about" exact />
          <Route component={Contact} path="/contact" exact />
          <Route path="*" component={NotFound } />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
