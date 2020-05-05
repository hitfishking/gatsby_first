import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ( {data} ) => (
  <Layout>
    <SEO title="Page two" />
    <h1 className="is-size-2">Hi from the second page</h1>
    <p className="is-size-4">Welcome to page 2</p>
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


//数据在graphCMS中，并在graphCMS UI中通过GraphiQL构造graphql查询语句。
//gatsby的page组件可以输出一个query常量，由gatsby负责执行此query，并做为data参数传入该page函数；
//该gatsby page组件只是一个函数组件，且没有data/method部分；利用了gatsby框架的query常数完成查询；
//这种方式不用组件内部使用方法调用graphCMS，更简单。
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