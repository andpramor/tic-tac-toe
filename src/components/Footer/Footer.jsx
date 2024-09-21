import './Footer.css'

export const Footer = () => {
  return (
    <footer className='footer'>
      <span className='footerLinks'>
        <a href='https://andrespradomorgaz.com'><i className='bi bi-person-circle' />Portfolio</a>
        <a href='mailto:andres@andrespradomorgaz.com'><i className='bi bi-envelope-fill' />Contacto</a>
        <a href='https://www.linkedin.com/in/apradomorgaz/'><i className='bi bi-linkedin' />LinkedIn</a>
        <a href='https://github.com/andpramor/'><i className='bi bi-github' />Github</a>
      </span>
      <span>2024 &#169; Andrés Prado Morgaz</span>
    </footer>
  )
}
