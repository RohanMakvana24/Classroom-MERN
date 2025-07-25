import * as Yup from "yup";

const CreateClassSchema = Yup.object().shape({
  className: Yup.string()
    .min(3, "Class name must be at least 3 characters long")
    .max(20, "Class name must be at most 20 characters long")
    .required("Class name is required"),
  section: Yup.string()
    .min(3, "Section must be at least 3 characters long")
    .max(30, "Section must be at most 30 characters long")
    .optional(), // Optional field
  subject: Yup.string()
    .min(3, "Subject must be at least 3 characters long")
    .max(20, "Subject must be at most 20 characters long")
    .optional(), // Optional field
  room: Yup.string()
    .min(3, "Room must be at least 3 characters long")
    .max(20, "Room must be at most 20 characters long")
    .optional(), // Optional field
});

export default CreateClassSchema;
