/*
 * 本books例子，演示json数据导入到Mongodb Altas中，Gatsby侧安装gatsby-source-mongodb插件，
 * 通过graphql实现对云端mongodb的查询。
 * 该项目包括3个页面，首页、onebook页、post(即bookblog.js页)；首页上方是post列表，下方是book-container;
 * 点击一个book进入onebook页；点击首页上的一个post，进入bookblog页;
 * 一个要点是：在gatsby-node.js中定义createPage() hook函数，为每个book生成一个静态页面;
 * [注]：Mongodb Atlas的graphql模块处于beta阶段，发现其不能实现对嵌套docs的条件查询；
 *      正是这个原因，导致后续的penjing项目数据无法通过gatsby+graphql直接查询mongodb Atlas，
 *      只能通过新建一个Netlify云函数(fetch-penjing3.js),其中使用mongoose模块完成对mongodb Atlas中penjing collection的查询。
*/

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
                <Link to={'/book/' + book.node.id}>   {/*<Link>指向的是静态页面url*/}
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