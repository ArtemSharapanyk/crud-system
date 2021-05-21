import React, { useState } from 'react';

export const useCheckBox = () => {
    const [active, setActive] = useState(false);

    return {
        checkboxState: active,
        setActive
    }
};