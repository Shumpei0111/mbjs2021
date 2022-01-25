import CommonHead from '../components/head/CommonHead';
import { AnimatePresence } from 'framer-motion';

import '../styles/base.scss';

function MyApp({ Component, pageProps, router }) {
	return (
		<>
			<CommonHead />
			<AnimatePresence exitBeforeEnter>
				<Component {...pageProps} key={router.route} />
			</AnimatePresence>
		</>
	)
}

export default MyApp
