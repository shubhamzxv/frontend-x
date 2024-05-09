import React from 'react'
import Layout from '../components/Layout'
import ProfileDetails from '../components/ProfileDetails'

const Profile = () => {
  return (
    // Layout component wraps the ProfileDetails component
    <Layout>
      <ProfileDetails />
    </Layout>
  )
}

export default Profile