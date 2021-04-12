import React, { useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types';

import { obtenerDiferenciaYear,calcularMarca,calcularPlan } from './Helper'

const Campo = styled.div`
   display:flex;
   margin-bottom: 1rem;
   margin-left: -1rem;
`;

const Label = styled.label`
    flex: 0 0 100px;
`
const Select = styled.select`
    display:block;
    width:100%;
    padding:1rem;
    border:1px solid #e1e1e1;
    -webkit-appearance:none;

`
const InputRadio = styled.input`
  margin:0 1rem;
`

const Boton = styled.button`
  background-color:#00838F;
  font-size:16px;
  width:100%;
  padding:1rem;
  color:#fff;
  text-transform:uppercase;
  font-weight: bold;
  border:none;
  transition:background-color .3s ease;
  margin-top: 1rem;
    &:hover{
        background-color:#26C6DA;
        cursor:pointer;
    }
`

const Error = styled.div`
  background-color:red;
  color:white;
  padding: 1rem;
  width:100%;
  text-align:center;
  margin-bottom:2rem;

`

const Formulario = ({guardarResumen,guardarCargando}) => {

    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: '',
    })
    const [error, guardarError] = useState(false)

    // extraer los valores del state

    const { marca, year, plan } = datos;
    //Leer los datos del formulario y colocar en el state

    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario presiona submit

    const cotizarSeguro = (e) => {
        e.preventDefault();
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false)

        // obtener diferencia de años, por cada año hay que restar el 3% y empezamos con una base de 2000
        let resultado = 2000
        const diferencia = obtenerDiferenciaYear(year);
        resultado-=((diferencia * 3) * resultado)/100;

        //Americano 15%, Europeo 30%, Asiatico 5%
       resultado = calcularMarca(marca) * resultado;
   
        //Basico aumenta 20%, Completo 50%
        const incrementoPlan = calcularPlan(plan);
        resultado=parseFloat(incrementoPlan*resultado).toFixed(2)

        guardarCargando(true)

        setTimeout(()=>{
            //Elimina animacion cargando
            guardarCargando(false)
            //Pasa informacion
            guardarResumen({
                cotizacion:Number(resultado),
                datos
            })
        },2500)

       
    }


    return (
        <form onSubmit={cotizarSeguro}>
            {error ? <Error>Los valores no pueden ser nulos</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select name="marca" value={marca} onChange={obtenerInformacion}>
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select name="year" value={year} onChange={obtenerInformacion}>
                    <option value="">-- Seleccione --</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio type="radio" name="plan" value="basico" checked={plan === "basico"} onChange={obtenerInformacion} />Básico
                <InputRadio type="radio" name="plan" value="completo" checked={plan === "completo"} onChange={obtenerInformacion} />Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
    );
}

Formulario.propTypes={
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando:PropTypes.func.isRequired
}

export default Formulario;