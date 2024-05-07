import React from 'react'
import { Link } from 'react-router-dom';

type NavigationLinkProps = {
    to: string;
    text: string;
    textColor: string;
    bg: string;
    onClick?: () => Promise<void>;
}

const NavigationLink = (props: NavigationLinkProps) => {
  return (
    <Link to={props.to} style={{background: props.bg, color: props.textColor}}>{props.text}</Link>
  )
}

export default NavigationLink