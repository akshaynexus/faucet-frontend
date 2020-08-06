import React, { Component } from "react";
import { connect } from "react-redux";

// Material UI Imports
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
// Action Imports
import { setTest } from "../../actions/home-actions";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import { withSnackbar } from "notistack";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      faucetbackend: "http://155.138.137.219:3333",
      address: "",
      txdata: [],
    };
  }
  componentDidMount() {
    fetch(this.state.faucetbackend)
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }

  addrChangeHandle = (addr) => {
    this.setState({ address: addr.target.value });
  };
  showMessage = (msg, type) => {
    this.props.enqueueSnackbar(msg, {
      variant: type,
    });
  };

  sendTestnetCoins = () => {
    if (this.state.address === "")
      this.showMessage("Enter Ghost address", "error");
    else {
      const formData = new FormData();
      formData.append("address", this.state.address);
      // POST request using fetch inside useEffect React hook
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      fetch(`${this.state.faucetbackend}/send`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.processSendResponse(data);
        });
    }
  };
  processSendResponse = (response) => {
    if (response.error !== "") {
      this.showMessage(response.error, "error");
    } else {
      this.showMessage(`Sent ${response.sentamt} GHOST`, "success");
      this.setState({
        txdata: [
          ...this.state.txdata,
          { txid: response.txid, amt: response.sentamt },
        ],
      }); //simple value
    }
  };
  render() {
    return (
      <div>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{
            height: "50vh",
          }}
        >
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Faucet Stats
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Block Height :{" "}
                  {this.state.data ? this.state.data.blocks : "..."}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Faucet Balance :{" "}
                  {this.state.data ? this.state.data.balance : "..."}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Total Sent :{" "}
                  {this.state.data ? this.state.data.totalsent : "..."}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="center"
            justify="center"
            style={{
              flexDirection: "column",
            }}
          >
            <TextField
              id="ghostaddress"
              label="Address"
              ref="ghostaddress"
              onChange={this.addrChangeHandle}
              m={0.5}
              style={{
                width: "50%",
                marginBottom: "20px",
              }}
            />
            <Fab
              variant="extended"
              color="primary"
              style={{
                width: "40%",
                marginBottom: "20px",
              }}
              onClick={() => {
                this.sendTestnetCoins();
              }}
            >
              <NavigationIcon />
              Send Coins
            </Fab>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Recent TXes
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {JSON.stringify(this.state.txdata, null, 1)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    ...props,
  };
};

const mapDispatchToProps = {
  setTest,
};

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
