import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function register(email,name,college,rollno,universityRoll,gradDate,sex,collegeUid ,sawoPayload) {
    return new Promise((resolve, reject) => {
      db.collection("users").doc(sawoPayload.user_id).onSnapshot((doc)=>{

        if(!doc.exists)
        {
          db.collection("users").doc(sawoPayload.user_id).set({
            uid:sawoPayload.user_id,
            phoneNumber:sawoPayload.identifier,
            displayName:name,
            email,
            college,
            rollno,
            universityRoll,
            gradDate,
            sex,
            isHired: false,
            visitedBy:[],
            offers: [],
            isStudent:true,
            collegeUid,
            visitedBy:[],
            topics:{},
            awards:{}
            }).catch(error => reject("error creating profile"));
        }else
        {
            setCurrentUser(doc.data())
        }
      })
    })
  }

// user login
function login(sawoPayload) {
  return new Promise((resolve, reject) => {
    db.collection("users").doc(sawoPayload.user_id).onSnapshot((doc)=>{

      if(doc.exists)
        {
          if(doc.data().isStudent)
          {
            setCurrentUser(doc.data())
          }
          else
          {
            reject("account doesn't exists")
            sessionStorage.clear();  
            setCurrentUser()
          }
        }
        else
        {
          reject("account doesn't exists")
          sessionStorage.clear();  
        setCurrentUser()
        }

    })
  })
  }


  //college registration
  function  College_registration(name_clg,email,contact,clg_address,extras,sawoPayload) {

    return new Promise((resolve, reject) => {
      db.collection("users").doc(sawoPayload.user_id).onSnapshot((doc)=>{

        if(!doc.exists)
        {
          db.collection("users").doc(sawoPayload.user_id).set({
            uid:sawoPayload.user_id,
            phoneNumber:sawoPayload.identifier,
            displayName:name_clg,
            email,
            contact,
            clg_address,
            extras,
            isCollege:true,
            }).catch(error => reject("error creating profile"));
        }else
        {
            if(doc.data().isCollege)
            setCurrentUser(doc.data())
            else
            {
              sessionStorage.clear();  
              setCurrentUser()
              reject("Phone number already exists")
            }
        }
      })
    })
  }


// college login
function collegeLogin(sawoPayload) {
  return new Promise((resolve, reject) => {
    db.collection("users").doc(sawoPayload.user_id).onSnapshot((doc)=>{

      if(doc.exists)
        {
          if(doc.data().isCollege)
          {
            setCurrentUser(doc.data())
          }
          else
          {
            reject("account doesn't exists")
            sessionStorage.clear();  
            setCurrentUser()
          }
        }
        else
        {
          reject("account doesn't exists")
          sessionStorage.clear();  
          setCurrentUser()
        }

    })
  })
  }


  
//HR Register
  function hrRegister(email,name,company,country,state,contact,sawoPayload) {



    return new Promise((resolve, reject) => {
      db.collection("users").doc(sawoPayload.user_id).onSnapshot((doc)=>{

        if(!doc.exists)
        {
          db.collection("users").doc(sawoPayload.user_id).set({
            displayName:name,
            uid:sawoPayload.user_id,
            phoneNumber:sawoPayload.identifier,
            email,
            company,
            country,
            state,
            contact,
            studentData:[],
            isHr:true,
            quota:0,
            sentOffers: []
            }).catch(error => reject("error creating profile"));
        }else
        {
            if(doc.data().isHr)
            setCurrentUser(doc.data())
            else
            {
              sessionStorage.clear();  
              setCurrentUser()
              reject("Phone number already exists")
            }
        }
      })
    })
  }


// HR login
function hrLogin(sawoPayload) {

  return new Promise((resolve, reject) => {
    db.collection("users").doc(sawoPayload.user_id).onSnapshot((doc)=>{

      if(doc.exists)
        {
          if(doc.data().isHr)
          {
            setCurrentUser(doc.data())
          }
          else
          {
            reject("account doesn't exists")
            sessionStorage.clear();  
            setCurrentUser()
          }
        }
        else
        {
          reject("account doesn't exists")
          sessionStorage.clear();  
          setCurrentUser()
        }

    })
  })

}
  function logout() {
    sessionStorage.clear();  
        setCurrentUser()
    return auth.signOut()
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user && user.uid)
      {
        var unsubscribe = db.collection("users").doc(user.uid).onSnapshot((docs)=>{
          if(!docs.empty)
            {
              setCurrentUser(docs.data())
              setLoading(false)
            }
          })
      }else
        setLoading(false)

      return unsubscribe
      
    })

    return unsubscribe
  }, [])



  const value = {
    login,
    logout,
    updateEmail,
    register,
    hrRegister,
    College_registration,
    collegeLogin,
    hrLogin,
    currentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}



