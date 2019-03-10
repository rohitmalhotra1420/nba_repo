import React, { Component } from "react";
import { getTeamsList } from "./api";
class TeamsTab extends Component {
  state = {
    teams: [],
    error: false,
    loading: false
  };
  componentDidMount() {
    this.getTeams();
  }
  getTeams = async () => {
    this.setState({ loading: true });
    return getTeamsList()
      .then(response => {
        console.log(response);
        if (response && response.data.length > 0) {
          this.setState({ loading: false, teams: response.data });
        } else {
          this.setState({ error: true, loading: false });
        }
      })
      .catch(error => {
        this.setState({ error: true, loading: false });
        alert(error.message);
      });
  };
  render() {
    const { loading, error, teams } = this.state;
    if (loading) {
      return <div className="centered-text">Loading...</div>;
    }
    if (error) {
      return <div className="centered-text">Error Loading Data</div>;
    }
    return (
      <div className="tab-component-view box-shadow">
        <div className="grid-container">
          {teams &&
            teams.map((team, index) => {
              return (
                <div
                  className="grid-item-teams"
                  key={index}
                  // onClick={() => this.showModal(holiday)}
                >
                  <h1 className="name">{team.name}</h1>
                  <p className="info">{team.division}</p>
                  <div className="tooltiptext">
                    <div style={{ textAlign: "left", marginLeft: "10px" }}>
                      <p>
                        {team.full_name} {"("}
                        {team.abbreviation}
                        {")"}
                      </p>
                      <p>City: {team.city}</p>
                      <p>Conference: {team.conference}</p>
                      <p>Division: {team.division}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default TeamsTab;
