import React from 'react'
import Feeds from '../components/Feeds'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Layout>
            {/* top part */}
            <div className='d-flex justify-content-around border border-dark'>
                <Link to='/' className='text-center text-decoration-none text-secondary'>
                    <h3 className='border-bottom border-info'>For you</h3>
                </Link>
                <Link to='/following' className='text-center text-decoration-none text-secondary'>
                    <h3>Following</h3>
                </Link>
            </div>
            <Feeds />
        </Layout>
    )
}

export default Home