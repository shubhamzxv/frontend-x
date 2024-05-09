import React from 'react'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import NavBar from './NavBar'

// Layout component for the application
const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            {/* Meta tags for SEO */}
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            {/* Main section of the layout */}
            <main style={{ minHeight: "90vh" }} >
                {/* Toast notifications */}
                <Toaster />
                {/* Navigation bar */}
                <NavBar />
                {/* Content section */}
                <div className='d-flex justify-content-between m-auto py-2' style={{ width: "82%" }}>
                    {/* Left sidebar */}
                    <LeftSidebar />
                    {/* Main content */}
                    <div style={{ maxWidth: 600 }}>
                        {children}
                    </div>
                    {/* Right sidebar */}
                    <RightSidebar />
                </div>
            </main>
            {/* Footer section */}
            <Footer />
        </div>
    )
}

// Default props for the layout component
Layout.defaultProps = {
    title: "Twitter",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb,twitter,x",
    author: "Shubham",
};

// Exporting the Layout component
export default Layout
