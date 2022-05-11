import React from 'react';
import {TextField} from "@material-ui/core";

export const PasswordComponent = (props) => {

    return (
        <TextField
            style={{width: '50%', marginTop: "1rem"}}
            type="password"
            id="password"
            name="password"
            label="رمز عبور"
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


