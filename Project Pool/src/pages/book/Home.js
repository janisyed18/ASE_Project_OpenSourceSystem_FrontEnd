import React, { useEffect, useState} from 'react';
import BookItem from '../../components/BookItem';
import { isLoggedIn } from '../../utils/authentication';
import LoginForm from '../user/LoginForm';
import Signup from '../user/Signup';
 
function Home(props) {

  const [showLogin, setShowLogin] = useState(true);

  const isLogin = isLoggedIn();




  useEffect(()=>{
     
  },[]);

  const toggleLogin =() => {
    setShowLogin((login) =>!login);
  }

  if(isLogin) {
    props.history.push("/projects");
  }

  return (
    <div className='dashboard'>

      <div className="dashboard-container">
        <div className='info-container'>
        <h1 className='project-title'>Project Pool</h1>
        <p className='description'>Get projects reviewed</p>
        </div>
        <div className='login-container'>
          {showLogin ? <LoginForm/> : <Signup onSuccessFulLogin={toggleLogin}/>}
          {showLogin ? <a onClick={toggleLogin}>New User? Click here to signup</a> : <a onClick={toggleLogin}>Existing user? Click here to Login</a>}
        </div>
      </div>

      {/* <svg class="wave-svg" width="100%" height="100%" id="svg" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="#002bdc88"></stop><stop offset="95%" stop-color="#32ded488"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,200 0,200 C 84.19138755980859,170.60287081339715 168.38277511961718,141.20574162679426 261,156 C 353.6172248803828,170.79425837320574 454.6602870813399,229.7799043062201 556,230 C 657.3397129186601,230.2200956937799 758.9760765550238,171.67464114832538 868,147 C 977.0239234449762,122.32535885167462 1093.4354066985647,131.52153110047848 1190,146 C 1286.5645933014353,160.47846889952152 1363.2822966507176,180.23923444976077 1440,200 C 1440,200 1440,600 1440,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="#002bdcff"></stop><stop offset="95%" stop-color="#32ded4ff"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,400 0,400 C 82.63157894736838,431.85645933014354 165.26315789473676,463.7129186602871 267,470 C 368.73684210526324,476.2870813397129 489.57894736842115,457.00478468899524 600,445 C 710.4210526315788,432.99521531100476 810.4210526315788,428.26794258373207 890,405 C 969.5789473684212,381.73205741626793 1028.7368421052631,339.92344497607655 1117,336 C 1205.2631578947369,332.07655502392345 1322.6315789473683,366.0382775119617 1440,400 C 1440,400 1440,600 1440,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg> */}
    </div>
  );
}

export default Home;
