/*
* 参考学习https://blog.stvmlbrn.com/2017/10/14/display-loading-indicator-in-react-during-ajax-requests.html
* https://github.com/FortAwesome/react-fontawesome
* FontAwesomeIcon是一个react组件，可了解其源代码。
*/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'

const LoadingSpinner = () => (
	<div>
		<FontAwesomeIcon icon={faSpinner} size="lg" spin />
	</div>
);

export default LoadingSpinner;