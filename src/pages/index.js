import Layout from '../components/Layout';
import FirstView from '../components/FirstView';
import Projects from '../components/Projects';
import TopMarquee from '../components/TopMarquee';


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