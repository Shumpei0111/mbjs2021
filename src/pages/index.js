import Layout from '../components/Layout.js';
import FirstView from '../components/FirstView.js';
import Projects from '../components/Projects.js';
import TopMarquee from '../components/TopMarquee.js';


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