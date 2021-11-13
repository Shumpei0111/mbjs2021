import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import Layout from '../components/Layout';
import TopMarquee from '../components/TopMarquee';

import * as style from '../styles/module/_page_contact.module.scss';

const Contact = () => {
    const mailAddress = 'shumpei.o.7g@gmail.com';
    const param = 'subject=%E3%80%90MB.js%E3%80%91%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B';
    const mailTo = 'mailto:' + mailAddress + '?' + param;

    return (
        <Layout>
            <h2 className={style.contact__h2}>Contact</h2>
            <div className={style.contactContainer}>
                <p>For general enquiries.</p>
                <p>Want to work with me?</p>
                <p className={style.contact__small}>お問い合わせはこちら</p>
                <Link href={mailTo}><a className={style.contact__mail} target='_blank' rel='noopener'>shumpei<span className={style.contact__dot}></span>o<span className={style.contact__dot}></span>7g<span className={style.contact__atmark}></span>gmail<span className={style.contact__dot}></span>com</a></Link>

                <div className={style.contact__sns}>
                    <p>You can also follow me.</p>
                    <ul>
                        <li><Link href='https://twitter.com/seventhseven'><a target='_blank' rel='noopener'><FontAwesomeIcon icon={faTwitter} /> / @seventhseven</a></Link></li>
                        <li><Link href='https://github.com/Shumpei0111'><a target='_blank' rel='noopener'><FontAwesomeIcon icon={faGithub} /> / Shumpei0111</a></Link></li>
                        <li><Link href='https://www.pixiv.net/users/91629'><a target='_blank' rel='noopener'>Pixiv / なな爺</a></Link></li>
                    </ul>
                </div>
            </div>
            <TopMarquee />
        </Layout>
    )
}

export default Contact;