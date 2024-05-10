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

  export function resendConfirmationCode(email) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
          })

        cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
  }
  
  export function signIn(email, password) {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        })
    
        const cognitoUser = new CognitoUser({
          Username: email,
          Pool: userPool,
        })
    
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            resolve(result)
          },
          onFailure: (err) => {
            reject(err)
          },
        })
      })
  }
  
  export function forgotPassword(email) {
    // Forgot password implementation
  }
  
  export function confirmPassword(email, code, newPassword) {
    // Confirm password implementation
  }
  
  export function signOut() {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
    }
  }
  
  export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser()
  
      if (!cognitoUser) {
        reject(new Error("No user found"))
        return
      }
  
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err)
          return
        }
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err)
            return
          }
          const userData = attributes.reduce((acc, attribute) => {
            acc[attribute.Name] = attribute.Value
            return acc
          }, {})
  
          resolve({ ...userData, username: cognitoUser.username })
        })
      })
    })
  }
  
  export function getSession() {
    const cognitoUser = userPool.getCurrentUser()
    return new Promise((resolve, reject) => {
      if (!cognitoUser) {
        reject(new Error("No user found"))
        return
      }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err)
          return
        }
        resolve(session)
      })
    })
  }