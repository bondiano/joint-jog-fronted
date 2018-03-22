import React from 'react';
import { Typography } from 'material-ui';

const ErrorsForm = ({errors}) => (
    <div>
        {Object.keys(errors).map((fieldName, i) => {
            if(errors[fieldName].length > 0){
                return (
                    <Typography color="error" key={i}>{errors[fieldName]}</Typography>
                );
            } else {
                return '';
            }
        })}
    </div>
);

export default ErrorsForm;