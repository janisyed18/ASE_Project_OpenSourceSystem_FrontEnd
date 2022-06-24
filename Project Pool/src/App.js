import logo from './logo.svg';
import './App.css';
import {Container} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import Header from './components/Header'
import SaveForm from './pages/user/SaveForm';
import Home from './pages/book/Home';
import LoginForm from './pages/user/LoginForm';
import JoinForm from './pages/user/JoinForm';
import UpdateForm from './pages/user/UpdateForm';
import Detail from './pages/book/Detail';
import Signup from './pages/user/Signup';
import CreateProject from './pages/project/CreateProject';
import Projects from './pages/project/Projects';
import ViewProject from './pages/project/ViewProject';

function App() {
  return (
    <div>
      <Header/>
      <div>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/save" exact={true} component={SaveForm}/>
        <Route path="/book/:id" exact={true} component={Detail}/>
        <Route path="/signup" exact={true} component={Signup}/>
        <Route path="/project/create" exact={true} component={CreateProject}/>
        <Route path="/projects" exact={true} component={Projects}/>
        <Route path="/login" exact={true} component={LoginForm}/>
        <Route path="/join" exact={true} component={JoinForm}/>
        <Route path="/project/view/:id" exact={true} component={ViewProject}/>
        <Route path="/project/edit/:id" exact={true} component={CreateProject}/>


        <Route path="/update/:id" exact={true} component={UpdateForm}/>
      </div>    
    </div>
  );
}

export default App;
