import React, { Component } from "react";
import { connect } from "react-redux";

// Material UI Imports
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
// Action Imports
import { setTest } from "../../actions/home-actions";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ minHeight: "90vh" }}
        >
           <Grid container item xs={12} spacing={1}    alignItems="center"
          justify="center">
           <TextField id="standard-basic"label="Address" m={0.5} />
          </Grid>
          <Fab variant="extended" color="secondary">
        <NavigationIcon  />
        Send Coins
      </Fab>
             
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};

const mapDispatchToProps = {
  setTest,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
