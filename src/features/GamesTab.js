import React, { Component } from "react";
import { getFancyDate } from "../utils/utils";
import { getGamesList } from "./api";
import Modal from "./Modal";

class GamesTab extends Component {
  state = {
    showModal: false,
    gamesData: null,
    loading: false,
    error: false,
    currentPage: null,
    games: []
  };
  componentDidMount() {
    this.getGames();
  }
  getGames = async currentPage => {
    this.setState({ loading: true });
    return getGamesList(currentPage)
      .then(response => {
        console.log(response);
        if (response && response.data.length > 0) {
          this.setState({
            loading: false,
            games: response.data,
            currentPage: response.meta.current_page
          });
        } else {
          this.setState({ error: true, loading: false });
        }
      })
      .catch(error => {
        this.setState({ error: true, loading: false });
        alert(error.message);
      });
  };
  showModal = gamesData => {
    this.setState({ showModal: true, gamesData });
  };
  hideModal = () => {
    this.setState({ showModal: false });
  };
  handleCurrentPage = currentPage => {
    this.getGames(currentPage);
  };
  render() {
    const {
      showModal,
      gamesData,
      games,
      currentPage,
      loading,
      error
    } = this.state;
    if (loading) {
      return <div className="centered-text">Loading...</div>;
    }
    if (error) {
      return <div className="centered-text">Error Loading Data</div>;
    }
    return (
      <div className="tab-component-view box-shadow">
        <div className="grid-container">
          {games &&
            games.map((game, index) => {
              return (
                <div
                  className="grid-item-games"
                  key={index}
                  onClick={() => this.showModal(game)}
                >
                  <h1 className="name">{game.status}</h1>
                  <p className="date-info">{getFancyDate(game.date)}</p>
                </div>
              );
            })}
        </div>
        <div>
          {currentPage !== 1 && (
            <button
              className="close-btn"
              onClick={() => this.handleCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          )}
          <button
            className="close-btn"
            onClick={() => this.handleCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <Modal
          show={showModal}
          hideModal={this.hideModal}
          gamesData={gamesData}
        />
      </div>
    );
  }
}

export default GamesTab;
