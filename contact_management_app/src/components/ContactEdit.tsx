import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dialog, IconButton, TextFieldProps } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import InputField from "./core/InputField";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  isActiveId?: string;
  activeData?: any;
};
const ContactEdit = ({
  open,
  onClose,
  mutate,
  isActiveId,
  activeData,
}: Props) => {
  const router = useRouter();
  const PropertyID = router.query.management;
  const [isImage, setIsImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState("password");
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const tenantID = isActiveId;
  const ContactSchema = [
    {
      key: 1,
      name: "firstName",
      label: "First Name",
      placeHolder: "Enter Your FirstName",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string()
        .required("First Name is required.")
        .min(3, "First Name must be at least 3 characters long.")
        .matches(/^[A-Za-z\s]+$/, "First Name must be only alphabets"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 2,
      name: "lastName",
      placeHolder: "Enter Your LastName",
      label: "Last Name",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string()
        .required("Last Name is required")
        .min(3, "Last Name must be at least 3 characters long.")
        .matches(/^[A-Za-z\s]+$/, "Last Name must be only alphabets"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 3,
      name: "status",
      placeHolder: "Enter Your Status",
      label: "Status",
      initialValue: "",
      type: "checkbox",
      validationSchema: Yup.string()
        .required("Status is required")
        .min(3, "Status must be at least 3 characters long.")
        .matches(/^[A-Za-z\s]+$/, "Status must be only alphabets"),
      className: "col-span-12 md:col-span-6",
    },
  ];

  const initialValues = ContactSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = ContactSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tenant/${tenantID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (data) {
        toast.success("Tenant Updated Successfully");
        mutate();
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };
  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Edit Contact
        </p>
        <div className="flex flex-col   w-full p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-4">
                {ContactSchema?.map((inputItem) => (
                  <Field name={inputItem?.name} key={inputItem?.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
                      >
                        {/* {isUserLoading ? (
                            <Skeleton variant="text" width={200} height={30} />
                          ) : ( */}
                        <div className="font-semibold">{inputItem?.label}</div>
                        {/* )} */}
                        <div className="col-span-6 w-full">
                          <InputField
                            title={inputItem?.label}
                            key={inputItem?.key}
                            initialValue={initialValues}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            placeholder={inputItem.placeHolder}
                            value={formik?.values[inputItem?.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            error={Boolean(
                              formik?.touched[inputItem?.name] &&
                                formik?.errors[inputItem?.name]
                            )}
                            helperText={
                              formik?.touched[inputItem?.name] &&
                              (formik?.errors[inputItem?.name] as any)
                            }
                            {...(props.field as any)}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                ))}

                <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-4">
                  <button
                    type="submit"
                    className="btn-one"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Please wait..." : "Edit Contact"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
};

export default ContactEdit;
