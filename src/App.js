import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import YAML from 'yamljs';
import ReactLoading from 'react-loading';

import Profile from './components/profile';
import MyCarousel from './components/MyCarousel';
import Home from './Home';

function ClubTile({ data }) {

  let clubsComps = [];
  const clubs = data.clubs;

  // Clubs has data in the form of dictionary with key as their name and the inner details inside it 

  for (var key in clubs) {

    clubsComps.push(
      <div key={key} className="col-sm-4">
        <div className="club">
          <h3 className="club-heading">{key}</h3>
          <div className="club-img-holder">
            <img className="logo" src={clubs[key].Logo} alt={key + `-logo`} />
          </div>
          <div className="club-about">
            {clubs[key].About}
          </div>
          <Link className="club-link" to={"/" + key}>More Details</Link>
        </div>
      </div>
    )
  }

  return (
    <section>
      <h1 className="text-center">{data.type}</h1>
      <div className="row inner-clubs">
        {clubsComps}
      </div>
    </section>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: 'Priyam',
      clubsData: [],
      loading: true,
    }
  }

  YAMLtoJSON(yamlStr) {
    var obj = YAML.parse(yamlStr);
    var jsonStr = JSON.stringify(obj);
    return jsonStr;
  }

  componentDidMount() {
    fetch('clubs/clubs.yaml')
      // .then(data => data.json())
      .then(res => {
        res.text().then(data => {

          var jsonData = this.YAMLtoJSON(data);
          jsonData = JSON.parse(jsonData);

          let clubsList = [];
          for (var key in jsonData) {
            clubsList.push(
              {
                type: key,
                clubs: jsonData[key],
              }
            )
          }

          this.setState({
            loading: false,
            clubsData: clubsList
          })
        });
      })
  }

  render() {

    let comps = [];
    let extraRoutes = [];
    const clubsData = this.state.clubsData;

    if (this.state.loading) {
      comps = (
        <div key={0}>
          <ReactLoading type={"spinningBubbles"} />
        </div>
      )
    } else {
      // Now the data has been updated, so start creating the comps using the list
      clubsData.forEach((data, index) => {
        comps.push(<ClubTile key={index} data={data} />);

        for (var key in data.clubs) {
          extraRoutes.push(
            <Route key={0} path={"/" + key} >
              Hello {key}
            </Route>
          );
        }
      });
    }

    return (
      <div id="main">
        <HashRouter>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/carousel">
              <MyCarousel />
            </Route>
            {extraRoutes}
            <Route path="/">
              {comps}
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
