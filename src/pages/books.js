import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/books.css"

const Books = (props) => {
  const books = props.data.books.edges;
  const posts = props.data.posts.edges;

  return (
    <Layout>
      <SEO title="Books" />
      <h1 className="is-size-3">Books List</h1>

      <div className="posts">
        {posts.map(post =>
          <div className="post">
            <h2 className="is-size-5" style={{ marginTop: "2%", marginBottom: "2%" }}>
							<Link to={"/blog/" + post.node.frontmatter.slug}>{post.node.frontmatter.title}</Link>
						</h2>
            <p style={{ marginTop: "2%", marginBottom: "4%" }}>By {post.node.frontmatter.author}</p>
          </div>)}
      </div>

			<div className="book-container">
				{books.map(book =>
						<div className="book">
							{
								book.node.thumbnailUrl &&
                <Link to={'/book/' + book.node.id}>
                    <img src={book.node.thumbnailUrl}/>
                </Link>
							}	
						</div>
				)}
			</div>
    </Layout>
  )
}

export default Books

export const pageQuery = graphql`
  query {
    books: allMongodbMagazinesDbBooks {
      edges {
        node {
          id
          title
          shortDescription
          thumbnailUrl
        }
      }
		}

		posts: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
            author
          }
        }
      }
    }

  }
`