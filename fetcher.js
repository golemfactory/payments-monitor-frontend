import { getSession } from "next-auth/react"

// create a and export a function that takes in a "url", "method" and optional body as parameters
export async function postData(url, method, body) {
  // get the session from the NextAuth session cookie
  const session = await getSession()
  // if there is a session, add the access token to the request headers
  if (session) {
    const headers = {
      Authorization: `Bearer ${session.user.accessToken}`,
    }
    // if there is a body, add it to the request
    if (body) {
      headers["Content-Type"] = "application/json"
      body = JSON.stringify(body)
    }
    // make the request
    const res = await fetch(url, {
      method,
      headers,
      body,
    })
    // if the response is not ok, throw an error
    if (!res.ok) {
      throw res
    }
    // if the response is ok, return the response
    return res
  }
  // if there is no session, return null
  return null
}

// create a and export a function that takes in a "url", "method" and optional body as parameters
export async function getData(url, method) {
  // get the session from the NextAuth session cookie
  const session = await getSession()
  // if there is a session, add the access token to the request headers
  if (session) {
    const headers = {
      Authorization: `Bearer ${session.user.accessToken}`,
    }
    // if there is a body, add it to the request
    // make the request
    const res = await fetch(url, {
      method,
      headers,
    })
    // if the response is not ok, throw an error
    if (!res.ok) {
      throw res
    }
    // if the response is ok, return the response
    return res
  }
  // if there is no session, return null
  return null
}
