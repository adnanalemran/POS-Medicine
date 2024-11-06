import '../front_assets/front_custom.css'
import '../front_assets/front_responsive.css'
import Header from "../pages/front_pages/layouts/Header";
import Footer from '../pages/front_pages/layouts/Footer';
import HomeDashboard from '../pages/front_pages/layouts/HomeDashboard';


export default function Home() {


    return (
        <>
            <Header/>
            
            <HomeDashboard/>
                        
            <Footer/>
        </>
    )
}