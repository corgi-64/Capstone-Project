import toast from 'react-hot-toast'
import { authenticate } from './components'


/**
 * validate password
 * export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
  }

  validate reset password
  export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
  }

  validate password length
  
  function passwordVerify(errors = {}, values){
  
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if(!values.password){
      errors.password = toast.error("Password Required...!");
  } else if(values.password.includes(" ")){
      errors.password = toast.error("Wrong Password...!");
  }else if(values.password.length < 8){
      errors.password = toast.error("Password must be more than 4 characters long");
  }

  return errors;
}
 */


/**
 * validate email
 * 
 * function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
  }
*/