import React from 'react'
import Layout from '../components/Layout'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import Bookmark from '../components/Bookmark'

const BookmarkPosts = () => {
  return (
    <div>
          <Layout>
              <div className='d-flex justify-content-between m-auto py-2' style={{ width: "82%" }}>
                  <LeftSidebar />
                  <Bookmark/>
                  <RightSidebar />
              </div>
          </Layout>
    </div>
  )
}

export default BookmarkPosts