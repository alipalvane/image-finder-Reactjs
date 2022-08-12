import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IconButton } from "@mui/material";
import { ZoomIn } from "@mui/icons-material";
import './ImageResult.css';

class ImageResult extends Component {
  render() {
    let imageListContent;
    const { images } = this.props;
    if (images) {
      imageListContent = (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {images.map((img) => (
            <ImageListItem
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton>
                  <ZoomIn color="red" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="pixabay images" />
            </ImageListItem>
          ))}
        </ImageList>
      );
    } else {
      imageListContent = null;
    }
    return <div className="wrapper-images">{imageListContent}</div>;
  }
}

ImageResult.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageResult;
