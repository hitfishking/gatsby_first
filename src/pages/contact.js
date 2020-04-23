import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/ContactForm"


const Contact = () => {
  return (
    <Layout>
      <SEO title="Gallery" />
      <h1 className="is-size-3">Contact Form</h1>

			<ContactForm/>
    </Layout>
  )
}

export default Contact