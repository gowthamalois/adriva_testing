import React from 'react';
import Navbar3 from '../../components/Navbar3/Navbar3';
import PageTitle from '../../components/pagetitle/PageTitle';
import Error from '../../components/404/404'
import Footer from '../../components/footer/Footer'
import Scrollbar from '../../components/scrollbar/scrollbar'

const StoryPage = (props) => {

    return (
        <div>
            <Navbar3/>
            <PageTitle pageTitle={'404'} pagesub={'404'}/> 
            <Error/>
            <Scrollbar/>
        </div>
    )
};
export default StoryPage;


