import React, { useState } from 'react'

export default () => {
    const [active, setActive] = useState(false);

    return {
        checkboxState: active,
        setActive
    }
};