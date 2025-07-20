import logo from '../assets/Logo.svg';
import { FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer p-10 bg-red-200/30 text-base">
            <aside>
                <img src={logo} alt="" />
                <p className="flex items-center gap-1">
                    Made With Love By Skh. 
                    <FaHeart size={20} className='text-[#f54748]'/>
                </p>
            </aside>
            <nav>
                <header className="footer-title text-xl text-[#f54748]">Services</header>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <header className="footer-title text-xl text-[#f54748]">Company</header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <header className="footer-title text-xl text-[#f54748]">Legal</header>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    )
}

export default Footer