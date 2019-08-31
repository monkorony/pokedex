import React, { Component } from "react";

class PokeSearchInput extends Component {
  render() {
    const {
      searchString,
      handleSubmit,
      handleChange,
      handleInputChange,
      dashboardState
    } = this.props;

    return (
      <div className="col-md-12 my-3">
        <form className="" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group mb-2 col-auto">
              <input
                type="text"
                className="form-control text-capitalize"
                placeholder="Search Pokemon by name or ID"
                value={searchString}
                onChange={handleChange}
              ></input>
              {/* <label>
                Ground
                <input
                  name="typeGround"
                  type="checkbox"
                  checked={dashboardState}
                  onChange={handleInputChange}
                  value="ground"
                />
              </label> */}
              <div className="input-group-append">
                <button
                  type="submit"
                  className="input-group-text bg-primary text-white"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PokeSearchInput;
