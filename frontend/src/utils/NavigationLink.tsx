import { Link } from 'react-router-dom';

import './NavigationLink.css'

type NavigationLinkProps = {
    to: string;
    text: string;
    textColor: string;
    bg: string;
    onClick?: () => Promise<void>;
}

const NavigationLink = (props: NavigationLinkProps) => {
  return (
    <Link className='nav-link' to={props.to} onClick={props.onClick} style={{background: props.bg, color: props.textColor}}>{props.text}</Link>
  )
}

export default NavigationLink