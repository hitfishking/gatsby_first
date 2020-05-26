import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./footer.module.css"

const Footer = () => {

	return (
		<footer class={styles.footer_global}>
			<div class={styles.container}>
				<div class={styles.row}>
					<div class="col-sm-12">
						<h4 class={styles.gamma, styles.footer__header, styles.text_weight__bold}>GatsbyDemo</h4>
					</div>
				</div> 
			
				<div class={styles.row}>
					<div class="col-sm-2">
						<ul class={styles.footer__nav, styles.list_unstyled}>
						<li class={styles.footer__nav_item}><a class={styles.link__no_underline} href="/">About</a></li>
						<li class={styles.footer__nav_item}><a rel="nofollow" class={styles.link__no_underline} href="/">Blog</a></li>
						<li class={styles.footer__nav_item}><a class={styles.link__no_underline} href="/">Join the team</a></li>
					</ul>
					</div> 
					<div class="col-sm-2">
						<ul class={styles.footer__nav, styles.list_unstyled}>
							<li class={styles.footer__nav_item}><a class={styles.link__no_underline} href="/">Developers/API</a></li>
							<li class={styles.footer__nav_item}><a class={styles.link__no_underline} href="/">Press</a></li>
							<li class={styles.footer__nav_item}><a rel="nofollow" class={styles.link__no_underline} href="/">Help Center</a></li>
						</ul>
					</div> 
					<div class="col-sm-4">
						<ul class={styles.footer__nav, styles.list_unstyled}>
							<li class={styles.footer__nav_item}><a class={styles.link__no_underline} href="/">For Education</a></li>
							<li class={styles.footer__nav_item}><a class={styles.link__no_underline} href="/">For iOS</a></li>
							<li class={styles.footer__nav_item}><a class={styles.link__no_underline} href="/">For macOS</a></li>
							<li class={styles.footer__nav_item}><a class={styles.link__no_underline} href="/">For Chrome</a></li>
						</ul>
					</div> 
     			<div class="col-sm-4 footer-social-links" >
  		      <ul class={styles.footer__nav, styles.list_inline}>
         		 <li class={styles.list_inline_item_small}>
            <a class={styles.footer_social_link} href="/" title="Follow Unsplash on Twitter">
              <svg xmlns="/" viewBox="0 0 24 24" class={styles.footer_social_icon}>
								<path d="M8.4 20.1c7.5 0 11.6-6.2 11.6-11.6V8c.7-.6 1.4-1.3 2-2.1-.7.3-1.6.6-2.4.6.9-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1-1.6-1.6-4.1-1.7-5.8-.2-1.1 1-1.5 2.5-1.2 3.9-3.2-.2-6.2-1.8-8.3-4.3-1.1 1.9-.6 4.2 1.2 5.5-.6 0-1.3-.2-1.9-.5v.1c0 1.9 1.4 3.6 3.3 4-.6.2-1.2.2-1.9.1.6 1.7 2 2.8 3.8 2.9-1.4 1.1-3.2 1.7-5.1 1.7-.3 0-.6 0-1-.1 2.1 1 4.3 1.7 6.5 1.7"></path>
							</svg>
            </a>
          </li>
        		 <li class={styles.list_inline_item_small}>
            <a class={styles.footer_social_link} href="https://facebook.com/unsplash" title="Like Unsplash on Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={styles.footer_social_icon}>
  <path d="M21 12.1c0-5-4-9-9-9s-9 4-9 9c0 4.5 3.3 8.2 7.6 8.9v-6.3H8.3v-2.6h2.3v-2c0-2.2 1.4-3.5 3.4-3.5 1 0 2 .2 2 .2V9h-1c-1.1 0-1.4.7-1.4 1.4v1.7H16l-.4 2.6h-2.1V21c4.2-.7 7.5-4.4 7.5-8.9"></path>
</svg>

            </a>
          </li>
         		 <li class={styles.list_inline_item_small}>
            <a class={styles.footer_social_link} href="https://instagram.com/unsplash" title="Follow Unsplash on Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={styles.footer_social_icon}>
  <path d="M12 4.6c2.4 0 2.7 0 3.7.1.9 0 1.3.2 1.6.3.4.2.7.3 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.6.1 1 .1 1.2.1 3.7s0 2.7-.1 3.7c-.1.9-.2 1.4-.3 1.7-.2.4-.3.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.7.3-1 .1-1.2.1-3.7.1s-2.7 0-3.7-.1c-.9-.1-1.3-.2-1.7-.3-.4-.2-.7-.3-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.2-.8-.2-1.7-.1-1-.1-1.2-.1-3.7s0-2.7.1-3.7c.1-.8.3-1.3.4-1.6.2-.4.3-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.6-.3 1-.1 1.3-.1 3.7-.1M12 3c-2.4 0-2.8 0-3.7.1-1 .1-1.6.2-2.2.4-.6.2-1.1.5-1.6 1s-.8 1-1 1.6c-.3.6-.4 1.2-.4 2.2C3 9.2 3 9.6 3 12s0 2.8.1 3.7c.1 1 .2 1.6.4 2.2.2.6.6 1.1 1 1.6.5.5 1 .8 1.6 1 .6.2 1.2.4 2.2.4.9.1 1.3.1 3.7.1s2.8 0 3.7-.1c1-.1 1.6-.2 2.2-.4.6-.2 1.1-.6 1.6-1 .5-.5.8-1 1-1.6.2-.6.4-1.2.4-2.2.1-1 .1-1.4.1-3.8s0-2.8-.1-3.7c-.1-1-.2-1.6-.4-2.2-.2-.6-.6-1.1-1-1.6-.5-.5-1-.8-1.6-1-.6-.2-1.2-.4-2.2-.4H12zm0 4.4c-2.5 0-4.6 2.1-4.6 4.6s2.1 4.6 4.6 4.6 4.6-2.1 4.6-4.6-2.1-4.6-4.6-4.6zm0 7.6c-1.6 0-3-1.4-3-3s1.4-3 3-3 3 1.4 3 3-1.4 3-3 3zm4.8-8.9c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1z"></path>
</svg>

            </a>
          </li>
          	 <li class={styles.list_inline_item_small}>
            <a class={styles.footer_social_link} href="https://medium.com/unsplash" title="Follow Unsplash on Medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={styles.footer_social_icon}>
  <path d="M3 3v18h18V3H3zm15 4.3l-1 .9c-.1.1-.1.2-.1.3v6.8c0 .1 0 .2.1.3l1 .9v.2h-4.7v-.2l1-1c.1-.1.1-.1.1-.2V9.8l-2.7 6.9h-.4L8 9.8v4.6c0 .2.1.4.2.5l1.3 1.5v.2H5.9v-.2l1.3-1.5c.1-.2.2-.3.2-.5V9c0-.2-.1-.3-.2-.4L6 7.3v-.2h3.5l2.7 6 2.4-6h3.3l.1.2z"></path>
</svg>

            </a>
          </li>
        </ul>
      </div> 
   		  </div> 

				<div class={styles.footer_sub}>
					<div class={styles.row}>
						<div class="col-sm-12">
							<div class={styles.footer_sub__container}>
								<div class={styles.hidden_xs}>
									<a href="/" title="Home — GatsbyDemo"><img class={styles.footer_sub__logo} src="https://unsplash.com/assets/core/logo-black-df2168ed0c378fa5506b1816e75eb379d06cfcd0af01e07a2eb813ae9b5d7405.svg"/></a>
									Make something awesome.
								</div>
								<div class="">
									<ul class={styles.footer__nav, styles.footer__nav_sub, styles.list_inline}>
										<li class={styles.list_inline_item}><a rel="nofollow" class={styles.link__no_underline} href="/">Privacy Policy</a></li>
										<li class={styles.list_inline_item}><a rel="nofollow" class={styles.link__no_underline} href="/">Terms</a></li>
										<li class={styles.list_inline_item}><a rel="nofollow" class={styles.link__no_underline} href="/">Security</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
