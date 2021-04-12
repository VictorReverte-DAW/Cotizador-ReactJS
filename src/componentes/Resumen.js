import React from 'react'
import Proptypes from 'prop-types'
import styled from '@emotion/styled'
import {mayus} from './Helper'

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #09A8B0;
    margin-top: 1rem;
    color:white;
`

const Resumen = ({ datos }) => {
    const { marca, year, plan } = datos;
    if (marca === '' || year === '' || plan === '') {
        return null
    }
    return (
        <ContenedorResumen>
            <h2>Resumen de la cotizacion</h2>
            <ul>
                <li>Año: {year}</li>
                <li>Plan: {mayus(plan)}</li>
                <li>Marca: {mayus(marca)}</li>
            </ul>
        </ContenedorResumen>

    );
}
Resumen.propTypes={
    datos:Proptypes.object.isRequired
}
export default Resumen