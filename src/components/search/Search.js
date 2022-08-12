import React, { Component, Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import ImageResult from "../image-result/ImageResult";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "26017618-34a0d45a158f5eb37047c00ce",
    images: [],
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then((res) => this.setState({ images: res.data.hits }))
          .catch((err) => console.log(err));
      }
    });
  };

  onAmountChange = (e, index, value) =>
    this.setState({ amount: e.target.value });

  render() {
    console.log(this.state.images);
    return (
      <Fragment>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="Search your image..."
            variant="filled"
            value={this.state.searchText}
            onChange={this.onTextChange}
            fullWidth={true}
            name="searchText"
          />
        </Box>

        <Box sx={{ minWidth: 125 }}>
          <FormControl fullWidth>
            <InputLabel>amount</InputLabel>
            <Select
              value={this.state.amount}
              label="Amount"
              name="amount"
              onChange={this.onAmountChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          {this.state.images.length > 0 ? (
            <ImageResult images={this.state.images} />
          ) : null}
        </Box>
      </Fragment>
    );
  }
}

export default Search;
