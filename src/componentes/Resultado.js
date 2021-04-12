import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'


const Mensaje = styled.p`

background-color:rgb(127,224,237);
margin-top: 2rem;
padding:1rem;
text-align:center;
color:#09A8B0;
font-weight: bold;


`

const Resultado = ({ cotizacion }) => {

    return (
        (cotizacion <= 0)
            ? null
            : <TransitionGroup className="resultado">
                <CSSTransition classNames="resultado" key={cotizacion} timeout={{ enter: 500, exit: 500 }}>

                    <Mensaje>El total es de: {cotizacion}€</Mensaje>

                </CSSTransition>
            </TransitionGroup>
    )

}

Resultado.propTypes={
    cotizacion:PropTypes.number.isRequired
}

export default Resultado