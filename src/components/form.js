import React, { useState } from "react";
import axios from "axios";

const Form = ({reloadNotes}) => {
	const [text, setText] = useState('');   //setText()绑定在input框的onChange事件上.
	
  const handleSubmit = async (event) => {   //这个函数是form的onSubmit事件函数，是上行反向渲染链条上的函数；
    event.preventDefault();                 //封装的不好，不是纯函数!

    if(text === '') return;
    await axios.post('/.netlify/functions/create-note', { text });  //axios.post()不处理返回值.

    setText('');    //向数据库保存text后，本地状态清空.
    reloadNotes();  //调用参数传进来的回调函数.
  } 

  return (  
		//form的特殊性在于其提供输入能力，关联上行函数，实现反向渲染.
		//form的构造过程：先构造HTML显示部分(下行部分)，再关联上上行函数.
		//整个form的onSubmit事件绑定一个专用函数.
    <form className="note-form" onSubmit={handleSubmit}>  
      <label htmlFor="textarea">Add notes
        <textarea   //textarea嵌套在<label>内.
          id="textarea"
          value={text}   //输入框绑定状态变量'text'.
          onChange={event => setText(event.target.value)}  //输入框onChange事件绑定一个状态变量函数.
        ></textarea>
      </label>
      <button className="save-button" type="submit">Save note</button>
    </form>
  );
};

export default Form;