import React from 'react'
import circleimg from './Images/circleimg.jpg'
import './comp.css';
import { Link } from 'react-router-dom';
import chola_bhatura from './Images/chola_bhatura.webp';
import idli_sambhar from './Images/idli_sambhar.jpg';
import lassi from './Images/lassi.jpg';
import samosa from './Images/samosa.jpeg';
import chach from './Images/chach.webp'
import dahi_samosa from './Images/dahi_samosa.webp';
import sambhar_samosa from './Images/sambhar_samosa.jpg';
import review1 from './Images/review1.jpeg';
import review2 from './Images/review2.avif';
import review3 from './Images/review3.webp';
import img1 from './Images/img1.png';
import testi1 from './Images/testi1.jpg';
import testi2 from './Images/testi2.jpg';
import testi3 from './Images/testi3.jpg';

export default function Landing() {
  return (
    <div className='body'>
      {/* home */}
      <section className="banner" id="banner">
        <div className="content">
            <h2 className='typing-effect'>Welcome to your Smart Canteen</h2>
            <h2 className='mob-typing-effect'>Smart Canteen</h2>
            <p>Where technology meets taste!Enjoy a seamless, personalized dining experience designed just for you.</p>
            <Link to="/login"><button>Get Started</button></Link>
        </div>
      </section>
        
        {/* aboutus */}
        <section className="about" id="about"> 
        <div className="row">
            <div className="col50">
              <h2 class="titleText"><span>A</span>bout Us</h2>
            <div className='aboutus-text'>
              <p>Our Smart Canteen Management System brings efficiency, convenience, and simplicity to your dining experience—whether it’s a school cafeteria, a corporate food court, or a bustling institutional canteen.
          <span>
          We believe mealtime should be easy and enjoyable.That’s why we’ve designed a system that streamlines everything—from browsing menus and placing orders to tracking inventory and processing payments. No more long lines, manual orders, or stock issues. Just smooth, efficient, and smart management at your fingertips.
          <br></br>
          </span></p>
          </div>
          
            </div>
            <div class="col50">
                <div class="imgBx">
                    <img src={img1}></img>
                </div>
            </div>
        </div>
    </section>

        {/* top sellers */}
        <div className='top-sellers'><h2 class="titleText"><span>T</span>op Sellers</h2></div>
        <div className='container3 scrollable'>
          <div className='images'>
            <img src={chola_bhatura}></img>
            <p>Chola Bhatura - Rs.50</p>
          </div>
          <div className='images'>
            <img src={idli_sambhar}></img>
            <p>Idli-Sambhar - Rs.30</p>
          </div>
          <div className='images'>
            <img src={samosa}></img>
            <p>Samosa - Rs.20</p>
          </div>
          <div className='images'>
            <img src={lassi}></img>
            <p>Lassi - Rs.15</p>
          </div>
          <div className='images'>
            <img src={chach}></img>
            <p>Chhach - Rs.15</p>
          </div>
          <div className='images'>
            <img src={dahi_samosa}></img>
            <p>Dahi Samosa- Rs.25</p>
          </div>
          <div className='images'>
            <img src={sambhar_samosa}></img>
            <p>Sambhar Samosa- Rs.30</p>
          </div>
        </div>
        
        {/* top-reviews and volunteers */}
        <div className='top-sellers'><h2 class="titleText"><span>T</span>op Reviews</h2></div>
        <div className='container3 scrollable'>
          <div className='images'>
            <img src={testi1}></img>
            <p>Lorem ipsum</p>
          </div>
          <div className='images'>
            <img src={testi2}></img>
            <p>Lorem ipsum</p>
          </div>
          <div className='images'>
            <img src={testi3}></img>
            <p>Lorem ipsum</p>
          </div>
          <div className='images'>
            <img src={testi1}></img>
            <p>Lorem ipsum</p>
          </div>
          <div className='images'>
            <img src={testi2}></img>
            <p>Lorem ipsum</p>
          </div>
          <div className='images'>
            <img src={testi3}></img>
            <p>Lorem ipsum</p>
          </div>
          <div className='images'>
            <img src={testi1}></img>
            <p>Lorem ipsum</p>
          </div>
        </div>

        <section class="contact" id="contact">
        <div class="title">
            <h2 class="titleText"><span>C</span>ontact Us</h2>
        </div>
        <div class="contactForm">
            <h3>Send Message</h3>
            <div class="inputBox">
                <input type="text" placeholder="Name"></input>
            </div>
            <div class="inputBox">
                <input type="text" placeholder="Email"></input>
            </div>
            <div class="inputBox">
                <textarea  placeholder="Message"></textarea>
            </div>
            <div class="inputBox">
                <input  type="submit" value="Send"></input>
            </div>
        </div>
    </section>
    <div class="copyright">
        <p>Made with ❤️ by Aishwarya,Priya,Raj,Aryan</p>
    </div>
    </div>
  )
}
