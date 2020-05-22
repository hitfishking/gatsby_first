/*
* 本例通过gatsby+netlify_function+mongodb Atlas,动态查询penjing collection中的数据。
* books项目是通过gatsby+gatsby-source-mongodb插件,通过graphql语言访问mongodb Atlas中的books collection;
* 但是,penjing的文档存在嵌套情况，目前mongodb Atlas的graphql功能处于beta阶段，无法构造嵌套文档的查询graphql语句；
* 故，对penjing文档的查询，只能采用gatsby+netlify_function+mongodb Atlas方案；云函数nodejs中使用mongoose模块访问Atlas.
*/
/*
 * 本例只是通过form的handleSubmit()函数更改ret状态变量,并在页面将ret的记录渲染出来而已;
 * 效果上,点击查询按钮，页面并没有完全刷新,只是内容列表发生了更新! 这个特性非常好!
 * 这应该是React框架动态虚拟Dom的功能; 当页面form发生submit时,默认更新当前页面,而实际更新的,只有发生变化的局部Dom,
 * 而非整个页面。React内部会识别本次页面渲染中，页面上的那个子dom发生了变化，只更新该局部dom。
 */
/*
 * 对于表单页面的一个重要理解是: 
 * a) 表单页面上方带有数据status data；
 * b) 表单本体本身都属于下行部分，只有setState()、handleSubmit() 2个方法属于上行部分。
 */
/*
 * ?? 本例遇到的问题是：引入的css样式并没有产生效果，而且很多table样式功能无效?!! 
 * 可能和gatsby项目的其他页面的css样式有冲突。具体原因待查。
 */

import React from "react"
import { useState } from "react";
import axios from "axios";
import Layout from "../components/layout"
import SEO from "../components/seo"

import BootstrapTable from 'react-bootstrap-table-next';   
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


const sizePerPageRenderer = ({options, currSizePerPage, onSizePerPageChange	}) =>
	 (
		<div className="btn-group" role="group">
			{
				options.map((option) => {
					const isSelect = currSizePerPage === `${option.page}`;
					return (
						<button
							key={ option.text }
							type="button"
							onClick={ () => onSizePerPageChange(option.page) }
							className={ `btn ${isSelect ? 'btn-secondary' : 'btn-warning'}` }
						>
							{ option.text }
						</button>
					);
				})
			}
		</div>
	);

const options = {
	sizePerPageRenderer
};



const PenjingList = () => {
	const [text, setText] = useState('');     //setText()是上行函数,绑定在input框的onChange事件上.
	const [articles, setArticles] = useState([]);

	// useEffect(() => {
	// }, [ret])


  const handleSubmit = async (event) => {   //这个函数是form的onSubmit事件函数, 是上行反向渲染链条上的函数.
    event.preventDefault();  

    if(text === '') {
			console.log("text == null")
			return
		}

		//虽然Netlify云函数通过callback()返回的json是经过JSON.stringify()了的, 但在客户端axios侧还是将其转换成了json格式.
		let tmp = await axios.post('/.netlify/functions/fetch-penjing3', { text });  
		console.log(tmp.data)
		setArticles(tmp.data)

    setText('');    
	}
	
	//设置column宽度，见https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/226
	const columns = [{
		dataField: 'year',
		text: '年',
		headerStyle: (colum, colIndex) => {
			return { width: '70px', textAlign: 'center' };
		}
		}, {
		dataField: 'month',
		text: '月',
		headerStyle: (colum, colIndex) => {
			return { width: '50px', textAlign: 'center' };
		}
		}, {
		dataField: 'article_name',
		text: '文章名称',
		headerStyle: (colum, colIndex) => {
			return { textAlign: 'center' };
		}
		}, {
		dataField: 'article_page',
		text: '文章页号',
		headerStyle: (colum, colIndex) => {
			return { width: '220px', textAlign: 'left' };
		}				
		}
	];


  return (
		<Layout>
			<SEO title="PenJing" />
			<h1 className="is-size-3">《中国花卉盆景杂志》目录</h1>
			<p style={{ marginTop: "3%", marginBottom: "3%" }}>
				显示1984年~2013年，供348期杂志的目录。
			</p>

			<form className="" onSubmit={handleSubmit}>  
				<label htmlFor="textarea">查询内容:
					<input   
						type = "text"
						placeholder = "输入查询条件..."
						id="textarea"
						value={text}   
						onChange={event => setText(event.target.value)}  
					></input>
				</label>
				<button className="btn btn-primary" type="submit">查询</button>
			</form>

			{/* {articles.length > 0 ? (
				<ul>
					{articles.map(article => (
						<li>
							<div>{article.year} {article.month} {article.article_name} {article.article_page}</div>
						</li>
					))}
				</ul>
			) : (
				<p>目前没有内容。</p>
			)} */}

			<BootstrapTable keyField='id' data={ articles } columns={ columns } 
				pagination={ paginationFactory(options) } 
				striped
				hover
				condensed
				bordered={true}
			/>

		</Layout>
 
  )
}

export default PenjingList