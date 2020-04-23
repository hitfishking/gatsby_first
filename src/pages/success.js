import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/ContactForm"

import pic11 from "../images/pic11.jpg"

const Success = props => {
  return (
    <Layout>
      <SEO title="Gallery" />
      <Helmet>
        <title> Success Page </title>{" "}
        <meta name="description" content="Success Page" />
      </Helmet>{" "}
      <h1 className="is-size-3"> Contact Form </h1>
      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1> Success / Thank You Page </h1>{" "}
            </header>{" "}
            <span className="image main">
              <img src={pic11} alt="" />
            </span>{" "}
            <p> Thank you for contacting us! </p>{" "}
          </div>{" "}
        </section>{" "}
      </div>{" "}

			<div><Link to="/">Go to Home Page</Link></div>
    </Layout>
  )
}

export default Success
