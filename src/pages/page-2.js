import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ( {data} ) => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
	
	{
	  data.cms.products.map((product, i) => (
	   <div>
	    <div>产品名：{product.name}</div>
	    <div>产品价格：{product.price} 美元</div>
		
		{
		product.image.map((img, j) => (
		  <div style={{display: 'inline-flex'}}> 
			<img src={img.url} alt={img.fileName} style={{width: '200px', height: '200px'}}></img> 
		  </div>			
		))				
		}
		
	   </div>	
	  ))
		
	}
  </Layout>
)

export default SecondPage

export const query = graphql`
  query {
	  cms {
		products {
		 name
		 price
		 image {
		  url
		  fileName
		 }
		}
	  }	
  }
`