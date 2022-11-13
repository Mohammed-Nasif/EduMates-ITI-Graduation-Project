import './landing.scss';

//import bootstrap component
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import images
import logo from '../../assets/images/EduMates.svg';
import hero from '../../assets/images/Online world-pana 1.svg';
import hashTag from '../../assets/images/Building hashtag-pana 1.svg';
import screen from '../../assets/images/Webinar-pana 1.png';
import preview from '../../assets/images/Online Review-pana 1.png';
import footerLogo from '../../assets/images/landing footer logo.svg';
import { Link } from 'react-router-dom';

export const Landing = () => {
	return (
		<>
			{/* start navBar */}
			<div className='mx-5'>
				<Navbar bg='transparent' expand='lg' className='mt-3'>
					<Navbar.Brand>
						<img src={logo} alt='' />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<Nav.Link as={Link} to='/register' className='fs-5 btn btn-outline-info fw-bold mx-2 px-3 my-sm-3'>
								Signup
							</Nav.Link>
							<Nav.Link as={Link} to='/login' className='fs-5 btn btn-outline-info fw-bold mx-2 px-4 my-sm-3'>
								Login
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
			{/* end navBar */}
			{/* start hero */}
			<section className='hero py-5'>
				<div className='container '>
					<div className='row d-flex align-items-center justify-content-between'>
						<div className='col-md-3 text-sm-center py-sm-2'>
							<h1>Welcome!</h1>
						</div>
						<div className='col-md-7'>
							<img src={hero} alt='hero_img' className='w-100' />
						</div>
					</div>
				</div>
			</section>
			{/* end hero */}
			{/* start hashtag */}
			<section className='hashTag py-5'>
				<div className='container'>
					<div className='row align-items-center justify-content-between'>
						<div className='col-md-6'>
							<div className='hashTag_img'>
								<img src={hashTag} alt='hashTag_img' className='w-100' />
							</div>
						</div>
						<div className='col-md-5'>
							<div className=' section-text py-sm-5'>
								<p>
									As we have strong belief that education is the key for better future. Our website is a social media platform that encourage users to
									get involved in education process either by giving courses or enrolling in courses.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* end hashtag */}
			{/* start screen */}
			<section className='screen py-5'>
				<div className='container'>
					<div className='row justify-content-between align-items-center'>
						<div className='col-md-5 py-sm-3'>
							<div className='section-text '>
								<p>
									<span className='text-primary fw-bold fs-3'>Edu</span> Mates website provide users a community to engage with their environments.
									And as we believe that communities develop through education our website has educational side that facilitates educational process
									to our users through courses and other features.
								</p>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='screen_img'>
								<img src={screen} alt='screen_img' className='w-100' />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* end screen */}
			{/* start previews */}
			<div className='previews py-5'>
				<div className='container'>
					<div className='row align-items-center justify-content-between'>
						<div className='col-md-6'>
							<div className='previews_img'>
								<img src={preview} alt='previews' className='w-100' />
							</div>
						</div>
						<div className='col-md-5'>
							<div className='preview_text  text-sm-center '>
								<h2 className='py-3'>Our Message</h2>
								<p className='fs-5'>
									In the age of Epidemics, the importance of remote communication has significantly aroused. Getting people closer despite of physical
									distancing. Business, Marketing , Education, even health consultations are done over the internet
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* end previews */}
			{/* start  footer */}
			<footer className=' py-5 '>
				<div className='container'>
					<div className='row justify-content-between'>
						<div className='col-md-1'>
							<img src={footerLogo} alt='logo' />
						</div>
						<div className="col-md-4">
							<h2 className='text-white'>Contact us </h2>
							<Link className='text-decoration-none text-white'>info@edumates.com</Link>
						</div>
					</div>
				</div>
			</footer>
			{/* end  footer */}
		</>
	);
};
