import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BookBlog = (props) => {
	console.log(props)
	const post = props.data.post.edges[0].node
	var book = false
	if (props.data.book.edges.length > 0) {
		book = props.data.book.edges[0].node
	}

  return (
    <Layout>
      <SEO title="BookBlog" />
			<div>
				<h1 className="is-size-3">{post.frontmatter.title}</h1>
				<h2 className="is-size-5" style={{ marginTop: "8%", marginBottom: "2%" }}>By {post.frontmatter.author}</h2>
				<div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }}/>

				{book &&
					<Link to={"/book/" + book.id}>
						<img src={book.thumbnailUrl} />
					</Link>
        }

      </div>
    </Layout>
  )
}

export default BookBlog

export const pageQuery = graphql`
  query($id: String!, $book: String) {
    post: allMarkdownRemark(filter: {frontmatter: {slug: { eq: $id }}}) {
			edges {
				node {
					frontmatter {
						title
						author
					}
					html
				}
			}
		}
		book: allMongodbMagazinesDbBooks(filter: {id: {eq: $book}}) {
      edges {
        node {
					id
					thumbnailUrl
				}	
			}	
    }
  }
`