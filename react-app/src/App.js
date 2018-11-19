import React, { Component } from 'react';
import logo from './logo.svg';
import Props from './pages/props'
import AddColor from './pages/addColor'
import StarRating from './pages/starRating'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }
class Img extends Component {
    render () {
        return (
            <img src={logo}/>
        )
    }
}
let data = {
    ingredients: '23',
    steps: 2,
    title: '哈喽'
}
const App = () =>
    <div className='app'>
        {/*<Props {...data}/>*/}
        <AddColor/>
        <StarRating totalStars={5}/>
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<Img/>*/}
          {/*<p>*/}
            {/*Edit <code>src/App.js</code> and save to reload.*/}
          {/*</p>*/}
          {/*<a*/}
            {/*className="App-link"*/}
            {/*href="https://reactjs.org"*/}
            {/*target="_blank"*/}
            {/*rel="noopener noreferrer"*/}
          {/*>*/}
            {/*Learn React*/}
          {/*</a>*/}
        </header>
    </div>

export default App;
