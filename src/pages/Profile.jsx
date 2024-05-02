import React from 'react'
import Layout from '../components/Layout'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import ProfileDetails from '../components/ProfileDetails'

const Profile = () => {
  return (
    <Layout>
      <div className='d-flex justify-content-between m-auto py-2' style={{ width: "82%" }}>
        <LeftSidebar />
        <ProfileDetails/>
        <RightSidebar />
      </div>
    </Layout>
  )
}

export default Profile