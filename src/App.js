import React from "react";
import UserPage from "./pages/user/user";
import NavBar from "./components/navbar/navbar";
import UsersPage from "./pages/users/users-page";
import Login from "./pages/login-page/login-page";
import NewsPage from "./pages/news-page/news-page";
import AddUserPage from "./pages/add-user/add-user";
import ProjectsPage from "./pages/projects/projects";
import EditUserPage from "./pages/edit-user/edit-user";
import DepartmentPage from "./pages/department/department";
import DepartmentsPage from "./pages/departments/departments";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AddDepartmentPage from "./pages/add-department/add-department";
// import NotFound from "./pages/404/404";
function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <div className="app-wrapper">
          {
            localStorage.getItem("neobisHUBDate") ? <NavBar /> : null
          }
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/news" exact component={NewsPage} />
            <Route path="/users" exact component={UsersPage} />
            <Route path="/user/:id" exact component={UserPage} />
            <Route path="/add-user" exact component={AddUserPage} />
            <Route path="/projects" exact component={ProjectsPage} />
            <Route path="/edit-user/:id" exact component={EditUserPage} />
            <Route path="/departments" exact component={DepartmentsPage} />
            <Route path="/department/:id" exact component={DepartmentPage} />
            <Route path="/add-department" exact component={AddDepartmentPage} />
            {/* <Route path="*" exact component={NotFound} /> */}
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
