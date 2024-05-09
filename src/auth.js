import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
  } from "amazon-cognito-identity-js"
  import { cognitoConfig } from "./cognitoConfig"
  
  const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
  })

  export function signUp(email, password) {
    return new Promise((resolve, reject) => {
        userPool.signUp(
          email,
          password,
          null,
          null,
          (err, result) => {
            if (err) {
              reject(err)
              return
            }
            resolve(result.user)
          }
        )
      })
    }
  
  export function confirmSignUp(email, code) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
          Username: email,
          Pool: userPool,
        })
    
        cognitoUser.confirmRegistration(code, true, (err, result) => {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        })
      })
  }
  
  export function signIn(email, password) {
    // Sign in implementation
  }
  
  export function forgotPassword(email) {
    // Forgot password implementation
  }
  
  export function confirmPassword(email, code, newPassword) {
    // Confirm password implementation
  }
  
  export function signOut() {
    // Sign out implementation
  }
  
  export function getCurrentUser() {
    // Get current user implementation
  }
  
  export function getSession() {
    // Get session implementation
  }