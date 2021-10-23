import Link from 'next/link';
import Layout from '../components/layout';

import * as style from '../styles/index.module.css';

const Index = () => {
	return(
		<>
			<Layout>
				<h1 className={style.h1Class}>Hi</h1>
				<Link href='/blog'><a>to Blog</a></Link>
				<Link href='/contact'><a>to Contact page</a></Link>
			</Layout>
		</>
	)
};

export default Index;