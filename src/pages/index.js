import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

//引入bulma样式；关闭此行可恢复原样式(除了header组件)。
//在index页面引入样式，为什么在products页面中也有效??
import "bulma/css/bulma.min.css"  

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <p>1. 我来添加一行...，嘿嘿！！</p>
    <p>2. 我来添加第二行...，git pages能看见吗??</p>
    <p>3. 为测试Netlify自动部署功能，添加第三行看看效果....</p>
    <p>4. 再push一次看效果；graphcms中也添加了Laptop记录....</p>
    <p>5. 改变此行，不commit；看netlify deploy等否反映出来...</p>
	
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>

    <hr/>

    <div className="has-text-centered" style={{ marginTop: "5%" }}>
      <h1 className="is-size-2">Welcome to Pride Rock! . . . or nah 😹</h1>
      <p className="is-size-5" style={{ marginTop: "2%" }}>
        Find within, a fire doggo infinite image gallery built with Gatsby, and
        Images served using Netlify functions from Unsplash. Perfecto!
      </p>

      <div>
        <button className="button">
          <a href="https://scotch.io/tutorials/build-an-infinite-scroll-image-gallery-with-gatsby-and-netlify-functions">教程</a>
        </button>
      </div>

      <button className="button is-dark is-large" style={{ marginTop: "3%" , marginBottom: "4%"}}>
        <Link to="/gallery/" className="has-text-white">
          Open Sesame! 🔥
        </Link>
      </button>

    </div>
    <hr/>

    <Link to="/products/">Go to Product List Page (page 2)</Link>
  </Layout>
)

export default IndexPage
