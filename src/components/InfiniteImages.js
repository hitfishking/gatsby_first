import React, { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"
import "./gallery.css"

const ImageGallery = ({ images, loading, fetchImages }) => {
  // Create gallery here
  return (
    <InfiniteScroll
      dataLength={images.length}
      next={() => fetchImages()}
      hasMore={true}
      loader={
        <p style={{ textAlign: "center", marginTop: "1%" }}>
          More doggo incoming <span role="img"  aria-label="dong">🐕 🐕...</span>
        </p>
      }
    >
      <div className="image-grid">
        {!loading
          ? images.map(image => (
              <div className="image-item" key={image.id}>
                <img src={image.urls.regular} alt={image.alt_description} />
              </div>
            ))
          : ""}
      </div>
    </InfiniteScroll>
	)}

const InfiniteImages = () => {
	// Hold state
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(true)

	// Fetch images on component mount
	useEffect(() => {
		fetchImages()
	}, [])

	// API endpoint; 通过使用本地proxy，在本地测试时也可以使用与云端相同的地址。
	// const endpoint = "/.netlify/functions/fetch"

	// Fetch Images from functions
	const fetchImages = () => {
		axios("/.netlify/functions/fetch").then(res => {
			setImages([...images, ...res.data.images])  //旧的和新的images合并.
			setLoading(false)
		})
	}
	return (
		<ImageGallery images={images} loading={loading} fetchImages={fetchImages} />
	)}

ImageGallery.propTypes = {
	images: PropTypes.array,
	loading: PropTypes.bool,
	fetchImages: PropTypes.func,
}

export default InfiniteImages
