import PropTypes from "prop-types"

export const DEFAULT_PROPS = {
    hasLayout : true,
    Layout : 'User'
}

export const PROPS_TYPES ={
    hasLayout : PropTypes.bool ,
    Layout : PropTypes.string ,
    Component : PropTypes.func.isRequired
}