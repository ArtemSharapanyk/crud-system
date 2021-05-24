import React from 'react';

export const CardPart = ({property, value, specialClass}) => {
    return (
        <div className={`card__name card__property ${specialClass}`}>
            {property}
            <div className="card__value">
                {value}
            </div>
        </div>
    )
}
