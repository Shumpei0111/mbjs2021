import CommonHead from '../components/head/CommonHead';

import '../styles/base.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<CommonHead />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
