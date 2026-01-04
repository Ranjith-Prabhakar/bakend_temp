const {NODE_ENV} = require('./env')
const accessTokenOptions = {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 min
}

const refreshTokenOptions = {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  }


 module.exports = {
    accessTokenOptions,
    refreshTokenOptions
 } 


 {/**
    | Option     | For Production?       | Reason                   |
| ---------- | --------------------- | ------------------------ |
| `httpOnly` | ✅ **Always**          | XSS protection           |
| `secure`   | ✅ Always in prod      | HTTPS only               |
| `sameSite` | `'lax'` or `'strict'` | CSRF protection          |
| `maxAge`   | ✅ Good practice       | Control session lifetime |
| `expires`  | optional              | If using absolute expiry |
| `domain`   | if using subdomains   | Scope                    |
| `path`     | usually `'/'`         | Scope                    |
| `signed`   | optional              | Add integrity            |
| `priority` | optional              | Chrome optimization      |


Cookie (concept):
A cookie is a mechanism that allows a server to store small pieces of data in the browser, along with various options. The browser will use these options to decide when and how to send the cookie back in future requests to the same server.

Cookie options:
httpOnly
Instructs the browser to prevent any client-side scripts (JavaScript) from accessing this cookie. However, the cookie will still be automatically included in HTTP(S) request headers.

secure
Instructs the browser to only send the cookie over HTTPS connections. The cookie will not be sent if the request is over plain HTTP.

sameSite
Controls whether the cookie should be sent with cross-site requests:

strict: The cookie is only sent for same-origin requests initiated through user navigation (top-level), such as direct link clicks or form submissions on the same site. It won’t be sent for cross-origin requests.

lax: The cookie can be sent for same-origin requests and some cross-origin navigation, such as top-level form submissions or link clicks, but not for cross-origin AJAX requests.

none: The cookie will be sent with all requests, including cross-origin.
⚠️ Note: Requires secure: true when using SameSite: None.

domain
Defines the domain scope of the cookie. If set to the top-level domain (e.g. example.com), the cookie will be sent for that domain and all its subdomains (e.g. api.example.com, shop.example.com).
If not specified, the cookie is restricted to the exact domain that set it.

path
Defines the path scope of the cookie (URL path). The browser will only send the cookie to the server when the request URL matches this path or a sub-path.

maxAge
Instructs the browser to automatically delete the cookie after a given number of seconds (relative to when it was set).

expires
Similar to maxAge, but specifies an absolute expiration date and time. If both expires and maxAge are set, maxAge takes precedence.        
    */}