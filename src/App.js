import React, { useReducer, useContext, useState, useEffect } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
 Button, Modal, ModalHeader, ModalBody, ModalFooter,
Col, Row, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, Jumbotron   } from 'reactstrap';

import './App.css';
const Context = React.createContext(null);
const Header = () => {
  return(
    <div>
    <header>
      <div id="header-links">
        <a class="current" id="header-link"><img src="/img/home.png" /><span class="text">Home</span></a>
        <a id="header-link"><img src="/img/weight-2.png" />Dashboard</a>
        <a id="header-link"><img src="/img/selected-file.png" />Add Character</a>
      </div>
      <div style={{"clear":"right"}}></div>
    </header>
   </div>
   );
}
const appReducer = (state, action)  => {
    switch(action.type){
      case 'add':
        return [...state, {
          'id': new Date(),
          'name': action.name,
          'age': action.age,
          'picture': action.picture,
          'occupation': action.occupation,
          'firstappearance': action.firstappearance,
          'lastappearance': action.lastappearance,
          'description': action.description,
          'gender': action.gender
        }];
      case 'reset':
          return action.payload;
      default:
        return state;
    }
}
const AddForm = () => {
  const [modalState, setModal] = useState(false);
  const [formState, setForm] = useState([
    { 'name': '',
    'picture': '',
    'age': '',
    'firstappearance': '',
    'lastappearance': '',
    'description': '',
    'gender' : 'Male',
    'occupation': ''}
  ]);
  const dispatch = useContext(Context);
  const toggle = () => {
    return setModal(!modalState);
  }
  const submitForm = (e) => {
    e.preventDefault();
  }
  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm(formState => {
      return {...formState, [name]: value}
    });
  }
  return (
    <div>
  <Button color="danger" onClick={toggle}>Add Character</Button>
  <Modal isOpen={modalState} toggle={toggle}>
    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
    <ModalBody>
      <form onSubmit={submitForm}>
      <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Name</Label>
                  <Input type="email" name="name" onChange={handleInputChange} value={formState.name}  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Picture</Label>
                  <Input type="text" name="picture"  onChange={handleInputChange} value={formState.picture} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleAddress">Age</Label>
              <Input type="text" name="age" id="exampleAddress"  onChange={handleInputChange}  value={formState.age}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleAddress2">Occupation</Label>
              <Input type="text" name="occupation" id="exampleAddress2" onChange={handleInputChange} value={formState.occupation} />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">First Appearance</Label>
                  <Input type="text" name="firstappearance" id="exampleCity" onChange={handleInputChange} value={formState.firstappearance}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">Last Appearance</Label>
                  <Input type="text" name="lastappearance" id="exampleState" onChange={handleInputChange} value={formState.lastappearance}/>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleZip">Gender</Label>
                  <select onChange={handleInputChange} value={formState.gender} name="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleZip">Description</Label>
                <textarea onChange={handleInputChange} value={formState.description} name="description">

                </textarea>
                </FormGroup>
            </Col>
            </Row>
            <FormGroup check>
              <Input type="checkbox" name="check" id="exampleCheck"/>
              <Label for="exampleCheck" check>Check me out</Label>
            </FormGroup>
            <Button>Sign in</Button>
      </form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={() => dispatch({type: 'add',name: formState.name, description: formState.description, age: formState.age,picture: formState.picture,occupation: formState.occupation,firstappearance: formState.firstappearance,lastappearance: formState.lastappearance,gender: formState.gender})}>Do Something</Button>{' '}
      <Button color="secondary" onClick={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>
  )
}
const CharacterList = ({characters}) => {
  const dispatch = useContext(Context)
  return(
    <div className="characters">
    {characters.map((character) =>
      <CharacterMain character={character} />
    )}
    </div>
  )
}
// <Link to= {`/character/${character.id}`} ><ListGroupItem  tag="a"  action><img style={{height: "48px", borderRadius: "500px"}} src={character.picture} />{character.name}</ListGroupItem></Link>
const CharacterMain = ({character}) => {
  const dispatch = useContext(Context);
  return(
    <div className="character-block">
      <img src={character.picture} />
      <h2><a href={`/character/${character.id}`}>{character.name}</a></h2>
      <span>{character.age} years</span>
      <p>{character.occupation}</p>
    </div>
  )
}

const App = () => {
  const [characters, dispatch] = useReducer(appReducer,  []);

  useEffect(() => {
    const raw = localStorage.getItem('data');
    dispatch({type: 'reset', payload: JSON.parse(raw)})
  }, [])
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(characters));
    // console.log(JSON.stringify(characters));
  }, [characters]);
  return (

      <Context.Provider value={dispatch}>
        <Router>
        <>
          <Header />
          <Route exact path="/" render={() => <CharacterList characters={characters} />} />
          <PropsRoute path="/character/:id" component ={Character} characters={characters} />
        </>
        </Router>
      </Context.Provider>

  )

}

const Character = ({match, characters}) => {
  console.log(characters);
  return (
    <div>
      <h3></h3>
      <div id="character" style={{marginLeft:'50px', marginRight:'50px'}}>
        <div className="character-info">
            <div id="picture"></div>
            <div id="name"></div>
            <div id="age"></div>
            <div id="first-appearance"></div>
            <div id="last-appearance"></div>
            <div id="occupation"></div>

        </div>
        <div className="character-description">
          <div id="description">

          </div>
        </div>
      </div>
      { characters.map(character => {
        console.log(character.id, match.params.id);
         if (character.id === match.params.id){
           document.getElementById("picture").innerHTML = "<img src="+character.picture+">";
           document.getElementById("age").innerHTML = "<p>Age: "+character.age+"</p>";
           document.getElementById("first-appearance").innerHTML = "<p>First Appearance: "+character.firstappearance+"</p>";
           document.getElementById("last-appearance").innerHTML = "<p>Last Appearance: "+character.lastappearance+"</p>";
           document.getElementById("occupation").innerHTML = "<p>Occupation: "+character.occupation+"</p>";
           document.getElementById("name").innerHTML = "<h2>"+character.name+"</h2>";
           document.getElementById("description").innerHTML = "<p>"+character.description+"</p>";
         }
       }) }

    </div>
  );
}
// const Character = ({ match }) => {
//   const dispatch = useContext(Context);
//   console.log(match.params.id);
//   const char = match.params.characters.map(((character) => {
//     if(character.id === match.params.id){
//       console.log("test")
//     }
//   }));
//   return 'test';
//
// }
export default App;
