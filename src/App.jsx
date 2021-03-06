import React from 'react';
import { Container } from 'reactstrap';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import FishTable from './components/FishTable';
import BugsTable from './components/BugsTable';
import FossilsTable from './components/FossilsTable';
import useLocalStorage from './hooks/useLocalStorage';
import RecipeList from './components/RecipeList';
import TurnipsPage from './components/TurnipsPage';

const App = () => {
  const [hemisphere, setHemisphere] = useLocalStorage('hemisphere', 'northern');

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Container fluid="md" style={{ marginTop: '15px' }}>
        <Switch>
          <Route path="/diy/:event">
            <RecipeList />
          </Route>
          <Route path="/bugs">
            <BugsTable hemisphere={hemisphere} setHemisphere={setHemisphere} />
          </Route>
          <Route path="/fossils">
            <FossilsTable />
          </Route>
          <Route path="/turnips">
            <TurnipsPage />
          </Route>
          <Route path="/">
            <FishTable hemisphere={hemisphere} setHemisphere={setHemisphere} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
