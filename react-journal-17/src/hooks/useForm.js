import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidate = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation] = useState(formValidate);
  

    const formIsValid = useMemo(() => {
        for ( const item of Object.keys(formValidation)) {
           // console.log('se ejecuta formIsValid', item)
           if (formValidation[item] !== null ) return false;
        }
        return true;
    }, [formValidation])

    useEffect(() => {
      createValidators()
      
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);

    }, [initialForm])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = { }

        for ( let formField of Object.keys(formValidate)) {
            const [fn, errorMessage] = formValidate[formField];
       
            formCheckedValues[`${formField}IsValid`] = fn(formState[formField]) ? null : errorMessage ;

        }

        setFormValidation(formCheckedValues);

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        formValidation, formIsValid
    }
}