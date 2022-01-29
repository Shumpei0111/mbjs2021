import CommonHead from '../components/head/CommonHead';
import { AnimatePresence } from 'framer-motion';

import { useTransitionFix } from '../lib/useTransitionFix';

import '../styles/base.scss';

function MyApp({ Component, pageProps, router }) {
	const transitionCallBack = useTransitionFix();

	return (
		<>
			<CommonHead />
			<AnimatePresence exitBeforeEnter onExitComplete={transitionCallBack}>
				<Component {...pageProps} key={router.route} />
			</AnimatePresence>
		</>
	)
}

export default MyApp
