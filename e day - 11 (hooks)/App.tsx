import './App.css'
import './result.css'
import Counter from './components/Reducer';
import ProfileForm from './components/ProfileFormState';
import ProductList from './components/ProductSearch';
import Context from './components/Context';
import ItemList from './components/ItemList'
function App() {

  return (
    <div id="container">
    <Counter/><br /><hr /><br />
    <ProfileForm/><br /><hr /><br />
    <ProductList/>
    <Context/>
    <ItemList/>

    </div>
  )
}

export default App;
