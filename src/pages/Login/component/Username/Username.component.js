import React from 'react';
import {TextField} from "@material-ui/core";

export const UsernameComponent = (props) => {
    return (
        <TextField
            style={{width: '50%', marginTop: "1rem"}}
            type="username"
            id="username"
            name="username"
            label="نام کاربری"
            value={props.value}
            onChange={props.onChange}
            error={props.error}
            helperText={props.helperText}
            inputProps={{
                style: {
                    fontSize: 17,
                    direction: 'ltr'
                }
            }}
            InputLabelProps={{
                style: {
                    fontSize: 17,
                    left: "auto",
                    right: 0,
                    direction: "rtl"
                }
            }}
        />

    )
}


