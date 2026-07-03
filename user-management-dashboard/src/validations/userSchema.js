import * as yup from "yup";

export const userSchema = yup.object({
    firstName: yup
        .string()
        .required("First name is required")
        .min(2),

    lastName: yup
        .string()
        .required("Last name is required")
        .min(2),

    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),

    department: yup
        .string()
        .required("Department is required"),
});