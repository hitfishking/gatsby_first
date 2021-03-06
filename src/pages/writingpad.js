import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import axios from 'axios';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Note from "../components/note"
import Form from '../components/form';
import styles from './writingpad.module.css'

import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

const WritingPadPage = () => {
  const [status, setStatus ] = useState('loading');
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    let canceled = false;
    if (status != "loading") return;
    axios("/.netlify/functions/get-all-fauna-notes").then(result => {  //以page为行动主体，调用云函数,获取远程状态数据.
      if (canceled === true) return;
      if (result.status != 200) {
        console.error("Error loading notes");
        console.error(result);
        return;
      }
      setNotes(result.data.notes);   //将获取的远程状态数据存储在本地状态变量中.
      setStatus("loaded");
    });
    return () => {   //useEffect返回一个函数，是对称收尾函数，在onDidUnMounted时运行。这里的逻辑是确保cancel为真。
      canceled = true;
    };
  }, [status]);  //每次status变化时运行useEffect.

  const reloadNotes = () => setStatus('loading');  //该函数会被传递进Form子组件，实现子组件改变父组件的状态。

  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "NoName"
  const isLoggedIn = identity && identity.isLoggedIn


  return (
    <Layout>
      <SEO title="Page four" />
      <h1 className="is-size-2">Writing Pad Page</h1>

      {identity && identity.isLoggedIn ? (
          <>
            <button className={styles.login_btn} onClick={() => setDialog(true)}>
              {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
            </button>
            <Form reloadNotes={reloadNotes}/>  {/*Form是一个有hook数据状态的组件; 将函数作为props属性传递进组件.*/}
            {notes ? (
              <ul>
                {notes.map(note => (
                  <li key={note._id}>
                    <Note note={note} reloadNotes={reloadNotes}/>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading notes...</p>
            )}
          </>
        ) : (
          <button className={styles.login_btn} onClick={() => setDialog(true)}>
            {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
          </button>
      )}
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />

      <br/>
      <Link to="/">Go back to Hompage</Link>
    </Layout>
  )
}

export default WritingPadPage
