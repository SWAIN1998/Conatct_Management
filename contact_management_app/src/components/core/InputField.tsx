import { Delete } from "@mui/icons-material";
import {
  FormControl,
  InputBaseComponentProps,
  InputLabel,
  InputProps,
  MenuItem,
  TextField,
} from "@mui/material";
import { ChangeEvent, FocusEvent, useState } from "react";

interface Props {
  type?:
    | "text"
    | "select"
    | "date"
    | "file"
    | "number"
    | "email"
    | "autocomplete"
    | "string"
    | any;
  value?: any;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: FocusEvent<any, Element>) => void;
  error?: boolean;
  defaultImage?: any;
  key?: any;
  helperText?: string;
  fullWidth?: boolean;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  options?: any;
  title?: string;
  id?: string;
  checked?: boolean;
  image?: string;
  button?: string;
  isActiveID?: any;
  setIsActiveID?: any;
  variant?: "filled" | "outlined" | "standard";
  InputProps?: InputProps;
  inputProps?: InputBaseComponentProps;
  styleContact?: any;
  styleArea?: any;
  styleField?: any;
  onFileChange?: any;
  multiline?: boolean;
  rows?: number;
  loading?: boolean;
  autoCompleteValue?: any;
  handleNoText?: boolean;
  onTextChange?: any;
  handleSelectText?: any;
  onNoOptionClick?: any;
  defaultValue?: any;
  multiple?: boolean;
  label?: any;
  isImage?: any;
  setIsImage?: any;
}

const InputField = ({
  type,
  value,
  label,
  onChange,
  onBlur,
  error,
  helperText,
  fullWidth,
  placeholder,
  name,
  disabled,
  defaultImage,
  InputProps,
  title,
  id,
  variant,
  inputProps,
  options,
  styleContact,
  image,
  styleArea,
  styleField,
  onFileChange,
  rows,
  isImage,
  setIsImage,
  multiline,
  loading,
  autoCompleteValue,
  handleNoText,
  onTextChange,
  handleSelectText,
  onNoOptionClick,
  defaultValue,
  multiple,
  button,
  isActiveID,
  setIsActiveID,
}: Props) => {
  const [checked, setChecked] = useState(true);
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  switch (type) {
    case "text":
      return (
        <TextField
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          id={id}
          disabled={disabled}
          variant={variant}
          className={styleContact}
          InputProps={InputProps}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          multiline={multiline}
          rows={rows}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );

    case "number":
      return (
        <TextField
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          id={id}
          type="number"
          disabled={disabled}
          variant={variant}
          className={styleContact}
          InputProps={InputProps}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          multiline={multiline}
          rows={rows}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );
    case "date":
      return (
        <TextField
          fullWidth={fullWidth}
          type="date"
          name={name}
          id={id}
          variant={variant}
          className="rounded-lg"
          inputProps={inputProps}
          InputProps={InputProps}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );
    case "file":
      return (
        <div className={styleField}>
          <div className="relative col-span-2 my-2 w-full">
            <label className="text-sm   font-bold text-black  ">
              <div className="">
                <div className="relative flex h-20  w-full cursor-pointer flex-col  overflow-hidden rounded-lg border border-gray-500 bg-white lg:h-12  lg:w-full lg:flex-row">
                  <input
                    hidden
                    className={`absolute z-30 h-full min-h-[3em] w-full bg-red-400 bg-transparent`}
                    type="file"
                    name={name}
                    id={name}
                    accept=".pdf,.doc"
                    placeholder="Upload Resume"
                    onChange={(e: any) => {
                      setIsImage(e?.target?.files[0]?.name);
                      setIsActiveID(name);
                      // setIsImage(e.target.files[0]);
                      // formik.handleChange(e);
                    }}
                    // onBlur={formik.handleBlur}
                    // value={formik.values.file}
                  />
                  <span className=" flex h-12 w-full flex-col items-center justify-center bg-blue-600 whitespace-nowrap px-3 py-2 text-white hover:bg-pink-600 hover:text-white lg:w-[30%]">
                    Upload Document
                  </span>
                  <div className="flex flex-row items-center justify-center ">
                    <span className=" flex h-12 w-full z-0 flex-col  items-center justify-center px-3 py-2 text-base text-black ">
                      {/* {isActiveID === name
                        ? isImage
                          ? isImage
                          : "No file chosen.."
                        : "No file chosen.."} */}
                      {isActiveID === name ? isImage : "No file chosen.."}
                    </span>
                  </div>
                </div>
              </div>
              <span className="absolute top-4 left-0 right-3 flex cursor-pointer flex-col items-end justify-end text-center text-red-600 z-20">
                <Delete onClick={() => setIsImage(null)} />
              </span>
            </label>

            {/* {formik.values?.file && (
            <span
              className="absolute top-12 left-0 right-3 flex cursor-pointer flex-col items-end justify-end text-center text-red-600"
              onClick={handeleFileDelete}
            >
              <i className="fa-solid fa-trash"></i>
            </span>
          )}

          <span className="h-0 text-base font-bold  text-red-600">
            {formik.touched.file && formik.errors.file}
          </span> */}
          </div>
        </div>
      );
    case "photo":
      return (
        <div className={styleField}>
          {/* <UploadImage
            image={image}
            defaultImage={defaultImage}
            onChange={onFileChange}
            className={styleField}
            setIsImage={setIsImage}
            clearImage={() => onFileChange(undefined)}
          /> */}
        </div>
      );
    case "select":
      return (
        <FormControl fullWidth>
          <InputLabel className={`${value ? "hidden" : ""}`}>
            {placeholder}
          </InputLabel>
          <TextField
            fullWidth={fullWidth}
            id={id}
            select={true}
            name={name}
            value={value}
            onChange={onChange}
            className={styleContact}
            disabled={disabled}
            label={label}
            InputProps={InputProps}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
          >
            {options?.map((option: any) => (
              <MenuItem key={option?.value} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      );
    // case "autocomplete":
    //   return (
    //     <div className={styleArea}>
    //       <p className="text-theme text-wider font-medium pb-2">{title}</p>

    //       <CustomAutocomplete
    //         handleNoText={handleNoText}
    //         onTextChange={onTextChange}
    //         onNoOptionClick={onNoOptionClick}
    //         handleSelectText={handleSelectText}
    //         options={options}
    //         loading={loading}
    //         onChange={(e: any, v: any) => autoCompleteValue?.(v)}
    //         fullWidth={fullWidth}
    //         multiple={multiple}
    //       />
    //     </div>
    //   );

    default:
      return (
        <TextField
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          type={type}
          id={id}
          variant={variant}
          className={styleContact}
          InputProps={InputProps}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );
  }
};

export default InputField;
