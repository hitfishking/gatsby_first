import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const OneBook = (props) => {
	const book = props.data.allMongodbMagazinesDbBooks.edges[0].node;  //该one book组件参数传入的只是一个特定的book数据。
	// console.log(book)    //通过console.log()即可容易地调试gatsby前端获取数据的情况，及数据结构。
	
  return (
    <Layout>
      <SEO title="OneBook" />
      <h1 className="is-size-3">{book.title}</h1>
			<div>
				<img src={book.thumbnailUrl} />
				<h1 className="is-size-4" style={{display: 'flex'}}>{book.title}</h1>
				<p style={{ marginTop: "2%", marginBottom: "2%" }}>By {book.authors.map(author => ( <span>{author}, </span>))}</p>
				<p>{book.longDescription}</p>
				<p style={{ marginTop: "2%", marginBottom: "2%" }}>Published: {book.publishedDate} | ISBN: {book.isbn}</p>
				<p style={{ marginTop: "2%", marginBottom: "2%" }}>
					Categories: {book.categories.map(category => category)}
				</p>
      </div>
    </Layout>
  )
}

export default OneBook

export const pageQuery = graphql`
  query($id: String!) {
    allMongodbMagazinesDbBooks(filter: {id: {eq: $id}}) {
      edges {
        node {
					id
					title
					longDescription
					thumbnailUrl
					isbn
					pageCount
					publishedDate(formatString: "MMMM DD, YYYY")
					authors
					categories
				}	
			}	
    }
  }
`