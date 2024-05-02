import React from 'react'
import LeftSidebar from '../components/LeftSidebar'
import Feeds from '../components/Feeds'
import RightSidebar from '../components/RightSidebar'
import Layout from '../components/Layout'

const Home = () => {
    return (
        <Layout>
            <div className='d-flex justify-content-between m-auto py-2' style={{ width: "82%" }}>
                <LeftSidebar />
                <Feeds />
                <RightSidebar />
            </div>
        </Layout>
    )
}

export default Home