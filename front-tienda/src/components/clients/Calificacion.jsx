// src/components/Calificacion.jsx
import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Calificacion = ({ rating, setRating, isEditable = true }) => {
  return (
    <ReactStars
      count={5}
      onChange={isEditable ? setRating : null} // Solo permite cambiar si es editable
      size={35}
      isHalf={false}  // Sin medias estrellas
      activeColor="#ffd700"  // Color de las estrellas activas
      value={rating} // Valor actual de la calificación
      edit={isEditable} // Permitir editar solo si isEditable es true
      // Deshabilitar interacciones si no es editable
      isDisabled={!isEditable}
    />
  );
};

export default Calificacion;
