import React, { useState } from 'react';

export default (initialValue) => {
    const [value, setValue] = useState(initialValue || '');
    const [dirty, setDirtyState] = useState(false);

    const onChange = e => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        setDirtyState(true);
    };

    const clearInput = () => {
        setDirtyState(false);
        setValue('');
    };


    return {
        value, dirty,
        onChange, onBlur,
        clearInput
    }
}