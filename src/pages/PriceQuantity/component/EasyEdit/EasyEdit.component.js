import React, {useEffect, useState} from 'react';
import EasyEdit from 'react-easy-edit';

const EasyEditComponent = (props) => {
    const [productId, setProductId] = useState()
    const [item, setChangeItem] = useState()
    const [productItem, setProductItem] = useState()


    useEffect(() => {
        setProductId(props.productId)
        setChangeItem(props.item)
        setProductItem(props.productItem)
    }, [])


    const save = (value) => {

    }

    const cancel = (value) => {

    }

    const onSave = (newValue) => {
        props.onSave({
            newValue,
            productItem,
            productId,
            item
        })
    }

    return (
        <EasyEdit
            type={props.type}
            value={props.value}
            onSave={onSave}
            onCancel={cancel}
            hideSaveButton={true}
            hideCancelButton={true}
            attributes={{name: "awesome-input", id: 1}}
            instructions={props.instructions}
            onValidate={props.validation}
            validationMessage={props.validateMessage}
        />
    );
};

export {EasyEditComponent};