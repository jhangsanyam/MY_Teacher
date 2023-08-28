import React, { useState } from 'react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();



const Auth1 = () => {
     const handleSubmit = async (e) => {
        e.preventDefault();

         try {
            var checkRadio = document.querySelector(
                'input[value="Teacher"]:checked');
                    if(checkRadio !== null){
                        cookies.set('role' , "Teacher");
                    //   console.log('Teacher')
                    }
                    else{
                        cookies.set('role' , "Student")
                       // console.log('student')
                    }
                  
          // console.log("jk");
            } catch (error) {
                console.log(error);
            }
    window.location.reload();
    }

   

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>Choose your Roles</p>
                    <form onSubmit={handleSubmit}>
                         <div>
                            <div className="role_input_form">
                                <label className="role_input_form_label" htmlFor="Teacher">Teacher</label>
                                <input 
                                    name="Student" 
                                    type="radio"
                                    value= "Teacher"
                                
                                />
                            </div>
                        
                        
                            <div className="role_input_form">
                                <label className="role_input_form_label"  htmlFor="Student">Student</label>
                                <input 
                                    name="Student" 
                                    type="radio"
                                   value="student"
                                   checked
                                />
                            </div>
                            </div>
                        
                        
                        <div className="auth__form-container_fields-content_button">
                            <button>submit</button>
                        </div> 
                    </form>
                    
                </div> 
            </div>
           
        </div>
    )
}

export default Auth1;
