import React, { Component } from 'react';
import './App.css';
import FirstComponent from './components/learning-examples/FirstComponent.jsx'
import SecondComponent from './components/learning-examples/SecondComponent.jsx'
import ThirdComponent from './components/learning-examples/ThirdComponent.jsx'
import Counter from './components/counter/Counter.jsx'
import TodoApp from './components/todo/TodoApp';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter />*/}
        <TodoApp />
      </div>
      
    );
  }
}



class LearningComponents extends Component{
  render() {
    return (
      <div className="LearningComponents">
        My Hello World
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </div>
    );
  }
}

// class FirstComponent extends Component {
//   render() {
//     return (
//       <div className="firstComponent">
//         First Component
//         <SecondComponent />
//       </div>
//     );
//   }
// }

// class SecondComponent extends Component {
//   render() {
//     return (
//       <div className="secondComponent">
//         Second Component
//       </div>
//     );
//   }
// }

// function ThirdComponent(){
//   return (
//     <div className="thirdComponent">
//       Third Component
//     </div> 
//   )
// }

//class ThirdComponent extends Component {
//  render() {
//    return (
//      <div className="thirdComponent">
//        Third Component
//      </div>
//    );
//  }
//}
export default App;
