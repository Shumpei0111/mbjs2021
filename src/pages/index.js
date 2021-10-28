import Link from 'next/link';
import Layout from '../components/layout';
import FirstView from '../components/first-view';
import Projects from '../components/projects';


const Index = () => {
	return(
		<Layout>
			<FirstView />
			<Projects />
		</Layout>
	)
};

export default Index;