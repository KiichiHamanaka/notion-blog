import Link from 'next/link'
import { getDatabase } from '../util/notion'
import Page from "../components/Page";

const Home = ({result}) => {
    return (
        <div>
            <Link href="/portfolio">
                <a>ぽーとふぉりお</a>
            </Link>
            {result.map(page=> <Page page={page} key={page.id}/>)}
        </div>
  )
}

export const getStaticProps = async() => {
    const result = await getDatabase()
    return {
        props: {
            result,
        }
    }
}

export default Home