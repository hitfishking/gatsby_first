const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  //这里是gatsby顶层调用的hooks函数定义，并不是page组件，故不能用page组件专用的pageQuery方式定义查询数据，
  //只能在组件内用标准的await graphql()生成查询结果。
  const { data } = await graphql(`
    {
      books: allMongodbMagazinesDbBooks {
        edges {
          node {
            id
          }
        }
      }

      posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              book
            }
          }
        }
      }
    }
  `)

  const bookBlogTemplate = path.resolve('./src/components/bookblog.js')
  const bookPageTemplate = path.resolve('./src/components/OneBook.js')

  for (const { node } of data.posts.edges) {
    createPage({
      path: `/blog/${node.frontmatter.slug}/`,
      component: bookBlogTemplate,
      context: {
        id: node.frontmatter.slug,
        book: node.frontmatter.book
      },
    })
  }

  for (const { node } of data.books.edges) {
    createPage({
      path: `/book/${node.id}/`,
      component: bookPageTemplate,
      context: {
        id: node.id,
      },
    })
  }
}