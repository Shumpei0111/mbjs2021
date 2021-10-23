import Link from 'next/link';
import Layout from '../components/layout';


const Index = () => {
	return(
		<Layout>
			<div>
				<Link href='/blog'><a>to Blog</a></Link>
			</div>
			<div>
				<Link href='/contact'><a>to Contact page</a></Link>
			</div>
		</Layout>
	)
};

export default Index;