import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ( {data} ) => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to Hompage</Link>
	
	{
	  data.cms.products.map((product, i) => (
	   <div>
	    <div>产品名：{product.name}</div>
	    <div>产品价格：{product.price} 美元</div>
		
			{
				product.image.map((img, j) => (
					<div style={{display: 'inline-flex'}}> 
						<img src={img.url} alt={img.fileName} style={{height: '200px'}}/> 
					</div>			
				))				
			}
		
	   </div>	
	  ))
		
	}
  </Layout>
)

export default SecondPage


//数据在graphCMS中，并在其中通过GraphiQL构造graphql查询语句。
//gatsby为获取每个page组件输出的query，获取数据，并作为data参数传入page组件函数。
//在组件流形微核上观察，query(相当于data)是在上游，组件是在下游。
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