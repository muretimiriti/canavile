import "./Gallery.css"
import image1 from "../assets/gallery/Banner bonfire night life.jpg"
import image2 from "../assets/gallery/Canaville Resort overview.jpg"
import image3 from "../assets/gallery/Canaville night life 1.jpg"
import image4 from "../assets/gallery/Canaville night life 2.jpg"
import image5 from "../assets/gallery/Canaville night life 3.jpg"
import image6 from "../assets/gallery/Canaville night life 4.jpg"
import image7 from "../assets/gallery/Canaville night life 5.jpg"
import image8 from "../assets/gallery/Canaville night life 6.jpg"
import image9 from "../assets/gallery/Canaville night life 7.jpg"
import image10 from "../assets/gallery/Canaville night life 8.jpg"
import image11 from "../assets/gallery/Canaville night life 9.jpg"
import image12 from "../assets/gallery/Canaville night life 10.jpg"
import image13 from "../assets/gallery/IMG-20221021-WA0022.jpg"
import image14 from "../assets/gallery/IMG-20221127-WA0026.jpg"
import image15 from "../assets/gallery/IMG-20221127-WA0029.jpg"
import image16 from "../assets/gallery/IMG-20221127-WA0034.jpg"
import image17 from "../assets/gallery/IMG-20221221-WA0042.jpg"
import image18 from "../assets/gallery/Img-157.jpg"
import Navbar from "../components/Navbar"
import { Footer } from "../components/Footer"




const Gallery: React.FC = () => {

    const images = [
        image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18
     ]

    return (
        <>
        <Navbar />
        <div className="gallery-heading">
            <h1>Gallery</h1>
        </div>
        <div className="gallery-container">
            {
                images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <img src={image} alt="" />
                    </div>
                ))
            }
        </div>
        <Footer />
        </>
    )
}

export default Gallery;