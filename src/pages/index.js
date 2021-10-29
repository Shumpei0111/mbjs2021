import Link from 'next/link';
import Layout from '../components/layout';
import FirstView from '../components/first-view';
import Projects from '../components/projects';
import TopMarquee from '../components/topMarquee';


const Index = () => {
	return(
		<Layout>
			<FirstView />
			<Projects />
			<TopMarquee />
		</Layout>
	)
};

export default Index;