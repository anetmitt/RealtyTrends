import { useContext, useState } from "react";
import { MouseEvent } from "react";
import RegisterFormView from "./RegisterFormView";
import { IRegisterData } from "../../dto/IRegisterData";
import { IdentityService } from "../../services/IdentityService";
import { JwtContext } from "../Root";

const Register = () => {
    const [values, setInput] = useState({
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        
    } as IRegisterData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement ) => {

        setInput({ ...values, [target.name]: target.value });
        }

        const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const identityService = new IdentityService();

    const onSubmit = async (event: MouseEvent) => {
        event.preventDefault();

        if (values.firstName.length === 0 || values.lastName.length === 0 || values.password.length === 0 || values.confirmPassword.length === 0 || values.email.length === 0 || values.password !== values.confirmPassword) {
            setValidationErrors(["Bad input values!"]);
            return;
        }

        setValidationErrors([]);

        var jwtData = await identityService.register(values);

        if (jwtData === undefined) {
            setValidationErrors(["No JWT!"]);
            return;
        }


        if (setJwtResponse) setJwtResponse(jwtData);
    }

    return (
        <RegisterFormView values={values} handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors}/>
    );
}

export default Register;